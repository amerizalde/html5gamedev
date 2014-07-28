// create a Game object
BasicGame.Game = function (game) {

  this.dummy = null;
  this.previewBox = null;
  this.framesGroup = null;
  this.spritesheet = null;
  this.fps = 24;
  this.resetPreviewArray = false;
  this.previewState = false;

};

BasicGame.Game.prototype = {

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
    this.spritesheet = 'p1_walk';
    // this determines the order of frames played
    this.previewArray = [0,];

    this.setupText();
    this.setupButtons();
    this.setupFramesManager(this.spritesheet);
    this.preview();

  },

  setupFramesManager: function (atlas) {
    if (this.framesGroup) {
      this.framesGroup.destroy();
    }
    this.framesGroup = this.add.group();
    // retrieve the atlas from the cache, to access the frames directly.
    var data = this.cache.getFrameData(atlas);
    var img;
    var cx = 0;
    var cy = 0;
    for (var i = 0; i < data._frames.length; i++) {
      if (cx >= this.game.width - data._frames[i].width) {
        cx = 0;
        cy += data._frames[i].height;
      }
      img = this.add.sprite(cx, cy, atlas, data._frames[i].index);
      // img.scale = {'x': 0.25, 'y': 0.25};
      img.inputEnabled = true;
      // img.input.enableDrag(true);
      img.health = 0;
      img.events.onInputDown.add(this.use, img);
      this.framesGroup.add(img);
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
    this.resetBtn.anchor = {'x': 0.5, 'y': 0.5};
    this.resetBtn.inputEnabled = true;
    this.resetBtn.events.onInputDown.add(this.onDownFix, this.resetBtn);
    this.resetBtn.events.onInputDown.add(this.callResetPreview, this.resetBtn);
    this.resetBtn.events.onInputUp.add(this.onUpFix, this.resetBtn);
    this.resetBtn.events.onInputOver.add(this.onOverFix, this.resetBtn);
    this.resetBtn.events.onInputOut.add(this.onOutFix, this.resetBtn);

  },

  setupText: function () {
    // the current animation frame order.
    this.add.text(
      10,
      this.previewBox.centerY - 20,
      "Frame Order:",
      {font: "16px Droid Sans Mono", fill: "#fff", align: "left"});
    this.codeAssistText = this.add.text(
      10,
      this.previewBox.centerY,
      this.previewArray,
      {font: "16px Droid Sans Mono", fill: "#fff", align: "left"});
  },

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

  use: function(ctx) {
    var frames = ctx.game.state.callbackContext.previewArray;

    // console.log(parseInt(ctx._frame.index));
    ctx.health += 1;
    frames.push(parseInt(ctx._frame.index));
    ctx.game.state.callbackContext.previewArray = frames;
    // console.log(ctx.game.state.callbackContext.previewArray);
  },

  preview: function () {
    if (this.dummy) {
      console.log('dummy exists')
      this.dummy.animations.stop();
      this.dummy.animations.currentAnim.destroy();
      // this.dummy.kill();
    } else {
      console.log('creating dummy')
      this.dummy = this.add.sprite(
        this.previewBox.x,
        this.previewBox.y,
        this.spritesheet
      );
    }
    console.log('assert dummy exists');
    this.dummy.reset(
      this.previewBox.x,
      this.previewBox.y
      );
    console.log('dummy reset');
    console.log(this.dummy);
    this.dummy.animations.add(
      'preview',
      this.previewArray,
      this.fps,
      true,
      true
    );
    console.log('dummy animated');
    console.log(this.dummy);
    this.dummy.play('preview');
    console.log('working');
  },

  callResetPreview: function (ctx) {
    ctx.game.state.callbackContext.resetPreviewArray = true;
  },

  callPreview: function(ctx) {
    ctx.game.state.callbackContext.previewState = true;
  },

  // built in functions
  update: function () {
    if (this.previewState) {
      this.previewState = false;
      this.preview();
      this.codeAssistText.text = this.previewArray;
    }
    if (this.resetPreviewArray) {
      this.resetPreviewArray = false;
      this.previewArray = [0,];
      this.preview();
      this.codeAssistText.text = this.previewArray;
    }
  },

  render: function () {
    //this.game.debug.geom(this.previewBox, 'rgba(250, 0, 250, 1)');
  },

};
