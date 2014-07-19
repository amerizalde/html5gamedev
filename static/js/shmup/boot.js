var BasicGame = {};

BasicGame.Boot = function (game) {
};

BasicGame.Boot.prototype = {

  preload: function () {
    //  Here we load the assets required for our preloader (in this case a loading bar)
    this.load.image('preloaderBar',
      'assets/shmup/Phaser_splash.jpg');
  },

  create: function () {
    //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
    this.input.maxPointers = 1;
    //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
    // this.stage.disableVisibilityChange = true;
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.setScreenSize();
    // left this in case I actually have differences that need to be addressed.
    if (this.game.device.desktop) {
      console.log("Desktop Mode.")
    } else {
      console.log("Not in Desktop Mode.")
    }
    //  By this point the preloader assets have loaded to the cache, we've set the game settings
    //  So now let's start the real preloader going
    this.state.start('Preloader');
  }
};
