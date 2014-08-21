(function () {

var stage, livesTxt, gameOverTxt, win;
var answer = "CREATEJS IS&AWESOME",
    abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lives = 5,
    lettersNeeded = 0;  // counter

 /* Create a Queue */
function init() {
    loadComplete();
}

function loadComplete() {
    setupStage();
    drawBoard();
    drawLetters();
    drawMessages();
}

/* Setup the Stage and Loop */
function setupStage() {
    // reference to the canvas
    stage = new create.Stage(document.getElementById('level09'));

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

function drawBoard () {
    // declare all variables you will use in the function before using them
    // not required, but highly recommended
    var i, c, box;
    var xPos = 20,  // start position for first box
        yPos = 90;
    for (i = 0; i < answer.length; i++) {
        c = answer[i];
        // draw a box per character, skipping any spaces
        // line breaks are handled in the next block
        if (c != " " && c != "&") {
            lettersNeeded++;
            box = new create.Shape();
            box.graphics.beginStroke("#000");
            box.graphics.drawRect(0, 0, 20, 24);
            box.regX = 10;
            box.regY = 12;
            box.x = xPos;
            box.y = yPos;
            box.name = 'box_' + i;
            box.key = c;
            stage.addChild(box);
        }

        xPos += 26;
        // line break
        if (c === '&') {
            yPos += 40;
            xPos = 20;
        }
    }
}

function drawMessages () {
    var txt = new create.Text("WORD GAME", "26px Arial");
    txt.color = "#990000";
    txt.x = txt.y = 10;
    stage.addChild(txt);

    livesTxt = new create.Text("LIVES: " + lives, "16px Arial");
    livesTxt.textAlign = 'right';
    livesTxt.y = 16;
    livesTxt.x = stage.canvas.width - 10;
    stage.addChild(livesTxt);
}

function drawLetters () {
    // draw the alphabet pool
    var i, c, txt, btn;
    var cnt = 0,
        xPos = 20,
        yPos = 200;
    for (i = 0; i < abc.length; i++) {
        c = abc[i];
        btn = new create.Shape();
        btn.graphics.beginFill("#000");
        btn.graphics.beginStroke("#000");
        btn.graphics.drawRect(0, 0, 20, 24);
        btn.regX = 10;
        btn.regY = 12;
        btn.x = xPos;
        btn.y = yPos;
        stage.addChild(btn);

        txt = new create.Text(c);
        txt.color = "#FFF";
        txt.textAlign = 'center';
        txt.textBaseline = 'middle';
        txt.x = xPos;
        txt.y = yPos;
        stage.addChild(txt);

        // add pointer interaction
        btn.txt = txt;
        btn.addEventListener('click', onLetterClick);

        xPos += 24;
        cnt++;
        if (cnt === 13) {
            yPos += 30;
            xPos = 20;
        }
    }
}

function onLetterClick (e) {
    var btn = e.target,
        txt = btn.txt;
    btn.removeEventListener('click', onLetterClick);
    checkForMatches(txt);
    checkGame();
}

function checkForMatches (txt) {
    // check if the letter chosen is a match.
    var i, c, box, txtClone;
    var letter = txt.text,
        match = false,
        len = answer.length;

    for (i = 0; i < len; i++) {
        c = answer[i];
        if (c === " " || c == '&') {
            continue;
        }
        // check every box, if the letter matches the key of that box,
        // clone the letter to that box (the reveal!).
        box = stage.getChildByName('box_' + i);
        if (box.key === letter) {
            lettersNeeded--;
            match = true;
            txtClone = txt.clone();
            txtClone.color = "#000";
            txtClone.x = box.x;
            txtClone.y = box.y;
            stage.addChild(txtClone);
        }
    }
    // remove the letter from the pool
    stage.removeChild(txt);
    // if there was no match, lose a life.
    if (!match) {
        lives--;
        livesTxt.text = "LIVES: " + lives;
    }
}

function checkGame () {
    if (lettersNeeded === 0) {
        win = true;
        gameOver();
    } else if (lives === 0) {
        win = false;
        gameOver();
    }
}

function gameOver () {
    stage.removeAllChildren();
    var msg = win ? "YOU WIN!" : "YOU LOSE.";
    gameOverTxt = new create.Text(msg, "36px Arial");
    gameOverTxt.alpha = 0;
    gameOverTxt.color = win ? 'blue' : 'red';
    gameOverTxt.textAlign = 'center';
    gameOverTxt.textBaseline = 'middle';
    gameOverTxt.x = stage.canvas.width / 2;
    gameOverTxt.y = stage.canvas.height / 2;
    stage.addChild(gameOverTxt);
    create.Tween.get(gameOverTxt).to({alpha: 1}, 1000);
}

return init();
})();
