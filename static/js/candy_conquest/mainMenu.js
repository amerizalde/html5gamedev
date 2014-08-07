
BasicGame.MainMenu = function (game) {


};

BasicGame.MainMenu.prototype = {

  create: function () {

    // sprites are loaded in the order added here.
    this.bg = this.add.tilemap('level');
    this.bg.addTilesetImage('level_sheet', 'tiles');
    var layer = this.bg.createLayer('layer_1');
    layer.resizeWorld();
    layer.wrap = true;

    this.setupIntro();
    console.log("create complete");
  },

  update: function () {

    if (this.input.activePointer.isDown) {
      this.state.start('Game');
    }
    //  Do some nice funky main menu effect here

  },

  startGame: function (pointer) {

    //  Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
    // this.musicPregame.stop();

    //  And start the actual game
    // this.state.start('Game');

  },

  // create-related functions
  setupIntro: function () {
    // logo
    this.logoPNG = this.add.sprite(
      this.game.width / 2,
      200,
      'logo');
    this.logoPNG.anchor.setTo(0.5, 0.5);
    this.add.tween(this.logoPNG).from({y: -10}, 1000, Phaser.Easing.Bounce.Out, true);

  },

};
