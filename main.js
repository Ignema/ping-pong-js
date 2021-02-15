import { Player, Ball } from './models/shapes.js'
import { Canvas } from './models/canvas.js'
import { Board } from './models/board.js'
import { B, Difficulty } from './config/globals.js'

let board = new Board(
    new Canvas(B),
    new Player(150, (B.height / 2) - 35, 'left'),
    new Player(B.width - 150, (B.height / 2) - 35, 'right'),
    new Ball((B.width / 2) - 9, (B.height / 2) - 9)
)

board.enemy.speed = Difficulty.MEDIUM

board.start()