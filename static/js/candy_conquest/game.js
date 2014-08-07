// create a Game object
BasicGame.Game = function (game) {

};

// add methods and properties
BasicGame.Game.prototype = {

  create: function () {
    // sprites are loaded in the order added here.
    this.setupWorld();
    this.setupPlayer();
    this.setupCamera();
  },

  setupWorld: function () {
    this.bg = this.add.tilemap('level');
    this.bg.addTilesetImage('level_sheet', 'tiles');
    this.layer = this.bg.createLayer('layer_1');
    this.bg.setCollisionByExclusion([12], true, this.layer);
    this.layer.resizeWorld();
    this.layer.wrap = true;
    this.layer.debug = true;

    this.game.physics.arcade.gravity.y = 500;
  },

  setupPlayer: function () {
    // ## PLAYER
    this.player = this.add.sprite(
      70,
      this.game.height - 100,
      'p1'
    );
    this.player.anchor.setTo(0.5, 0.5);
    this.player.scale.setTo(0.5, 0.5);
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.collideWorldBounds = true;
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    this.player.speed = 300;
    // wrap around horizontally, not vertically
    this.world.wrap(this.player, 0, false, true, false);

    this.player.animations.add('idle', [1,4,1,28], 1, true);
    this.player.animations.add('left', [4,5,6,7,8,9,10,11,12,13,14,15], 6, true);
    this.player.animations.add('right', [20,21,22,23,24,25,26,27,28,29,30,31], 6, true);
    this.player.animations.add('hit_left', [2,3,0], 1, false);
    this.player.animations.add('jump_left', [26], 1, false);
    this.player.animations.add('jump_right', [10], 1, false);

    this.player.play('idle');

    this.score = 0;

    console.log("player setup complete");
  },

  setupCamera: function () {
    this.camera.follow(this.player);
  },


  // update-related functions
  update: function () {
    // wrap around horizontally, not vertically
    this.world.wrap(this.player, 0, false, true, false);
    this.processPlayerInput();
    this.checkCollision();
  },

  processPlayerInput: function () {
    // key config
    var left = Phaser.Keyboard.A;
    var right = Phaser.Keyboard.D;
    var up = Phaser.Keyboard.W;
    var down = Phaser.Keyboard.S;
    var jump = Phaser.Keyboard.W;

    // zero out the velocity
    this.player.body.velocity.x = 0;
    // this.player.body.velocity.y = 0;

    // wrap

    if (this.input.keyboard.isDown(Phaser.Keyboard.Z) ||
        this.input.activePointer.isDown) {
      if (this.returnText && this.returnText.exists) {
        this.quitGame();
      }
    }

    // movement
    // left
    if (this.input.keyboard.isDown(left) && this.player.body.blocked.down) {
      this.player.body.velocity.x = -this.player.speed;
    } else if (this.input.keyboard.isDown(left)) {
      this.player.body.velocity.x = -this.player.speed * 0.25;
    }

    // right
    if (this.input.keyboard.isDown(right) && this.player.body.blocked.down) {
      this.player.body.velocity.x = this.player.speed;
    } else if (this.input.keyboard.isDown(right)) {
      this.player.body.velocity.x = this.player.speed * 0.25;
    }

    // jump
    if (this.input.keyboard.justPressed(jump)) {
      if (this.player.body.blocked.down) {
        this.player.body.velocity.y = -600;
        console.log("JUMPING!");
      }
      console.log(this.player.body.blocked);
    }

    // cancel
    if (this.input.keyboard.isDown(left) && this.input.keyboard.isDown(right)) {
      this.player.body.velocity.x = this.player.body.velocity.x * 0.05;
    }
  },

  checkCollision: function () {
    this.physics.arcade.collide(this.player, this.layer);
  },

  gobble: function (player, candy) {
  },

  eat: function (candy) {
    this.score += candy.reward;
    candy.kill();
  },

  quitGame: function (pointer) {
    //  Then let's go back to the main menu.
    this.state.start('Boot');
  },

  render: function () {
    this.game.debug.spriteCoords(this.player, 32, 400);
    this.game.debug.bodyInfo(this.player, 32, 32);
  },
};


