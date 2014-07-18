// create a Game object
BasicGame.Game = function (game) {

};

// add methods and properties
BasicGame.Game.prototype = {

  create: function () {
    this.setupBackground();
    this.setupPlayer();
    this.setupNPC();
    //this.setupSFX();

    // the controls
    this.cursors = this.input.keyboard.createCursorKeys();
    this.setupKeys()
  },

  // create-related functions
  setupBackground: function () {
    this.bg = this.add.tileSprite(0, 0, this.world.width, this.world.height,
      'background');
    this.bg.autoScroll(0, 10);
  },

  setupPlayer: function () {
    this.player = this.add.sprite(
      this.world.centerX,
      this.world.height - 80,
      'guinea', 'playerShip1_green.png');
    this.player.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.speed = 300;
    this.player.body.collideWorldBounds = true;
    // 20x20 pixel hitbox, centered a little bit higher than the center
    this.player.body.setSize(20, 20, 0, -5);
  },
  setupNPC: function () {
    this.gp1 = this.add.sprite(
      this.world.centerX, this.world.centerY, 'guinea', 'ufoRed.png');
    this.gp2 = this.add.sprite(91, this.world.randomY, 'guinea', 'ufoGreen.png');
    this.gp3 = this.add.sprite(
      this.world.width - 91, this.world.randomY, 'guinea', 'ufoYellow.png');
    this.gp4 = this.add.sprite(
      this.world.randomX,
      this.world.randomY,
      'guinea', 'ufoBlue.png');
  },

  setupKeys: function () {
    // lock these keys out of the browser
    this.input.keyboard.addKeyCapture(
      [ Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.SPACEBAR
      ]
    );
  },

  setupSFX: function () {
    this.testSnd = this.add.audio('sfx2');
  },

  // update-related functions
  update: function () {
    this.processPlayerInput();
  },

  processPlayerInput: function () {
    var damper = 0.77;
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    // horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -this.player.speed;
      this.bg.autoScroll(50, 5);
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = this.player.speed;
      this.bg.autoScroll(-50, 5);
    } else {
      this.bg.autoScroll(0, 10);
    }

    // attacking
    if (this.input.keyboard.isDown(Phaser.Keyboard.Z) ||
        this.input.activePointer.isDown) {
      /*if (this.returnText && this.returnText.exists) {
        this.quitGame();
      } else {
        this.fire();
      }*/
    }
  },

  quitGame: function (pointer) {
    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

    this.testSnd.stop();
    this.testSnd = null;
    //  Then let's go back to the main menu.
    this.state.start('Game');
  },
};
