
// global variable for access inside callbacks
var spriteData = {
  img: new Image(),
  width: null,
  height: null,
  rows: null,
  columns: null,
};

function setSpriteData () {
  spriteData.width = document.querySelector('[name="width"]').value;
  spriteData.height = document.querySelector('[name="height"]').value;
  spriteData.columns = document.querySelector('[name="columns"]').value;
  spriteData.rows = document.querySelector('[name="rows"]').value;
  console.log(spriteData.img.src);
}

BasicGame.MainMenu = function (game) {


};

BasicGame.MainMenu.prototype = {

  create: function () {

    // sprites are loaded in the order added here.
    // this.bg = this.add.tileSprite(0, 0, this.camera.width, this.camera.height, 'background');

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
      "DRAG AND DROP your image file HERE!",
      { font: "30px monospace", fill: "#ff66ff" });
    this.loadingText.anchor.setTo(0.5, 0.5);

    this.add.text(
      this.camera.width / 2,
      this.camera.height - 32,
      "Copyright (c) 2014 Andrew Merizalde",
      { font: "12px monospace", fill: "#ff00ff", align: "center"}).anchor.setTo(0.5, 0.5);

    //robertnyman.com/2011/03/10/using-html5-canvas-drag-and-drop-and-file-api-to-offer-the-cure/
    this.setupDrop();
  },

  update: function () {

    // if all sprite data is entered correctly, continue to game state.
    if (spriteData.img &&
        (spriteData.width !== null) &&
        (spriteData.height !== null) &&
        (spriteData.rows !== null) &&
        (spriteData.columns !== null)) {
      $("#glasspane").hide();
      this.state.start('Game');
    }

  },

  startGame: function (pointer) {

    //  Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
    // this.musicPregame.stop();

    //  And start the actual game
    // this.state.start('Game');

  },

  // create-related functions
  setupDrop: function () {
    // get a handle on the canvas through Phaser
    var canvas = this.game.context.canvas;

    // override the dragover and drop events
    canvas.addEventListener("dragover", function (evt) {
      evt.preventDefault();
    }, false);

    canvas.addEventListener("drop", function (evt) {
      evt.preventDefault();
      var files = evt.dataTransfer.files;
      if (files.length > 0) {
        var file = files[0];
        // verify dropped file is an image,
        // and that FileReader is even usable on this browser
        if (typeof FileReader !== "undefined" && file.type.indexOf("image") != -1) {
          var reader = new FileReader();
          reader.onload = function (evt) {
            spriteData.img.src = evt.target.result;
          };
          reader.readAsDataURL(file);
        }
      }
    }, false);
  },

};
