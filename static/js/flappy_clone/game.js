// create a Game object
BasicGame.Game = function (game) {

};

// add methods and properties
BasicGame.Game.prototype = {

  create: function () {
    this.setupBackground();
    this.setupPlayer();
    this.setupKeys()
  },

  // create-related functions
  setupBackground: function () {
    this.bg = this.add.tileSprite(0, 0, this.world.width, this.world.height,
      'background');
  },

  setupPlayer: function () {

  },
  setupNPC: function () {

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

  },

  // update-related functions
  update: function () {
    this.checkCollisions();
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

  },

  fire: function() {

  },

  quitGame: function (pointer) {
    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

    //  Then let's go back to the main menu.
    this.state.start('GameOver');
  },

};
