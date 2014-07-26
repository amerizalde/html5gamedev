// create a Game object
BasicGame.Game = function (game) {

  this.clickCircle = new Phaser.Circle(
    this.game.width / 2,
    this.game.height - 100,
    44);
};

// add methods and properties
BasicGame.Game.prototype = {

  create: function () {
    this.bg = this.add.sprite(0, 0, 'backgrounds', 'background.png');
    this.setupPlayer();
    this.setupDrops();
  },

  setupPlayer: function () {
    // ## PLAYER
    this.player = this.add.sprite(
      this.game.width / 2,
      this.game.height - 100,
      'grubby'
    );
    this.player.anchor.setTo(0.5, 0.5);
    this.player.scale.setTo(5, 5);
    this.player.smoothed = false;
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
    this.candyPool.setAll('smoothed', false);
    this.candyPool.setAll('outOfBoundsKill', true);
    this.candyPool.setAll('checkWorldBounds', true);
    this.candyPool.setAll('reward', 100, false, false, 0, true);

    // spawn when game starts
    this.nextCandyAt = 0;
    this.candyDelay = 1000;
  },

  // update-related functions
  update: function () {
    this.checkCollision();
    this.spawnCandy();

    if (this.input.activePointer.isDown) {
      this.clickCircle.x = this.input.activePointer.circle.x;
      this.clickCircle.diameter = this.input.activePointer.circle.diameter;
    }

    this.processPlayerInput();
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

    if (this.clickCircle.contains(this.player.x, this.player.y)) {
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;
    }
  },

  spawnCandy: function () {
    if (this.nextCandyAt < this.time.now && this.candyPool.countDead() > 0) {
      this.nextCandyAt = this.time.now + this.candyDelay; // reset the clock
      var candy = this.candyPool.getFirstExists(false); // get the first candy not active
      // spawn at a random location at the top of the screen
      candy.reset(
        this.rnd.integerInRange(30, this.game.width - 30),  // x
        0,                                                  // y
        1)
      candy.body.velocity.y = this.rnd.integerInRange(20, 80); // random speed
    }
  },

  checkCollision: function () {
    this.physics.arcade.overlap(
      this.player, this.candyPool, this.gobble, null, this);
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
