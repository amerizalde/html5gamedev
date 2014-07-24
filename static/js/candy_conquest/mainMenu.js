
BasicGame.MainMenu = function (game) {


};

BasicGame.MainMenu.prototype = {

  create: function () {

    // sprites are loaded in the order added here.
    this.bg = this.add.tilemap('level');
    console.log(this.bg);
    this.bg.addTilesetImage('level_sheet', 'tiles');
    var layer = this.bg.createLayer('layer_1');
    layer.resizeWorld();
    layer.wrap = true;

    // this.setupPlayer();

    // title
    /*this.titlePNG = this.add.sprite(
      this.world.centerX,
      200,
      'backgrounds',
      'title.png');
    this.titlePNG.anchor.setTo(0.5, 0.5);
    this.add.tween(this.titlePNG).from({y: -8}, 1000, Phaser.Easing.Bounce.Out, true);*/

    this.loadingText = this.add.text(
      this.camera.width / 2,
      this.camera.height / 2,
      "Press Z or tap/click game to start",
      { font: "20px Audiowide", fill: "#fff" });
    this.loadingText.anchor.setTo(0.5, 0.5);

    this.add.text(
      this.camera.width / 2,
      this.camera.height - 32,
      "Copyright (c) 2014 Andrew Merizalde",
      { font: "10px monospace", fill: "#fff", align: "center"}).anchor.setTo(0.5, 0.5);
    console.log("create complete");
  },

  update: function () {

    if (this.input.keyboard.isDown(Phaser.Keyboard.Z) || this.input.activePointer.isDown) {
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
  setupPlayer: function () {
    console.log("player setup start");
    // ## PLAYER
    /*this.player = this.add.sprite(
      this.game.width / 2,
      this.game.height - 100,
      'grubby'
    );
    this.player.anchor.setTo(0.5, 0.5);
    this.player.scale.setTo(4, 4);
    this.player.animations.add('open', [0, 2, 3], 9, false);
    this.player.animations.add('close', [3, 2, 0], 9, false);
    this.player.animations.add('chew', [0, 2, 3, 2, 0], 10, true);
    this.player.animations.add('left', [1], 1, false);
    this.player.animations.add('right', [4], 1, false);
    this.player.animations.add('idle', [0], 1, false);

    this.player.play('idle');
*/
    console.log("player setup complete");
  },

};
