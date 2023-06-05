import * as ex from "excalibur"
import { Resources } from "./resources"

export class Enemy extends ex.Actor {
    enemyAnimations = []
    health = 5
    hit
    onGround
    Sprites
    Speeds
    SpriteRange

    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Array} Sprites 
     * @param {Array} Speeds [Numbers]
     * @param {Array} SpriteRange [Vector]
     */
    constructor(x, y, Sprites, Speeds, SpriteRange, collider) {
        super({ 
            x: x,
            y: y,
            name: 'enemy',
            collisionType: ex.CollisionType.Active,
            collider: collider
            // collider: ex.Shape.Box(20, 40)
        })
        this.Sprites = Sprites
        this.Speeds = Speeds
        this.SpriteRange = SpriteRange
    }

    onInitialize(Engine) {
        let idleSheet = ex.SpriteSheet.fromImageSource({
            image: this.Sprites[0],
            grid: {
                rows: 1,
                columns: 10,
                spriteWidth: 120,
                spriteHeight: 80
            }
        })

        let walkSheet = ex.SpriteSheet.fromImageSource({
            image: this.Sprites[1],
            grid: {
                rows: 1,
                columns: 10,
                spriteWidth: 120,
                spriteHeight: 80
            }
        })

        let jumpSheet = ex.SpriteSheet.fromImageSource({
            image: this.Sprites[2],
            grid: {
                rows: 1,
                columns: 3,
                spriteWidth: 120,
                spriteHeight: 80
            }
        })

        let deathAnim = ex.SpriteSheet.fromImageSource({
            image: this.Sprites[3],
            grid: {
                rows: 1,
                columns: 10,
                spriteWidth: 120,
                spriteHeight: 80
            }
        })

        let hitAnim = this.Sprites[4].toSprite()

        this.enemyAnimations['Idle'] = ex.Animation.fromSpriteSheet(idleSheet, ex.range(this.SpriteRange[0].x, this.SpriteRange[0].y), this.Speeds[0]);
        this.enemyAnimations['Walk'] = ex.Animation.fromSpriteSheet(walkSheet, ex.range(this.SpriteRange[1].x, this.SpriteRange[1].y), this.Speeds[1]);
        this.enemyAnimations['Jump'] = ex.Animation.fromSpriteSheet(jumpSheet, ex.range(this.SpriteRange[2].x, this.SpriteRange[2].y), this.Speeds[2]);
        this.enemyAnimations['Death'] = ex.Animation.fromSpriteSheet(deathAnim, ex.range(this.SpriteRange[3].x, this.SpriteRange[3].y), this.Speeds[3], ex.AnimationStrategy.Freeze);
        this.enemyAnimations['Hit'] = hitAnim;

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
                        this.enemyAnimations['Idle'].flipHorizontal = false
                        break;
                    case "L":
                        this.enemyAnimations['Idle'].flipHorizontal = true
                        break;
                }
                this.graphics.use(this.enemyAnimations['Idle'])
                break;
                case this.health <= 0 : // Death
                    switch(this.facing){
                        case "R":
                            this.enemyAnimations['Death'].flipHorizontal = false
                            break;
                        case "L":
                            this.enemyAnimations['Death'].flipHorizontal = true
                            break;
                    }
                    this.collider.set(ex.Shape.Box(30, 1, ex.Vector.Half, ex.vec(-25, 40)))
                    this.collisionType = ex.CollisionType.Prevent
                    this.graphics.use(this.enemyAnimations['Death'])
                    this.addTag('dead')
                break;
        }
    }

    takeDamage(ammount, side) {
        if (this.health > 0) {
            switch(this.facing){
                case "R":
                    this.enemyAnimations['Hit'].flipHorizontal = false
                    break;
                case "L":
                    this.enemyAnimations['Hit'].flipHorizontal = true
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
            this.graphics.use(this.enemyAnimations['Hit'])
            this.health -= ammount
            let sound = Resources.playerhitsounds[ex.randomIntInRange(0, 3)] 
            sound.play(this.SFXVolume)
            setTimeout(() => {
                this.hit = false
                this.graphics.use(this.enemyAnimations['Idle'])
            }, 400)
        }
    }
}