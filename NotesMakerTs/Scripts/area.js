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
    Area.prototype.getLeft = function () {
        return this.topLeft.x;
    };
    Area.prototype.getTop = function () {
        return this.topLeft.y;
    };
    Area.prototype.getRight = function () {
        return this.bottomRight.x;
    };
    Area.prototype.getBottom = function () {
        return this.bottomRight.y;
    };
    Area.prototype.copy = function () {
        return Area.copy(this);
    };
    Area.prototype.makeShape = function (color) {
        var shape = new createjs.Shape();
        shape.graphics.beginFill(color).
            drawRect(this.getLeft(), this.getTop(), this.getWidth(), this.getHeight());
        return shape;
    };
    return Area;
}());
//# sourceMappingURL=area.js.map