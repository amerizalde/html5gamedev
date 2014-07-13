
// create a Game object
BasicGame.Game = function (game) {
  this.TILE_SIZE = 48;
  this.FIELD_SIZE = 8;
  this.TILE_TYPES = 6;
  this.OFFSET_X = 48;
  this.OFFSET_Y = 50;
  this.g_array = new Array(this.FIELD_SIZE * this.FIELD_SIZE);

  this.selectedGem = null;
  this.selectedGemStartPos = null;
  this.selectedGemTween = null;
  this.shiftedGem = null;
  this.shiftedGemTween = null;
  this.highlight = null;
};

// add methods and properties
BasicGame.Game.prototype = {
  // the Phaser Game Loop -- preload, create, [update, render, repeat]

  create: function () {
    this.buildLevel();
    this.drawLevel();

    this.selectedGemStartPos = {
      x: 0,
      y: 0,
    };
    this.highlight = this.add.graphics(0, 0);
    this.highlight.lineStyle(2, 0xff0000, 1);
    this.highlight.drawRect(48, 50, this.TILE_SIZE, this.TILE_SIZE);
    this.gem_selected = this.game.add.sprite(0, 0, null);
    this.gem_selected.addChild(this.highlight);

    this.allowInput = true;
  },

  update: function () {
    /*
      when the mouse is released with a gem selected:

      check for matches
      remove matched gems
      drop down gems above removed gems
      refill the board

    */
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
    if (this.input.activePointer.justReleased()) {
      if (this.selectedGem != null) {
        // check and kill gem matches
        if (this.shiftedGem != null) {
          // check and kill gem matches
        }
        // remove killed gems
        // null out selected and shifted gems placeholders
      }
    }

    if (this.selectedGem != null) {
      // check if selected gem can be moved to mouse position
      // if so, move it
      // if there is a previously shifted gem, move it to the selected
      //  gem's position.
      // if there is a gem already at the mouse position, swap the selected
      //  gem with the new shifted gem.
    }
  },

  processDelayedEffects: function () {
  },

  render: function () {
    //  DEBUGGING CODE
    // this.game.debug.body(this.player);
  },

  quitGame: function (pointer) {
    //  Then let's go back to the main menu.
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
    this.gems = this.add.group();
    for (var i = 0; i < this.FIELD_SIZE * this.FIELD_SIZE; i++) {
      var tile = this.g_array[i];
      var item = this.gems.create(
        i % this.FIELD_SIZE * this.TILE_SIZE + this.OFFSET_X,  // x position
        Math.floor(i / this.FIELD_SIZE) * this.TILE_SIZE + this.OFFSET_Y,  // y position
        "tile_"+tile);
      item.inputEnabled = true;
      item.events.onInputOver.add(this.pointerIsOver, this);
      // change origin to midpoint for rotation juice later.
      item.anchor.setTo(0.5, 0.5);
    }
    // force a 'reward' property onto all the gems for scoring.
    this.gems.setAll('reward', 100, false, false, 0, true);
  },

  pointerIsOver: function (gem, pointer) {
    this.gem_selected.reset(
      gem.x - this.OFFSET_X - gem.width / 2,
      gem.y - this.OFFSET_Y - gem.height / 2);
  },
};
