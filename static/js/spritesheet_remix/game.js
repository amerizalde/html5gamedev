// create a Game object
BasicGame.Game = function (game) {

  this.dummy = null;
  this.previewBox = null;
  this.framesBox = null;
  this.framesGroup = null;
  this.spritesheet = null;
  this.fps = 24;
  this.resetPreviewArray = false;

};

// add methods and properties
BasicGame.Game.prototype = {

  create: function () {

    // sprites are loaded in the order added here.
    //this.bg = this.add.tileSprite(0, 0, this.camera.width, this.camera.height, 'background');
    this.previewBox = new Phaser.Rectangle(
      this.camera.view.centerX,
      this.camera.view.height - 200,
      100, 100);
    this.previewBox.anchor = {'x': 0.5, 'y': 0.5};

    this.framesBox = new Phaser.Rectangle(
      this.game.width / 2,
      20,
      this.game.width - 20,
      this.game.height - 20);

    this.spritesheet = 'p1_walk';

    this.setupButtons();
    this.setupFramesManager(this.spritesheet);
    this.preview(this);

  },

  setupFramesManager: function (atlas) {
    this.framesGroup = null;
    this.framesGroup = this.add.group();
    var data = this.cache.getFrameData(atlas);
    var img;
    var cx = 0;
    var cy = 0;
    this.previewArray = new Array();
    for (var i = 0; i < data._frames.length; i++) {
      if (cx >= this.framesBox.width - data._frames[i].width) {
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
    /*// gui buttons
    this.buttonPool = this.add.group();
    this.buttonPool.createMultiple(4, 'gui', "buttonSquare_grey.png");
    this.buttonPool.setAll('anchor', {'x': 0.5, 'y': 1});
    this.buttonPool.setAll('smoothed', false);
    this.buttonPool.setAll('inputEnabled', true);
    for (var i = 1; i < 5; i++){
      var btn = this.buttonPool.getFirstExists(false);
      btn.name = "btn"+i;
      btn.reset(i * btn.width + 2, this.camera.height / 2);
      // console.log(btn.events);
      // fix for 2.0.6 broken buttons
      btn.events.onInputDown.add(this.onDownFix, btn);
      btn.events.onInputUp.add(this.onUpFix, btn);
      btn.events.onInputOver.add(this.onOverFix, btn);
      btn.events.onInputOut.add(this.onOutFix, btn);
    }*/

    this.previewBtn = this.add.sprite(
      this.game.width / 2,
      this.game.height / 2,
      'gui',
      "buttonSquare_grey.png");
    this.previewBtn.anchor = {'x': 0.5, 'y': 0.5};
    this.previewBtn.inputEnabled = true;
    this.previewBtn.events.onInputDown.add(this.onDownFix, this.previewBtn);
    this.previewBtn.events.onInputDown.add(this.preview, this.previewBtn.game);
    this.previewBtn.events.onInputUp.add(this.onUpFix, this.previewBtn);
    this.previewBtn.events.onInputOver.add(this.onOverFix, this.previewBtn);
    this.previewBtn.events.onInputOut.add(this.onOutFix, this.previewBtn);

    this.resetBtn = this.add.sprite(
      this.game.width / 2 + this.previewBtn.width,
      this.game.height / 2,
      'gui',
      "buttonSquare_grey.png");
    this.resetBtn.anchor = {'x': 0.5, 'y': 0.5};
    this.resetBtn.inputEnabled = true;
    this.resetBtn.events.onInputDown.add(this.onDownFix, this.resetBtn);
    this.resetBtn.events.onInputDown.add(this.resetPreview, this.resetBtn);
    this.resetBtn.events.onInputUp.add(this.onUpFix, this.resetBtn);
    this.resetBtn.events.onInputOver.add(this.onOverFix, this.resetBtn);
    this.resetBtn.events.onInputOut.add(this.onOutFix, this.resetBtn);

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
    console.log(ctx.game.state.callbackContext.previewArray);
  },

  preview: function (ctx) {
    // console.log(ctx.game.state.callbackContext.previewArray);
    var frames = ctx.game.state.callbackContext.previewArray;
    var key = ctx.game.state.callbackContext.spritesheet;
    var fps = ctx.game.state.callbackContext.fps;
    var dummy = ctx.dummy || ctx.game.state.callbackContext.dummy;

    console.log(key, fps);
    console.log(ctx);

    if (dummy) {
      dummy.animations.stop();
      dummy.animations.destroy();
      dummy.kill();
    } else {
      dummy = ctx.game.add.sprite(
        ctx.game.state.callbackContext.previewBox.x,
        ctx.game.state.callbackContext.previewBox.y,
        key
      );
    }

    /*if (ctx.game.state.callbackContext.dummy) {
      ctx.game.state.callbackContext.dummy.animations.stop();
      ctx.game.state.callbackContext.dummy.animations.destroy();
      ctx.game.state.callbackContext.dummy.destroy();
    }*/
    dummy.reset(
      ctx.game.state.callbackContext.previewBox.x,
      ctx.game.state.callbackContext.previewBox.y
      );
    dummy.animations.add('preview', frames, fps, true, true);
    dummy.play('preview');
  },

  resetPreview: function (ctx) {
    ctx.game.state.callbackContext.resetPreviewArray = true;
  },

  // built in functions
  update: function () {
    if (this.resetPreviewArray) {
      this.previewArray = [0,];
      this.resetPreviewArray = false;
      this.preview(this);
    }
  },

  render: function () {
    //this.game.debug.geom(this.previewBox, 'rgba(250, 0, 250, 1)');
  },

};
