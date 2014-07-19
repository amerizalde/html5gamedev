
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
    this.load.image('titlepage',    'assets/shmup/Phaser_splash.jpg');
    this.load.image('sea',          'assets/shmup/sea.png');
    this.load.image('bullet',       'assets/shmup/bullet.png');
    this.load.image('enemyBullet',  'assets/shmup/enemy-bullet.png');
    this.load.image('powerup1',     'assets/shmup/powerup1.png');

    this.load.audio('explosion',        ['assets/shmup/explodemini.wav']);
    this.load.audio('playerExplosion',  ['assets/shmup/player-explosion.wav']);
    this.load.audio('enemyFire',        ['assets/shmup/enemy-fire.wav']);
    this.load.audio('playerFire',       ['assets/shmup/player-fire.wav']);
    this.load.audio('powerUp',          ['assets/shmup/powerup.wav']);
    //this.load.audio('titleMusic', ['audio/main_menu.mp3']);

    this.load.spritesheet('greenEnemy', 'assets/shmup/enemy.png', 32, 32);
    this.load.spritesheet('whiteEnemy', 'assets/shmup/shooting-enemy.png', 32, 32);
    this.load.spritesheet('boss',       'assets/shmup/boss.png', 93, 75);
    this.load.spritesheet('explosion',  'assets/shmup/explosion.png', 32, 32);
    this.load.spritesheet('player',     'assets/shmup/player.png', 64, 64);
    //  + lots of other required assets here
    this.load.atlas('batwords', 'assets/bat-words/bat-words.png',
      'assets/bat-words/bat-words.json', null, 0);

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
