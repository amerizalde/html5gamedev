// create a Game object
BasicGame.Game = function (game) {

};

// add methods and properties
BasicGame.Game.prototype = {
  // the Phaser Game Loop -- preload, create, [update, render, repeat]

  create: function () {
    this.cardBack = this.add.sprite(100, 100, "cards", "cardBack_blue2");
    this.cardBack.inputEnabled = true;
    this.cardBack.events.onInputDown.add(this.pickACard, this);
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
    for (prop in this.cache) {
      console.log(prop);
    }
  },
};
