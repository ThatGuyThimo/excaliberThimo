import * as ex from "excalibur"
import { Resources } from "./resources"

export class Enemy extends ex.Actor {
    enemyAnimations = []
    health = 5
    hit
    onGround

    constructor(x, y, collisionGroup) {
        super({ 
            x: x,
            y: y,
            name: 'enemy',
            collisionType: ex.CollisionType.Active,
            // collisionGroup: collisionGroup,
            collider: ex.Shape.Box(20, 40, ex.Vector.Half, ex.vec(-5, 20))
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

        let hitAnim = Resources.playerhit.toSprite()

        this.enemyAnimations['idleAnim'] = ex.Animation.fromSpriteSheet(idleSheet, ex.range(0, 9), 100);
        this.enemyAnimations['jumpAnim'] = ex.Animation.fromSpriteSheet(jumpSheet, ex.range(0, 2), 50);
        this.enemyAnimations['deathAnim'] = ex.Animation.fromSpriteSheet(deathAnim, ex.range(0, 9), 50, ex.AnimationStrategy.Freeze);
        this.enemyAnimations['playerHit'] = hitAnim;

        this.on('collisionstart', (event) => {
            if (event.other._name == "attackbox" && !this.hit && this.health > 0) {
                if(event.other._tagsMemo[0] == 'attacking1') {
                    this.hit = true
                    this.takeDamage(1, event.contact.info.sideId)
                } else if (event.other._tagsMemo[0] == 'attacking2') {
                    this.hit = true
                    this.takeDamage(2, event.contact.info.sideId)
                }
            }
        })
    }

    update(Engine) {

        if(this.vel.y != 0) {
            this.onGround = false
        } else {
            this.onGround = true
        }
        if(this.onGround) {
            this.vel.x = 0
        }

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
                    this.collider.set(ex.Shape.Box(30, 1, ex.Vector.Half, ex.vec(-25, 40)))
                    this.collisionType = ex.CollisionType.Prevent
                    this.graphics.use(this.enemyAnimations['deathAnim'])
                    this.addTag('dead')
                break;
        }
    }

    takeDamage(ammount, side) {
        if (this.health > 0) {
            switch(this.facing){
                case "R":
                    this.enemyAnimations['playerHit'].flipHorizontal = false
                    break;
                case "L":
                    this.enemyAnimations['playerHit'].flipHorizontal = true
                    break;
            }
            switch(side) {
                case 3: 
                    this.vel.y = -150
                    // setTimeout(() => {
                    //     this.vel.x = -200
                    // }, 100)
                    break;
                case 1:
                    this.vel.y = -150
                    // setTimeout(() => {
                    //     this.vel.x = 200
                    // }, 100)
                    break;
            }
            this.graphics.use(this.enemyAnimations['playerHit'])
            this.health -= ammount
            let sound = Resources.playerhitsounds[ex.randomIntInRange(0, 3)] 
            sound.play(this.SFXVolume)
            setTimeout(() => {
                this.hit = false
                this.graphics.use(this.enemyAnimations['idleAnim'])
            }, 400)
        }
    }
}