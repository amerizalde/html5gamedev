
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		// this.music = this.add.audio('titleMusic');
		// this.music.play();
		this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'bg');
		this.title = this.add.sprite(this.game.width / 2, this.game.height / 2 - 30, 'titlepage');
		
		this.playButton = this.add.button(this.title.x, this.title.y + 30, 'playButton', this.startGame, this, 16, 16, 16);

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		// this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}

};
