// create the GameOver object
BasicGame.GameOver = function (game) {

};

// add methods and properties
BasicGame.GameOver.prototype = {

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

  },

  setupPlayer: function () {

  },
  setupNPC: function () {

  },

  setupBullets: function () {

  },

  setupKeys: function () {

  },

  setupSFX: function () {

  },

  // update-related functions
  update: function () {
    this.processPlayerInput();
  },

  checkCollisions: function () {

  },

  guineaHit: function (enemy, bullet) {

  },

  damageNPC: function (enemy, amount) {

  },

  tweenFX: function (npc) {

  },

  textFX: function (npc) {

  },

  wordTween: function(word) {

  },

  processPlayerInput: function () {

    if (this.input.keyboard.isDown(Phaser.Keyboard.Z) ||
        this.input.activePointer.isDown) {
      // quit here
    }
  },

  quitGame: function (pointer) {
    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

    //  Then let's go back to the main menu.
    this.state.start('MainMenu');
  },

};
