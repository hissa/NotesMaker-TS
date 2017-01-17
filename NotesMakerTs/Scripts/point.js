var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.zero = function () {
        return new Point(0, 0);
    };
    Point.copy = function (point) {
        return new Point(point.x, point.y);
    };
    Point.prototype.copy = function () {
        return Point.copy(this);
    };
    return Point;
}());
//# sourceMappingURL=point.js.map