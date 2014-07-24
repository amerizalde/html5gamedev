// create a Game object
BasicGame.Game = function (game) {

  this.mouseX = null;
};

// add methods and properties
BasicGame.Game.prototype = {

  create: function () {
    // sprites are loaded in the order added here.
    this.bg = this.add.tilemap('level');
    this.bg.addTilesetImage('level_sheet', 'tiles');
    var layer = this.bg.createLayer('layer_1');
    layer.resizeWorld();
    layer.wrap = true;
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

  setupDrops: function () {
    this.candyPool = this.add.group();
    this.candyPool.enableBody = true;
    this.candyPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.candyPool.createMultiple(50, 'misc', "candyDrop.png");
    this.candyPool.setAll('anchor.x', 0.5);
    this.candyPool.setAll('anchor.y', 0.5);
    this.candyPool.setAll('scale.x', 2);
    this.candyPool.setAll('scale.y', 2);
    this.candyPool.setAll('outOfBoundsKill', true);
    this.candyPool.setAll('checkWorldBounds', true);
    this.candyPool.setAll('reward', 100, false, false, 0, true);

    // spawn when game starts
    this.nextCandyAt = 0;
    this.candyDelay = 1000;
  },*/

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

  checkCollision: function () {
  },

  gobble: function (player, candy) {
    if (candy.frameName !== 'sprout.png') {
      this.eat(candy);
    } else {
      // eww, sprouts!
    }
  },

  eat: function (candy) {
    this.score += candy.reward;
    candy.kill();
  },

  quitGame: function (pointer) {
    //  Then let's go back to the main menu.
    this.state.start('Boot');
  },
};
