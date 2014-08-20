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
    stage = new create.Stage(document.getElementById('level05'));

    stage.enableMouseOver();

    var txt = new create.Text(
        "Use the mouse to move the circle.",
        "20px Arial",
        "#ff7700");
    txt.textBaseline = "middle";
    txt.textAlign = "center";
    txt.x = stage.canvas.width / 2;
    txt.y = stage.canvas.height / 2;
    stage.addChild(txt);

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
    var circle = new create.Shape();
    circle.graphics.beginStroke("#000");
    circle.graphics.beginFill("#00FFFF");
    circle.graphics.drawCircle(0, 0, 50);
    circle.x = 640 / 2;
    circle.y = 480 / 2;
    circle.alpha = 0.5;
    circle.name = "Circle";
    stage.addChild(circle);

    circle.cursor = 'pointer';
    circle.addEventListener('mouseover', function (e) {
        circle.alpha = 1;
    });
    circle.addEventListener('mouseout', function (e) {
        circle.alpha = 0.5;
    });
    // if the mouse is down over the circle
    circle.addEventListener('mousedown', function (e) {
        // monitor the pointer's movement in the stage and move the circle
        // accordingly
        stage.addEventListener('stagemousemove', function (e) {
            circle.x = stage.mouseX;
            circle.y = stage.mouseY;
        });
        // monitor when the pointer is released and delete the stage event
        // listeners, the side effect being, the circle stops moving.
        stage.addEventListener('stagemouseup', function (e) {
            e.target.removeAllEventListeners();
        });
    });
    circle.addEventListener('dblclick', function (e){
        alert(e.target.name + ' was double clicked!');
    });
}

return init();
})();
