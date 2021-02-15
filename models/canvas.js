import { R } from '../config/globals.js'

export class Canvas {

    constructor({ width, height, backgroundColor, drawColor }){
        this.initialize()
        this.board.height = height
        this.board.width = width
        this.backgroundColor = backgroundColor
        this.drawColor = drawColor
    }
    
    initialize(){
        this.board = document.getElementById('board');
        this.context = this.board.getContext('2d');
    }

    clearScreen(){
        this.context.clearRect(0, 0, this.board.width, this.board.height);
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect( 0, 0, this.board.width, this.board.height);
    }

    drawShape(shape){
        this.context.fillStyle = this.drawColor;
        this.context.fillRect(shape.posX, shape.posY, shape.width, shape.height);
    }

    drawNet(){
        this.context.beginPath();
        // this.context.setLineDash([7, 15]);
        this.context.moveTo((this.board.width / 2), this.board.height - 200);
        this.context.lineTo((this.board.width / 2), 200);
        this.context.lineWidth = 10;
        this.context.strokeStyle = '#ffffff';
        this.context.stroke();
    }

    drawScore(player){
        this.context.font = '700px Nunito';
        this.context.textAlign = 'center';
        this.context.globalAlpha = 0.4;
        this.context.fillText(player.score.toString(), player.side === 'left' ? (this.board.width / 2) - 600 : (this.board.width / 2) + 600, (this.board.height / 2) + 250);
        this.context.globalAlpha = 1;
    }

    drawName(){
        this.context.font = '50px Nunito';
        this.context.fillText('Yassir Douslimi', (this.board.width / 2), 100);
    }

    drawRound(currentRound){
        this.context.font = '30px Nunito';
        this.context.fillText('Round ' + (currentRound + 1), (this.board.width / 2), this.board.height - 35);
    }

    drawMatchPoint(currentRound){
        this.context.font = '40px Nunito';
        this.context.fillText(R[currentRound] ? R[currentRound] : R[currentRound - 1], (this.board.width / 2), this.board.height -  80);
    }

    drawStartText(){
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(this.board.width / 2 - 350, this.board.height / 2 - 48, 700, 100);

        this.context.font = '50px Nunito';
        this.context.fillStyle = this.drawColor;
        this.context.fillText('Click anywhere to start...', this.board.width / 2, this.board.height / 2 + 15);
    }

    drawEndText(text){
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(this.board.width / 2 - 350, this.board.height / 2 - 48, 700, 100);

        this.context.font = '50px Nunito';
        this.context.fillStyle = this.drawColor;
        this.context.fillText(text, this.board.width / 2, this.board.height / 2 + 15);
    }
}