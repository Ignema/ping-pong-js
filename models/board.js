import { B, D, R, C } from '../config/globals.js'
import { Player, Ball } from './shapes.js'
import { handlers } from '../util/handlers.js'

export class Board {
    
    constructor(canvas, player, enemy, ball){
        this.canvas = canvas
        this.player = player
        this.enemy = enemy
        this.ball = ball
        this.round = this.clock = 0
        this.isFinished = this.inProgress = false
        this.side = 'left'
        this.handlers = Object.assign({}, handlers);
    }

    animate() {
        this.compute();
        this.render();
        if (!this.isFinished) {
            requestAnimationFrame(() => this.animate());
        }
    }

    render() {
        this.canvas.clearScreen()
        this.canvas.drawShape(this.player)
        this.canvas.drawShape(this.enemy) 
        
        if (this.delay()) {
            this.canvas.drawShape(this.ball)
        }
        
        this.canvas.drawNet()
        this.canvas.drawScore(this.player)
        this.canvas.drawScore(this.enemy)
        this.canvas.drawRound(this.round)
        this.canvas.drawMatchPoint(this.round)
        this.canvas.drawName()
    }

    compute() {

        if (!this.isFinished) {
            console.log(this)
            Object.keys(this.handlers).forEach(key => this.handlers[key].call(this))
        }

        if (this.player.score === R[this.round]) {
            if (!R[this.round + 1]) {
                this.isFinished = true;
                setTimeout(() => this.reboot('You Won!'), 1000);
            } else {
                this.canvas.backgroundColor= this.getRandomColor();
                this.player.score = this.enemy.score = 0;
                this.player.speed += 0.5;
                this.enemy.speed += 1;
                this.ball.speed += 1;
                this.round += 1;
            }
        } else if (this.enemy.score === R[this.round]) {
            this.isFinished = true;
            setTimeout(() => this.reboot('You Lost!'), 1000);
        }
    }

    getRandomColor() {
        var newColor = C[Math.floor(Math.random() * C.length)];
        if (newColor === this.canvas.backgroundColor) return this.getRandomColor();
        return newColor;
    }

    nextRound(winner, loser) {
        this.ball =  new Ball((B.width / 2) - 9, (B.height / 2) - 9, this.ball.speed)
        this.side = loser.side;
        this.clock = (new Date()).getTime();  
        winner.score++;
    }

    delay() {
        return ((new Date()).getTime() - this.clock >= 1000);
    }

    start(){
        this.render()
        this.canvas.drawStartText()

        document.addEventListener('keydown', (key) => {
            if (this.inProgress === false) {
                this.inProgress = true
                window.requestAnimationFrame(() => this.animate())
            }
        
            if (key.keyCode === 38 || key.keyCode === 87) this.player.dirY = D.UP
            if (key.keyCode === 40 || key.keyCode === 83) this.player.dirY = D.DOWN
        });
        
        document.addEventListener('keyup', () => { 
            this.player.dirY = D.STOP
        });
    }

    reboot(txt){
        this.canvas.drawEndText(txt)
            setTimeout(() => {

            this.player = new Player(150, (B.height / 2) - 35, 'left');
            this.enemy = new Player(B.width - 150, (B.height / 2) - 35, 'right');
            this.ball = new Ball((B.width / 2) - 9, (B.height / 2) - 9);

            this.inProgress = this.isFinished = false;
            this.side = 'left';
            this.clock = this.round = 0;
            this.canvas.backgroundColor = B.backgroundColor;

            this.start()
        }, 3000);
    }
}