var BasicGame = {};

BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {

  preload: function () {

    //  Here we load the assets required for our preloader (in this case a loading bar)
    this.load.image('preloaderBar', 'assets/preloader-bar.png');

  },

  create: function () {

    //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
    this.input.maxPointers = 1;

    //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
    // this.stage.disableVisibilityChange = true;

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    if (this.game.device.android) {
      //  If you have any desktop specific settings, they can go in here
      this.scale.maxHeight = 800;
      this.scale.maxWidth = 480;
      this.scale.pageAlignHorizontally = true;
      console.log("Mobile settings used.")
    } else {
      this.scale.pageAlignHorizontally = true;
      console.log("Desktop settings used.")
    }

    this.scale.setScreenSize();

    //  By this point the preloader assets have loaded to the cache, we've set the game settings
    //  So now let's start the real preloader going
    this.state.start('Preloader');

  }

};
