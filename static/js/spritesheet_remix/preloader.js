
BasicGame.Preloader = function (game) {

  this.background = null;
  this.preloadBar = null;

  this.ready = false;

};

BasicGame.Preloader.prototype = {

  preload: function () {

    //  Show the loading progress bar asset we loaded in boot.js
    this.stage.backgroundColor = '#2d2d2d';

    this.preloadBar = this.add.sprite(
      0,
      0,
      'preloaderBar');

    //  This sets the preloadBar sprite as a loader sprite.
    //  What that does is automatically crop the sprite from 0 to full-width
    //  as the files below are loaded in.
    this.load.setPreloadSprite(this.preloadBar);

    //  Here we load the rest of the assets our game needs.
    this.load.image('background',
      'assets/spritesheet_remix/phaser_pixel_large_shaded.png');
    this.load.atlas(
      'batwords',
      'assets/bat-words/bat-words.png',
      'assets/bat-words/bat-words.json',
      null,
      0);
    this.load.atlas(
      'gui',
      'assets/spritesheet_remix/gui.png',
      'assets/spritesheet_remix/gui.json',
      null,
      1);

    this.load.spritesheet('p1_actions','assets/spritesheet_remix/p1_actions.png',
      354 / 5,  // image width / # number of columns in the row
      94,       // image height / number of rows
      5         // number of actual frames
      );
    this.load.spritesheet(
      'p1_walk',
      'assets/spritesheet_remix/p1_walk_right.png',
      792 / 11,
      97,
      11
      );
    /*
    this.load.audio('pregame',    'assets/shmup/silent_kilt.ogg');
    this.load.audio('game',       'assets/shmup/pixellated_zombies.ogg');
    this.load.audio('bossBattle', 'assets/shmup/watch_out.ogg');
    this.load.audio('endgame',    'assets/shmup/sad_Exploring.ogg');*/

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

    /*if (this.cache.isSoundDecoded('pregame') && this.ready == false)
    {
      this.ready = true;
      this.state.start('MainMenu');
    }*/
    this.state.start('MainMenu');

  }

};
