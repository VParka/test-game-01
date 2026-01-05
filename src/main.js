// src/main.js

import { Game } from './Game.js';

const canvas = document.getElementById('game-canvas');
if (!canvas) {
    throw new Error('Canvas element with id "game-canvas" not found');
}

const game = new Game(canvas);
game.start();
