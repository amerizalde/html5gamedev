
BasicGame.Preloader = function (game) {
  this.background = null;
  this.preloadBar = null;
  //this.ready = false;
};

BasicGame.Preloader.prototype = {
  preload: function () {
    //  Show the loading progress bar asset we loaded in boot.js
    this.stage.backgroundColor = '#2d2d2d';
    this.preloadBar = this.add.sprite(
      0,
      0,
      'preloaderBar');
    this.add.text(
      this.game.width / 2,
      this.game.height / 2,
      "Loading...",
      { font: "64px Audiowide", fill: "#fff" }).anchor.setTo(0.5, 0.5);

    //  This sets the preloadBar sprite as a loader sprite.
    //  What that does is automatically crop the sprite from 0 to full-width
    //  as the files below are loaded in.
    this.load.setPreloadSprite(this.preloadBar);

    //  Here we load the rest of the assets our game needs.
    this.load.image('titlepage', 'assets/match3_splash.jpg');
    this.loadimage('tile_1', 'assets/polygon_1.png');
    this.loadimage('tile_2', 'assets/polygon_2.png');
    this.loadimage('tile_3', 'assets/polygon_3.png');
    this.loadimage('tile_4', 'assets/polygon_4.png');
    this.loadimage('tile_5', 'assets/polygon_5.png');
    this.loadimage('tile_6', 'assets/polygon_6.png');
    //this.load.audio('explosion', ['assets/explosion.wav']);
    //this.load.audio('playerExplosion', ['assets/player-explosion.wav']);
    //this.load.audio('enemyFire', ['assets/enemy-fire.wav']);
    //this.load.audio('playerFire', ['assets/player-fire.wav']);
    //this.load.audio('powerUp', ['assets/powerup.wav']);
    //this.load.audio('titleMusic', ['audio/main_menu.mp3']);
    //  + lots of other required assets here
  },

  create: function () {
    //  Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
    this.preloadBar.cropEnabled = false;
  },

  update: function () {
    //  You don't actually need to do this, but I find it gives a much smoother game experience.
    //  Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
    //  You can jump right into the menu if you want and still play the music, but you'll have a few
    //  seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
    //  it's best to wait for it to decode here first, then carry on.
    
    //  If you don't have any music in your game then put the game.state.start line into the create function and delete
    //  the update function completely.
    
    //if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
    //{
    //  this.ready = true;
      this.state.start('MainMenu');
    //}
  }
};
