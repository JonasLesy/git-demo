/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _classesMainJs = __webpack_require__(2);
	
	var _classesMainJs2 = _interopRequireDefault(_classesMainJs);
	
	var game = undefined;
	
	var init = function init() {
		game = new Phaser.Game(600, 600, Phaser.AUTO);
		//Phaser.AUTO => kijken welke renderinglaag ondersteund wordt
		//CPU of GPU.
	
		game.state.add('Main', _classesMainJs2["default"], true);
		//Wanneer > 1 state in game, laatste param op false.
		//+game.state.start('Main');
	};
	
	init();

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Main = (function (_Phaser$State) {
		_inherits(Main, _Phaser$State);
	
		function Main() {
			_classCallCheck(this, Main);
	
			_get(Object.getPrototypeOf(Main.prototype), 'constructor', this).apply(this, arguments);
		}
	
		_createClass(Main, [{
			key: 'preload',
			value: function preload() {
				console.log('preload called');
				this.game.load.image('tile', 'assets/tile.png');
				this.game.load.image('player', 'assets/player.png');
			}
		}, {
			key: 'create',
			value: function create() {
				console.log('Main Create');
				//Anchor variabele gebruiken om startpunt van tekenen te definiëren
				//this.player = this.game.add.sprite(this.game.world.centerX, 100, 'player');
				//this.player.anchor.set(0.5,1);
				this.createPlayer();
	
				this.score = -3;
				this.createScore();
	
				this.cursors = this.game.input.keyboard.createCursorKeys();
	
				this.tileWidth = this.game.cache.getImage('tile').width;
				this.tileHeight = this.game.cache.getImage('tile').height;
				//Pixels per seconde.
				this.speed = 150;
				this.spacing = 250;
	
				this.game.stage.backgroundColor = '479cde';
				this.game.physics.startSystem(Phaser.Physics.ARCADE);
	
				this.platforms = this.game.add.group();
				this.platforms.enableBody = true;
				this.platforms.createMultiple(250, 'tile');
	
				this.initPlatforms();
	
				//this.addTile(100,100);
	
				/*
	   pixels/seconde = spacing/interval => regel van 3
	   <=>interval/secone = spacing/pixels
	   <=>interval = spacing/pixels *seconde
	   */
				this.intervalTime = this.spacing * 1000 / this.speed;
				this.timer = this.game.time.events.loop(this.intervalTime, this.addPlatform, this);
			}
		}, {
			key: 'update',
			value: function update() {
				if (this.player.body.position.y >= this.game.world.height - this.player.body.height) {
					this.gameOver();
				}
				console.log('Main Update');
				this.game.physics.arcade.collide(this.player, this.platforms);
	
				if (this.cursors.up.isDown && this.player.body.wasTouching.down) {
					this.player.body.velocity.y -= 1000;
				}
	
				if (this.cursors.left.isDown) {
					this.player.body.velocity.x -= 30;
				}
	
				if (this.cursors.right.isDown) {
					this.player.body.velocity.x += 30;
				}
			}
		}, {
			key: 'addTile',
			value: function addTile(x, y) {
				var tile = this.platforms.getFirstDead();
	
				//Reset to specified coordinates
				tile.reset(x, y);
				tile.body.velocity.y = this.speed;
				tile.body.immovable = true;
	
				//When tile reach end of screen, kill it
				tile.checkWorldBounds = true;
				tile.outOfBoundsKill = true; //automatiseert object pulling
				//wanneer tile uit beeld komt, phaser detecteert => instellen als dode tile
				return tile;
			}
		}, {
			key: 'addPlatform',
			value: function addPlatform() {
				var y = arguments.length <= 0 || arguments[0] === undefined ? -this.tileHeight : arguments[0];
	
				this.incrementScore();
	
				var tilesNeeded = Math.ceil(this.game.world.width / this.tileWidth);
	
				//Add a random hole
				var hole = Math.floor(Math.random() * (tilesNeeded - 3)) + 1;
				//Keep creating tiles until row complete
				for (var i = 0; i < tilesNeeded; i++) {
					if (i !== hole && i !== hole + 1) {
						this.addTile(i * this.tileWidth, y);
					}
				}
			}
		}, {
			key: 'initPlatforms',
			value: function initPlatforms() {
				var numPlatforms = 1 + Math.ceil(this.game.world.height / (this.spacing + this.tileHeight));
				for (var i = 0; i < numPlatforms; i++) {
					this.addPlatform(i * this.spacing - this.tileHeight);;
				}
	
				/*let numPlatforms = 1 + Math.ceil(this.game.world.height / (this.spacing + this.tileHeight));
	   for(let y = this.game.world.height - this.tileHeight; y > this.tileHeight - this.tileHeight; y = y - this.spacing){
	   	this.addPlatform(y);
	   }*/
			}
		}, {
			key: 'createPlayer',
			value: function createPlayer() {
				this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.height - (this.spacing * 2 + 3 * this.tileHeight), 'player');
				this.player.anchor.set(0.5, 1);
	
				//Enable physics on the player
				this.game.physics.arcade.enable(this.player);
	
				//Make the player fall by applying gravity
				this.player.body.gravity.y = 2000;
	
				//Make the player collide with the game boundaries
				this.player.body.collideWorldBounds = true;
	
				//Make the player bounce a little
				this.player.body.bounce.y = 0.1;
			}
		}, {
			key: 'gameOver',
			value: function gameOver() {
				this.game.state.start('Main');
			}
		}, {
			key: 'createScore',
			value: function createScore() {
				var scoreFont = "100px Arial";
				this.scoreLabel = this.game.add.text(this.game.world.centerX, 100, "0", { font: scoreFont, fill: "#fff" });
				this.scoreLabel.anchor.setTo(0.5, 0.5);
				this.scoreLabel.align = "center";
			}
		}, {
			key: 'incrementScore',
			value: function incrementScore() {
				this.score += 1;
				this.scoreLabel.text = this.score;
			}
		}]);
	
		return Main;
	})(Phaser.State);
	
	exports['default'] = Main;
	module.exports = exports['default'];

/***/ }
/******/ ]);
//# sourceMappingURL=script.js.map