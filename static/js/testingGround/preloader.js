
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
      { font: "64px Audiowide", fill: "#ff00ff" }).anchor.setTo(0.5, 0.5);

    //  This sets the preloadBar sprite as a loader sprite.
    //  What that does is automatically crop the sprite from 0 to full-width
    //  as the files below are loaded in.
    this.load.setPreloadSprite(this.preloadBar);

    //  Here we load the rest of the assets our game needs.
    this.load.image('titlepage', 'assets/cards_splash.png');
    // atlas args
    // ('pick a name', image, json_file, json_object, json_type);
    this.load.atlas('guinea', 'assets/testingGrounds/sprites.png',
      'assets/testingGrounds/sprites.json', null, 1);
    this.load.atlas('batwords', 'assets/bat-words/bat-words.png',
      'assets/bat-words/bat-words.json', null, 0);
    /*
    0: Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY
    1: Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
    2: Phaser.Loader.TEXTURE_ATLAS_XML_STARLING
    3: Phaser.Loader.PHYSICS_LIME_CORONA_JSON
    4: Phaser.Loader.PHYSICS_PHASER_JSON
    */
    //  + lots of other required assets here
    this.load.image('background', 'assets/testingGrounds/darkPurple.png');
    /*this.load.image('player', 'assets/testingGrounds/playerShip1_green.png');
    this.load.image('gp1', 'assets/testingGrounds/ufoBlue.png');
    this.load.image('gp2', 'assets/testingGrounds/ufoGreen.png');
    this.load.image('gp3', 'assets/testingGrounds/ufoRed.png');
    this.load.image('gp4', 'assets/testingGrounds/ufoYellow.png');
    this.load.audio('sfx2', 'assets/jingles_PIZZA16.ogg');*/
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
