// create a Game object
BasicGame.Game = function (game) {

  this.mouseX = null;
  this.dummy = null;
  this.previewBox = null;
  this.framesBox = null;
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

    this.setupButtons();
    this.setupFramesManager('p1_walk');
    this.preview('p1_walk', null, 10);


  },

  setupFramesManager: function (atlas) {
    var data = this.cache.getFrameData(atlas);
    console.log(data);
    var img;
    var cx = 0;
    var cy = 0;
    for (var i = 0; i < data._frames.length; i++) {
      // console.log(this.framesBox.width + ", " + data._frames[i].width);
      if (cx >= this.framesBox.width - data._frames[i].width) {
        cx = 0;
        cy += data._frames[i].height;
      }
      img = this.add.sprite(cx, cy, atlas, data._frames[i].index);
      // img.scale = {'x': 0.25, 'y': 0.25};
      img.inputEnabled = true;
      // img.input.enableDrag(true);
      cx += img.width;
    }
  },

  preview: function (key, frames, fps) {
    this.dummy = null; // clear the old animation
    this.dummy = this.add.sprite(this.previewBox.x, this.previewBox.y, key);
    this.dummy.animations.add('preview', frames);
    this.dummy.play('preview', fps, true);
  },

  setupButtons: function () {
    // gui buttons
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
    }

    /*
    // load button
    this.loadBtn = this.add.sprite(
      this.game.width / 2,
      this.game.height / 2,
      'gui',
      "buttonSquare_grey.png");
    this.loadBtn.anchor = {'x': 0.5, 'y': 0.5};
    this.loadBtn.smoothed = false;
    // sprite-to-button functionality
    this.loadBtn.inputEnabled = true;
    this.loadBtn.events.onInputDown.add(this.onDownFix, this.loadBtn);
    this.loadBtn.events.onInputUp.add(this.onUpFix, this.loadBtn);
    this.loadBtn.events.onInputOver.add(this.onOverFix, this.loadBtn);
    this.loadBtn.events.onInputOut.add(this.onOutFix, this.loadBtn);
    this.loadBtn.name = "load_button";
    */
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

  // built in function
  render: function () {
    //this.game.debug.geom(this.previewBox, 'rgba(250, 0, 250, 1)');
  },

/*  setupPlayer: function () {
    // ## PLAYER
    this.player = this.add.sprite(
      this.game.width / 2,
      this.game.height - 100,
      'grubby'
    );
    this.player.anchor.setTo(0.5, 0.5);
    this.player.scale.setTo(4, 4);
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.collideWorldBounds = true;
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    this.player.speed = 300;

    this.player.animations.add('open', [0, 2, 3], 9, false);
    this.player.animations.add('close', [3, 2, 0], 9, false);
    this.player.animations.add('chew', [0, 2, 3, 2, 0], 10, true);
    this.player.animations.add('left', [1], 1, false);
    this.player.animations.add('right', [4], 1, false);
    this.player.animations.add('idle', [0], 1, false);

    this.player.play('idle');

    this.mouseX = this.player.x; // dont let a computer decide your starting value for you!
    this.score = 0;

    console.log("player setup complete");
  },

  // update-related functions
  update: function () {
    if (this.input.keyboard.isDown(Phaser.Keyboard.Z) ||
        this.input.activePointer.isDown) {
      this.quitGame();
    }
  },

  processPlayerInput: function () {
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    if (this.input.keyboard.isDown(Phaser.Keyboard.Z) ||
        this.input.activePointer.isDown) {
      if (this.returnText && this.returnText.exists) {
        this.quitGame();
      }
    }

    if (this.player.x > this.mouseX && Math.abs(this.player.x - this.mouseX) > 15) {
      this.player.body.velocity.x = -this.player.speed;
    } else if (this.player.x < this.mouseX && Math.abs(this.player.x - this.mouseX) > 15) {
      this.player.body.velocity.x = this.player.speed;
    }
  },

  quitGame: function (pointer) {
    //  Then let's go back to the main menu.
    this.state.start('Boot');
  },
*/
};
