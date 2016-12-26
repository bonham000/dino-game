import React, { Component } from 'react';

const tree = [
	0,0,0,0,0,1,0,0,0,0,0,
	0,0,0,0,1,1,1,0,0,0,0,
	0,0,0,1,1,1,1,1,0,0,0,
	0,0,1,1,1,2,1,1,1,0,0,
	0,1,1,1,2,2,2,1,1,1,0,
	1,1,1,1,2,2,2,1,1,1,1,
	0,0,0,0,2,2,2,0,0,0,0,
	0,0,0,0,2,2,2,0,0,0,0,
	0,0,0,0,2,2,2,0,0,0,0];

class Game extends Component {
	constructor() {
		super();
		this.state = {
			gameState: 'off',
			gameCounter: 0,
			jump: false,
			jumpCounter: 0,
			playerStep: 'right',
			playerHeight: -210,
			groundLevel: [],
			obstacles: [],
			highScore: 0,
			gameover: false,
			scoreDisplay: false,
			highScoreDisplayStatus: false
		}
		this.initGame = this.initGame.bind(this);
		this.stepGame = this.stepGame.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.highScoreAnimation = this.highScoreAnimation.bind(this);
	}
	initGame() {
		// this initializes the player sprite and ground level on the game board on first page load
		var ground = [];

		for (var i = 0; i < 700; i++) {
			ground[i] = 6 - Math.round(Math.random() * 5);
		}

		var player = [
			0,0,0,0,1,1,1,0,0,0,0,
			0,0,0,0,1,1,2,0,0,0,0,
			0,0,0,0,1,1,1,0,0,3,0,
			0,0,0,0,0,1,0,0,0,1,0,
			0,0,1,1,1,1,1,1,1,1,0,
			0,0,1,0,1,1,1,0,0,0,0,
			0,0,3,0,1,1,1,0,0,0,0,
			0,0,0,0,1,1,1,0,0,0,0,
			0,0,0,0,1,0,1,0,0,0,0,
			0,0,0,0,1,0,1,0,0,0,0,
			0,0,0,0,1,0,1,0,0,0,0]

		this.setState({
			groundLevel: ground,
			player: player
		});
	}
	highScoreAnimation() {

		// handle display animation of high score

		this.setState({
			scoreDisplay: true
		});

		var displayStatus = this.state.highScoreDisplayStatus;

		if (displayStatus == true) {
			document.getElementById('highScoreControl').style.display = 'block';
			this.setState({
				highScoreDisplayStatus: false
			});
		}
		else {
			document.getElementById('highScoreControl').style.display = 'none';
			this.setState({
				highScoreDisplayStatus: true
			});
		}

	}
	stepGame() {

		if (this.state.gameState == 'on') {

		// animate and iterate obstacles:
		if (this.state.gameCounter % 50 == 0) {
			var obstacleSize = 3 - Math.round(Math.random() * 2);
			var obstacleClass;

			if (obstacleSize == 1) { obstacleClass = "small" }
			else if (obstacleSize == 2) { obstacleClass = "med" }
			else if (obstacleSize == 3) { obstacleClass = "large" }

			var newObstacles = this.state.obstacles.slice();

			newObstacles.push({
				size: obstacleClass,
				location: this.state.gameCounter
			});

			if (newObstacles.length == 6) {
				newObstacles = newObstacles.slice(4, 6);
			}

			this.setState({
				obstacles: newObstacles
			});

		}

		var collision = function() {

			// algorithm for rendering obstacles randomly as the game progresses
			if (this.state.gameCounter % 50 == 0 && this.state.gameCounter != 0) {

				var currTree = this.state.obstacles[this.state.obstacles.length - 2].size;
				var currSize;

				if (currTree == 'small') { currSize = -195; }
				else if (currTree == 'med') { currSize = -165; }
				else if (currTree == 'large') { currSize = -125; }

				if (this.state.playerHeight <= currSize) {
					this.setState({
							gameState: 'off',
							gameover: true,
							jump: false,
					});
					return true;
				}
			}
		  
		 }.bind(this);

		// check for collision between player and obstacle, if collision end game:
		if (collision()) {

			document.getElementById('GameBoard').style.background = 'red';

			var currScore = this.state.gameCounter;
			var currHighScore = this.state.highScore;
			var newHighScore;

			if (currScore > currHighScore) {
				newHighScore = currScore;

				var scoreTimer = setInterval(function() {
					this.highScoreAnimation();
				}.bind(this), 500);

				setTimeout(function() {
					clearInterval(scoreTimer);
					this.setState({
						scoreDisplay: false
					});
				}.bind(this), 3000);

			}
			else {
				newHighScore = currHighScore;
			}

			this.setState({
					gameState: 'off',
					gameover: true,
					jump: false,
					highScore: newHighScore
			});
			
		}

		// iterate the ground animation forward every step:
		var currGround = this.state.groundLevel.slice(5, this.state.groundLevel.length);
		for (var i = 0; i < 5; i++) {
			currGround.push(6 - Math.round(Math.random() * 5));
		}

		this.setState({
			groundLevel: currGround
		});

		// animate the player's feet every step:
		if (this.state.playerStep == 'right') {
		
		var playerStepRight = [
			0,0,0,0,1,1,1,0,0,0,0,
			0,0,0,0,1,1,2,0,0,0,0,
			0,0,0,0,1,1,1,0,0,3,0,
			0,0,0,0,0,1,0,0,0,1,0,
			0,0,1,1,1,1,1,1,1,1,0,
			0,0,1,0,1,1,1,0,0,0,0,
			0,0,3,0,1,1,1,0,0,0,0,
			0,0,0,0,1,1,1,0,0,0,0,
			0,0,0,0,1,0,1,0,0,0,0,
			0,0,0,0,1,0,1,0,0,0,0,
			0,0,0,0,0,0,4,0,0,0,0]			
		
			this.setState({
				player: playerStepRight,
				playerStep: 'left'
			});
		}

		else if (this.state.playerStep == 'left') {
		
		var playerStepLeft = [
			0,0,0,0,1,1,1,0,0,0,0,
			0,0,0,0,1,1,2,0,0,0,0,
			0,0,3,0,1,1,1,0,0,0,0,
			0,0,1,0,0,1,0,0,0,0,0,
			0,0,1,1,1,1,1,1,1,1,0,
			0,0,0,0,1,1,1,0,0,1,0,
			0,0,0,0,1,1,1,0,0,3,0,
			0,0,0,0,1,1,1,0,0,0,0,
			0,0,0,0,1,0,1,0,0,0,0,
			0,0,0,0,1,0,1,0,0,0,0,
			0,0,0,0,4,0,0,0,0,0,0]			
		
			this.setState({
				player: playerStepLeft,
				playerStep: 'right'
			});
		}

		// jump player if user presses the space bar:
		if (this.state.jump && !this.state.gameover) {
			if (this.state.jumpCounter < 10) {
				this.setState({
					playerHeight: this.state.playerHeight += 15,
					jumpCounter: this.state.jumpCounter += 1
				});
			}
			else if (this.state.playerHeight == -210) {
				this.setState({
					jump: false,
					jumpCounter: 1
				});
			}
			else if (this.state.jumpCounter > 9 && this.state.jumpCounter < 11) {
				this.setState({
					jumpCounter: this.state.jumpCounter += 1
				});
			}
			else if (this.state.jumpCounter > 10) {
				this.setState({
					playerHeight: this.state.playerHeight -= 15,
					jumpCounter: this.state.jumpCounter += 1
				});
			}
		}

		// step forward the game counter:
		this.setState({
			gameCounter: this.state.gameCounter + 1
		});

		// continue stepping game forward every 1 millisecond:
		setTimeout(function() {
			this.stepGame();
		}.bind(this));

		}
	};
	componentWillMount() {
		// initialize the game board and establish keyboard event listeners
		this.initGame();
		window.addEventListener('keydown', this.handleKeyPress);
	}
	handleKeyPress(event) {

		if (event.keyCode == 32) {
			// this resets the game state and restarts the game  if there is a game over and the user wants to replay
			if (this.state.gameover && !this.state.scoreDisplay) {
				this.setState({
					gameState: 'on',
					gameCounter: 0,
					gameCounter: 0,
					jump: false,
					jumpCounter: 0,
					playerStep: 'right',
					playerHeight: -210,
					obstacles: [],
					gameover: false
				});
				document.getElementById('highScoreControl').style.display = 'none';
				document.getElementById('GameBoard').style.background = 'rgb(25,25,25)';
				this.stepGame();
			}
			// this starts the game on the first round
			else if (this.state.gameState == 'off' && !this.state.gameover) {
				this.setState({
					gameState: 'on'
				});
				this.stepGame();
			}
			// if the game is on, this handles the user jumping
			else if (!this.state.jump && this.state.gameState == 'on') {
				this.setState({ jump: true });
			}
		}
		// key to pause the game, q for 'quit'
		else if (event.keyCode == 81) {
			this.setState({ gameState: 'off' });
		}

	}
  render() {
  	// map the player sprite onto the game board
  	var player = this.state.player.map(function(px, idx) {
  		var style = {background: 'none'}
  		if (px == 1) { style = {background: '#727585'}}
  		else if (px == 2) { style = {background: '#FB3640'}}
  		else if (px == 3) { style = {background: '#F0EDDA'}}
  		else if (px == 4) { style = {background: '#F0EDDA'}}
  		return (
				<div 
					className = 'player'
					id = 'playerID'
					key = {idx}
					style = {style}
				/>
  		);
  	});
  	// map the grass onto the game board
  	var loadGame = this.state.groundLevel.map(function(grass, idx) {
  		return (
  				<div
  					className = 'groundLevel'
  					key = {idx}
  					style = {{height: grass + 'px'}} />
  			);
  	});
  	var playerStyle = {
  		bottom: this.state.playerHeight + 'px'
  	};

  	// map the tree obstacles onto the game board
  	var obstacles = this.state.obstacles.map(function(obstacle, idx) {

			var position = ( this.state.gameCounter - obstacle.location ) * 12;

  		var size;

  		if (obstacle.size == 'small') { size = 30 }
  		else if (obstacle.size == 'med') { size = 50 }
  		else if (obstacle.size == 'large') { size = 75 }

	  	var obstacleStyle = {
	  		position: 'absolute',
	  		right: position + 'px',
	  		top: -1 * size + 3 + 'px',
	  		width: size + 'px',
	  		height: size + 'px',
	  		background: 'none'
	  	}

			// map the trees onto the obstacle space
	  	var treeRender = tree.map(function(px, idx) {
	  		var style = {
	  			width: (size / 11).toFixed(1) + 'px',
	  			height: (size / 9).toFixed(1) + 'px',
	  		}

	  		var backgroundStyle = {
	  			background: 'none'
	  		};
	  		if (px == 1) { backgroundStyle = {background: '#02AD2F'}}
	  		else if (px == 2) { backgroundStyle = {background: '#77260F'}}
	  		return (
					<div 
						key = {idx}
						style = {{...style, ...backgroundStyle}}
					/>
	  		);
	  	});

			return <div className = 'treeWrapper' key = {idx} style = {obstacleStyle}>{treeRender}</div>

  	}.bind(this));

    return (
      <div className = "Game" id = "GameBoard">
				<p className = "gameTitle">Inspired by the Offline Dino<span className = "scoreBoard"><span className = "score">Score:</span> {this.state.gameCounter} / <span className = 'highScore'>High Score:</span> {this.state.highScore}</span></p>
				<div className = "playerWrapper" style = {playerStyle}>{player}</div>
				<div className = "groundWrapper">{loadGame}</div>
				<div className = "obstacles">
					<div>{obstacles}</div>
				</div>
				<div className = "cover"></div>
      </div>
    );
  }
}

export default Game;
