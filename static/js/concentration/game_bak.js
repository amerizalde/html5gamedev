// create a Game object
BasicGame.Game = function (game) {

};

// add methods and properties
BasicGame.Game.prototype = {
  // the Phaser Game Loop -- preload, create, [update, render, repeat]

  create: function () {
    this.ROWS = 8;
    this.COLS = 6;
    this.SCALE = 0.52;
    this.TILE_W = 141 * this.SCALE;
    this.TILE_H = 190 * this.SCALE;
    this.table = new Array(this.ROWS * this.COLS);
    /*
    this.cardBacks = this.add.sprite("cards", "cardBack_blue2");
    this.card.inputEnabled = true;
    this.card.events.onInputDown.add(this.pickACard, this);*/

    this.setTable();
  },

  update: function () {
  },

  // create-related functions

  render: function () {
    //  DEBUGGING CODE
    // this.game.debug.body(this.player);
  },

  quitGame: function (pointer) {
    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

    //  Then let's go back to the main menu.
    this.state.start('MainMenu');
  },

  pickACard: function (card, pointer) {
    var suits = ["Clubs", "Hearts", "Diamonds", "Spades"];
    var ranks = ["A", "K", 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
    // https://stackoverflow.com/questions/4550505/getting-random-value-from-an-array
    var suit = suits[Math.floor(Math.random() * suits.length)];
    var rank = ranks[Math.floor(Math.random() * ranks.length)];
    card.frameName = "card" + suit + rank;
    console.log(card.frameName);
    /*
this.cache._cacheMap.2.cards.frameData._frames.[0 : 54] // the cards
    */
  },

  setTable: function () {
    var suits = ["Clubs", "Hearts", "Diamonds", "Spades"];
    var ranks = ["A", "K", 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

    for (var i = 0; i < this.ROWS * this.COLS; i++) {
      var suit = suits[Math.floor(Math.random() * suits.length)];
      var rank = ranks[Math.floor(Math.random() * ranks.length)];
      var cardFrame = "card" + suit + rank;
      this.table[i] = cardFrame;
      this.table[this.table.length - i] = cardFrame;
    }

    //set the table
    // https://stackoverflow.com/questions/4550505/getting-random-value-from-an-array
    this.cards = this.add.group();
    this.cards.createMultiple(this.ROWS * this.COLS, "cards", "cardBack_blue2");
    this.cards.setAll('inputEnabled', true);
    this.cards.setAll('reveal', 0, false, false, 0, true);
    for (var i = 0; i < this.ROWS * this.COLS; i++) {
      // var frame = this.table[i];
      var card = this.cards.getFirstExists(false);
      card.reveal = i;
      card.reset(
        i % this.COLS * this.TILE_W,              // x
        Math.floor(i / this.COLS) * this.TILE_H   // y
        );
      // card.events...
      card.scale.setTo(this.SCALE, this.SCALE);
      card.events.onInputDown.add(this.revealCard, this);
    }
  },

  revealCard: function (card, pointer) {
    card.frameName = this.table[card.reveal];
  },
};
