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
    return Area;
}());
//# sourceMappingURL=area.js.map