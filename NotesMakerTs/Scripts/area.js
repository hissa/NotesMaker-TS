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
    Area.prototype.IsInnerThisArea = function (point) {
        if (point.x < this.getLeft() || point.x > this.getRight()) {
            return false;
        }
        if (point.y < this.getTop() || point.y > this.getBottom()) {
            return false;
        }
        return true;
    };
    Area.prototype.PublicPointToLocalPoint = function (publicPoint) {
        if (!this.IsInnerThisArea(publicPoint)) {
            throw new ApplicationError("指定されたポイントがこのエリア内ではありません。");
        }
        var x = publicPoint.x - this.getLeft();
        var y = publicPoint.y - this.getTop();
        return new Point(x, y);
    };
    Area.prototype.LocalPointToPublicPoint = function (localPoint) {
        if (localPoint.x > this.getWidth() || localPoint.y > this.getHeight()) {
            throw new ApplicationError("指定されたポイントがこのエリアの大きさを超えています。");
        }
        var x = localPoint.x + this.getLeft();
        var y = localPoint.y + this.getTop();
        return new Point(x, y);
    };
    return Area;
}());
//# sourceMappingURL=area.js.map