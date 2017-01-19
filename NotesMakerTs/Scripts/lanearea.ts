class LaneArea extends Area {
    public getHeightFromInLane(value: number): number {
        if (value > this.getHeight()) {
            throw new ApplicationError(
                "valueがLaneの高さを超えています。"
            );
        }
        var origin = this.topLeft.y;
        var heightInLane = origin + value;
        return heightInLane;
    }

    public getHeightFromBottom(value: number): number {
        if (value > this.getHeight()) {
            throw new ApplicationError(
                "valueがLaneの高さを超えています。"
            );
        }
        var origin = this.bottomRight.y;
        var heightFromBottom = origin - value;
        return heightFromBottom;
    }

    public makeBarLineShape(heightFromBottom: number, color: string): createjs.Shape {
        var height = this.getHeightFromBottom(heightFromBottom);
        var shape = new createjs.Shape();
        shape.graphics.beginStroke(color).
            moveTo(this.getLeft(), height).
            lineTo(this.getRight(), height);
        return shape;
    }

    public makeDelimitLines(color: string): createjs.Shape[] {
        var lineShapes:createjs.Shape[] = new Array();
        var laneWidth = this.getWidth() / 5;
        for (var i = 1; i <= 4; i++) {
            var line = new Line(
                this.topLeft.copy(),
                this.bottomRight.copy()
            );
            line.a.x += laneWidth * i;
            line.b.x = line.a.x;
            var lineShape = line.makeShape(color);
            lineShapes.push(lineShape);
        }
        return lineShapes;
    }
}