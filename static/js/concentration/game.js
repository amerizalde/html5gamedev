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
    this.pick_one = null;
    this.pick_two = null;
    this.matchedcount = this.table.length / 2;
    this.setupSFX();
    this.setTable();
  },

  update: function () {
    if (this.showText) {
      this.returnText = this.add.text(
        this.game.width / 2,
        this.game.height / 2 + 20,
        'Press Z or Tap Game to go back to Main Menu',
        {font: '16px Audiowide', fill: '#fff'});
      this.returnText.anchor.setTo(0.5, 0.5);
      if (this.input.activePointer.isDown) {
        this.quitGame();
      }
    }
  },

  // create-related functions
  setupSFX: function () {
    this.pickSnd1 = this.add.audio('sfx3');
    this.pickSnd2 = this.add.audio('sfx4');
    this.matchSnd = this.add.audio('sfx2');
  },

  setTable: function () {
    var suits = ["Clubs", "Hearts", "Diamonds", "Spades"];
    var ranks = ["A", "K", 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

    for (var i = 0; i < this.table.length; i++) {
      var suit = suits[Math.floor(Math.random() * suits.length)];
      var rank = ranks[Math.floor(Math.random() * ranks.length)];
      var cardFrame = "card" + suit + rank;
      this.table[i] = cardFrame;
      this.table[this.table.length - i - 1] = cardFrame;
    }

    this.shuffle();

    // create a sprite group
    this.cards = this.add.group();
    // add physics body to all sprites created
    // must be set before the sprites are added
    this.cards.enableBody = true;
    this.cards.physicsBodyType = Phaser.Physics.ARCADE;
    // create sprites
    this.cards.createMultiple(this.ROWS * this.COLS, "cards", "cardBack_blue2");
    this.cards.setAll('outOfBoundsKill', true);
    this.cards.setAll('checkWorldBounds', true);
    this.cards.setAll('inputEnabled', true);
    // force a property into the sprite object
    this.cards.setAll('reveal', 0, false, false, 0, true);
    for (var i = 0; i < this.ROWS * this.COLS; i++) {
      // get the first sprite not in use.
      var card = this.cards.getFirstExists(false);
      // set the index here so that it matches up with a index in this.table
      // for lookup in revealCard()
      card.reveal = i;
      // move to position
      card.reset(
        i % this.COLS * this.TILE_W,              // x
        Math.floor(i / this.COLS) * this.TILE_H   // y
        );
      // adjust to screen
      card.scale.setTo(this.SCALE, this.SCALE);
      // add event
      card.events.onInputDown.add(this.revealCard, this);
    }
  },

  shuffle: function () {
    // http://en.wikipedia.org/wiki/Fisher-Yates_shuffle
    var count = this.table.length, temp, index;
    while (count) {
      // pick a remaining element...
      index = Math.floor(Math.random() * count--);
      // swap it with the current element
      temp = this.table[count];
      this.table[count] = this.table[index];
      this.table[index] = temp;
    }
  },

  quitGame: function (pointer) {
    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
    this.cards.destroy();
    this.pickSnd1.stop();
    this.pickSnd2.stop();
    this.matchSnd.stop();
    this.pickSnd1 = null;
    this.pickSnd2 = null;
    this.matchSnd = null;
    if (this.returnText) {
      this.returnText.destroy();
    }
    //  Then let's go back to the main menu.
    this.state.start('MainMenu');
  },

  pickACard: function (card, pointer) {
    var suits = ["Clubs", "Hearts", "Diamonds", "Spades"];
    var ranks = ["A", "K", 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
    // https://stackoverflow.com/questions/4550505/getting-random-value-from-an-array
    var suit = suits[Math.floor(Math.random() * suits.length)];
    var rank = ranks[Math.floor(Math.random() * ranks.length)];
    // set the frame to a valid name from the 'cards' atlas.
    card.frameName = "card" + suit + rank;
  },

  revealCard: function (card, pointer) {
    // flip back the previous picks
    if (this.pick_one && this.pick_two) {
      this.flip();
    }
    this.pickSnd1.play();
    this.pickSnd2.play();
    // reveal the pick
    card.frameName = this.table[card.reveal];
    // juice up the interaction
    card.bringToTop();
    this.add.tween(card.scale).to(
      {x: 0.75, y: 0.75}, 100, Phaser.Easing.Bounce.Out, true,
      0, false, true);

    if (this.pick_one === null) {
      // the first pick
      this.pick_one = card;
    } else {
      // ignore picks on the same location
      if (card.x != this.pick_one.x || card.y != this.pick_one.y){
        // the second pick
        this.pick_two = this.pick_one;
        this.pick_one = card;
      }
    }

    if (this.pick_one && this.pick_two) {
      // we have two picks so check for a match
      this.checkMatches();
    }
  },

  checkMatches: function () {
      if (this.pick_one.frameName === this.pick_two.frameName) {
        // MATCH!
        this.matchSnd.play();
        this.dissolve();
        // decrement so we know if the game is over
        this.matchedcount--;
        console.log(this.matchedcount);
        if (this.matchedcount <= 0) {
          this.endGameText(true);
        }
      } else {
        // NOT A MATCH!
        return;
      }
  },

  flip: function () {
    // "flipping the cards back over"
    this.pick_one.frameName = "cardBack_blue2";
    this.pick_two.frameName = "cardBack_blue2";
    this.pick_one = null;
    this.pick_two = null;
  },

  dissolve: function () {
    // the card sprites are set to kill themselves if they run out of bounds,
    // so no need to call it explicitly.
    // this is all the dropping animation.
    this.pick_one.bringToTop();
    this.pick_two.bringToTop();
    this.pick_one.body.reset(this.pick_one.x, this.pick_one.y);
    this.pick_one.body.velocity.y = 500;
    this.pick_two.body.reset(this.pick_two.x, this.pick_two.y);
    this.pick_two.body.velocity.y = 500;
    this.add.tween(this.pick_one.body.velocity.y).to(
      1000, 250, Phaser.Easing.Back.In, true,
      0, false, false);
    this.add.tween(this.pick_two.body.velocity.y).to(
      1000, 100, Phaser.Easing.Back.In, true,
      0, false, false);
    this.add.tween(this.pick_one.scale).to(
      {x: 0.0, y: 0.0}, 1000, Phaser.Easing.Back.Out, true,
      0, false, false);
    this.add.tween(this.pick_two.scale).to(
      {x: 0.0, y: 0.0}, 1000, Phaser.Easing.Back.Out, true,
      0, false, false);
  },

  endGameText: function (win) {
    // play again?
    this.showText = true;
  },
};
