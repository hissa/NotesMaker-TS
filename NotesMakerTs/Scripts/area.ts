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

    public copy(): Area {
        return Area.copy(this);
    }
}