
// create a Game object
BasicGame.Game = function (game) {

};

// add methods and properties
BasicGame.Game.prototype = {
  // the Phaser Game Loop -- preload, create, [update, render, repeat]

  create: function () {
    // the order sprites are added here determines the z-order
    // (x, y, w, h, name)
    // (x, y, name)
    this.sea = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'sea');
    // this.sea.autoScroll(0, 2);
    this.setupPlayer();
    this.setupEnemies();
    this.setupBullets();
    this.setupExplosions();
    this.setupPlayerIcons();
    this.setupText();
    this.setupSound();
    this.setupMusic();

    // the controls
    this.cursors = this.input.keyboard.createCursorKeys();
  },

  update: function () {
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
    this.enemyPool.setAll('dropRate', 0.1, false, false, 0, true);
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
    this.enemyInitialHealth = 4;

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
    this.shooterPool.setAll('dropRate', 0.5, false, false, 0, true);
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
    this.shooterInitialHealth = 10;

    // Da Baws
    this.bossPool = this.add.group();
    this.bossPool.enableBody = true;
    this.bossPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.bossPool.createMultiple(1, 'boss');
    this.bossPool.setAll('anchor.x', 0.5);
    this.bossPool.setAll('anchor.y', 0.5);
    this.bossPool.setAll('outOfBoundsKill', true);
    this.bossPool.setAll('checkWorldBounds', true);
    this.bossPool.setAll('reward', 10000, false, false, 0, true);
    this.bossPool.setAll('dropRate', 0, false, false, 0, true);

    // Set the boss animations
    this.bossPool.forEach(function (enemy) {
      enemy.animations.add('fly', [0, 1, 2], 20, true);
      enemy.animations.add('hit', [3, 1, 3, 2], 20, false);
      enemy.events.onAnimationComplete.add(function (e) {
        e.play('fly');
      }, this);
    });
    this.boss = this.bossPool.getTop();
    this.bossApproaching = false;
    this.bossInitialHealth = 500;
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
    this.bulletPool.createMultiple(100, 'bullet');
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
      {font: "16px Audiowide", fill: "#fff", align: "center"});
    this.instructions.anchor.setTo(0.5, 0.5);
    this.instExpire = this.time.now + 5000; // the max time to show this text

    this.score = 0;
    this.scoreText = this.add.text(
      this.game.width / 2,
      30,
      '' + this.score,
      {
        font: '20px Audiowide', fill: '#fff', align: 'center'
      });
    this.scoreText.anchor.setTo(0.5, 0.5);
  },

  setupPlayerIcons: function () {
    this.weaponLevel = 0;
    this.powerup_charge = 300;

    this.powerup_timer = this.powerup_charge;

    // drops
    this.powerUpPool = this.add.group();
    this.powerUpPool.enableBody = true;
    this.powerUpPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.powerUpPool.createMultiple(5, 'powerup1');
    this.powerUpPool.setAll('anchor.x', 0.5);
    this.powerUpPool.setAll('anchor.y', 0.5);
    this.powerUpPool.setAll('outOfBoundsKill', true);
    this.powerUpPool.setAll('checkWorldBounds', true);
    this.powerUpPool.setAll('reward', 100, false, false, 0, true);

    // display
    this.powerUpDisplay = this.add.group();
    for (var i = 0; i < 5; i++) {
      var icon = this.powerUpDisplay.create(30 + (30 * i), 60, 'powerup1');
      icon.anchor.setTo(0.5, 0.5);
      icon.visible = false;
    }

    this.lives = this.add.group();
    for (var i = 3; i > 0; i--) {
      var life = this.lives.create(30 + (30 * i), 30, 'player');
      life.scale.setTo(0.5, 0.5);
      life.anchor.setTo(0.5, 0.5);
    }
  },

  setupSound: function () {
    this.sndExplosion = this.add.audio('explosion');
    this.sndPlayerExplosion = this.add.audio('playerExplosion');
    this.sndEnemyFire = this.add.audio('enemyFire');
    this.sndPlayerFire = this.add.audio('playerFire');
    this.sndPlayerFire.volume = 0.5;
    this.sndPowerUp = this.add.audio('powerUp');
  },

  setupMusic: function () {
    this.musicGame = this.add.audio('game');
    this.musicGame.play("", 0, 1, true);
    this.add.tween(this.musicGame)
      .from({volume: 0}, 1000, Phaser.Easing.Linear.Out, true);

    this.musicBoss = this.add.audio('bossBattle');
    this.musicEnd = this.add.audio('endgame');
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

    // Powerups
    this.physics.arcade.overlap(
      this.player, this.powerUpPool, this.playerPowerUp, null, this);

    // Boss
    if (this.bossApproaching === false) {
      this.physics.arcade.overlap(
        this.bulletPool, this.bossPool, this.enemyHit, null, this);
      this.physics.arcade.overlap(
        this.player, this.bossPool, this.playerHit, null, this);
    }
  },

  playerPowerUp: function (player, powerUp) {
    // increment score
    this.addToScore(powerUp.reward);
    powerUp.kill();
    this.sndPowerUp.play();
    // increase weapon level
    if (this.weaponLevel < 5) {
      this.weaponLevel++;
      // reset timer on collect.. this might be too powerful, playtest needed
      this.powerup_timer = this.powerup_charge;
      // update display, using the same powerup icon that dropped
      this.updatePowerIconDisplay();
    }
  },

  spawnEnemies: function () {
    // Greenie spawning
    if (this.nextEnemyAt < this.time.now && this.enemyPool.countDead() > 0) {
      this.nextEnemyAt = this.time.now + this.enemyDelay;
      var enemy = this.enemyPool.getFirstExists(false);
      // spawn at a random location at the top of the screen
      enemy.reset(this.rnd.integerInRange(30, this.game.width - 30), 0,
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
        this.rnd.integerInRange(30, this.game.width - 30), 0, this.shooterInitialHealth);
      // choose a random target location at the bottom
      var target = this.rnd.integerInRange(20, this.game.width - 20);
      // move to target and rotate sprite accordingly
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

    // attacking
    if (this.input.keyboard.isDown(Phaser.Keyboard.Z) ||
        this.input.activePointer.isDown) {
      if (this.returnText && this.returnText.exists) {
        this.quitGame();
      } else {
        this.fire();
      }
    }

    // diagonal movement
    if (this.cursors.left.isDown && this.cursors.up.isDown) {
      this.player.body.velocity.x = -(this.player.speed * damper);
      this.player.body.velocity.y = -(this.player.speed * damper);
      this.sea.autoScroll(10, 20);
      return;
    } else if (this.cursors.left.isDown && this.cursors.down.isDown) {
      this.player.body.velocity.x = -(this.player.speed * damper);
      this.player.body.velocity.y = (this.player.speed * damper);
      this.sea.autoScroll(10, 1);
      return;
    }

    if (this.cursors.right.isDown && this.cursors.up.isDown) {
      this.player.body.velocity.x = (this.player.speed * damper);
      this.player.body.velocity.y = -(this.player.speed * damper);
      this.sea.autoScroll(-10, 20);
      return;
    } else if (this.cursors.right.isDown && this.cursors.down.isDown) {
      this.player.body.velocity.x = (this.player.speed * damper);
      this.player.body.velocity.y = (this.player.speed * damper);
      this.sea.autoScroll(-10, 1);
      return;
    }

    // horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -this.player.speed;
      this.sea.autoScroll(10, 5);
      return;
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = this.player.speed;
      this.sea.autoScroll(-10, 5);
      return;
    }

    // vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -this.player.speed;
      this.sea.autoScroll(0, 20);
      return;
    } else if (this.cursors.down.isDown) {
      this.player.body.velocity.y = this.player.speed;
      this.sea.autoScroll(0, 1);
      return;
    }

    // mouse/touch movement
    if (this.game.input.activePointer.isDown &&
        this.game.physics.arcade.distanceToPointer(this.player) > 15) {
      this.game.physics.arcade.moveToPointer(this.player, this.player.speed);
    }

    this.sea.autoScroll(0, 5);
  },

  processDelayedEffects: function () {
    // Instructions removal
    if (this.instructions.exists && this.time.now > this.instExpire) {
      this.instructions.destroy();
    }

    // Game Reset Instructions
    if (this.showReturn && this.time.now > this.showReturn) {
      this.returnText = this.add.text(
        this.game.width / 2, this.game.height / 2 + 20,
        'Press Z or Tap Game to go back to Main Menu',
        {font: '16px Audiowide', fill: '#fff'});
      this.returnText.anchor.setTo(0.5, 0.5);
      this.showReturn = false;
    }

    // Ghost effect after collision
    if (this.ghostUntil && this.ghostUntil < this.time.now) {
      this.ghostUntil = null;
      this.player.play('fly');
    }

    // Finite powerups
    if (this.weaponLevel > 0) {
      if (this.powerup_timer > 0) {
        // here the powerup steadily drains over time
        this.powerup_timer--;
      } else {
        // once drained, the weapon level goes down
        // the display is updated, and the timer is reset
        this.weaponLevel--;
        this.powerup_timer = this.powerup_charge;
        this.updatePowerIconDisplay();
      }
    }

    // Boss has arrived, start the fight
    if (this.bossApproaching && this.boss.y > 80) {
      this.bossApproaching = false;
      this.boss.health = 500;
      this.boss.nextShotAt = 0;

      this.boss.body.velocity.y = 0;
      this.boss.body.velocity.x = 200; // it moves from side to side..
      this.boss.body.bounce.x = 1; // ... and bounces off the walls
      this.boss.body.collideWorldBounds = true;
    }
  },

  updatePowerIconDisplay: function () {
    power = this.weaponLevel;
    for (var i = 0; i < 5; i ++){
      if (i < power) {
        icon = this.powerUpDisplay.getAt(i);
        icon.visible = true;
      } else {
        icon = this.powerUpDisplay.getAt(i);
        icon.visible = false;
      }
    }
  },

  render: function () {
    //  DEBUGGING CODE
    // this.game.debug.body(this.player);
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
    this.sndPlayerFire.play();
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
      if (this.weaponLevel > 0) this.weaponLevel--;
      this.updatePowerIconDisplay();
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
    // Shooters
    this.shooterPool.forEachAlive(function(enemy) {
      if (this.time.now > enemy.nextShotAt &&
          this.enemyBulletPool.countDead() > 0) {
        var bullet = this.enemyBulletPool.getFirstExists(false);
        bullet.reset(enemy.x, enemy.y);
        this.physics.arcade.moveToObject(bullet, this.player, 150);
        enemy.nextShotAt = this.time.now + this.shooterShotDelay;
        this.sndEnemyFire.play(); // dont like this here
                                  // this looks like it plays for every
                                  // enemy firing, even if they are firing
                                  // at the same time... waste of resources.
      }
    }, this);

    // Boss
    if (this.bossApproaching === false &&
        this.boss.alive &&
        this.boss.nextShotAt < this.time.now &&
        this.enemyBulletPool.countDead() > 9) {
      this.boss.nextShotAt = this.time.now + 1000;
      for (var i = 0; i < 5; i++) {
        // process 2 bullets at a time
        var leftBullet = this.enemyBulletPool.getFirstExists(false); // get the first dead sprite
        leftBullet.reset(this.boss.x - 10 - i * 10, this.boss.y + 20);

        var rightBullet = this.enemyBulletPool.getFirstExists(false);
        rightBullet.reset(this.boss.x + 10 + i * 10, this.boss.y + 20);

        if (this.boss.health > 250) {
          // Phase 1 -- aim directly at the player
          this.physics.arcade.moveToObject(leftBullet, this.player, 150);
          this.physics.arcade.moveToObject(rightBullet, this.player, 150);
        } else {
          // Phase 2 -- aim slighty off center of the player
          this.physics.arcade.moveToXY(
            leftBullet, this.player.x - i * 100, this.player.y, 150);
          this.physics.arcade.moveToXY(
            rightBullet, this.player.x + i * 100, this.player.y, 150);
        }
      }
      this.sndEnemyFire.play();
    }
  },

  damageEnemy: function (enemy, damage) {
    this.textFX(enemy);
    enemy.damage(damage);
    if (enemy.alive) {
      this.tweenFX(enemy); // testing for tween spam
      enemy.play('hit');
    } else {
      this.explode(enemy);
      this.spawnPowerUp(enemy);
      this.addToScore(enemy.reward);
      if (enemy.key === 'boss') { // we killed the boss, WOOHOO!!!
        this.score += 10000;
        this.enemyPool.destroy();
        this.shooterPool.destroy();
        this.bossPool.destroy();
        this.enemyBulletPool.destroy();
        this.displayEnd(true);
      }
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

  spawnPowerUp: function(enemy) {
    if (this.powerUpPool.countDead() === 0 || this.weaponLevel === 5) {
      return;
    }

    if (this.rnd.frac() < enemy.dropRate) {
      var powerUp = this.powerUpPool.getFirstExists(false);
      powerUp.reset(enemy.x, enemy.y);
      powerUp.body.velocity.y = 100;
    }
  },

  addToScore: function (score) {
    this.score += score;
    this.scoreText.text = this.score;

    if (this.score >= 20000 && this.bossPool.countDead() == 1) {
      this.spawnBoss()
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
    if (sprite.key === 'player') {
      this.sndPlayerExplosion.play();
    } else {
      this.sndExplosion.play();
    }
  },

  spawnBoss: function() {
    this.add.tween(this.musicGame)
      .to({volume: 0}, 1000, Phaser.Easing.Linear.Out, true);

    this.musicBoss.play("", 0, 1, true);
    this.add.tween(this.musicBoss)
      .from({volume: 0}, 1000, Phaser.Easing.Linear.Out, true);

    this.bossApproaching = true;
    this.boss.reset(this.game.width / 2, 0, this.bossInitialHealth);
    this.game.physics.enable(this.boss, Phaser.Physics.ARCADE);
    this.boss.body.velocity.y = 15;
    this.boss.play('fly');
  },

  displayEnd: function (win) {
    // you can't win and lose at the same time
    if (this.endText && this.endText.exists) {
      return;
    }

    // CROSSFADE -----
    this.add.tween(this.musicBoss)
      .to({volume: 0}, 1000, Phaser.Easing.Linear.Out, true);

    this.musicEnd.play("", 0, 1, true);
    this.add.tween(this.musicEnd)
      .from({volume: 0}, 1000, Phaser.Easing.Linear.Out, true);
    // ---------------

    var msg = win ? 'You Win!!!' : 'Game Over!';
    this.endText = this.add.text(
      this.game.width / 2,
      this.game.height / 2 - 72,
      msg,
      {font: "72px Audiowide", fill: "#fff"});
    this.endText.anchor.setTo(0.5, 0);
    this.showReturn = this.time.now + 2000;
  },

  quitGame: function (pointer) {

    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
    this.sea.destroy();
    this.player.destroy();
    this.enemyPool.destroy();
    this.bulletPool.destroy();
    this.explosionPool.destroy();
    this.shooterPool.destroy();
    this.enemyBulletPool.destroy();
    this.powerUpPool.destroy();
    this.bossPool.destroy();

    this.instructions.destroy();
    this.scoreText.destroy();
    this.endText.destroy();
    this.returnText.destroy();

    this.powerUpDisplay.destroy();
    this.lives.destroy();

    this.sndExplosion.stop();
    this.sndPlayerExplosion.stop();
    this.sndEnemyFire.stop();
    this.sndPlayerFire.stop();
    this.sndPowerUp.stop();

    this.musicGame.stop();
    this.musicBoss.stop();
    this.musicEnd.stop();

    this.sndExplosion = null;
    this.sndPlayerExplosion = null;
    this.sndEnemyFire = null;
    this.sndPlayerFire = null;
    this.sndPowerUp = null;

    this.musicGame = null;
    this.musicBoss = null;
    this.musicEnd = null;

    //  Then let's go back to the main menu.
    this.state.start('MainMenu');

  }

};
