var Line = (function () {
    function Line(a, b) {
        this.a = a;
        this.b = b;
    }
    Line.copy = function (line) {
        return new Line(line.a.copy(), line.b.copy());
    };
    Line.prototype.copy = function () {
        return Line.copy(this);
    };
    return Line;
}());
//# sourceMappingURL=line.js.map