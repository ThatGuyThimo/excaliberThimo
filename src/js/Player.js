import * as ex from "excalibur"
import { Resources } from "./resources"
export class Player extends ex.Actor {
    health = 3
    running = 0
    animPlaying = 0
    facing = "R"
    onGround = true
    jumped = false
    transition
    attackTransition
    playerAnimations = []
    attacking = 0
    clicked = 0
    sfxVol = 0.2
  
     constructor(x, y) {
        super({ 
            x: x,
            y: y,
            collisionType: ex.CollisionType.Active, 
            collider: ex.Shape.Box(20, 40, ex.Vector.Half, ex.vec(-5, 20))
        })
        // super({ x: 0, y: 0 })
    }

    onInitialize(engine) {

        let idleSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.playeridle,
            grid: {
                rows: 1,
                columns: 10,
                spriteWidth: 120,
                spriteHeight: 80
            }
        })

        let runSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.playerrun,
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

        let fallSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.playerfall,
            grid: {
                rows: 1,
                columns: 3,
                spriteWidth: 120,
                spriteHeight: 80
            }
        })

        let jumpToFallSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.playerjumptofall,
            grid: {
                rows: 1,
                columns: 2,
                spriteWidth: 120,
                spriteHeight: 80
            }
        })

        let attackAnim1 = ex.SpriteSheet.fromImageSource({
            image: Resources.playerattack1,
            grid: {
                rows: 1,
                columns: 4,
                spriteWidth: 120,
                spriteHeight: 80
            }
        })

        let attackAnim2 = ex.SpriteSheet.fromImageSource({
            image: Resources.playerattack2,
            grid: {
                rows: 1,
                columns: 6,
                spriteWidth: 120,
                spriteHeight: 80
            }
        })

        this.playerAnimations['idleAnim'] = ex.Animation.fromSpriteSheet(idleSheet, ex.range(0, 9), 100);
        this.playerAnimations['runAnim'] = ex.Animation.fromSpriteSheet(runSheet, ex.range(0, 9), 50);
        this.playerAnimations['jumpAnim'] = ex.Animation.fromSpriteSheet(jumpSheet, ex.range(0, 2), 50);
        this.playerAnimations['fallAnim'] = ex.Animation.fromSpriteSheet(fallSheet, ex.range(0, 2), 50);
        this.playerAnimations['jumpToFallAnim'] = ex.Animation.fromSpriteSheet(jumpToFallSheet, ex.range(0, 1), 200);
        this.playerAnimations['attackAnim1'] = ex.Animation.fromSpriteSheet(attackAnim1, ex.range(0, 3), 100);
        this.playerAnimations['attackAnim2'] = ex.Animation.fromSpriteSheet(attackAnim2, ex.range(0, 5), 100);

    }

    update(engine) {
        // console.log(this.animPlaying)
        if(this.vel.y == 0) {
            this.onGround = true
            this.jumped = false
        } else {
            this.onGround = false
        }
        if(this.onGround && !engine.input.keyboard.isHeld(ex.Input.Keys.D) && !engine.input.keyboard.isHeld(ex.Input.Keys.Right) && !engine.input.keyboard.isHeld(ex.Input.Keys.A) && !engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
            this.vel.x = 0
        }

        if(this.vel.x > 0 && this.vel.y == 0) {
            this.vel.x = this.vel.x - 1
            if (this.animPlaying != 1) {
                this.animPlaying = 1
                this.facing = "R"
                this.playerAnimations['runAnim'].flipHorizontal = false
                this.graphics.use(this.playerAnimations['runAnim'])
            }
        } else if(this.vel.x < 0 && this.vel.y == 0) {
            this.vel.x = this.vel.x + 1
            if (this.animPlaying != 2) {
                this.animPlaying = 2
                this.facing = "L"
                this.playerAnimations['runAnim'].flipHorizontal = true
                this.graphics.use(this.playerAnimations['runAnim'])
            }
        } else if(this.vel.y < 0 && this.vel.x < 0) {
            if (this.animPlaying != 3) {
                this.animPlaying = 3
                this.facing = "L"
                this.playerAnimations['jumpAnim'].flipHorizontal = true
                this.graphics.use(this.playerAnimations['jumpAnim'])
            }
        } else if(this.vel.y < 0 && this.vel.x > 0) {
            if (this.animPlaying != 4) {
                this.animPlaying = 4
                this.facing = "R"
                this.playerAnimations['jumpAnim'].flipHorizontal = false
                this.graphics.use(this.playerAnimations['jumpAnim'])
            }
        } else if(this.vel.y > 0 && this.vel.x > 0) {
            if (this.animPlaying != 5) {
                this.facing = "R"
                this.playerAnimations['fallAnim'].flipHorizontal = false
                this.playerAnimations['jumpToFallAnim'].flipHorizontal = false
                if (this.animPlaying != 9) {
                    this.transition = this.graphics.use(this.playerAnimations['jumpToFallAnim'])
                    this.animPlaying = 9
                }
                if(this.transition.currentFrameIndex == 1) {
                    this.graphics.use(this.playerAnimations['fallAnim'])
                    this.animPlaying = 5
                }
            }
        } else if(this.vel.y > 0 && this.vel.x < 0) {
            if (this.animPlaying != 6) {
                this.facing = "L"
                this.playerAnimations['fallAnim'].flipHorizontal = true
                this.playerAnimations['jumpToFallAnim'].flipHorizontal = true
                if (this.animPlaying != 9) {
                    this.transition = this.graphics.use(this.playerAnimations['jumpToFallAnim'])
                    this.animPlaying = 9
                }
                if(this.transition.currentFrameIndex == 1) {
                    this.graphics.use(this.playerAnimations['fallAnim'])
                    this.animPlaying = 6
                }
            }
        } else if(this.vel.y > 0 && this.vel.x == 0) {
            if (this.animPlaying != 7) {
                switch(this.facing){
                    case "R":
                        this.playerAnimations['fallAnim'].flipHorizontal = false
                        this.playerAnimations['jumpToFallAnim'].flipHorizontal = false
                        break;
                    case "L":
                        this.playerAnimations['fallAnim'].flipHorizontal = true
                        this.playerAnimations['jumpToFallAnim'].flipHorizontal = true
                        break;
                }
                
                if (this.animPlaying != 9) {
                    this.transition = this.graphics.use(this.playerAnimations['jumpToFallAnim'])
                    this.animPlaying = 9
                }
                if(this.transition.currentFrameIndex == 1) {
                    this.animPlaying = 7
                    this.graphics.use(this.playerAnimations['fallAnim'])
                }
            }
        } else if(this.vel.y < 0 && this.vel.x == 0) {
            if (this.animPlaying != 8) {
                switch(this.facing){
                    case "R":
                        this.playerAnimations['jumpAnim'].flipHorizontal = false
                        break;
                    case "L":
                        this.playerAnimations['jumpAnim'].flipHorizontal = true
                        break;
                }
                this.animPlaying = 8
                this.graphics.use(this.playerAnimations['jumpAnim'])
            }
        } else {
            if (this.animPlaying != 0 && this.attacking == 0) {
                this.animPlaying = 0
                switch(this.facing){
                    case "R":
                        this.playerAnimations['idleAnim'].flipHorizontal = false
                        break;
                    case "L":
                        this.playerAnimations['idleAnim'].flipHorizontal = true
                        break;
                }
                this.graphics.use(this.playerAnimations['idleAnim'])
            }
        }
        if(this.attacking != 0) {
            // console.log(this.attackTransition.currentFrameIndex)
            console.log(this.attacking, " att")
            if(this.attackTransition.currentFrameIndex == 3 && this.attacking == 1) {
                this.attacking = 0       
            }
            if(this.attackTransition.currentFrameIndex == 5 && this.attacking >= 2) {
                this.attacking = 0
            }
        }
        if (this.attacking > 2) {
            this.attacking = 0
        }

        if(engine.input.keyboard.isHeld(ex.Input.Keys.D) || engine.input.keyboard.isHeld(ex.Input.Keys.Right) && this.attacking == 0) {
            this.movePlayer("D")

        }
        if(engine.input.keyboard.isHeld(ex.Input.Keys.A) || engine.input.keyboard.isHeld(ex.Input.Keys.Left) && this.attacking == 0) {
            this.movePlayer("A")
        }  

        if (engine.input.keyboard.wasPressed(ex.Input.Keys.Space) || engine.input.keyboard.wasPressed(ex.Input.Keys.ArrowUp) && this.attacking == 0) {
            if(this.onGround) {
                this.jump()
                this.jumped = true
            }
        }
        if (engine.input.keyboard.wasPressed(ex.Input.Keys.F) ){
            this.attacking += 1
            console.log(this.attacking)
            // console.log('clicked')
            this.attack(this.attacking)
        }
            
    }
    movePlayer(key) {
        if (this.attacking == 0) {
            switch(key){
                case  "D":
                    this.vel.x = 150
                    break;
                case "A":
                    this.vel.x = -150
                    break;
                default:
    
            }
        }
    }
    jump() {
        this.vel.y = -300
        let sound = Resources.jumpingsounds[ex.randomIntInRange(0, 2)] 
        sound.play(this.sfxVol)
    }
    attack(value) {
        console.log(value)
        if(value == 1) {
            if (this.animPlaying != 10) {
                this.animPlaying = 10
                switch(this.facing){
                    case "R":
                        this.playerAnimations['attackAnim1'].flipHorizontal = false
                        break;
                    case "L":
                        this.playerAnimations['attackAnim1'].flipHorizontal = true
                        break;
                }
                this.attackTransition = this.playerAnimations['attackAnim1']
                this.attackTransition.reset()
                this.graphics.use(this.attackTransition)
                let sound = Resources.attack1sounds[ex.randomIntInRange(0, 2)] 
                sound.play(this.sfxVol)
            }
        } else if (value == 2) {
            if (this.animPlaying != 11) {
                this.animPlaying = 11
                switch(this.facing){
                    case "R":
                        this.playerAnimations['attackAnim2'].flipHorizontal = false
                        break;
                    case "L":
                        this.playerAnimations['attackAnim2'].flipHorizontal = true
                        break;
                }
                this.attackTransition = this.playerAnimations['attackAnim2']
                this.attackTransition.reset()
                this.graphics.use(this.attackTransition)
                let sound = Resources.attack2sounds[ex.randomIntInRange(0, 2)] 
                sound.play(this.sfxVol)
            }

        }
        // this.attacking = 0
    }
  }