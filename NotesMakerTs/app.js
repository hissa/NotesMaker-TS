var canvas = document.getElementById("canvas");
var stage = new createjs.Stage(canvas);
//rect.beginFill("#CEF4B5");
var circle = new createjs.Shape();
circle.graphics.beginFill("red").drawCircle(0, 0, 40);
circle.x = 400;
circle.y = 200;
stage.addChild(circle);
stage.update();
console.log(canvas);
//# sourceMappingURL=app.js.map