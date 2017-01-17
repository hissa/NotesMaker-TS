/// <reference path="scripts/bar.ts" />
/// <reference path="scripts/note.ts" />
/// <reference path="scripts/line.ts" />
/// <reference path="scripts/point.ts" />
/// <reference path="scripts/area.ts" />
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
        for (var i = 0; i <= 12; i++) {
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
        var BackgroundMenuBar = this.makeBackgroundShape(this.areas.menuBar, Settings.colors.menuBarBackground);
        this.stage.addChild(BackgroundMenuBar);
        var BackgroundScoreArea = this.makeBackgroundShape(this.areas.ScoreArea, Settings.colors.scoreAreaBackground);
        this.stage.addChild(BackgroundScoreArea);
        var BackgroundToolBoxArea = this.makeBackgroundShape(this.areas.ToolBoxArea, Settings.colors.toolBoxAreaBackground);
        this.stage.addChild(BackgroundToolBoxArea);
        this.stage.update();
    };
    App.makeBackgroundShape = function (area, color) {
        var shape = new createjs.Shape();
        shape.graphics.beginFill(color).
            drawRect(area.topLeft.x, area.topLeft.y, area.getWidth(), area.getHeight());
        return shape;
    };
    App.makeLineShape = function (line, wight, color) {
        var shape = new createjs.Shape();
        shape.graphics.beginStroke(color);
        shape.graphics.moveTo(line.a.x, line.a.y);
        shape.graphics.lineTo(line.b.x, line.b.y);
        return shape;
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
            var area = new Area(new Point(pointCursorX + lanePadding, top), new Point(pointCursorX + lanePadding + this.laneWidth, top + height));
            this.laneAreas.push(area);
            pointCursorX = area.bottomRight.x;
        }
    };
    App.drawLanes = function () {
        var laneBackgrounds = new Array();
        for (var i = 0; i <= this.laneAreas.length - 1; i++) {
            laneBackgrounds.push(this.makeBackgroundShape(this.laneAreas[i], Settings.colors.scoreLaneBackground));
            this.stage.addChild(laneBackgrounds[i]);
        }
    };
    App.drawLaneDelimitLine = function () {
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
    };
    App.drawBars = function () {
        var pointCursor = this.laneAreas[0].topLeft.copy();
        var laneCursor = 0;
        for (var i = 0; i < this.bars.length; i++) {
            var currentBar = this.bars[i];
            var barHeight = currentBar.beat * this.heightOfBeat;
            if (pointCursor.y + barHeight > this.laneAreas[0].bottomRight.y) {
                if (laneCursor + 1 > this.laneAreas.length - 1) {
                    break;
                }
                else {
                    laneCursor++;
                    pointCursor = this.laneAreas[laneCursor].topLeft.copy();
                }
            }
            var lineEnd = pointCursor.copy();
            lineEnd.x = this.laneAreas[laneCursor].bottomRight.x;
            var line = new Line(pointCursor, lineEnd);
            var shape = this.makeLineShape(line, 1, Settings.colors.scoreLaneDelimitLine);
            this.stage.addChild(shape);
            pointCursor.y += barHeight;
        }
    };
    App.laneWidth = 150;
    App.heightOfBeat = 25;
    return App;
}());
App.main();
//# sourceMappingURL=app.js.map