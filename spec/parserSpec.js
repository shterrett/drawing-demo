"use strict";

describe("Parser", function () {
    it("Splits a string into lines", function () {
        var str = "First Line\n" +
                  "Second Line\n" +
                  "Third Line";

        var parser = new Parser();
        var lines = parser.splitLines(str);
        expect(lines.length).toEqual(3);
    });

    it("Extracts coordinates from a 'Go to' line", function () {
        var line = "Go to 3, 5";

        var parser = new Parser();
        var point = parser.extractPoint(line);

        expect(point).toEqual([3, 5]);
    });

    it("Extracts coordinates from a 'Go to' line with decimals", function () {
        var line = "Go to 15.235, 16.234";

        var parser = new Parser();
        var point = parser.extractPoint(line);

        expect(point).toEqual([15.235, 16.234]);
    });

    it("Registers callbacks for events", function () {
        var callback = function () { return true };

        var parser = new Parser({ "nextPoint": callback });

        expect(parser.callbacks["nextPoint"]()).toBeTruthy();
    });

    it("sets the current point to the value of the 'Go to' line", function () {
        var parser = new Parser();

        parser.executeLine("Go to 3, 5");

        expect(parser.currentPoint).toEqual([3, 5]);
    });

    it("sets drawing to true on 'Pen down'", function () {
        var parser = new Parser();
        parser.drawing = false;

        parser.executeLine("Pen down");

        expect(parser.drawing).toBeTruthy();
    });

    it("sets drawing to false on 'Pen up'", function () {
        var parser = new Parser();
        parser.drawing = false;

        parser.executeLine("Pen up");

        expect(parser.drawing).toBeFalsy();
    });

    it("calls the drawline callback when 'Go to' line is executed and drawing is true", function () {
        var line = [];
        var parser = new Parser({ drawLine: function (points) { line = points } });
        parser.drawing = true;
        parser.currentPoint = [0, 0];

        parser.executeLine("Go to 100, 521");

        expect(line).toEqual([[0, 0], [100, 521]]);
    });

    it("does not call the drawline callback when 'Go to' line is executed and drawing is false", function () {
        var line = [];
        var parser = new Parser({ drawLine: function (points) { line = points } });
        parser.drawing = false;
        parser.currentPoint = [0, 0];

        parser.executeLine("Go to 100, 521");

        expect(line).toEqual([]);
    });

    it("executes the on start callback on 'START' line, and clears drawing and currentPoint", function () {
        var called = false;
        var parser = new Parser({ onStart: function () { called = true } });
        parser.drawing = true;
        parser.currentPoint = [25, 13];

        parser.executeLine("START");

        expect(called).toBeTruthy();
        expect(parser.currentPoint).toEqual([]);
        expect(parser.drawing).toBeFalsy();
    });

    it("executes the on end callback on 'STOP' line, and clears drawing and currentPoint", function () {
        var called = false;
        var parser = new Parser({ onEnd: function () { called = true } });
        parser.drawing = true;
        parser.currentPoint = [25, 13];

        parser.executeLine("STOP");

        expect(called).toBeTruthy();
        expect(parser.currentPoint).toEqual([]);
        expect(parser.drawing).toBeFalsy();
    });

    it("executes a script", function () {
        var script = ["START",
                      "Go to 0, 0",
                      "Pen Down",
                      "Go to 10, 10",
                      "Go to 20, 10",
                      "Pen Up",
                      "Go to 5, 5",
                      "Go to 7, 7",
                      "Pen Down",
                      "Go to 12, 12",
                      "STOP"].join("\n");

        var started = false;
        var ended = false;
        var lines = [];
        var parser = new Parser({ onStart: function () { started = true },
                                  onEnd: function () { ended = true },
                                  drawLine: function (points) {
                                      lines.push(points); } });

        parser.executeScript(script);

        expect(started).toBeTruthy();
        expect(ended).toBeTruthy();
        var expectedLines = [[[0, 0], [10, 10]],
                             [[10, 10], [20, 20]],
                             [[7, 7], [12, 12]]];

        expectedLines.forEach(function (line, l, lines) {
            line.forEach(function (point, p, line) {
                expect(point[0]).toEqual(lines[l][p][0]);
                expect(point[1]).toEqual(lines[l][p][1]);
            });
        });
    });
});
