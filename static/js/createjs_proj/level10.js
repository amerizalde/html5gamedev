(function () {

const WALL_THICKNESS = 20,
      PADDLE_WIDTH = 100,
      PADDLE_SPEED = 16,
      PUCK_SPEED = 5,
      PADDLE_HITS_FOR_NEW_LEVEL = 5,
      SCORE_BOARD_HEIGHT = 50;

var stage,
    canvas,
    paddle,
    puck,
    board,
    scoreTxt,
    livesTxt,
    messageTxt,
    messageInterval,
    leftWall,
    rightWall,
    ceiling,
    floor;

var leftKeyDown = false,    // state switches
    rightKeyDown = false,   // state switches
    bricks = [],            // hold a reference to the board of bricks
    paddleHits = 0,         // used to determine when the next level is needed
    combo = 0,              // for scoring multiplier
    lives = 5,
    score = 0,
    level = 0,
    gameRunning = true,
    levels = [
        {color: '#705000', points: 1},
        {color: '#743fab', points: 2},
        {color: '#4f5e04', points: 3},
        {color: '#1b5b97', points: 4},
        {color: '#c6c43b', points: 5},
        {color: '#1a6d68', points: 6},
        {color: '#aa7223', points: 7},
        {color: '#743fab', points: 8},
        {color: '#4f5e04', points: 9},
        {color: '#1b5b97', points: 10},
        {color: '#c6c43b', points: 11},
        {color: '#1a6d68', points: 12}
    ];

 /* Create a Queue */
function init() {
    loadComplete();
}

function loadComplete() {
    setupStage();
    newGame();
}

/* Setup the Stage and Loop */
function setupStage() {
    // reference to the canvas
    canvas = document.getElementById('level10');
    stage = new create.Stage(canvas);

    // create a Ticker that will call stage.update() around 60 times a second
    create.Ticker.setFPS(60);
    create.Ticker.setPaused(false);
    // id, callback function
    create.Ticker.addEventListener("tick", tick);
}

function tick(e) {
    // don't update if paused
    if(!e.paused){
        runGame();
        stage.update();
    }
}

// ------- SETUP functions ---------
function newGame () {
    buildWalls();
    buildMessageBoard();
    buildPaddle();
    buildPuck();
    setControls();
    newLevel();
    newLevel();
    console.log("debug: setup complete");
}

function buildWalls () {
    var wall = new create.Shape();
    wall.graphics.beginFill("#333");
    wall.graphics.drawRect(0, 0, WALL_THICKNESS, canvas.height);
    stage.addChild(wall);

    wall = new create.Shape();
    wall.graphics.beginFill("#333");
    wall.graphics.drawRect(0, 0, WALL_THICKNESS, canvas.height);
    wall.x = canvas.width - WALL_THICKNESS;
    stage.addChild(wall);

    wall = new create.Shape();
    wall.graphics.beginFill("#333");
    wall.graphics.drawRect(0, 0, canvas.width, WALL_THICKNESS);
    stage.addChild(wall);

    leftWall = WALL_THICKNESS;
    rightWall = canvas.width - WALL_THICKNESS;
    ceiling = WALL_THICKNESS;
}

function buildMessageBoard () {
    board = new create.Shape();
    board.graphics.beginFill("#333");
    board.graphics.drawRect(0, 0, canvas.width, SCORE_BOARD_HEIGHT);
    board.y = canvas.height - SCORE_BOARD_HEIGHT;
    stage.addChild(board);

    livesTxt = new create.Text('lives: ' + lives, '20px Times', '#fff');
    livesTxt.y = board.y + 10;
    livesTxt.x = WALL_THICKNESS;
    stage.addChild(livesTxt);

    scoreTxt = new create.Text('score: ' + score, '20px Times', '#fff');
    scoreTxt.textAlign = 'right';
    scoreTxt.y = board.y + 10;
    scoreTxt.x = canvas.width - WALL_THICKNESS;
    stage.addChild(scoreTxt);
    messageTxt = new create.Text('Press spacebar to pause.', '18px Times', '#fff');
    messageTxt.textAlign = 'center';
    messageTxt.y = board.y + 10;
    messageTxt.x = canvas.width / 2;
    stage.addChild(messageTxt);
}

function buildPaddle () {
    paddle = new create.Shape();
    paddle.width = PADDLE_WIDTH;
    paddle.height = 20;
    paddle.graphics.beginFill("#3e6dc0")
                    .drawRect(0, 0, paddle.width, paddle.height);
    paddle.nextX = 0;
    paddle.x = 20;
    paddle.y = canvas.height - paddle.height - SCORE_BOARD_HEIGHT;
    stage.addChild(paddle);
}

function buildPuck () {
    puck = new create.Shape();
    puck.graphics.beginFill("#FFFFFF")
                 .drawRect(0, 0, 10, 10);
    puck.width = 10;
    puck.height = 10;
    puck.x = canvas.width - 100;
    puck.y = 160;
    puck.velX = PUCK_SPEED;
    puck.velY = PUCK_SPEED;
    puck.isAlive = true;
    stage.addChild(puck);
}

function setControls () {
    window.onkeydown = handleKeyDown;
    window.onkeyup = handleKeyUp;
}

function handleKeyDown (e) {
    switch (e.keyCode) {
        case KEY_LEFT:
            leftKeyDown = true;
            break;
        case KEY_RIGHT:
            rightKeyDown = true;
            break;
    }
}

function handleKeyUp (e) {
    switch (e.keyCode) {
        case KEY_LEFT:
            leftKeyDown = false;
            break;
        case KEY_RIGHT:
            rightKeyDown = false;
            break;
        case KEY_SPACE:
            if (gameRunning) {
                create.Ticker.setPaused(create.Ticker.getPaused() ? false : true);
            } else {
                resetGame();
            }
            break;
    }
}

function newLevel () {
    var i, brick, freeLifeTxt;
    var data = levels[level],
        xPos = WALL_THICKNESS,
        yPos = WALL_THICKNESS,
        freeLife = Math.round(Math.random() *20),
    paddleHits = 0;

    shiftBricksDown();

    for (i = 0; i < 20; i++) {
        brick = new create.Shape();
        brick.graphics.beginFill(i === freeLife ? '#009900' : data.color);
        brick.graphics.drawRect(0, 0, 76, 20);
        brick.graphics.endFill();
        brick.width = 76;
        brick.height = 20;
        brick.x = xPos;
        brick.y = yPos;
        brick.points = data.points;
        brick.freeLife = false;

        bricks.push(brick);
        stage.addChild(brick);

        // add text into block position
        if (i === freeLife) {
            freeLifeTxt = new create.Text('1UP', '12px Times', '#fff');
            freeLifeTxt.x = brick.x + (brick.width / 2);
            freeLifeTxt.y = brick.y + 4;
            freeLifeTxt.width = brick.width;
            freeLifeTxt.textAlign = 'center';
            brick.freeLife = freeLifeTxt;
            stage.addChild(freeLifeTxt);
        }
        xPos += 76;
        if (xPos > (brick.width * 10)) {
            xPos = WALL_THICKNESS;
            yPos += brick.height;
        }
        level++;
        if (level === levels.length) {
            level--;
        }
    }
}

function shiftBricksDown () {
    var i, brick;
    var shiftHeight = 80,
        len = bricks.length;
    for (i = 0; i < len; i++) {
        brick = bricks[i];
        brick.y += shiftHeight;
        if (brick.freeLife) brick.freeLife.y += shiftHeight;
    }
}

// ------ LOOP functions -------
function runGame () {
    update();
    render();
    evalPuck();
    evalGame();
}

function update () {
    updatePaddle();
    updatePuck();
    checkPaddle();
    checkBricks();
}

function render () {}
function evalPuck () {}
function evalGame () {}
function resetGame () {}

function updatePaddle () {}
function updatePuck () {}
function checkPaddle () {}
function checkBricks () {}

return init();
})();
