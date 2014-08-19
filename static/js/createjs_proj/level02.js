(function () {

var stage;

 /* Create a Queue */
function init() {
    loadComplete();
}

function loadComplete() {
    setupStage();
    addActors();
}

/* Setup the Stage and Loop */
function setupStage() {
    // reference to the canvas
    stage = new create.Stage(document.getElementById('level02'));
    // create a Ticker that will call stage.update() around 60 times a second
    create.Ticker.setFPS(60);
    create.Ticker.setPaused(false);
    // id, callback function
    create.Ticker.addEventListener("tick", tick);
}

function tick(e) {
    // don't update if paused
    if(!e.paused){
        stage.update();
    }
}

/* Add the Actors */
function addActors() {
    // draw a red square
    var g = new create.Graphics().beginStroke("#000")
                                    .beginFill("#FF0000")
                                    .drawRect(0, 0, 100, 100);
    // attach it to a Shape container
    var square = new create.Shape(g);
    square.x = square.y = 100;
    // add the square Shape to the canvas
    stage.addChild(square);

    // another way
    var circle = new create.Shape();
    circle.graphics.beginStroke("#000");
    circle.graphics.beginFill("#00FFFF");
    circle.graphics.drawCircle(0, 0, 50);
    circle.x = 250;
    circle.y = 70;
    stage.addChild(circle);

    // star
    var poly = new create.Shape();
    poly.graphics.beginStroke("#000");
    poly.graphics.beginFill("#FF00FF");
    poly.graphics.drawPolyStar(0, 0, 60, 6, 0.6);
    poly.x = 480;
    poly.y = 70;
    stage.addChild(poly);

    // lines
    var tri = new create.Shape();
    tri.graphics.beginStroke("#000");
    tri.graphics.beginFill("#00FF00");
    console.log(stage);
    tri.graphics.moveTo(stage.canvas.clientWidth / 2, stage.canvas.clientHeight / 2)
        .lineTo(0, stage.canvas.clientHeight / 2)
        .lineTo(100, 100)
        .lineTo(stage.canvas.clientWidth / 2, stage.canvas.clientHeight / 2);
    tri.x = 20;
    tri.y = 150;
    stage.addChild(tri);

}

return init();
})();
