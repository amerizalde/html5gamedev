
BasicGame.MainMenu = function (game) {


};

BasicGame.MainMenu.prototype = {

  create: function () {

    // sprites are loaded in the order added here.
    this.sea = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'sea');
    this.sea.autoScroll(0, 5);

    this.setupPlayer();

    this.musicPregame = this.add.audio('pregame');
    this.musicPregame.play("", 0, 1, true);
    this.add.tween(this.musicPregame)
      .from({volume: 0}, 2000, Phaser.Easing.Linear.Out, true);

    this.add.tween(this.player)
      .from({y: this.world.height + 50}, 5000, Phaser.Easing.Elastic.Out, true);

    this.titlePNG = this.add.sprite(this.world.centerX, 200, 'title');
    this.titlePNG.anchor.setTo(0.5, 0.5);

    this.loadingText = this.add.text(
      this.game.width / 2,
      this.game.height / 2,
      "Press Z or tap/click game to start",
      { font: "20px Audiowide", fill: "#fff" });
    this.loadingText.anchor.setTo(0.5, 0.5);
    this.add.text(
      this.game.width / 2,
      this.game.height - 64,
      "image assets Copyright (c) 2002 Ari Feldman",
      { font: "10px monospace", fill: "#fff", align: "center"}).anchor.setTo(0.5, 0.5);
    this.add.text(
      this.game.width / 2,
      this.game.height - 32,
      "sound assets Copyright (c) 2012 - 2013 Devin Watson",
      { font: "10px monospace", fill: "#fff", align: "center"}).anchor.setTo(0.5, 0.5);

  },

  update: function () {

    if (this.input.keyboard.isDown(Phaser.Keyboard.Z) || this.input.activePointer.isDown) {
      this.startGame();
    }
    //  Do some nice funky main menu effect here

  },

  startGame: function (pointer) {

    //  Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
    // this.musicPregame.stop();
    this.musicPregame.stop();

    //  And start the actual game
    this.state.start('Game');

  },

  // create-related functions
  setupPlayer: function () {
    // ## PLAYER
    this.player = this.add.sprite(
      this.game.width / 2,
      this.game.height - 100,
      'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.animations.add('fly', [0, 1, 2], 20, true);
    this.player.play('fly');
  },

};
