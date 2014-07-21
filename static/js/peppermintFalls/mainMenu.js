
BasicGame.MainMenu = function (game) {


};

BasicGame.MainMenu.prototype = {

  create: function () {

    // sprites are loaded in the order added here.
    this.bg = this.add.sprite(0, 0, 'background');

    this.setupPlayer();

    /*this.musicPregame = this.add.audio('pregame');
    this.musicPregame.play("", 0, 1, true);
    this.add.tween(this.musicPregame)
      .from({volume: 0}, 2000, Phaser.Easing.Linear.Out, true);
*/
    console.log("Grubby entrance");
    var entrance = this.add.tween(this.player)
      .from({x: -8}, 5000, Phaser.Easing.Elastic.In, true);
    entrance.onStart = this.player.play("left");
    entrance.onComplete = this.player.play("open");

    console.log("Title entrance");
    this.titlePNG = this.add.sprite(
      this.world.centerX,
      200,
      'peppermintFalls',
      'title.png');
    this.titlePNG.anchor.setTo(0.5, 0.5);
    this.add.tween(this.titlePNG)
      .from({y: -8}, 2000, Phaser.Easing.Bounce.In, true);

    this.loadingText = this.add.text(
      this.game.width / 2,
      this.game.height / 2,
      "Press Z or tap/click game to start",
      { font: "20px Audiowide", fill: "#fff" });
    this.loadingText.anchor.setTo(0.5, 0.5);
    this.add.text(
      this.game.width / 2,
      this.game.height - 32,
      "Copyright (c) 2014 Andrew Merizalde",
      { font: "10px monospace", fill: "#fff", align: "center"}).anchor.setTo(0.5, 0.5);
  },

  update: function () {

    if (this.input.keyboard.isDown(Phaser.Keyboard.Z) || this.input.activePointer.isDown) {
      this.player.play("close");
      this.startGame();
    }
    //  Do some nice funky main menu effect here

  },

  startGame: function (pointer) {

    //  Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
    // this.musicPregame.stop();

    //  And start the actual game
    this.state.start('Game');

  },

  // create-related functions
  setupPlayer: function () {
    console.log("player setup start");
    // ## PLAYER
    this.player = this.add.sprite(
      this.game.width / 2,
      this.game.height - 100,
      'peppermintFalls',
      [
        "grubby_idle.png",
        "grubby_open_01.png",
        "grubby_open_02.png",
        "grubby_left.png",
        "grubby_right.png"
      ]);
    this.player.anchor.setTo(0.5, 0.5);
    this.player.scale.setTo(2, 2);
    this.player.animations.add('open', [0, 1, 2], 9, false);
    this.player.animations.add('close', [2, 1, 0], 9, false);
    this.player.animations.add('left', [3], 1, false);
    this.player.animations.add('right', [4], 1, false);
    this.player.animations.add('idle', [0], 1, false);

    this.player.play('idle');

    console.log("player setup complete");
  },

};
