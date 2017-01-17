/// <reference path="point.ts" />
var Area = (function () {
    function Area(topLeft, bottomRight) {
        this.topLeft = topLeft;
        this.bottomRight = bottomRight;
    }
    Area.prototype.getWidth = function () {
        return this.bottomRight.x - this.topLeft.x;
    };
    Area.prototype.getHeight = function () {
        return this.bottomRight.y - this.topLeft.y;
    };
    Area.copy = function (area) {
        return new Area(area.topLeft.copy(), area.bottomRight.copy());
    };
    Area.prototype.copy = function () {
        return Area.copy(this);
    };
    return Area;
}());
//# sourceMappingURL=area.js.map