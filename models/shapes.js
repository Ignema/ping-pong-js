import { D } from '../config/globals.js'

class Shape {
    constructor(height, width, posX, posY, dirX, dirY, speed){
        this.height = height
        this.width = width
        this.posX = posX
        this.posY = posY
        this.dirX = dirX
        this.dirY = dirY
        this.speed = speed
    }
}

export class Player extends Shape {
    score = 0
    constructor(posX, posY, side){
        super(
            70, // height
            18, // width
            posX,
            posY,
            D.STOP, // no mouvement on the x-axis
            D.STOP, // no mouvement on the y-axis
            10 // speed
        );
        this.side = side
    }
}

export class Ball extends Shape {
    constructor(posX, posY, speed){
        super(
            18, // height
            18, // width
            posX,
            posY,
            D.STOP, // no mouvement on the x-axis
            D.STOP, // no mouvement on the y-axis
            speed || 9 // speed
        );
    }
}