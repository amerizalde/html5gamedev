// create a Game object
BasicGame.Game = function (game) {

};

// add methods and properties
BasicGame.Game.prototype = {

  create: function () {
    this.setupBackground();
    this.setupPlayer();
    this.setupNPC();
    this.setupSFX();
  },

  setupBackground: function () {
    this.bg = this.add.tileSprite(0, 0, this.world.width, this.world.height,
      'background');
  },

  setupPlayer: function () {
    this.player = this.add.sprite(
      this.world.centerX,
      this.world.height - 75,
      'player');
    this.player.anchor.setTo(0.5, 0.5);
  },
  setupNPC: function () {
    this.gp1 = this.add.sprite(
      this.world.centerX, this.world.centerY, 'gp1');
    this.gp2 = this.add.sprite(91, this.world.randomY, 'gp2');
    this.gp3 = this.add.sprite(this.world.width - 91, this.world.randomY, 'gp3');
    this.gp4 = this.add.sprite(
      this.world.randomX,
      this.world.randomY,
      'gp4');
  },

  update: function () {},

  // create-related functions
  setupSFX: function () {
    this.testSnd = this.add.audio('sfx2');
  },

  quitGame: function (pointer) {
    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

    this.testSnd.stop();
    this.testSnd = null;
    //  Then let's go back to the main menu.
    this.state.start('Game');
  },
};
