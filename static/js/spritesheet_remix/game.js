// create a Game object
BasicGame.Game = function (game) {

  this.mouseX = null;
};

// add methods and properties
BasicGame.Game.prototype = {

  create: function () {

    // sprites are loaded in the order added here.
    this.bg = this.add.tileSprite(0, 0, this.camera.width, this.camera.height, 'background');

    // gui buttons
    this.buttonPool = this.add.group();
    this.buttonPool.createMultiple(4, 'gui', "buttonSquare_grey.png");
    this.buttonPool.setAll('anchor', {'x': 0.5, 'y': 0.5});
    this.buttonPool.setAll('smoothed', false);
    this.buttonPool.setAll('inputEnabled', true);
    for (var i = 1; i < 5; i++){
      var btn = this.buttonPool.getFirstExists(false);
      btn.name = "btn"+i;
      btn.reset(i * btn.width + 2, this.camera.height / 2);
      console.log(btn.events);
      // fix for 2.0.6 broken buttons
      btn.events.onInputDown.add(this.onDownFix, btn);
      btn.events.onInputUp.add(this.onUpFix, btn);
      btn.events.onInputOver.add(this.onOverFix, btn);
      btn.events.onInputOut.add(this.onOutFix, btn);
    }
  },

  onUpFix: function (btn) {
    console.log('Button Released!');
    btn.frameName = "buttonSquare_grey.png";
  },
  onDownFix: function (btn) {
    console.log('Button Pressed!');
    btn.frameName = "buttonSquare_grey_pressed.png";
  },
  onOverFix: function (btn) {
    console.log('Mouse is over ' + btn.name);
    btn.frameName = "buttonSquare_grey_over.png";
  },
  onOutFix: function (btn) {
    console.log('Mouse has left ' + btn.name);
    btn.frameName = "buttonSquare_grey.png";
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
