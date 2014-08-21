(function () {

var stage;

 /* Create a Queue */
function init() {
    loadComplete();
}

function loadComplete() {
    setupStage();
}

/* Setup the Stage and Loop */
function setupStage() {
    // reference to the canvas
    stage = new create.Stage(document.getElementById('canvas'));

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

return init();
})();
