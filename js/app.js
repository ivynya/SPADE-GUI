const jetpack = require('fs-jetpack');
const app = require('electron').remote.app;
const { exec } = require('child_process');

var mouseDown;
var input, ctx;

var value = 22, size = 8;

document.addEventListener("DOMContentLoaded", function () {
  input = document.getElementById("input");

  input.height = innerHeight - 50;
  input.width = innerWidth / 2;

  // Attach event handlers for canvas
  if (input.getContext)
    ctx = input.getContext("2d");
  if (ctx) {
    input.addEventListener('mousedown', draw_mouseDown, false);
    input.addEventListener('mousemove', draw_mouseMove, false);
    window.addEventListener('mouseup', draw_mouseUp, false);
  }
});

// Saves image on canvas to file
function saveImg(canvas) {
  var img = canvas.toDataURL();

  // strip off the data: url prefix to get just the base64-encoded bytes
  var data = img.replace(/^data:image\/\w+;base64,/, "");
  var buf = new Buffer(data, 'base64');

  // Write file to SPADE directory for processing
  jetpack.write("img/drawn.png", buf);
  // Execute python script to convert to greyscale and move to SPADE
  var appPath = app.getAppPath();
  const pyProcess = exec("python3 "+appPath+"/img/ctg.py");
  // TODO: execute test.py with args to get resulting image
}

// Draws a dot given size and greyscale value
function drawDot(ctx, x, y, size, value) {
  ctx.fillStyle = "rgba(" + value +", " + value +", " + value + ", 1)";

  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}

// Sketchpad mouse functions
function draw_mouseDown() {
  mouseDown = 1;
  drawDot(ctx, mouseX, mouseY, size, value);
}

function draw_mouseUp() {
  mouseDown = 0;
  saveImg(input);
}

function draw_mouseMove(e) {
  getMousePos(e);

  if (mouseDown === 1) {
    drawDot(ctx, mouseX, mouseY, size, value);
  }
}

function getMousePos(e) {
  if (!e)
    e = event;

  mouseX = e.layerX;
  mouseY = e.layerY;
}
