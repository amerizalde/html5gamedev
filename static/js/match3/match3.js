
// create a Game object
BasicGame.Game = function (game) {
  this.TILE_SIZE = 48;
  this.FIELD_SIZE = 8;
  this.TILE_TYPES = 6;
  this.OFFSET_X = 16;
  this.OFFSET_Y = 50;
  this.g_array = new Array(this.FIELD_SIZE * this.FIELD_SIZE);
};

// add methods and properties
BasicGame.Game.prototype = {
  // the Phaser Game Loop -- preload, create, [update, render, repeat]
  preload: function () {
    // load up the assets here.
    this.buildLevel();
  },

  create: function () {
    this.drawLevel();

    // the controls
    this.cursors = this.input.keyboard.createCursorKeys();
  },

  update: function () {
  },

  // create-related functions
  buildLevel: function () {
    for (var i = 0; i < this.FIELD_SIZE * this.FIELD_SIZE; i++) {
      do {
        this.g_array[i] = Math.ceil(Math.random() * this.TILE_TYPES);
      } while (this.isHorizontalMatch(i) || this.isVerticalMatch(i));
    }
  },
  // update-related functions

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
  },

  updatePowerIconDisplay: function () {
  },

  render: function () {
    //  DEBUGGING CODE
    // this.game.debug.body(this.player);
  },

  quitGame: function (pointer) {
    //  Then let's go back to the main menu.
  },

  spawnPowerUp: function(enemy) {
  },

  addToScore: function (score) {
  },

  explode: function(sprite) {
  },

  displayEnd: function (win) {
  },

  rowNumber: function (i) {
    // return the row arg i is a part of.
    return Math.floor(i / this.FIELD_SIZE);
  },

  colNumber: function (i) {
    // return the column arg i is a part of.
    return i % this.FIELD_SIZE;
  },
  isHorizontalMatch: function (i) {
    // checking from right to left, return true if all three locations
    // contain the same number
    return this.colNumber(i) >= 2 &&
          this.g_array[i] === this.g_array[i - 1] &&
          this.g_array[i] === this.g_array[i - 2] &&
          this.rowNumber(i) === this.rowNumber(i - 2);
  },
  isVerticalMatch: function (i) {
    // checking from bottom to top, return true if all three locations
    // contain the same number.
    return this.rowNumber(i) >= 2 &&
          this.g_array[i] === this.g_array[i - this.FIELD_SIZE] &&
          this.g_array[i] === this.g_array[i - 2 * this.FIELD_SIZE];
  },

  drawLevel: function () {
    for (var i = 0; i < this.FIELD_SIZE * this.FIELD_SIZE; i++) {
      var tile = this.g_array[i];
      var item = this.add.sprite(i % this.FIELD_SIZE * this.TILE_SIZE + this.OFFSET_X,
        Math.floor(i / this.FIELD_SIZE) * this.TILE_SIZE + this.OFFSET_Y, "tile_"+tile);
    }
  },
};
