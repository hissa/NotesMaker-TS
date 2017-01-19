/// <reference path="scripts/bar.ts" />
/// <reference path="scripts/note.ts" />
/// <reference path="scripts/line.ts" />
/// <reference path="scripts/point.ts" />
/// <reference path="scripts/area.ts" />
/// <reference path="scripts/lanearea.ts" />
/// <reference path="scripts/applicationerror.ts" />
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
    private static laneWidth: number = 150;
    private static heightOfBeat: number = 25;
    private static laneAreas: LaneArea[];
    private static bars: Bar[];

    public static main(): void {
        this.initialize();
        this.setAreas();
        this.drawBackgrounds();
        this.dicideLaneArea();
        this.drawLanes();
        this.drawLaneDelimitLine();        
        this.drawBars();
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
        this.bars = new Array();
        for (var i = 0; i <= 12; i++) {
            this.bars.push(new Bar());
        }
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
            this.areas.menuBar.makeShape(Settings.colors.menuBarBackground);
        this.stage.addChild(BackgroundMenuBar);
        var BackgroundScoreArea =
            this.areas.ScoreArea.makeShape(Settings.colors.scoreAreaBackground);
        this.stage.addChild(BackgroundScoreArea);
        var BackgroundToolBoxArea =
            this.areas.ToolBoxArea.makeShape(Settings.colors.toolBoxAreaBackground);
        this.stage.addChild(BackgroundToolBoxArea);
        this.stage.update();
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
            var area = new LaneArea(
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
                this.laneAreas[i].makeShape(Settings.colors.scoreLaneBackground)
            );
            this.stage.addChild(laneBackgrounds[i]);
        }
    }

    private static drawLaneDelimitLine(): void {
        var lanedelimitLine: createjs.Shape[] = new Array();
        for (var i = 0; i < this.laneAreas.length; i++) {
            var tempAry = this.laneAreas[i].makeDelimitLines(Settings.colors.scoreLaneDelimitLine);
            lanedelimitLine = lanedelimitLine.concat(tempAry);
        }
        for (var i = 0; i < lanedelimitLine.length; i++) {
            this.stage.addChild(lanedelimitLine[i]);
        }
    }

    private static drawBars(): void {
        var pointCursor = this.laneAreas[0].topLeft.copy();
        var laneCursor = 0;
        for (var i = 0; i < this.bars.length; i++) {
            var currentBar = this.bars[i];
            var barHeight = currentBar.beat * this.heightOfBeat;
            if (pointCursor.y + barHeight > this.laneAreas[0].bottomRight.y) {
                if (laneCursor + 1 > this.laneAreas.length - 1) {
                    break;
                } else {
                    laneCursor++;
                    pointCursor = this.laneAreas[laneCursor].topLeft.copy();
                }
            }
            var lineEnd = pointCursor.copy();
            lineEnd.x = this.laneAreas[laneCursor].bottomRight.x;
            var line = new Line(pointCursor, lineEnd);
            var shape = line.makeShape(Settings.colors.scoreLaneDelimitLine);
            this.stage.addChild(shape);
            pointCursor.y += barHeight;
        }
    }

    // 高さとレーンを指定して小節線を描くメソッドを用意したほうが良い
}

App.main();