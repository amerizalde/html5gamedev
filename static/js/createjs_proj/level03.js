(function () {

var stage,
    direction = 1,
    speed = 10,
    circle;


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
    stage = new create.Stage(document.getElementById('level03'));
    // create a Ticker that will call stage.update() around 60 times a second
    create.Ticker.setFPS(60);
    create.Ticker.setPaused(false);
    // id, callback function
    create.Ticker.addEventListener("tick", tick);
}

function tick(e) {
    // don't update if paused
    if(!e.paused){
        updateActor();
        renderActor();
        stage.update();
    }
}

/* Add the Actors */
function addActors() {
    circle = new create.Shape();
    circle.graphics.beginStroke("#000");
    circle.graphics.beginFill("#FFF000");
    circle.graphics.drawCircle(0, 0, 50);
    circle.radius = 50;
    circle.x = 100;
    circle.y = 300;

    stage.addChild(circle);
}

function updateActor() {
    var nextX = circle.x + (speed * direction);
    if (nextX > stage.canvas.width - circle.radius) {
        nextX = stage.canvas.width - circle.radius;
        direction *= -1;
    } else if (nextX < circle.radius) {
        nextX = circle.radius;
        direction *= -1;
    }
    circle.nextX = nextX;
}

function renderActor() {
    circle.x = circle.nextX;
}

return init();
})();
