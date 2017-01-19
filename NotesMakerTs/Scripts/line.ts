class Line {
    public a: Point;
    public b: Point;

    constructor(a: Point, b: Point) {
        this.a = a;
        this.b = b;
    }

    public static copy(line: Line): Line {
        return new Line(line.a.copy(), line.b.copy());
    }

    public copy(): Line {
        return Line.copy(this);
    }

    public makeShape(color: string): createjs.Shape {
        var shape = new createjs.Shape();
        shape.graphics.beginStroke(color);
        shape.graphics.moveTo(this.a.x, this.a.y);
        shape.graphics.lineTo(this.b.x, this.b.y);
        return shape;
    }
}