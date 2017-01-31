/// <reference path="scripts/bar.ts" />
/// <reference path="scripts/note.ts" />
/// <reference path="scripts/line.ts" />
/// <reference path="scripts/point.ts" />
/// <reference path="scripts/area.ts" />
/// <reference path="scripts/lanearea.ts" />
/// <reference path="scripts/applicationerror.ts" />
/// <reference path="scripts/settings.ts" />
var App = (function () {
    function App() {
    }
    App.main = function () {
        this.initialize();
        this.setAreas();
        this.drawBackgrounds();
        this.dicideLaneArea();
        this.drawLanes();
        this.drawLaneDelimitLine();
        this.drawBars();
        this.stage.update();
    };
    App.initialize = function () {
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
        for (var i = 0; i < 12; i++) {
            this.bars.push(new Bar());
        }
    };
    App.setAreas = function () {
        this.areas.menuBar =
            new Area(Point.zero(), new Point(this.canvasArea.getWidth(), this.viewSettings.heightOfMenuBar));
        this.areas.ScoreArea =
            new Area(new Point(0, this.viewSettings.heightOfMenuBar), new Point(this.canvasArea.getWidth() - this.viewSettings.weightOfToolBar, this.canvasArea.getHeight()));
        this.areas.ToolBoxArea =
            new Area(new Point(this.canvasArea.getWidth() - this.viewSettings.weightOfToolBar, this.viewSettings.heightOfMenuBar), new Point(this.canvasArea.getWidth(), this.canvasArea.getHeight()));
    };
    App.drawBackgrounds = function () {
        var BackgroundMenuBar = this.areas.menuBar.makeShape(Settings.colors.menuBarBackground);
        this.stage.addChild(BackgroundMenuBar);
        var BackgroundScoreArea = this.areas.ScoreArea.makeShape(Settings.colors.scoreAreaBackground);
        this.stage.addChild(BackgroundScoreArea);
        var BackgroundToolBoxArea = this.areas.ToolBoxArea.makeShape(Settings.colors.toolBoxAreaBackground);
        this.stage.addChild(BackgroundToolBoxArea);
        this.stage.update();
    };
    App.dicideLaneArea = function () {
        var lanePadding = this.laneWidth * (1 / 5);
        this.laneAreas = new Array();
        var top = this.areas.ScoreArea.topLeft.y + lanePadding;
        var height = this.areas.ScoreArea.bottomRight.y - top * 2;
        var pointCursorX = this.areas.ScoreArea.topLeft.x;
        while (true) {
            if (pointCursorX + lanePadding + this.laneWidth >= this.areas.ScoreArea.bottomRight.x) {
                break;
            }
            var area = new LaneArea(new Point(pointCursorX + lanePadding, top), new Point(pointCursorX + lanePadding + this.laneWidth, top + height));
            this.laneAreas.push(area);
            pointCursorX = area.bottomRight.x;
        }
    };
    App.drawLanes = function () {
        console.log(this.laneAreas[0].topLeft);
        var clickEventHandler = function (e) {
            console.log(e.stageX, e.stageY);
        };
        var laneBackgrounds = new Array();
        for (var i = 0; i <= this.laneAreas.length - 1; i++) {
            laneBackgrounds.push(this.laneAreas[i].makeShape(Settings.colors.scoreLaneBackground));
            this.stage.addChild(laneBackgrounds[i]);
            laneBackgrounds[i].on("click", clickEventHandler);
        }
    };
    App.drawLaneDelimitLine = function () {
        var lanedelimitLine = new Array();
        for (var i = 0; i < this.laneAreas.length; i++) {
            var tempAry = this.laneAreas[i].makeDelimitLines(Settings.colors.scoreLaneDelimitLine);
            lanedelimitLine = lanedelimitLine.concat(tempAry);
        }
        for (var i = 0; i < lanedelimitLine.length; i++) {
            this.stage.addChild(lanedelimitLine[i]);
        }
    };
    App.disideBars = function () {
        var heightCursor = 0;
        var laneCursor = 0;
        for (var i = 0; i < this.bars.length; i++) {
            var barHeight = this.bars[i].beat * this.heightOfBeat;
            // これ以上小節を描画できない場合は終了するか、次のレーンに移る。
            if (this.laneAreas[laneCursor].getHeight() < heightCursor + barHeight) {
                if (laneCursor + 1 > this.laneAreas.length - 1) {
                    break;
                }
                else {
                    laneCursor++;
                    heightCursor = 0;
                }
            }
            var currentLane = this.laneAreas[laneCursor];
            var beginY = currentLane.getHeightFromBottom(heightCursor);
            var endY = currentLane.getHeightFromBottom(heightCursor + barHeight);
            var topLeft = new Point(currentLane.getLeft(), beginY);
            var bottomRight = new Point(currentLane.getRight(), endY);
            this.bars[i].area = new Area(topLeft, bottomRight);
            this.bars[i].lane = currentLane;
            heightCursor += barHeight;
        }
    };
    App.drawBars = function () {
        this.disideBars();
        for (var i = 0; i < this.bars.length; i++) {
            if (this.bars[i].area != null) {
                var drawHeight = this.bars[i].lane.publicPointToLocalPoint(this.bars[i].area.bottomRight).y;
                var shape = this.bars[i].lane.makeBarLineShape(drawHeight, Settings.colors.scoreLaneDelimitLine);
                this.stage.addChild(shape);
            }
        }
    };
    App.laneWidth = 150;
    App.heightOfBeat = 30;
    return App;
}());
App.main();
//# sourceMappingURL=app.js.map