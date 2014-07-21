// create a Game object
BasicGame.Game = function (game) {

};

// add methods and properties
BasicGame.Game.prototype = {

  create: function () {
    console.log("Create done.");
  },

  // update-related functions
  update: function () {
    if (this.input.keyboard.isDown(Phaser.Keyboard.Z) || this.input.activePointer.isDown) {
      this.quitGame();
    }
  },

  quitGame: function (pointer) {
    //  Then let's go back to the main menu.
    this.state.start('Boot');
  },
};
