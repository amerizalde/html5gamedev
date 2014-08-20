(function () {

const LOADER_WIDTH = 400;

var stage, loaderBar, loadInterval,
    percentLoaded = 0;


 /* Create a Queue */
function init() {
    loadComplete();
}

function loadComplete() {
    setupStage();
    addActors();
    startLoad();
}

/* Setup the Stage and Loop */
function setupStage() {
    // reference to the canvas
    stage = new create.Stage(document.getElementById('level04'));
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
    loaderBar = new create.Shape();
    loaderBar.x = loaderBar.y = 100;
    loaderBar.graphics.setStrokeStyle(2);
    loaderBar.graphics.beginStroke("#000");
    loaderBar.graphics.drawRect(0, 0, LOADER_WIDTH, 40);
    stage.addChild(loaderBar);
}

function updateActor() {
    // draw a filled rect to signify the percent complete
    loaderBar.graphics.clear();
    loaderBar.graphics.beginFill('#00ff00');
    loaderBar.graphics.drawRect(0, 0, LOADER_WIDTH * percentLoaded, 40);
    loaderBar.graphics.endFill();
    // draw the original empty rect to signify the incomplete portion.
    loaderBar.graphics.setStrokeStyle(2);
    loaderBar.graphics.beginStroke('#000');
    loaderBar.graphics.drawRect(0, 0, LOADER_WIDTH, 40);
    loaderBar.graphics.endStroke();
}

function startLoad () {
    loadInterval = window.requestInterval(updateLoad, 50);
}

function updateLoad () {
    percentLoaded += .005;
    updateActor();
    if (percentLoaded >= 1) {
        window.clearRequestInterval(loadInterval);
        stage.removeChild(loaderBar);
    }
}

return init();
})();
