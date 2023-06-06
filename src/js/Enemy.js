import * as ex from "excalibur"
import { Resources } from "./resources"

export class Enemy extends ex.Actor {
    enemyAnimations = []
    health = 1
    hit
    dead = false
    onGround
    Sprites
    Speeds
    SpriteRange
    Grid = []
    hitAnim
    Dimentions = []
    Collider
    Offset
    Dataclass

    /**
     * 
     * @param {Class} Dataclass an instance of DataClass() 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} Health 
     * @param {Array} Sprites 
     * @param {Array} Speeds [Numbers]
     * @param {Array} SpriteRange [Vector]
     * @param {ex.Shape} collider 
     * @param {Vector} offset 
     * @param {Array} Grid [Vector]
     * @param {Array} Dimentions [Vector]
     * @param {Vector} scale 
     */
    constructor(DataClass, x, y, Health, Sprites, Speeds, SpriteRange, collider, offset, Grid, Dimentions, Scale) {
        super({ 
            x: x,
            y: y,
            name: 'enemy',
            collisionType: ex.CollisionType.Active,
            collider: collider
            // collider: ex.Shape.Box(20, 40)
        })
        this.Dataclass = DataClass
        this.Sprites = Sprites
        this.Speeds = Speeds
        this.SpriteRange = SpriteRange
        this.Collider = collider
        this.Grid = Grid
        this.health = Health
        this.Offset = offset
        this.Dimentions = Dimentions
        if(Scale != undefined) {
            this.scale = Scale
        }
    }

    onInitialize(Engine) {
        const idleSheet = ex.SpriteSheet.fromImageSource({
            image: this.Sprites[0],
            grid: {
                rows: this.Grid[0].x,
                columns: this.Grid[0].y,
                spriteWidth: this.Dimentions[0].x,
                spriteHeight: this.Dimentions[0].y
            }
        })

        const walkSheet = ex.SpriteSheet.fromImageSource({
            image: this.Sprites[1],
            grid: {
                rows: this.Grid[1].x,
                columns: this.Grid[1].y,
                spriteWidth: this.Dimentions[1].x,
                spriteHeight: this.Dimentions[1].y
            }
        })

        const jumpSheet = ex.SpriteSheet.fromImageSource({
            image: this.Sprites[2],
            grid: {
                rows: this.Grid[2].x,
                columns: this.Grid[2].y,
                spriteWidth: this.Dimentions[2].x,
                spriteHeight: this.Dimentions[2].y
            }
        })

        const deathAnim = ex.SpriteSheet.fromImageSource({
            image: this.Sprites[3],
            grid: {
                rows: this.Grid[3].x,
                columns: this.Grid[3].y,
                spriteWidth: this.Dimentions[3].x,
                spriteHeight: this.Dimentions[3].y
            }
        })
        if (this.Sprites[4][1]) {
        const hitAnim = this.Sprites[4][0].toSprite() 
        this.enemyAnimations['Hit'] = hitAnim;  
        } else {
            const hitAnim = ex.SpriteSheet.fromImageSource({
                image: this.Sprites[4][0],
                grid: {
                    rows: this.Grid[4].x,
                    columns: this.Grid[4].y,
                    spriteWidth: this.Dimentions[4].x,
                    spriteHeight: this.Dimentions[4].y
                }
            })
            this.enemyAnimations['Hit'] = ex.Animation.fromSpriteSheet(hitAnim, ex.range(this.SpriteRange[4].x, this.SpriteRange[4].y), this.Speeds[4], ex.AnimationStrategy.Freeze);
        }


        this.enemyAnimations['Idle'] = ex.Animation.fromSpriteSheet(idleSheet, ex.range(this.SpriteRange[0].x, this.SpriteRange[0].y), this.Speeds[0]);
        this.enemyAnimations['Walk'] = ex.Animation.fromSpriteSheet(walkSheet, ex.range(this.SpriteRange[1].x, this.SpriteRange[1].y), this.Speeds[1]);
        this.enemyAnimations['Jump'] = ex.Animation.fromSpriteSheet(jumpSheet, ex.range(this.SpriteRange[2].x, this.SpriteRange[2].y), this.Speeds[2]);
        this.enemyAnimations['Death'] = ex.Animation.fromSpriteSheet(deathAnim, ex.range(this.SpriteRange[3].x, this.SpriteRange[3].y), this.Speeds[3], ex.AnimationStrategy.Freeze);

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
                if(!this.dead) { 
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
                }
                break;

            case this.health <= 0 : // Death
                if(!this.dead) {                    
                    switch(this.facing){
                        case "R":
                            this.enemyAnimations['Death'].flipHorizontal = false
                            break;
                        case "L":
                            this.enemyAnimations['Death'].flipHorizontal = true
                            break;
                    }
                    this.dead = true
                    this.collider.set(ex.Shape.Box(20, 1, ex.Vector.Half, this.Offset))
                    this.collisionType = ex.CollisionType.PreventCollision
                    this.graphics.use(this.enemyAnimations['Death'])
                    this.Dataclass.incrementScore()
                    this.addTag('dead')
                }
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
            if (!this.Sprites[4][1]) {
                this.enemyAnimations['Hit'].reset()
            }
            this.graphics.use(this.enemyAnimations['Hit'])
            this.health -= ammount
            let sound = Resources.playerhitsounds[ex.randomIntInRange(0, 3)] 
            sound.play(this.SFXVolume)
            setTimeout(() => {
                this.hit = false
                if(!this.dead) {
                    this.graphics.use(this.enemyAnimations['Idle'])
                }
            }, 400)
        }
    }
}