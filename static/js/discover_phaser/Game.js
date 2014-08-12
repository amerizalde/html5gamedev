
BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;    //  the tween manager
    this.state;	    //	the state manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

	create: function () {

		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        // this.pointyThing = this.add.sprite(this.world.centerX, this.game.height - 30, 'arrows', 0);
        // this.pointyThing.anchor.setTo(0.5, 0.5);
        // this.game.physics.enable(this.pointyThing, Phaser.Physics.ARCADE);
        this.setupPlayer();
        this.setupKeys();
        this.setLevel();
	},

    setupPlayer: function () {
        this.player = this.add.sprite(this.world.centerX, this.world.centerY, 'chick', 0);
        this.player.anchor.setTo(0.5, 0.5); // center the origin
        this.physics.arcade.enable(this.player); // arcade physics body added
        this.player.body.gravity.y = 500;
    },

    setupKeys: function () {
        this.cursor = this.input.keyboard.createCursorKeys();

        // lock these keys out of the browser
        this.input.keyboard.addKeyCapture(
          [ Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.SPACEBAR,
          ]
        );
    },

    setLevel: function () {
        this.walls = this.add.group();
        this.walls.enableBody = true;
        
        this.add.sprite(0, 0, 'wallV', 0, this.walls); // left wall
        this.add.sprite(this.world.width - 20, 0, 'wallV', 0, this.walls); // right wall
        this.add.sprite(0, 0, 'wallH', 0, this.walls); // UL
        this.add.sprite(this.world.width - 200, 0, 'wallH', 0, this.walls); // UR
        this.add.sprite(0, this.world.height - 20, 'wallH', 0, this.walls); // BL
        this.add.sprite(this.world.width - 200, this.world.height - 20, 'wallH', 0, this.walls); // BR
        this.add.sprite(-100, this.world.centerY, 'wallH', 0, this.walls); // MID L
        this.add.sprite(this.world.width - 100, this.world.centerY, 'wallH', 0, this.walls); // MID R
        
        this.walls.setAll('body.immovable', true);
    },

	update: function () {

		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.playerInput();
        // face the arrow at the mouse position
        // the image of the arrow originally faced down, so some
        // math is needed to correct this. -1.57079633 radians is -90 degrees
        // this.pointyThing.rotation = this.physics.arcade.angleToPointer(this.pointyThing) - 1.57079633;
        // console.log(this.pointyThing.rotation);
	},

    playerInput: function () {
        //left
        if (this.cursor.left.isDown) {
            this.player.body.velocity.x = -200;
        }
        // right
        else if (this.cursor.right.isDown) {
            this.player.body.velocity.x = 200;
        } 
        // no input
        else {
            this.player.body.velocity.x = 0;
        }

        // up
        if (this.cursor.up.isDown && this.player.body.touching.down) {
            // move the player upward (jump)
            this.player.body.velocity.y = -320;
        }
    },

    collisionUpdate: function () {
        this.physics.arcade.collide(this.player, this.walls);
    },

    fire: function () {},

	quitGame: function (pointer) {

        pointer = pointer || null;
		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	}

};
