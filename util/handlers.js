import { B, D} from '../config/globals.js'

export const handlers = {
    hasScored: function() {
        if (this.ball.posX <= 0) {
            this.nextRound(this.enemy, this.player)
        } else if (this.ball.posX >= B.width - this.ball.width) {
            this.nextRound(this.player, this.enemy)
        }
    },
    ballTouchedBorder: function() {
        if (this.ball.posY <= 0) {
            this.ball.dirY = D.DOWN
        } else if (this.ball.posY >= B.height - this.ball.width) {
            this.ball.dirY = D.UP
        } 
    },
    movePlayer: function() {
        if (this.player.dirY === D.UP) {
            this.player.posY -= this.player.speed
        } else if (this.player.dirY === D.DOWN) {
            this.player.posY += this.player.speed
        }
    },
    throwNewBall: function() {
        if (this.delay() && this.side) {
            this.ball.dirX = this.side === this.player.side ? D.LEFT : D.RIGHT
            this.ball.dirY = [D.UP, D.DOWN][Math.round(Math.random())]
            this.ball.posY = Math.floor(Math.random() * B.height - 200) + 200
            this.side = null
        }
    },
    playerTouchedBorder: function() {
        if (this.player.posY <= 0) {
            this.player.posY = 0
        }
        else if (this.player.posY >= (B.height - this.player.height)) {
            this.player.posY = (B.height - this.player.height)
        }
    },
    moveBall: function() {
        if (this.ball.dirY === D.UP) {
            this.ball.posY -= (this.ball.speed / 1.5)
        } else if (this.ball.dirY === D.DOWN) {
            this.ball.posY += (this.ball.speed / 1.5)
        }

        if (this.ball.dirX === D.LEFT) {
            this.ball.posX -= this.ball.speed
        } else if (this.ball.dirX === D.RIGHT) {
            this.ball.posX += this.ball.speed
        }
    },
    moveEnemy: function() {
        if (this.enemy.posY > this.ball.posY - (this.enemy.height / 2)) {
            if (this.ball.dirX === D.RIGHT) {
                this.enemy.posY -= this.enemy.speed / 1.5
            } else {
                this.enemy.posY -= this.enemy.speed / 4
            }
        }

        if (this.enemy.posY < this.ball.posY - (this.enemy.height / 2)) {
            if (this.ball.dirX === D.RIGHT) {
                this.enemy.posY += this.enemy.speed / 1.5
            } else {
                this.enemy.posY += this.enemy.speed / 4
            }
        }
    },
    enemyTouchedBorder: function() {
        if (this.enemy.posY >= B.height - this.enemy.height) {
            this.enemy.posY = B.height - this.enemy.height
        } else if (this.enemy.posY <= 0) {
            this.enemy.posY = 0
        } 
    },
    playerHitBall:  function() {
        if (this.ball.posX - this.ball.width <= this.player.posX && this.ball.posX >= this.player.posX - this.player.width) {
            if (this.ball.posY <= this.player.posY + this.player.height && this.ball.posY + this.ball.width >= this.player.posY) {
                this.ball.posX = (this.player.posX + this.ball.width);
                this.ball.dirX = D.RIGHT;
            }
        }
    },
    enemyHitBall: function() {
        if (this.ball.posX - this.ball.width <= this.enemy.posX && this.ball.posX >= this.enemy.posX - this.enemy.width) {
            if (this.ball.posY <= this.enemy.posY + this.enemy.height && this.ball.posY + this.ball.width >= this.enemy.posY) {
                this.ball.posX = (this.enemy.posX - this.ball.width);
                this.ball.dirX = D.LEFT;
            }
        }
    }
}    