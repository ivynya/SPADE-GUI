const jetpack = require('fs-jetpack');
const app = require('electron').remote.app;
const { exec } = require('child_process');

var mouseDown;
var input, ctx;

var executeEnabled = true;
var manualUpdate = false;

var value = 22, size = 8;
var cpuMode = false;

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
    input.addEventListener('mouseup', draw_mouseUp, false);
  }
});

function updateValues() {
  value = document.getElementById("value").value;
  size = document.getElementById("size").value;
}

function changeMode() {
  cpuMode = !cpuMode;
  if (cpuMode)
    document.getElementById("modeChange").value = "CPU";
  else
    document.getElementById("modeChange").value = "GPU";
}

function toggleManualUpdate() {
  manualUpdate = !manualUpdate;
  if (manualUpdate)
    document.getElementById("toggleManual").value = "Manual";
  else
    document.getElementById("toggleManual").value = "Auto";
}

// Saves image on canvas to file
function saveImg(canvas) {
  if (!executeEnabled)
    return;

  var img = canvas.toDataURL();

  // strip off the data: url prefix to get just the base64-encoded bytes
  var data = img.replace(/^data:image\/\w+;base64,/, "");
  var buf = new Buffer(data, 'base64');

  // Write file to SPADE directory for processing
  jetpack.write("util/drawn.png", buf);

  if (!manualUpdate)
    updateResult();
}

function updateResult() {
  if (!executeEnabled)
    return;

  executeEnabled = false;
  document.getElementById("loading").style.opacity = 1;

  var appPath = app.getAppPath();

  // Execute python script to convert to greyscale and move to SPADE
  const pyProcess = exec("python3 "+appPath+"/util/ctg.py");
  // Execute test.py with args to get resulting image
  var executeStr = "python3 "+appPath+"/uSPADE/test.py " +
                   "--name ade20k_pretrained --dataset_mode ade20k " +
                   "--dataroot "+appPath+"/uSPADE/dataset " +
                   "--checkpoints_dir "+appPath+"/uSPADE/checkpoints " +
                   "--results_dir "+appPath+"/uSPADE/results " +
                   "--load_size 700 " +
                   "--crop_size 700 ";
  if (cpuMode)
    executeStr += "--gpu_ids -1";

  const mlProcess = exec(executeStr);

  mlProcess.on("close", function() {
      executeEnabled = true;
      document.getElementById("loading").style.opacity = 0;

      var d = new Date();
      document.getElementById("output").src = appPath +
        "/uSPADE/results/ade20k_pretrained/test_latest/images/synthesized_image/ADE_val_00000001.png?" + d.getMilliseconds();
  });
}

// Draws a dot given size and greyscale value
function drawDot(ctx, x, y, size, value) {
  if (!executeEnabled)
    return;

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
