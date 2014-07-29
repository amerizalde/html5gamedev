// create a Game object
BasicGame.Game = function (game) {

  this.dummy = null;
  this.previewBox = null;
  this.framesGroup = null;
  this.spritesheet = null;
  this.fps = 24;
  this.resetPreviewArray = false;
  this.previewState = false;
  this.gameOver = false;

};

BasicGame.Game.prototype = {
  preload: function () {
    var frameWidth = Math.floor(spriteData.width / spriteData.columns);
    var frameHeight = Math.floor(spriteData.height / spriteData.rows);
    this.load.spritesheet(
      'previewData',
      spriteData.img.src,
      frameWidth,
      frameHeight);
    this.spritesheet = 'previewData';
    // console.log(this.cache);
  },

  // built-in create function
  create: function () {
    // sprites are loaded in the order added here.

    // previewBox is used for positioning the animation preview.
    this.previewBox = new Phaser.Rectangle(
      this.camera.view.centerX,
      this.camera.view.height - 200,
      100, 100);
    this.previewBox.anchor = {'x': 0.5, 'y': 0.5};

    // this contains the spritesheet key
    // this.spritesheet = 'p1_walk';

    // this determines the order of frames played
    this.previewArray = [0,];

    this.setupText();
    this.setupButtons();
    this.setupFramesManager(this.spritesheet);
    // show something to start
    this.preview();

  },

  setupFramesManager: function (atlas) {
    if (this.framesGroup) {
      this.framesGroup.destroy();
    }
    this.framesGroup = this.add.group();
    // retrieve the atlas from the cache, to access the frames directly.
    var data = this.cache.getFrameData(atlas);
    console.log(data);
    var img;
    // a cursor
    var cx = 0;
    var cy = 0;
    for (var i = 0; i < data._frames.length; i++) {
      // determine the x, y to set the next frame at
      if (cx >= this.game.width - data._frames[i].width) {
        cx = 0;
        cy += data._frames[i].height;
      }
      // create the next frame sprite
      img = this.add.sprite(cx, cy, atlas, data._frames[i].index);
      img.inputEnabled = true;
      img.health = 0; // used as a counter.
      this.addLabel(img, img.health.toString(), "18px", "center");
      // add a callback that fires when this frame is clicked.
      img.events.onInputDown.add(this.use, img);
      this.framesGroup.add(img);
      // move the cursor
      cx += img.width;
    }
  },

  setupButtons: function () {
    // preview button
    this.previewBtn = this.add.sprite(
      this.game.width / 2,
      this.game.height / 2,
      'gui',
      "buttonSquare_grey.png");
    this.addLabel(this.previewBtn, "Play", "14px", "center", 0.5);
    this.previewBtn.anchor = {'x': 0.5, 'y': 0.5};
    this.previewBtn.inputEnabled = true;
    this.previewBtn.events.onInputDown.add(this.onDownFix, this.previewBtn);
    this.previewBtn.events.onInputDown.add(this.callPreview, this.previewBtn);
    this.previewBtn.events.onInputUp.add(this.onUpFix, this.previewBtn);
    this.previewBtn.events.onInputOver.add(this.onOverFix, this.previewBtn);
    this.previewBtn.events.onInputOut.add(this.onOutFix, this.previewBtn);

    // reset button
    this.resetBtn = this.add.sprite(
      this.game.width / 2 + this.previewBtn.width,
      this.game.height / 2,
      'gui',
      "buttonSquare_grey.png");
    this.addLabel(this.resetBtn, "Reset", "14px", "center", 0.5);
    this.resetBtn.anchor = {'x': 0.5, 'y': 0.5};
    this.resetBtn.inputEnabled = true;
    this.resetBtn.events.onInputDown.add(this.onDownFix, this.resetBtn);
    this.resetBtn.events.onInputDown.add(this.callResetPreview, this.resetBtn);
    this.resetBtn.events.onInputUp.add(this.onUpFix, this.resetBtn);
    this.resetBtn.events.onInputOver.add(this.onOverFix, this.resetBtn);
    this.resetBtn.events.onInputOut.add(this.onOutFix, this.resetBtn);

    // quit button
    this.quitBtn = this.add.sprite(
      this.game.width / 2 + this.previewBtn.width + this.resetBtn.width,
      this.game.height / 2,
      'gui',
      "buttonSquare_grey.png");
    this.addLabel(this.quitBtn, "Done", "14px", "center", 0.5);
    this.quitBtn.anchor = {'x': 0.5, 'y': 0.5};
    this.quitBtn.inputEnabled = true;
    this.quitBtn.events.onInputDown.add(this.onDownFix, this.quitBtn);
    this.quitBtn.events.onInputDown.add(this.callQuit, this.quitBtn);
    this.quitBtn.events.onInputUp.add(this.onUpFix, this.quitBtn);
    this.quitBtn.events.onInputOver.add(this.onOverFix, this.quitBtn);
    this.quitBtn.events.onInputOut.add(this.onOutFix, this.quitBtn);

  },

  setupText: function () {
    this.add.text(
      10,
      this.previewBox.centerY - 20,
      "Frame Order:",
      {font: "16px Droid Sans Mono", fill: "#fff", align: "left"});
    // show the current animation frame order to the user.
    this.codeAssistText = this.add.text(
      10,
      this.previewBox.centerY,
      this.previewArray,
      {font: "16px Droid Sans Mono", fill: "#fff", align: "left"});
  },

  // these helpers create 'buttons' out of sprites
  onUpFix: function (btn) {
    btn.frameName = "buttonSquare_grey.png";
  },
  onDownFix: function (btn) {
    btn.frameName = "buttonSquare_grey_pressed.png";
  },
  onOverFix: function (btn) {
    btn.frameName = "buttonSquare_grey_over.png";
  },
  onOutFix: function (btn) {
    btn.frameName = "buttonSquare_grey.png";
  },

  // add the frame's index to the previewArray
  use: function(ctx) {
    var frames = ctx.game.state.callbackContext.previewArray;
    ctx.health += 1;
    // the label
    ctx.children[0].text = ctx.health.toString();
    frames.push(parseInt(ctx._frame.index));
    ctx.game.state.callbackContext.previewArray = frames;
  },

  // create an animation from the spritesheet using the frame order
  // in the previewArray
  preview: function () {
    // create a reusable sprite for the animation preview
    if (this.dummy) {
      this.dummy.animations.stop();
      this.dummy.animations.currentAnim.destroy();
    } else {
      this.dummy = this.add.sprite(
        this.previewBox.x,
        this.previewBox.y,
        this.spritesheet
      );
    }
    // update the animation
    this.dummy.animations.add(
      'preview',
      this.previewArray,
      this.fps,
      true,
      true
    );
    // play it
    this.dummy.play('preview');
    // update the frame order display
    this.codeAssistText.text = this.previewArray;
  },

  callResetPreview: function (ctx) {
    ctx.game.state.callbackContext.resetPreviewArray = true;
  },

  callPreview: function(ctx) {
    ctx.game.state.callbackContext.previewState = true;
  },

  callQuit: function(ctx) {
    ctx.game.state.callbackContext.gameOver = true;
  },

  // add a label to a sprite
  addLabel: function (ctx, text, fontsize, alignment, anchor) {
    if (!anchor) {
      anchor = 0;
    }
    var label = new Phaser.Text(
      ctx.game,
      0,
      0,
      text,
      {
        fontSize: fontsize,
        font: "Droid Sans Mono",
        fill: "#ff0000",
        align: alignment,
        shadowColor: 'rgba(20,20,20,1)',
        shadowBlur: 2,
        shadowOffsetX: 2,
        shadowOffsetY: 2,
      }
    );
    label.anchor.setTo(anchor);
    ctx.addChild(label);
  },

  // built in functions
  update: function () {
    if (this.previewState) {
      this.previewState = false;
      this.preview();
    }
    if (this.resetPreviewArray) {
      this.resetPreviewArray = false;
      this.updateLabels();
      this.previewArray = [0,]; // clear the array without destroying it.
      this.preview();
    }
    if (this.gameOver) {
      this.quit();
    }
  },

  updateLabels: function () {
    // reset the display
    this.framesGroup.setAll('health', 0);
    // children[0].text does not work here.
    this.framesGroup.setAll('children.0.text', '0');
  },

  quit: function () {
    this.gameOver = false;
    // reset spriteData
    spriteData = {
      img: new Image(),
      width: null,
      height: null,
      rows: null,
      columns: null,
    };
    $("#glasspane").show();
    // go back to the Main Menu
    this.state.start('MainMenu');
  },

  render: function () {
    //this.game.debug.geom(this.previewBox, 'rgba(250, 0, 250, 1)');
  },
};
