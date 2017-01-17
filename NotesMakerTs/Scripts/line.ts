class Line {
    public a: Point;
    public b: Point;

    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    public static copy(line: Line): Line {
        return new Line(line.a.copy(), line.b.copy());
    }

    public copy(): Line {
        return Line.copy(this);
    }
}