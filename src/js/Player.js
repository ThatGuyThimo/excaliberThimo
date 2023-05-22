import * as ex from "excalibur"
import { Resources } from "./resources"
export class Player extends ex.Actor {

    onGround = true
    jumped = false
    crouching = false
    health = 3
    running = 0
    animPlaying = 0
    attacking = 0
    sfxVol = 0.2
    facing = "R"
    playerAnimations = []
    transition
    attackTransition
  
     constructor(x, y) {
        super({ 
            x: x,
            y: y,
            collisionType: ex.CollisionType.Active, 
            collider: ex.Shape.Box(20, 40, ex.Vector.Half, ex.vec(0, 20))
        })
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

        let crouching = Resources.crouchinganims[0].toSprite()

        let crouchTarnsition = Resources.crouchinganims[1].toSprite()

        let crouchWalking = ex.SpriteSheet.fromImageSource({
            image: Resources.crouchinganims[2],
            grid: {
                rows: 1,
                columns: 8,
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
        this.playerAnimations['crouching'] = crouching;
        this.playerAnimations['crouchTarnsition'] = crouchTarnsition
        this.playerAnimations['crouchWalking'] = ex.Animation.fromSpriteSheet(crouchWalking, ex.range(0, 5), 50);

    }

    update(engine) {
        // console.log(this.animPlaying)

        // console.log(this.onGround)
        // console.log(this.vel.y)
        if(this.vel.y == 0) {
            if(this.onGround == false) {
                let sound = Resources.jumpingsounds[ex.randomIntInRange(0, 2)] 
                sound.play(this.sfxVol)
            }
            this.onGround = true
            this.jumped = false
        } else {
            this.onGround = false
        }
        if(this.onGround && !engine.input.keyboard.isHeld(ex.Input.Keys.D) && !engine.input.keyboard.isHeld(ex.Input.Keys.Right) && !engine.input.keyboard.isHeld(ex.Input.Keys.A) && !engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
            this.vel.x = 0
        }
        if(this.crouching && !engine.input.keyboard.isHeld(ex.Input.Keys.S) && !engine.input.keyboard.isHeld(ex.Input.Keys.ArrowDown)) {
            this.crouching = false
        }

        switch(true) {
            case this.facing == "R" && !this.crouching:
                this.collider.set(ex.Shape.Box(20, 40, ex.Vector.Half, ex.vec(-5, 20)))
                break;
            case this.facing == "L" && !this.crouching:
                this.collider.set(ex.Shape.Box(20, 40, ex.Vector.Half, ex.vec(5, 20)))
                break;
            case this.facing == "R" && this.crouching:
                this.collider.set(ex.Shape.Box(20, 20, ex.Vector.Half, ex.vec(-5,30)))
                break;
            case this.facing == "L" && this.crouching:
                this.collider.set(ex.Shape.Box(20, 20, ex.Vector.Half, ex.vec(5, 30)))
                break;

        }

        switch(true) {
            case !this.crouching && this.vel.x > 0 && this.vel.y == 0: // Right running
                this.vel.x = this.vel.x - 1
                if (this.animPlaying != 1) {
                    this.animPlaying = 1
                    this.facing = "R"
                    this.playerAnimations['runAnim'].flipHorizontal = false
                    this.graphics.use(this.playerAnimations['runAnim'])
                }
                break;
            case !this.crouching && this.vel.x < 0 && this.vel.y == 0: // Left running
                this.vel.x = this.vel.x + 1
                if (this.animPlaying != 2) {
                    this.animPlaying = 2
                    this.facing = "L"
                    this.playerAnimations['runAnim'].flipHorizontal = true
                    this.graphics.use(this.playerAnimations['runAnim'])
                }
                break;
            case this.vel.y < 0 && this.vel.x < 0: // Left jumping
                if (this.animPlaying != 3) {
                    this.animPlaying = 3
                    this.facing = "L"
                    this.playerAnimations['jumpAnim'].flipHorizontal = true
                    this.graphics.use(this.playerAnimations['jumpAnim'])
                }
                break;
            case this.vel.y < 0 && this.vel.x > 0: // Right jumping
                if (this.animPlaying != 4) {
                    this.animPlaying = 4
                    this.facing = "R"
                    this.playerAnimations['jumpAnim'].flipHorizontal = false
                    this.graphics.use(this.playerAnimations['jumpAnim'])
                }
                break;
            case this.vel.y > 0 && this.vel.x > 0: // Right falling
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
                break;
            case this.vel.y > 0 && this.vel.x < 0: // Left falling
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
                break;
            case this.vel.y > 0 && this.vel.x == 0: // Falling no movement
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
            case this.vel.y < 0 && this.vel.x == 0 : // Jumping no movement 
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
                break;
            case this.crouching && this.vel.y == 0 && this.vel.x == 0 : // Crouching no movement
                if (this.animPlaying != 10) {
                    switch(this.facing){
                        case "R":
                            this.playerAnimations['crouching'].flipHorizontal = true
                            break;
                        case "L":
                            this.playerAnimations['crouching'].flipHorizontal = false
                            break;
                    }
                    this.graphics.use(this.playerAnimations['crouching'])
                    this.animPlaying = 10
                }
                break;
            case this.crouching && this.vel.x < 0 && this.vel.y == 0 : // Right crouch walking
                if (this.animPlaying != 11) {
                    this.animPlaying = 11
                    this.facing = "R"
                    this.playerAnimations['crouchWalking'].flipHorizontal = true
                    this.graphics.use(this.playerAnimations['crouchWalking'])
                }
                break;
            case this.crouching && this.vel.x > 0 && this.vel.y == 0 : // Left crouch walking
                if (this.animPlaying != 12) {
                    this.animPlaying = 12
                    this.facing = "L"
                    this.playerAnimations['crouchWalking'].flipHorizontal = false
                    this.graphics.use(this.playerAnimations['crouchWalking'])
                }
                break;
            case !this.crouching && this.animPlaying != 0 && this.attacking == 0 : // Idle
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
                break;
        }

        // if(!this.crouching && this.vel.x > 0 && this.vel.y == 0) { // Right running
        //     this.vel.x = this.vel.x - 1
        //     if (this.animPlaying != 1) {
        //         this.animPlaying = 1
        //         this.facing = "R"
        //         this.playerAnimations['runAnim'].flipHorizontal = false
        //         this.graphics.use(this.playerAnimations['runAnim'])
        //     }
        // } else if(!this.crouching && this.vel.x < 0 && this.vel.y == 0) {  // Left running
        //     this.vel.x = this.vel.x + 1
        //     if (this.animPlaying != 2) {
        //         this.animPlaying = 2
        //         this.facing = "L"
        //         this.playerAnimations['runAnim'].flipHorizontal = true
        //         this.graphics.use(this.playerAnimations['runAnim'])
        //     }
        // } else if(this.vel.y < 0 && this.vel.x < 0) { // Left jumping
        //     if (this.animPlaying != 3) {
        //         this.animPlaying = 3
        //         this.facing = "L"
        //         this.playerAnimations['jumpAnim'].flipHorizontal = true
        //         this.graphics.use(this.playerAnimations['jumpAnim'])
        //     }
        // } else if(this.vel.y < 0 && this.vel.x > 0) { // Right jumping
        //     if (this.animPlaying != 4) {
        //         this.animPlaying = 4
        //         this.facing = "R"
        //         this.playerAnimations['jumpAnim'].flipHorizontal = false
        //         this.graphics.use(this.playerAnimations['jumpAnim'])
        //     }
        // } else if(this.vel.y > 0 && this.vel.x > 0) { // Right falling
        //     if (this.animPlaying != 5) {
        //         this.facing = "R"
        //         this.playerAnimations['fallAnim'].flipHorizontal = false
        //         this.playerAnimations['jumpToFallAnim'].flipHorizontal = false
        //         if (this.animPlaying != 9) {
        //             this.transition = this.graphics.use(this.playerAnimations['jumpToFallAnim'])
        //             this.animPlaying = 9
        //         }
        //         if(this.transition.currentFrameIndex == 1) {
        //             this.graphics.use(this.playerAnimations['fallAnim'])
        //             this.animPlaying = 5
        //         }
        //     }
        // } else if(this.vel.y > 0 && this.vel.x < 0) { // Left falling
        //     if (this.animPlaying != 6) {
        //         this.facing = "L"
        //         this.playerAnimations['fallAnim'].flipHorizontal = true
        //         this.playerAnimations['jumpToFallAnim'].flipHorizontal = true
        //         if (this.animPlaying != 9) {
        //             this.transition = this.graphics.use(this.playerAnimations['jumpToFallAnim'])
        //             this.animPlaying = 9
        //         }
        //         if(this.transition.currentFrameIndex == 1) {
        //             this.graphics.use(this.playerAnimations['fallAnim'])
        //             this.animPlaying = 6
        //         }
        //     }
        // } else if(this.vel.y > 0 && this.vel.x == 0) { // Falling no movement
        //     if (this.animPlaying != 7) {
        //         switch(this.facing){
        //             case "R":
        //                 this.playerAnimations['fallAnim'].flipHorizontal = false
        //                 this.playerAnimations['jumpToFallAnim'].flipHorizontal = false
        //                 break;
        //             case "L":
        //                 this.playerAnimations['fallAnim'].flipHorizontal = true
        //                 this.playerAnimations['jumpToFallAnim'].flipHorizontal = true
        //                 break;
        //         }
                
        //         if (this.animPlaying != 9) {
        //             this.transition = this.graphics.use(this.playerAnimations['jumpToFallAnim'])
        //             this.animPlaying = 9
        //         }
        //         if(this.transition.currentFrameIndex == 1) {
        //             this.animPlaying = 7
        //             this.graphics.use(this.playerAnimations['fallAnim'])
        //         }
        //     }
        // } else if(this.vel.y < 0 && this.vel.x == 0) { // Jumping no movement 
        //     if (this.animPlaying != 8) {
        //         switch(this.facing){
        //             case "R":
        //                 this.playerAnimations['jumpAnim'].flipHorizontal = false
        //                 break;
        //             case "L":
        //                 this.playerAnimations['jumpAnim'].flipHorizontal = true
        //                 break;
        //         }
        //         this.animPlaying = 8
        //         this.graphics.use(this.playerAnimations['jumpAnim'])
        //     }
        // } else if(this.crouching && this.vel.y == 0 && this.vel.x == 0) { // Crouching no movement
        //     if (this.animPlaying != 10) {
        //         switch(this.facing){
        //             case "R":
        //                 this.playerAnimations['crouching'].flipHorizontal = false
        //                 break;
        //             case "L":
        //                 this.playerAnimations['crouching'].flipHorizontal = true
        //                 break;
        //         }
        //         this.graphics.use(this.playerAnimations['crouching'])
        //         this.animPlaying = 10
        //     }
        // } else if(this.crouching && this.vel.x < 0 && this.vel.y == 0) { // Right crouch walking
        //     if (this.animPlaying != 11) {
        //         this.animPlaying = 11
        //         this.facing = "R"
        //         this.playerAnimations['crouchWalking'].flipHorizontal = true
        //         this.graphics.use(this.playerAnimations['crouchWalking'])
        //     }
        // } else if(this.crouching && this.vel.x > 0 && this.vel.y == 0) { // Left crouch walking
        //     if (this.animPlaying != 12) {
        //         this.animPlaying = 12
        //         this.facing = "L"
        //         this.playerAnimations['crouchWalking'].flipHorizontal = false
        //         this.graphics.use(this.playerAnimations['crouchWalking'])
        //     }
        // } else {
        //     if (this.animPlaying != 0 && this.attacking == 0 && !this.crouching) { // Idle
        //         this.animPlaying = 0
        //         switch(this.facing){
        //             case "R":
        //                 this.playerAnimations['idleAnim'].flipHorizontal = false
        //                 break;
        //             case "L":
        //                 this.playerAnimations['idleAnim'].flipHorizontal = true
        //                 break;
        //         }
        //         this.graphics.use(this.playerAnimations['idleAnim'])
        //     }
        // }

        // Attacking logic
        if(this.attacking != 0) {
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
        if (engine.input.keyboard.isHeld(ex.Input.Keys.S) || engine.input.keyboard.isHeld(ex.Input.Keys.ArrowDown) && this.attacking == 0) {
            if(this.onGround) {
                this.crouch()
                this.crouching = true
            }
        }
        if (engine.input.keyboard.wasPressed(ex.Input.Keys.F) ){
            this.attacking += 1
            this.attack(this.attacking)
        }
            
    }
    movePlayer(key) {
        if (this.attacking == 0) {
            switch(key){
                case  "D":
                    switch(this.crouching){
                        case true:
                            this.vel.x = 75
                            break;
                        default:
                            this.vel.x = 150
                            break;
                    }
                    break;
                case "A":
                    switch(this.crouching){
                        case true:
                            this.vel.x = -75
                            break;
                        default:
                            this.vel.x = -150
                            break;
                    }
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
    crouch() {
        if (!this.crouching) {
            let sound = Resources.crouchingsounds[ex.randomIntInRange(0, 2)]
            sound.play(this.sfxVol)
        }
    }
    attack(value) {
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