import * as ex from "excalibur"
import { Resources } from "./resources"

export class Enemy extends ex.Actor {
    enemyAnimations = []
    health = 5

    constructor(x, y, collisionGroup) {
        super({ 
            x: x,
            y: y,
            name: 'enemy',
            collisionType: ex.CollisionType.Active,
            // collisionGroup: collisionGroup,
            collider: ex.Shape.Box(20, 40, ex.Vector.Half, ex.vec(0, 20))
        })
    }

    onInitialize(Engine) {
        let idleSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.playeridle,
            grid: {
                rows: 1,
                columns: 10,
                spriteWidth: 120,
                spriteHeight: 80
            }
        })

        let jumpSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.playerjump,
            grid: {
                rows: 1,
                columns: 3,
                spriteWidth: 120,
                spriteHeight: 80
            }
        })

        let deathAnim = ex.SpriteSheet.fromImageSource({
            image: Resources.playerdeath,
            grid: {
                rows: 1,
                columns: 10,
                spriteWidth: 120,
                spriteHeight: 80
            }
        })

        this.enemyAnimations['idleAnim'] = ex.Animation.fromSpriteSheet(idleSheet, ex.range(0, 9), 100);
        this.enemyAnimations['jumpAnim'] = ex.Animation.fromSpriteSheet(jumpSheet, ex.range(0, 2), 50);
        this.enemyAnimations['deathAnim'] = ex.Animation.fromSpriteSheet(deathAnim, ex.range(0, 9), 50, ex.AnimationStrategy.Freeze);
    }

    update(Engine) {
        switch(true) {
            case this.animPlaying != 0 && this.health > 0: // Idle
                this.animPlaying = 0
                switch(this.facing){
                    case "R":
                        this.enemyAnimations['idleAnim'].flipHorizontal = false
                        break;
                    case "L":
                        this.enemyAnimations['idleAnim'].flipHorizontal = true
                        break;
                }
                this.graphics.use(this.enemyAnimations['idleAnim'])
                break;
                case this.health <= 0 : // Death
                    switch(this.facing){
                        case "R":
                            this.enemyAnimations['deathAnim'].flipHorizontal = false
                            break;
                        case "L":
                            this.enemyAnimations['deathAnim'].flipHorizontal = true
                            break;
                    }
                    this.graphics.use(this.enemyAnimations['deathAnim'])
                break;
        }
    }
}