"use strict";

var canvas = this.__canvas = new fabric.Canvas("canvas", { width: 500, height: 500 });

function transform (point) {
    return [point[0] * 50, canvas.height - (point[1] * 50)];
}

function makeLine(start, end) {
    return new fabric.Line(start.concat(end), {
      fill: 'black',
      stroke: 'black',
      strokeWidth: 2,
      selectable: false
    });
  }

var start = function () { canvas.clear(); };
var end = function () { canvas.renderAll(); };
var drawLine = function (line) {
    var line = makeLine(transform(line[0]), transform(line[1]));
    canvas.add(line);
};

var parser = new Parser({ onStart: start, onEnd: end, drawLine: drawLine });
var runBtn = document.getElementById("run");
runBtn.addEventListener("click", function (e) {
    var script = document.getElementById("program").value;
    parser.executeScript(script);
});
