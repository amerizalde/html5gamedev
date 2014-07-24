// create a Game object
BasicGame.Game = function (game) {

};

// add methods and properties
BasicGame.Game.prototype = {

  create: function () {
    this.setupBackground();
    this.setupPlayer();
    this.setupNPC();
    this.setupBullets();
    //this.setupSFX();

    // the controls
    this.cursors = this.input.keyboard.createCursorKeys();
    this.setupKeys()
  },

  // create-related functions
  setupBackground: function () {
    this.bg = this.add.tileSprite(0, 0, this.world.width, this.world.height,
      'background');
  },

  setupPlayer: function () {
    this.player = this.add.sprite(
      this.world.centerX,
      this.world.height - 80,
      'guinea', 'playerShip1_green.png');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.scale = {'x': 0.5, 'y': 0.5};
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.speed = 300;
    this.player.body.collideWorldBounds = true;
    // 20x20 pixel hitbox, centered a little bit higher than the center
    this.player.body.setSize(20, 20, 0, -5);

    this.weaponLevel = 0;
  },
  setupNPC: function () {
    this.gp1 = this.add.sprite(
      this.world.centerX, this.world.centerY, 'guinea', 'ufoRed.png');
    this.gp1.anchor.setTo(0.5, 0.5);
    this.gp1.scale = {'x': 0.5, 'y': 0.5};
    this.gp1.health = 500;
    this.game.physics.enable(this.gp1, Phaser.Physics.ARCADE);
  },

  setupBullets: function () {
    // add an empty sprite group into the game
    this.bulletPool = this.add.group();
    // add physics to the whole group
    this.bulletPool.enableBody = true;
    this.bulletPool.physicsBodyType = Phaser.Physics.ARCADE;
    // add 50 bullet sprites in the group.
    // by default, this uses the first frame of the sprite sheet and sets
    // the initial state as non-existing (i.e killed/dead)
    this.bulletPool.createMultiple(3, 'guinea', 'laserGreen03.png');
    // sets the anchors of all sprites
    this.bulletPool.setAll('anchor.x', 0.5);
    this.bulletPool.setAll('anchor.y', 0.5);
    // Automatically kill the sprites when they go out of bounds
    this.bulletPool.setAll('outOfBoundsKill', true);
    this.bulletPool.setAll('checkWorldBounds', true);
    this.nextShotAt = 0;
    this.shotDelay = 250;
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
    this.checkCollisions();
    this.processPlayerInput();
  },

  checkCollisions: function () {
    // Bullet/ Guinea Collision
    this.physics.arcade.overlap(
      // (obj1, obj2, callback, optional_callback, context)
      this.bulletPool, this.gp1, this.guineaHit, null, this);
  },

  guineaHit: function (enemy, bullet) {
    // the order of the incoming arguments matters
    // the first argument is the obj2 of the collision,
    // and the second argument is the obj1. 7/19/2014

    // remove the bullet
    bullet.kill();
    // enemy reaction
    this.damageNPC(enemy, 1);
  },

  damageNPC: function (enemy, amount) {
    // show the bat word
    this.textFX(enemy);
    // decrement the enemy health
    enemy.damage(amount);
    // if still alive, animate
    if (enemy.alive) {
      this.tweenFX(enemy);
    }
  },

  tweenFX: function (npc) {
    var duration = 150; // this is fast enough that the sprites return to their
                        // original position when tween-spammed.
    this.add.tween(npc).from({y: npc.y - 10}, duration, Phaser.Easing.Back.Out, true);
  },

  textFX: function (npc) {
    // add a sprite from the wordPool with a lifespan of 150 offset from the npc location
    // at a random rotation?
    var i = Math.floor(Math.random() * 16);
    var word = this.add.sprite(
      npc.x - 10, npc.y - 10, "batwords", i);
    word.scale = {'x': 0.25, 'y': 0.25};
    word.anchor.setTo(0.5, 0.5);
    word.lifespan = 150;
    this.wordTween(word);
  },

  wordTween: function(word) {
    this.add.tween(word).to({x: word.x - 20, y: word.y - 20}, word.lifespan, Phaser.Easing.Linear.Out, true);
    this.add.tween(word).to({alpha: 0}, word.lifespan, Phaser.Easing.Linear.Out, true);
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

      this.fire();
    }
  },

  fire: function() {
    // delay -- No firing if dead either!
    if (!this.player.alive || this.nextShotAt > this.time.now) {
      return;
    }

    this.nextShotAt = this.time.now + this.shotDelay;

    var bullet;

    if (this.weaponLevel === 0) {
      // too many bullets on screen!
      if (this.bulletPool.countDead() === 0) return;
      bullet = this.bulletPool.getFirstExists(false);
      // Reset (revive) the sprite and place it in a new location
      bullet.reset(this.player.x, this.player.y - 20);
      bullet.body.velocity.y = -500;
    } else {
      if (this.bulletPool.countDead() < this.weaponLevel * 2) return;
      for (var i = 0; i < this.weaponLevel; i++) {
        bullet = this.bulletPool.getFirstExists(false);
        // spawn left bullet slightly off center
        bullet.reset(this.player.x - (10 + i * 6), this.player.y - 20);
        this.physics.arcade.velocityFromAngle(
          -95 - i * 10, 500, bullet.body.velocity);

        bullet = this.bulletPool.getFirstExists(false);
        // spawn right bullet slightly right off center
        bullet.reset(this.player.x + (10 + i * 6), this.player.y - 20);
        this.physics.arcade.velocityFromAngle(
          -85 + i * 10, 500, bullet.body.velocity);
      }
    }
  },

  quitGame: function (pointer) {
    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
    this.player.destroy();
    this.bg.destroy();
    this.gp1.destroy();

    this.testSnd.stop();
    this.testSnd = null;
    //  Then let's go back to the main menu.
    this.state.start('Game');
  },

  render: function () {
    this.game.debug.body(this.player);
    this.game.debug.body(this.gp1);
  }
};
