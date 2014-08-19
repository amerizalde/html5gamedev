(function () {

var stage;
var queue;

 /* Create a Queue */
function init() {
    queue = new createjs.LoadQueue();
    queue.installPlugin(create.Sound);
    // id, callback function
    queue.addEventListener("complete", loadComplete);
    queue.loadManifest([
        {id: "ufo", src: '/static/assets/testingGrounds/ufoRed.png'},
    ]);
}

function loadComplete() {
    setupStage();
    buildUfos();
}

/* Setup the Stage and Loop */
function setupStage() {
    // reference to the canvas
    stage = new create.Stage(document.getElementById('level01'));
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
function buildUfos() {
    var img = queue.getResult("ufo");
    var i, sound, ufo;
    for (i = 0; i < 3; i++) {
        // sprite from image
        ufo = new create.Bitmap(img);
        ufo.x = i * 200;
        // add sprite to stage
        stage.addChild(ufo);
        // animate the sprite
        create.Tween.get(ufo)
                    .wait(i * 1000)
                    .to({y : 480}, 1000, create.Ease.quadOut)
                    .call(ufoComplete);
        // is saving a reference to the sound necessary here?
        sound = create.Sound.play('woosh', create.Sound.INTERRUPT_NONE, i * 1000);
    }
}

function ufoComplete() {
    stage.removeChild(this);
    if (!stage.getNumChildren()) {
        create.Sound.play('chime');
    }
}

return init();
})();
