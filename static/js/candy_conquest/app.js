var game;

window.onload = function() {

  //  Create your Phaser game and inject it into the gameContainer div.
  //  We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
  game = new Phaser.Game(
    800,// * window.devicePixelRatio,  // width -- .devicePixelRatio covers retina displays
    480,// * window.devicePixelRatio, // height
    Phaser.CANVAS,        // renderer
    'gameContainer');   // DOM element to inject to

  //  Add the States your game has.
  //  You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.
  game.state.add('Boot', BasicGame.Boot);
  game.state.add('Preloader', BasicGame.Preloader);
  game.state.add('MainMenu', BasicGame.MainMenu);
  game.state.add('Game', BasicGame.Game);

  //  Now start the Boot state.
  game.state.start('Boot');

};

// doesnt seem to do anything
window.onresize = function () {
  var height = 480,
      width = 800;
  height = game.canvas.height < height ? game.canvas.height : height;
  width = game.canvas.width < width ? game.canvas.width : width;
  game.canvas.height = height;
  game.canvas.width = width;
  if (game.renderType === Phaser.WEBGL) game.renderer.resize (width, height);
};
