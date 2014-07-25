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

    // load
    this.btnLoad = this.add.button(
      0, 0,               // x, y
      'gui',              // atlas key
      null, null,         // callback function, callbackContext?
      /* --- WHAT WILL IT LOOK LIKE IN THIS EVENT? --- */
      "blue_button01.png",  // on enter
      "blue_button01.png",  // on leave
      "blue_button01.png",  // on click
      "blue_button01.png"); // on release
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
