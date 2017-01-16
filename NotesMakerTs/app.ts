/// <reference path="scripts/point.ts" />
/// <reference path="scripts/area.ts" />
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
        var BackgroundMenuBar = this.makeBackgroundShape(this.areas.menuBar, "gray");
        this.stage.addChild(BackgroundMenuBar);
        var BackgroundScoreArea = this.makeBackgroundShape(this.areas.ScoreArea, "PaleTurquoise");
        this.stage.addChild(BackgroundScoreArea);
        var BackgroundToolBoxArea = this.makeBackgroundShape(this.areas.ToolBoxArea, "green");
        this.stage.addChild(BackgroundToolBoxArea);
        this.stage.update();
    }

    private static makeBackgroundShape(area: Area, color: string): createjs.Shape {
        var shape = new createjs.Shape();
        shape.graphics.beginFill(color).
            drawRect(area.topLeft.x, area.topLeft.y, area.getWidth(), area.getHeight());
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
                this.makeBackgroundShape(this.laneAreas[i], "gray")
            );
            this.stage.addChild(laneBackgrounds[i]);
        }
    }

    private static dicideDelimitLine(): void {
    }
}

App.main();