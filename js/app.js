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

    input.addEventListener('touchstart', draw_touchStart, false);
    input.addEventListener('touchmove', draw_touchMove, false);
  }
});

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

// Sketchpad touch functions
function draw_touchStart() {
  getTouchPos();
  drawDot(ctx, mouseX, mouseY, size, value);
  event.preventDefault();
}

function draw_touchMove(e) {
  getTouchPos(e);
  drawDot(ctx, mouseX, mouseY, size, value);
  event.preventDefault();
}

function getTouchPos(e) {
  if (!e)
    e = event;

  if (e.touches) {
    if (e.touches.length === 1) {
      var touch = e.touches[0];

      touchX = touch.pageX;
      touchY = touch.pageY;
    }
  }
}
