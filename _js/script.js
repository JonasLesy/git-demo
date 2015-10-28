let game;
import Main from "./classes/Main.js";

const init = () => {
	game = new Phaser.Game(600,600, Phaser.AUTO);
	//Phaser.AUTO => kijken welke renderinglaag ondersteund wordt
	//CPU of GPU.

	game.state.add('Main', Main, true);
	//Wanneer > 1 state in game, laatste param op false.
	//+game.state.start('Main');
};

init();