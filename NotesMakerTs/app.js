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
        var laneBackgrounds = new Array();
        for (var i = 0; i <= this.laneAreas.length - 1; i++) {
            laneBackgrounds.push(this.laneAreas[i].makeShape(Settings.colors.scoreLaneBackground));
            this.stage.addChild(laneBackgrounds[i]);
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
    App.drawBars = function () {
        var heightCursor = 0;
        var laneCursor = 0;
        for (var i = 0; i < this.bars.length; i++) {
            var drawEndLine = false;
            var currentBar = this.bars[i];
            var barHeight = currentBar.beat * this.heightOfBeat;
            if (heightCursor + barHeight > this.laneAreas[0].getHeight()) {
                // 小節を閉じる線を描画する
                // breakやレーンが進んだ時にバグるのでここは先にやっておく
                var shape = this.laneAreas[laneCursor].makeBarLineShape(heightCursor, Settings.colors.scoreLaneDelimitLine);
                this.stage.addChild(shape);
                if (laneCursor + 1 > this.laneAreas.length - 1) {
                    break;
                }
                else {
                    laneCursor++;
                    heightCursor = 0;
                }
            }
            if (!(i + 1 < this.bars.length)) {
                drawEndLine = true;
            }
            var lineHeight = heightCursor;
            var shape = this.laneAreas[laneCursor].makeBarLineShape(lineHeight, Settings.colors.scoreLaneDelimitLine);
            this.stage.addChild(shape);
            heightCursor += barHeight;
            if (drawEndLine) {
                // 小節を閉じる線を描画する
                var shape = this.laneAreas[laneCursor].makeBarLineShape(heightCursor, Settings.colors.scoreLaneDelimitLine);
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