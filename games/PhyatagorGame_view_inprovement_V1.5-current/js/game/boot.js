var GAME_WIDTH = 1536;
var GAME_HEIGHT = 1008;

var game = new Phaser.Game(
	GAME_WIDTH,
	GAME_HEIGHT,
	Phaser.AUTO,
	'gameDiv'
);

game.state.add('load', Rebus.loadState);
game.state.add('play', Rebus.playState);

game.state.start('load');