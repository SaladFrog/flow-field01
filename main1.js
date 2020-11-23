var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d"),
    width = canvas.width = 1280,
    height = canvas.height = 720;

// Draw background object
var background = new Image();
background.crossOrigin = 'anonymous';


background.onload = () => {
    var scale = Math.max(width / background.width, height / background.height);
    var x = (width / 2) - (background.width / 2) * scale;
    var y = (height / 2) - (background.height / 2) * scale;
    context.drawImage(background, x, y, background.width * scale, background.height * scale);

    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];     // red
        data[i + 1] = 255 - data[i + 1]; // green
        data[i + 2] = 255 - data[i + 2]; // blue
    }

    context.putImageData(imageData, 0, 0);

    context.drawImage(background, 0, 0);
}

background.src = 'cat.jpg';



