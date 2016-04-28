window.Parser = function Parser (callbacks){
    this.callbacks = callbacks;
    this.currentPoint = [];
    this.drawing = false;

    this.registerCallback = function (eventName, func) {
        this.callbacks[eventName] = func;
    }

    this.splitLines = function (str) {
        return str.split("\n");
    }

    this.extractPoint = function (line) {
        return line.match(/\d+/g).map(function (num, i, nums) {
            return Number(num);
        });
    }

    this.executeScript = function (script) {
        this.splitLines(script).forEach(function (line, i, lines) {
            this.executeLine(line);
        }, this);
    }

    this.executeLine = function (line) {
        var goTo = /^Go to/i;
        var pen = /^Pen/i;
        var start = /^start$/i;
        var end = /^end$/i;

        if (line.match(goTo)) {
            this.executeGoTo(line);
        } else if (line.match(pen)) {
            this.executePen(line);
        } else if (line.match(start)) {
            this.executeStart(line);
        } else if (line.match(end)) {
            this.executeEnd(line);
        };
    }

    this.executeGoTo = function (line) {
        if (this.drawing) {
            this.callbacks["drawLine"]([this.currentPoint, this.extractPoint(line)]);
        }
        this.currentPoint = this.extractPoint(line);
    }

    this.executePen = function (line) {
        this.drawing = line.match(/down/i);
    }

    this.executeStart = function (line) {
        this.reset();
        this.callbacks["onStart"]();
    }

    this.executeEnd = function (line) {
        this.reset();
        this.callbacks["onEnd"]();
    }

    this.reset = function () {
        this.currentPoint = [];
        this.drawing = false;
    }
};