/* KEYBOARD Key Code cheat sheet -- delete for production copy

Phaser.Keyboard.prototype.constructor = Phaser.Keyboard;

Phaser.Keyboard.A = "A".charCodeAt(0);
Phaser.Keyboard.B = "B".charCodeAt(0);
Phaser.Keyboard.C = "C".charCodeAt(0);
Phaser.Keyboard.D = "D".charCodeAt(0);
Phaser.Keyboard.E = "E".charCodeAt(0);
Phaser.Keyboard.F = "F".charCodeAt(0);
Phaser.Keyboard.G = "G".charCodeAt(0);
Phaser.Keyboard.H = "H".charCodeAt(0);
Phaser.Keyboard.I = "I".charCodeAt(0);
Phaser.Keyboard.J = "J".charCodeAt(0);
Phaser.Keyboard.K = "K".charCodeAt(0);
Phaser.Keyboard.L = "L".charCodeAt(0);
Phaser.Keyboard.M = "M".charCodeAt(0);
Phaser.Keyboard.N = "N".charCodeAt(0);
Phaser.Keyboard.O = "O".charCodeAt(0);
Phaser.Keyboard.P = "P".charCodeAt(0);
Phaser.Keyboard.Q = "Q".charCodeAt(0);
Phaser.Keyboard.R = "R".charCodeAt(0);
Phaser.Keyboard.S = "S".charCodeAt(0);
Phaser.Keyboard.T = "T".charCodeAt(0);
Phaser.Keyboard.U = "U".charCodeAt(0);
Phaser.Keyboard.V = "V".charCodeAt(0);
Phaser.Keyboard.W = "W".charCodeAt(0);
Phaser.Keyboard.X = "X".charCodeAt(0);
Phaser.Keyboard.Y = "Y".charCodeAt(0);
Phaser.Keyboard.Z = "Z".charCodeAt(0);
Phaser.Keyboard.ZERO = "0".charCodeAt(0);
Phaser.Keyboard.ONE = "1".charCodeAt(0);
Phaser.Keyboard.TWO = "2".charCodeAt(0);
Phaser.Keyboard.THREE = "3".charCodeAt(0);
Phaser.Keyboard.FOUR = "4".charCodeAt(0);
Phaser.Keyboard.FIVE = "5".charCodeAt(0);
Phaser.Keyboard.SIX = "6".charCodeAt(0);
Phaser.Keyboard.SEVEN = "7".charCodeAt(0);
Phaser.Keyboard.EIGHT = "8".charCodeAt(0);
Phaser.Keyboard.NINE = "9".charCodeAt(0);
Phaser.Keyboard.NUMPAD_0 = 96;
Phaser.Keyboard.NUMPAD_1 = 97;
Phaser.Keyboard.NUMPAD_2 = 98;
Phaser.Keyboard.NUMPAD_3 = 99;
Phaser.Keyboard.NUMPAD_4 = 100;
Phaser.Keyboard.NUMPAD_5 = 101;
Phaser.Keyboard.NUMPAD_6 = 102;
Phaser.Keyboard.NUMPAD_7 = 103;
Phaser.Keyboard.NUMPAD_8 = 104;
Phaser.Keyboard.NUMPAD_9 = 105;
Phaser.Keyboard.NUMPAD_MULTIPLY = 106;
Phaser.Keyboard.NUMPAD_ADD = 107;
Phaser.Keyboard.NUMPAD_ENTER = 108;
Phaser.Keyboard.NUMPAD_SUBTRACT = 109;
Phaser.Keyboard.NUMPAD_DECIMAL = 110;
Phaser.Keyboard.NUMPAD_DIVIDE = 111;
Phaser.Keyboard.F1 = 112;
Phaser.Keyboard.F2 = 113;
Phaser.Keyboard.F3 = 114;
Phaser.Keyboard.F4 = 115;
Phaser.Keyboard.F5 = 116;
Phaser.Keyboard.F6 = 117;
Phaser.Keyboard.F7 = 118;
Phaser.Keyboard.F8 = 119;
Phaser.Keyboard.F9 = 120;
Phaser.Keyboard.F10 = 121;
Phaser.Keyboard.F11 = 122;
Phaser.Keyboard.F12 = 123;
Phaser.Keyboard.F13 = 124;
Phaser.Keyboard.F14 = 125;
Phaser.Keyboard.F15 = 126;
Phaser.Keyboard.COLON = 186;
Phaser.Keyboard.EQUALS = 187;
Phaser.Keyboard.UNDERSCORE = 189;
Phaser.Keyboard.QUESTION_MARK = 191;
Phaser.Keyboard.TILDE = 192;
Phaser.Keyboard.OPEN_BRACKET = 219;
Phaser.Keyboard.BACKWARD_SLASH = 220;
Phaser.Keyboard.CLOSED_BRACKET = 221;
Phaser.Keyboard.QUOTES = 222;
Phaser.Keyboard.BACKSPACE = 8;
Phaser.Keyboard.TAB = 9;
Phaser.Keyboard.CLEAR = 12;
Phaser.Keyboard.ENTER = 13;
Phaser.Keyboard.SHIFT = 16;
Phaser.Keyboard.CONTROL = 17;
Phaser.Keyboard.ALT = 18;
Phaser.Keyboard.CAPS_LOCK = 20;
Phaser.Keyboard.ESC = 27;
Phaser.Keyboard.SPACEBAR = 32;
Phaser.Keyboard.PAGE_UP = 33;
Phaser.Keyboard.PAGE_DOWN = 34;
Phaser.Keyboard.END = 35;
Phaser.Keyboard.HOME = 36;
Phaser.Keyboard.LEFT = 37;
Phaser.Keyboard.UP = 38;
Phaser.Keyboard.RIGHT = 39;
Phaser.Keyboard.DOWN = 40;
Phaser.Keyboard.INSERT = 45;
Phaser.Keyboard.DELETE = 46;
Phaser.Keyboard.HELP = 47;
Phaser.Keyboard.NUM_LOCK = 144;

*/
