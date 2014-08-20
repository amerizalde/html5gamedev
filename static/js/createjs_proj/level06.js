(function () {

var stage,
    shapes = [],
    slots = [],
    score = 0;

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
    stage = new create.Stage(document.getElementById('level06'));

    stage.enableMouseOver();

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
    addShapes();
    addBlocks();
}

function addShapes () {
    var colors = ['blue', 'red', 'green', 'yellow'];
    var i, shape, slot;
    for (i = 0; i < colors.length; i++) {
        slot = new create.Shape();
        slot.graphics.beginStroke(colors[i]);
        slot.graphics.beginFill('#fff');
        slot.graphics.drawRect(0, 0, 100, 100);
        slot.regX = slot.regY = 50;
        slot.key = i;
        slot.y = 80;
        slot.x = (i * 130) + 100;

        stage.addChild(slot);
        slots.push(slot);

        shape = new create.Shape();
        shape.graphics.beginFill(colors[i]);
        shape.graphics.drawRect(0, 0, 100, 100);
        shape.regX = shape.regY = 50;
        shape.key = i;
        shapes.push(shape);
    }
}

function addBlocks () {
    var i, r, shape;
    var theLength = shapes.length;
    for (i = 0; i < theLength; i++) {
        r = Math.floor(Math.random() * shapes.length);
        shape = shapes[r];
        shape.homeY = 320;
        shape.homeX = (i * 130) + 100;
        shape.y = shape.homeY;
        shape.x = shape.homeX;
        shape.addEventListener("mousedown", startDrag);

        stage.addChild(shape);
        shapes.splice(r, 1);
    }
}

function startDrag (e) {
    var shape = e.target,
        slot = slots[shape.key];

    stage.setChildIndex(shape, stage.getNumChildren() - 1);
    stage.addEventListener('stagemousemove', function (e) {
        shape.x = e.stageX;
        shape.y = e.stageY;
    });

    stage.addEventListener('stagemouseup', function (e) {
        stage.removeAllEventListeners();
        var pt = slot.globalToLocal(stage.mouseX, stage.mouseY);
        if (shape.hitTest(pt.x, pt.y)) {
            shape.removeEventListener("mousedown", startDrag);
            score++;
            create.Tween.get(shape)
                    .to({x: slot.x, y: slot.y}, 200, create.Ease.quadOut)
                    .call(checkGame);
        } else {
            create.Tween.get(shape)
                .to({x: shape.homeX, y: shape.homeY}, 200, create.Ease.quadOut);
        }
    });
}

function checkGame() {
    if (score == 4) {
        alert("You Win!");
    }
}

return init();
})();
