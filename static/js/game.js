
BasicGame.Game = function (game) {

};

BasicGame.Game.prototype = {
  // preload, create, [update, render, repeat]

  /*preload: function() {
    // (name, imagepath)
    this.load.image('sea', 'assets/sea.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('enemyBullet', 'assets/enemy-bullet.png');
    this.load.spritesheet('greenEnemy', 'assets/enemy.png', 32, 32);
    this.load.spritesheet('whiteEnemy', 'assets/shooting-enemy.png', 32, 32);
    this.load.spritesheet('explosion', 'assets/explosion.png', 32, 32);
    this.load.spritesheet('player', 'assets/player.png', 64, 64);
  },*/

  create: function () {
    // the order sprites are added here determines the z-order
    // (x, y, w, h, name)
    // (x, y, name)
    this.sea = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'sea');
    this.setupPlayer();
    this.setupEnemies();
    this.setupBullets();
    this.setupExplosions();
    this.setupPlayerIcons();
    this.setupText();

    // the controls
    this.cursors = this.input.keyboard.createCursorKeys();
  },

  update: function () {
    this.sea.tilePosition.y += 0.2;
    this.checkCollisions();
    this.spawnEnemies();
    this.enemyFire();
    this.processPlayerInput();
    this.processDelayedEffects();
  },

  // create-related functions
  setupPlayer: function () {
    // ## PLAYER
    this.player = this.add.sprite(
      this.game.width / 2,
      this.game.height - 64,
      'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.animations.add('fly', [0, 1, 2], 20, true);
    this.player.animations.add('ghost', [3, 0, 3, 1], 20, true);
    this.player.play('fly');
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.speed = 300;
    this.player.body.collideWorldBounds = true;
    // 20x20 pixel hitbox, centered a little bit higher than the center
    this.player.body.setSize(20, 20, 0, -5);
  },

  setupEnemies: function () {
    // ## Greenies
    this.enemyPool = this.add.group();
    this.enemyPool.enableBody = true;
    this.enemyPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyPool.createMultiple(50, 'greenEnemy');
    this.enemyPool.setAll('anchor.x', 0.5);
    this.enemyPool.setAll('anchor.y', 0.5);
    this.enemyPool.setAll('outOfBoundsKill', true);
    this.enemyPool.setAll('checkWorldBounds', true);
    this.enemyPool.setAll('reward', 100, false, false, 0, true);
    // sets the animation for each sprite
    this.enemyPool.forEach(function(enemy) {
      enemy.animations.add('fly', [0, 1, 2], 20, true);
      enemy.animations.add('hit', [3, 1, 3, 2], 20, false);
      enemy.events.onAnimationComplete.add(function (e) {
        e.play('fly');
      }, this);
    });
    // spawn when game starts
    this.nextEnemyAt = 0;
    this.enemyDelay = 1000;
    this.enemyInitialHealth = 2;

    // Shooters
    this.shooterPool = this.add.group();
    this.shooterPool.enableBody = true;
    this.shooterPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.shooterPool.createMultiple(20, 'whiteEnemy');
    this.shooterPool.setAll('anchor.x', 0.5);
    this.shooterPool.setAll('anchor.y', 0.5);
    this.shooterPool.setAll('outOfBoundsKill', true);
    this.shooterPool.setAll('checkWorldBounds', true);
    this.shooterPool.setAll('reward', 400, false, false, 0, true);
    // set the animation for each sprite
    this.shooterPool.forEach(function (enemy) {
      enemy.animations.add('fly', [0, 1, 2], 20, true);
      enemy.animations.add('hit', [3, 1, 3, 2], 20, false);
      enemy.events.onAnimationComplete.add(function (e) {
        e.play('fly');
      }, this);
    });
    // start spawning 5 seconds into the game
    this.nextShooterAt = this.time.now + 5000;
    this.shooterDelay = 3000;
    this.shooterShotDelay = 2000;
    this.shooterInitialHealth = 5;
  },

  setupBullets: function () {
    // ## BULLETS
    this.enemyBulletPool = this.add.group();
    this.enemyBulletPool.enableBody = true;
    this.enemyBulletPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyBulletPool.createMultiple(100, 'enemyBullet');
    this.enemyBulletPool.setAll('anchor.x', 0.5);
    this.enemyBulletPool.setAll('anchor.y', 0.5);
    this.enemyBulletPool.setAll('outOfBoundsKill', true);
    this.enemyBulletPool.setAll('checkWorldBounds', true);
    this.enemyBulletPool.setAll('reward', 0, false, false, 0, true);

    // add an empty sprite group into the game
    this.bulletPool = this.add.group();
    // add physics to the whole group
    this.bulletPool.enableBody = true;
    this.bulletPool.physicsBodyType = Phaser.Physics.ARCADE;
    // add 50 bullet sprites in the group.
    // by default, this uses the first frame of the sprite sheet and sets
    // the initial state as non-existing (i.e killed/dead)
    this.bulletPool.createMultiple(10, 'bullet');
    // sets the anchors of all sprites
    this.bulletPool.setAll('anchor.x', 0.5);
    this.bulletPool.setAll('anchor.y', 0.5);
    // Automatically kill the sprites when they go out of bounds
    this.bulletPool.setAll('outOfBoundsKill', true);
    this.bulletPool.setAll('checkWorldBounds', true);
    this.nextShotAt = 0;
    this.shotDelay = 100;
  },

  setupExplosions: function () {
    // ## EXPLOSIONS
    this.explosionPool = this.add.group();
    this.explosionPool.enableBody = true;
    this.explosionPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.explosionPool.createMultiple(100, 'explosion');
    this.explosionPool.setAll('anchor.x', 0.5);
    this.explosionPool.setAll('anchor.y', 0.5);
    this.explosionPool.forEach(function (explosion) {
      explosion.animations.add('boom');
    });
  },

  setupText: function () {
    // help text
    this.instructions = this.add.text(
      this.game.width / 2,
      this.game.height / 2 - 20,
      "Use Arrow Keys to Move, Press Z to Fire\nTapping/clicking does both",
      {font: "20px monospace", fill: "#fff", align: "center"});
    this.instructions.anchor.setTo(0.5, 0.5);
    this.instExpire = this.time.now + 5000; // the max time to show this text

    this.score = 0;
    this.scoreText = this.add.text(
      this.game.width / 2,
      30,
      '' + this.score,
      {
        font: '20px monospace', fill: '#fff', align: 'center'
      });
    this.scoreText.anchor.setTo(0.5, 0.5);
  },

  setupPlayerIcons: function () {
    this.lives = this.add.group();
    for (var i = 0; i < 3; i++) {
      var life = this.lives.create(30 + (30 * i), 30, 'player');
      life.scale.setTo(0.5, 0.5);
      life.anchor.setTo(0.5, 0.5);
    }
  },

  // update-related functions
  checkCollisions: function () {
    // Bullet/ Greenie Collision
    this.physics.arcade.overlap(
      // (obj1, obj2, callback, optional_callback, context)
      this.bulletPool, this.enemyPool, this.enemyHit, null, this);

    // Bullet/ Shooter Collision
    this.physics.arcade.overlap(
      this.bulletPool, this.shooterPool, this.enemyHit, null, this);

    // Player/ Shooter Collision
    this.physics.arcade.overlap(
      this.player, this.shooterPool, this.playerHit, null, this);

    // Player/ ShooterBullet Collision
    this.physics.arcade.overlap(
      this.player, this.enemyBulletPool, this.playerHit, null, this);

    // Player/ Greenie Collision
    this.physics.arcade.overlap(
      // (obj1, obj2, callback, optional_callback, context)
      this.player, this.enemyPool, this.playerHit, null, this);
  },

  spawnEnemies: function () {
    // Greenie spawning
    if (this.nextEnemyAt < this.time.now && this.enemyPool.countDead() > 0) {
      this.nextEnemyAt = this.time.now + this.enemyDelay;
      var enemy = this.enemyPool.getFirstExists(false);
      // spawn at a random location at the top of the screen
      enemy.reset(this.rnd.integerInRange(20, this.game.width - 20), 0,
        this.enemyInitialHealth);
      // also randomize the speed
      enemy.body.velocity.y = this.rnd.integerInRange(30, 60);
      enemy.play('fly');
    }

    // Shooter spawning
    if (this.nextShooterAt < this.time.now && this.shooterPool.countDead() > 0) {
      this.nextShooterAt = this.time.now + this.shooterDelay;
      var shooter = this.shooterPool.getFirstExists(false);

      // spawn at random location at the top
      shooter.reset(
        this.rnd.integerInRange(20, this.game.width - 20), 0, this.shooterInitialHealth);
      // choose a random target location at the bottom
      var target = this.rnd.integerInRange(20, this.game.width - 20);
      // move to target an rotate sprite accordingly
      shooter.rotation = this.physics.arcade.moveToXY(
        shooter,
        target,
        this.game.height,
        this.rnd.integerInRange(30, 80)) - Math.PI / 2;
      shooter.play('fly');
      // each shooter has their own shot timer
      shooter.nextShotAt = 0;
    }
  },

  processPlayerInput: function () {
    var damper = 0.77;
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    // diagonal movement
    if (this.cursors.left.isDown && this.cursors.up.isDown) {
      this.player.body.velocity.x = -(this.player.speed * damper);
      this.player.body.velocity.y = -(this.player.speed * damper);
    } else if (this.cursors.left.isDown && this.cursors.down.isDown) {
      this.player.body.velocity.x = -(this.player.speed * damper);
      this.player.body.velocity.y = (this.player.speed * damper);
    }

    if (this.cursors.right.isDown && this.cursors.up.isDown) {
      this.player.body.velocity.x = (this.player.speed * damper);
      this.player.body.velocity.y = -(this.player.speed * damper);
    } else if (this.cursors.right.isDown && this.cursors.down.isDown) {
      this.player.body.velocity.x = (this.player.speed * damper);
      this.player.body.velocity.y = (this.player.speed * damper);
    }

    // horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -this.player.speed;
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = this.player.speed;
    }

    // vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -this.player.speed;
    } else if (this.cursors.down.isDown) {
      this.player.body.velocity.y = this.player.speed;
    }

    // mouse/touch movement
    if (this.game.input.activePointer.isDown &&
        this.game.physics.arcade.distanceToPointer(this.player) > 15) {
      this.game.physics.arcade.moveToPointer(this.player, this.player.speed);
    }

    // attacking
    if (this.input.keyboard.isDown(Phaser.Keyboard.Z) ||
        this.input.activePointer.isDown) {
      if (this.returnText && this.returnText.exists) {
        this.quitGame();
      } else {
        this.fire();
      }
    }
  },

  processDelayedEffects: function () {
    if (this.instructions.exists && this.time.now > this.instExpire) {
      this.instructions.destroy(); // remove instructions from view
    }
    if (this.ghostUntil && this.ghostUntil < this.time.now) {
      this.ghostUntil = null;
      this.player.play('fly');
    }
    if (this.showReturn && this.time.now > this.showReturn) {
      this.returnText = this.add.text(
        this.game.width / 2, this.game.height / 2 + 20,
        'Press Z or Tap Game to go back to Main Menu',
        {font: '16px sans-serif', fill: '#fff'});
      this.returnText.anchor.setTo(0.5, 0.5);
      this.showReturn = false;
    }
  },

  render: function () {
    //  DEBUGGING CODE
    // this.game.debug.body(this.player);
  },

  quitGame: function (pointer) {

    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
    this.sea.destroy();
    this.player.destroy();
    this.enemyPool.destroy();
    this.bulletPool.destroy();
    this.explosionPool.destroy();
    this.instructions.destroy();
    this.scoreText.destroy();
    this.endText.destroy();
    this.returnText.destroy();
    //  Then let's go back to the main menu.
    this.state.start('MainMenu');

  },

  fire: function() {
    // delay -- No firing if dead either!
    if (!this.player.alive || this.nextShotAt > this.time.now) {
      return;
    }

    // too many bullets on screen!
    if (this.bulletPool.countDead() === 0) {
      return;
    }

    this.nextShotAt = this.time.now + this.shotDelay;

    // Find the first dead bullet in the pool
    var bullet = this.bulletPool.getFirstExists(false);
    // Reset (revive) the sprite and place it in a new location
    bullet.reset(this.player.x, this.player.y - 20);
    bullet.body.velocity.y = -500;
  },

  playerHit: function (player, enemy) {
    // check first if this.ghostUntil is not undefined or null
    if (this.ghostUntil && this.ghostUntil > this.time.now) {
      return;
    }
    // crashing into an enemy only deals 5 damage
    this.damageEnemy(enemy, 5);
    var life = this.lives.getFirstAlive();
    if (life) {
      life.kill();
      this.ghostUntil = this.time.now + 3000;
      this.player.play('ghost');
    } else {
      this.explode(player);
      player.kill();
      this.displayEnd(false);
    }
  },

  enemyHit: function (bullet, enemy) {
    bullet.kill();
    this.damageEnemy(enemy, 1);
  },

  enemyFire: function() {
    this.shooterPool.forEachAlive(function(enemy) {
      if (this.time.now > enemy.nextShotAt &&
          this.enemyBulletPool.countDead() > 0) {
        var bullet = this.enemyBulletPool.getFirstExists(false);
        bullet.reset(enemy.x, enemy.y);
        this.physics.arcade.moveToObject(bullet, this.player, 150);
        enemy.nextShotAt = this.time.now + this.shooterShotDelay;
      }
    }, this);
  },

  damageEnemy: function (enemy, damage) {
    enemy.damage(damage);
    if (enemy.alive) {
      enemy.play('hit');
    } else {
      this.explode(enemy);
      this.addToScore(enemy.reward);
    }
  },

  addToScore: function (score) {
    this.score += score;
    this.scoreText.text = this.score;
    if (this.score >= 2000) {
      this.enemyPool.destroy();
      this.shooterPool.destroy();
      this.enemyBulletPool.destroy();
      this.displayEnd(true);
    }
  },

  explode: function(sprite) {
    if (this.explosionPool.countDead() === 0) {
      return;
    }
    var explosion = this.explosionPool.getFirstExists(false);
    explosion.reset(sprite.x, sprite.y);
    explosion.play('boom', 15, false, true);
    // add the original sprite's velocity to the explosion
    explosion.body.velocity.x = sprite.body.velocity.x;
    explosion.body.velocity.y = sprite.body.velocity.y;
  },

  displayEnd: function (win) {
    // you can't win and lose at the same time
    if (this.endText && this.endText.exists) {
      return;
    }
    var msg = win ? 'You Win!!!' : 'Game Over!';
    this.endText = this.add.text(
      this.game.width / 2,
      this.game.height / 2 - 72,
      msg,
      {font: "72px serif", fill: "#fff"});
    this.endText.anchor.setTo(0.5, 0);
    this.showReturn = this.time.now + 2000;
  },

};
