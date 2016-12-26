import React, { Component } from 'react';
import Game from './Game.js';

class App extends Component {
  render() {
    return (
      <div className = "App">
        <Game />
				<div className = 'highScoreDisplay' id = 'highScoreControl'>
					<h1>New High Score!!!</h1>
				</div>
      </div>
    );
  }
}

export default App;
