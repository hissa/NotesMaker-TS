/// <reference path="scripts/point.ts" />
/// <reference path="scripts/area.ts" />
var App = (function () {
    function App() {
    }
    App.main = function () {
        this.initialize();
        this.setAreas();
        this.drawBackgrounds();
        this.dicideLaneArea();
        this.drawLanes();
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
        var BackgroundMenuBar = this.makeBackgroundShape(this.areas.menuBar, "gray");
        this.stage.addChild(BackgroundMenuBar);
        var BackgroundScoreArea = this.makeBackgroundShape(this.areas.ScoreArea, "PaleTurquoise");
        this.stage.addChild(BackgroundScoreArea);
        var BackgroundToolBoxArea = this.makeBackgroundShape(this.areas.ToolBoxArea, "green");
        this.stage.addChild(BackgroundToolBoxArea);
        this.stage.update();
    };
    App.makeBackgroundShape = function (area, color) {
        var shape = new createjs.Shape();
        shape.graphics.beginFill(color).
            drawRect(area.topLeft.x, area.topLeft.y, area.getWidth(), area.getHeight());
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
            laneBackgrounds.push(this.makeBackgroundShape(this.laneAreas[i], "gray"));
            this.stage.addChild(laneBackgrounds[i]);
        }
    };
    App.dicideDelimitLine = function () {
    };
    App.laneWidth = 100;
    return App;
}());
App.main();
//# sourceMappingURL=app.js.map