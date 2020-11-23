var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width = 1280,
    height = canvas.height = 720;


var colors = ['rgba(34, 49, 63,' + 0.5 + ')',       // an array of rgb colors for the circles
'rgba(189, 195, 199,' + 0.5 + ')',
'rgba(241, 196, 15,' + 0.5 + ')',
'rgba(231, 76, 60,' + 0.5 + ')',
'rgba(231, 76, 60,' + 0.5 + ')'
];

//var circleColors = colors[Math.floor(Math.random() * colors.length)];

// random attractor params
var a = Math.random() * 4 - 2;
var b = Math.random() * 4 - 2;
var c = Math.random() * 4 - 2;
var d = Math.random() * 4 - 2;

var count = Math.floor(Math.random(50, 2000));
var steps = Math.floor(Math.random() * 500) + 100;

// create particles
particles = [];
for (var i = 0; i < 5; i++) {
    particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,

        radius: Math.random(0.01, 10),
        color: colors[Math.floor(Math.random() * colors.length)]
    })
}
console.log(particles[0]);
console.log(particles[1]);
console.log(steps);

//render();

let start;
function step(timestamp) {
    if (start === undefined)
        start = timestamp;
    const elapsed = timestamp - start;
    if (elapsed < 10000) { // Stop the animation after 2 seconds
        console.log('Steps');

        // flying dots
        // context.fillStyle = 'black';
        // context.fillRect(0, 0, canvas.width, canvas.height);

        // flying lines path2D
        // let path1 = new Path2D();
        // path1.rect(0, 0, width, height);
        // context.fill(path1)

        render();
        requestAnimationFrame(step);
    }
}
// static background
// context.fillStyle = 'black';
// context.fill();

// Path2D fill background
let path1 = new Path2D();
path1.rect(0, 0, width, height);
context.fill(path1)

requestAnimationFrame(step);

function render() {

    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        var value = getValue(p.x, p.y);
        p.vx += Math.cos(value) * 0.1;
        p.vy += Math.sin(value) * 0.1;

        p.x += p.vx;
        p.y += p.vy;

        // context.beginPath();

        ///////////////////////////////////////////////////
        // draw circle with line
        ///////////////////////////////////////////////////
        /*
         context.lineTo(p.x, p.y);
         context.lineTo(p.x, p.y);
         // context.lineWidth = p.radius;
         context.lineWidth = Math.random() * 15;
         context.lineCap = 'round' || 'square';
         context.lineJoin = 'round' || 'square';
         context.strokeStyle = p.color;
         context.globalAlpha = 0.5;
         context.stroke();
         */

        ///////////////////////////////////////////////////
        // CANVAS draw circle with arc
        ///////////////////////////////////////////////////
        /*
        context.moveTo(width / 2, height / 2);
        context.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.fill();
        */
        ///////////////////////////////////////////////////
        // PATH2D draw circle with arc
        ///////////////////////////////////////////////////
        let path2 = new Path2D();
        path2.moveTo(width / 2, height / 2);
        path2.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false);

        context.stroke(path2);
        // Fill path
        context.strokeStyle = 'white';
        context.globalAlpha = 0.5;
        context.fill(path2);

    }// end particles loop

}// end reder()

function getValue(x, y) {
    // clifford attractor
    // http://paulbourke.net/fractals/clifford/

    // scale down x and y
    var scale = 0.005;
    x = (x - width / 2) * scale;
    y = (y - height / 2) * scale;

    // attactor gives new x, y for old one. 
    var x1 = Math.sin(a * y) + c * Math.cos(a * x);
    var y1 = Math.sin(b * x) + d * Math.cos(b * y);

    // find angle from old to new. that's the value.
    return Math.atan2(y1 - y, x1 - x);
}// end getValue()


