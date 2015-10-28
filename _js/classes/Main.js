export default class Main extends Phaser.State{
	preload(){
		console.log('preload called');
		this.game.load.image('tile', 'assets/tile.png');
		this.game.load.image('player', 'assets/player.png');
	}
	create(){
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
	update(){
		if(this.player.body.position.y >= this.game.world.height - this.player.body.height){
			this.gameOver();
		}
		console.log('Main Update');
		this.game.physics.arcade.collide(this.player, this.platforms);

		if(this.cursors.up.isDown && this.player.body.wasTouching.down){
			this.player.body.velocity.y -= 1000;

		}

		if(this.cursors.left.isDown){
			this.player.body.velocity.x -= 30;
		}

		if(this.cursors.right.isDown){
			this.player.body.velocity.x += 30;
		}
	}

	addTile(x, y){
		let tile = this.platforms.getFirstDead();

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

	addPlatform(y = -this.tileHeight){
		this.incrementScore();
	

		let tilesNeeded = Math.ceil(this.game.world.width/this.tileWidth);

		//Add a random hole
		let hole = Math.floor(Math.random() * (tilesNeeded-3)) + 1;
		//Keep creating tiles until row complete
		for(let i = 0; i < tilesNeeded; i++){
			if(i !== hole && i !== hole + 1){
				this.addTile(i * this.tileWidth, y);
			}
		}
	}

	initPlatforms(){
		let numPlatforms = 1 + Math.ceil(this.game.world.height / (this.spacing + this.tileHeight));
		for(let i = 0; i < numPlatforms; i++){
			this.addPlatform(i * this.spacing - this.tileHeight);;
		}

		/*let numPlatforms = 1 + Math.ceil(this.game.world.height / (this.spacing + this.tileHeight));
		for(let y = this.game.world.height - this.tileHeight; y > this.tileHeight - this.tileHeight; y = y - this.spacing){
			this.addPlatform(y);
		}*/
	}

	createPlayer(){
		this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.height - (this.spacing * 2 + (3 * this.tileHeight)), 'player');
		this.player.anchor.set(0.5,1);

		//Enable physics on the player
		this.game.physics.arcade.enable(this.player);

		//Make the player fall by applying gravity
		this.player.body.gravity.y = 2000;

		//Make the player collide with the game boundaries
		this.player.body.collideWorldBounds = true;
		
		//Make the player bounce a little
		this.player.body.bounce.y = 0.1;
	}

	gameOver(){
		this.game.state.start('Main');
	}

	createScore(){
		let scoreFont = "100px Arial";
		this.scoreLabel = this.game.add.text((this.game.world.centerX),100,"0", {font: scoreFont, fill: "#fff"});
		this.scoreLabel.anchor.setTo(0.5, 0.5);
		this.scoreLabel.align = "center";
	}

	incrementScore(){
		this.score += 1;
		this.scoreLabel.text = this.score;
	}
}