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
    stage = new create.Stage(document.getElementById('level08'));

    var domElement = new create.DOMElement("instructions");
    domElement.visible = false;
    domElement.alpha = 0;
    domElement.x = stage.canvas.width / 2;
    domElement.y = 200;
    domElement.visible = true;
    stage.addChild(domElement);
    create.Tween.get(domElement)
                .wait(1000)
                .to({y: 40, alpha: 1}, 2000, create.Ease.quadOut);

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
