(function () {

var stage,
    paddle,
    leftKeyDown = rightKeyDown = false;

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
    stage = new create.Stage(document.getElementById('level07'));

    var txt = new create.Text(
        "Left arrow || Right arrow to move paddle.",
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
        update();
        render();
        stage.update();
    }
}

/* Add the Actors */
function addActors() {
    addPaddle();
}

function addPaddle () {
    paddle = new create.Shape();
    paddle.width = 100;
    paddle.graphics.beginFill("#0000FF").drawRect(0, 0, paddle.width, 20);
    paddle.x = paddle.nextX = 0;
    paddle.y = stage.canvas.height - 20;
    stage.addChild(paddle);

    window.onkeydown = movePaddle;
    window.onkeyup = stopPaddle;
}

function movePaddle (e) {
    e = !e ? window.event : e;
    if (e.keyCode === KEY_LEFT) leftKeyDown = true;
    else if (e.keyCode === KEY_RIGHT) rightKeyDown = true;
}

function stopPaddle (e) {
    e = !e ? window.event: e;
    if (e.keyCode === KEY_LEFT) leftKeyDown = false;
    else if (e.keyCode === KEY_RIGHT) rightKeyDown = false;
}

function update () {
    var nextX = paddle.x;
    var bounds = [0, stage.canvas.width - paddle.width];
    if (leftKeyDown) {
        nextX = paddle.x - 10;
        if (nextX < bounds[0]) {
            nextX = bounds[0];
        }
    } else if (rightKeyDown) {
        nextX = paddle.x + 10;
        if (nextX > bounds[1]) {
            nextX = bounds[1];
        }
    }
    paddle.nextX = nextX;
}
function render () {
    paddle.x = paddle.nextX;
}

return init();
})();
