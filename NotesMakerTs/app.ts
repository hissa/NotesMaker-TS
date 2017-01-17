/// <reference path="scripts/line.ts" />
/// <reference path="scripts/point.ts" />
/// <reference path="scripts/area.ts" />
/// <reference path="scripts/settings.ts" />
class App {
    public static canvasArea: Area;
    public static stage: createjs.Stage;

    private static canvas: HTMLElement;
    private static viewSettings: {
        heightOfMenuBar: number;
        weightOfToolBar: number;
    };
    private static areas: {
        menuBar: Area;
        ScoreArea: Area;
        ToolBoxArea: Area;
    };
    private static laneWidth: number = 100;
    private static laneAreas: Area[];

    public static main(): void {
        this.initialize();
        this.setAreas();
        this.drawBackgrounds();
        this.dicideLaneArea();
        this.drawLanes();
        this.drawLaneDelimitLine();
        this.stage.update();
    }

    private static initialize(): void {
        this.canvas = document.getElementById("appcanvas");
        this.canvasArea =
            new Area(Point.zero(), new Point(this.canvas.clientWidth, this.canvas.clientHeight));
        this.stage = new createjs.Stage(this.canvas);
        this.viewSettings = {
            heightOfMenuBar: 50,
            weightOfToolBar: 200
        };
        this.areas = {
            menuBar: new Area(Point.zero(), Point.zero()),
            ScoreArea: new Area(Point.zero(), Point.zero()),
            ToolBoxArea: new Area(Point.zero(), Point.zero())
        };
    }

    private static setAreas(): void {
        this.areas.menuBar =
            new Area(Point.zero(), new Point(this.canvasArea.getWidth(), this.viewSettings.heightOfMenuBar));           
        this.areas.ScoreArea =
            new Area(new Point(0, this.viewSettings.heightOfMenuBar),
                new Point(this.canvasArea.getWidth() - this.viewSettings.weightOfToolBar, this.canvasArea.getHeight()));
        this.areas.ToolBoxArea =
            new Area(new Point(this.canvasArea.getWidth() - this.viewSettings.weightOfToolBar, this.viewSettings.heightOfMenuBar),
                new Point(this.canvasArea.getWidth(), this.canvasArea.getHeight()));
    }

    private static drawBackgrounds(): void {
        var BackgroundMenuBar =
            this.makeBackgroundShape(this.areas.menuBar, Settings.colors.menuBarBackground);
        this.stage.addChild(BackgroundMenuBar);
        var BackgroundScoreArea =
            this.makeBackgroundShape(this.areas.ScoreArea, Settings.colors.scoreAreaBackground);
        this.stage.addChild(BackgroundScoreArea);
        var BackgroundToolBoxArea =
            this.makeBackgroundShape(this.areas.ToolBoxArea, Settings.colors.toolBoxAreaBackground);
        this.stage.addChild(BackgroundToolBoxArea);
        this.stage.update();
    }

    private static makeBackgroundShape(area: Area, color: string): createjs.Shape {
        var shape = new createjs.Shape();
        shape.graphics.beginFill(color).
            drawRect(area.topLeft.x, area.topLeft.y, area.getWidth(), area.getHeight());
        return shape;
    }

    private static makeLineShape(line: Line, wight: number, color: string): createjs.Shape {
        var shape = new createjs.Shape();
        shape.graphics.beginStroke(color);
        shape.graphics.moveTo(line.a.x, line.a.y);
        shape.graphics.lineTo(line.b.x, line.b.y);
        return shape;
    }

    private static dicideLaneArea(): void {
        var lanePadding = this.laneWidth * (1 / 5);
        this.laneAreas = new Array();
        var top = this.areas.ScoreArea.topLeft.y + lanePadding;
        var height = this.areas.ScoreArea.bottomRight.y - top * 2;
        var pointCursorX = this.areas.ScoreArea.topLeft.x;
        while (true) {
            if (pointCursorX + lanePadding + this.laneWidth >= this.areas.ScoreArea.bottomRight.x) {
                break;
            }
            var area = new Area(
                new Point(pointCursorX + lanePadding, top),
                new Point(pointCursorX + lanePadding + this.laneWidth, top + height)
            );
            this.laneAreas.push(area);
            pointCursorX = area.bottomRight.x;
        }
    }

    private static drawLanes(): void {
        var laneBackgrounds = new Array();
        for (var i = 0; i <= this.laneAreas.length - 1; i++) {
            laneBackgrounds.push(
                this.makeBackgroundShape(this.laneAreas[i], Settings.colors.scoreLaneBackground)
            );
            this.stage.addChild(laneBackgrounds[i]);
        }
    }

    private static drawLaneDelimitLine(): void {
        var lengthwiseLaneWidth = this.laneWidth / 5;
        for (var i = 0; i <= this.laneAreas.length - 1; i++) {
            for (var j = 1; j <= 4; j++) {
                var line = new Line(this.laneAreas[i].topLeft.copy(), this.laneAreas[i].bottomRight.copy());
                line.a.x += lengthwiseLaneWidth * j;
                line.b.x = line.a.x;
                var lineShape = this.makeLineShape(line, 1, Settings.colors.scoreLaneDelimitLine);
                this.stage.addChild(lineShape);
            }
        }
    }
}

App.main();