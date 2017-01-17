class Point {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static zero(): Point{
        return new Point(0, 0);
    }

    public static copy(point: Point): Point {
        return new Point(point.x, point.y);
    }

    public copy(): Point {
        return Point.copy(this);
    }
}