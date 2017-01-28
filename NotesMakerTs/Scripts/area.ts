/// <reference path="point.ts" />
class Area {
    public topLeft: Point;
    public bottomRight: Point;

    constructor(topLeft: Point, bottomRight: Point) {
        this.topLeft = topLeft;
        this.bottomRight = bottomRight;
    }

    public getWidth(): number {
        return this.bottomRight.x - this.topLeft.x;
    }

    public getHeight(): number {
        return this.bottomRight.y - this.topLeft.y;
    }

    public static copy(area: Area): Area {
        return new Area(area.topLeft.copy(),area.bottomRight.copy());
    }

    public getLeft(): number {
        return this.topLeft.x;
    }

    public getTop(): number {
        return this.topLeft.y;
    }

    public getRight(): number {
        return this.bottomRight.x;
    }

    public getBottom(): number {
        return this.bottomRight.y;
    }

    public copy(): Area {
        return Area.copy(this);
    }

    public makeShape(color: string): createjs.Shape {
        var shape = new createjs.Shape();
        shape.graphics.beginFill(color).
            drawRect(this.getLeft(), this.getTop(), this.getWidth(), this.getHeight());
        return shape;
    }

    public IsInnerThisArea(point: Point): boolean {
        if (point.x < this.getLeft() || point.x > this.getRight()) {
            return false;
        }
        if (point.y < this.getTop() || point.y > this.getBottom()) {
            return false;
        }
        return true;
    }

    public PublicPointToLocalPoint(publicPoint: Point): Point {
        if (!this.IsInnerThisArea(publicPoint)) {
            throw new ApplicationError("指定されたポイントがこのエリア内ではありません。");
        }
        var x = publicPoint.x - this.getLeft();
        var y = publicPoint.y - this.getTop();
        return new Point(x, y);
    }

    public LocalPointToPublicPoint(localPoint: Point): Point {
        if (localPoint.x > this.getWidth() || localPoint.y > this.getHeight()) {
            throw new ApplicationError("指定されたポイントがこのエリアの大きさを超えています。");
        }
        var x = localPoint.x + this.getLeft();
        var y = localPoint.y + this.getTop();
        return new Point(x, y);
    }
}