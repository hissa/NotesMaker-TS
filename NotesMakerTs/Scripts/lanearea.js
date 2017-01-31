var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LaneArea = (function (_super) {
    __extends(LaneArea, _super);
    function LaneArea() {
        _super.apply(this, arguments);
    }
    LaneArea.prototype.getHeightFromInLane = function (value) {
        if (!(this.isInnerHeightThisArea(value))) {
            throw new ApplicationError("valueがLaneの高さを超えています。");
        }
        var origin = this.topLeft.y;
        var heightInLane = origin + value;
        return heightInLane;
    };
    LaneArea.prototype.getHeightFromBottom = function (value) {
        if (!this.isInnerHeightThisArea(value)) {
            console.log(value);
            throw new ApplicationError("valueがLaneの高さを超えています。");
        }
        var origin = this.bottomRight.y;
        var heightFromBottom = origin - value;
        return heightFromBottom;
    };
    LaneArea.prototype.isInnerHeightThisArea = function (value) {
        if (value > this.getHeight()) {
            return false;
        }
        return true;
    };
    LaneArea.prototype.makeBarLineShape = function (heightFromBottom, color) {
        var height = this.getHeightFromBottom(heightFromBottom);
        var shape = new createjs.Shape();
        shape.graphics.beginStroke(color).
            moveTo(this.getLeft(), height).
            lineTo(this.getRight(), height);
        return shape;
    };
    LaneArea.prototype.makeDelimitLines = function (color) {
        var lineShapes = new Array();
        var laneWidth = this.getWidth() / 5;
        for (var i = 1; i <= 4; i++) {
            var line = new Line(this.topLeft.copy(), this.bottomRight.copy());
            line.a.x += laneWidth * i;
            line.b.x = line.a.x;
            var lineShape = line.makeShape(color);
            lineShapes.push(lineShape);
        }
        return lineShapes;
    };
    return LaneArea;
}(Area));
//# sourceMappingURL=lanearea.js.map