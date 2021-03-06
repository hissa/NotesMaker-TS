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
    Line.prototype.makeShape = function (color) {
        var shape = new createjs.Shape();
        shape.graphics.beginStroke(color);
        shape.graphics.moveTo(this.a.x, this.a.y);
        shape.graphics.lineTo(this.b.x, this.b.y);
        return shape;
    };
    return Line;
}());
//# sourceMappingURL=line.js.map