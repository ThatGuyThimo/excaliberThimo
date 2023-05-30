import * as ex from "excalibur"
import { Resources } from "./resources"
export class Player extends ex.Actor {

    onGround = true
    jumped = false
    crouching = false
    hit = false
    health = 3
    animPlaying = 0
    attacking = 0
    SFXVolume = localStorage.getItem('SFXvolume')
    facing = "R"
    playerAnimations = []
    transition
    attackTransition
    DataClass
  
     constructor(x, y, Dataclass, collisionGroup) {
        super({ 
            x: x,
            y: y,
            name: 'player',
            collisionType: ex.CollisionType.Active,
            // collisionGroup: collisionGroup,
            collider: ex.Shape.Box(20, 40, ex.Vector.Half, ex.vec(0, 20))
        })
        this.DataClass = Dataclass
    }

    onInitialize(engine) {

        // Create all the SpriteSheets
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

        let crouchAttack = ex.SpriteSheet.fromImageSource({
            image: Resources.crouchinganims[3],
            grid: {
                rows: 1,
                columns: 4,
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

        // Collect animations into an array
        this.playerAnimations['idleAnim'] = ex.Animation.fromSpriteSheet(idleSheet, ex.range(0, 9), 100);
        this.playerAnimations['runAnim'] = ex.Animation.fromSpriteSheet(runSheet, ex.range(0, 9), 50);
        this.playerAnimations['jumpAnim'] = ex.Animation.fromSpriteSheet(jumpSheet, ex.range(0, 2), 50);
        this.playerAnimations['fallAnim'] = ex.Animation.fromSpriteSheet(fallSheet, ex.range(0, 2), 50);
        this.playerAnimations['jumpToFallAnim'] = ex.Animation.fromSpriteSheet(jumpToFallSheet, ex.range(0, 1), 50);
        this.playerAnimations['attackAnim1'] = ex.Animation.fromSpriteSheet(attackAnim1, ex.range(0, 3), 100);
        this.playerAnimations['attackAnim2'] = ex.Animation.fromSpriteSheet(attackAnim2, ex.range(0, 5), 100);
        this.playerAnimations['crouching'] = crouching;
        this.playerAnimations['crouchTarnsition'] = crouchTarnsition;
        this.playerAnimations['crouchWalking'] = ex.Animation.fromSpriteSheet(crouchWalking, ex.range(0, 5), 50);
        this.playerAnimations['crouchAttack'] = ex.Animation.fromSpriteSheet(crouchAttack, ex.range(0, 3), 100);
        this.playerAnimations['deathAnim'] = ex.Animation.fromSpriteSheet(deathAnim, ex.range(0, 9), 100, ex.AnimationStrategy.Freeze);
        this.playerAnimations['playerHit'] = hitAnim;

        this.on('collisionstart', (event) => {
            if (event.other._name == "enemy" && !this.hit) {
                this.takeDamage(1, event.contact.info.sideId)
                this.hit = true
            }
        })

    }

    update(engine) {
        // console.log(this.animPlaying)
        // console.log(this.facing)
        // console.log(this.onGround)
        // console.log(this.vel.y)
        this.SFXVolume = localStorage.getItem('SFXvolume')
        if(this.vel.y == 0) {
            if(this.onGround == false) {
                let sound = Resources.landingsounds[ex.randomIntInRange(0, 2)] 
                sound.play(this.SFXVolume)
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

        // Hitbox state machine
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

        // Animation state machine
        switch(true) {
            case !this.hit && this.attacking == 0 && !this.crouching && this.vel.x > 0 && this.vel.y == 0: // Right running
                this.vel.x = this.vel.x - 1
                if (this.animPlaying != 1) {
                    this.animPlaying = 1
                    this.facing = "R"
                    this.playerAnimations['runAnim'].flipHorizontal = false
                    this.graphics.use(this.playerAnimations['runAnim'])
                }
                break;
            case !this.hit && this.attacking == 0 && !this.crouching && this.vel.x < 0 && this.vel.y == 0: // Left running
                this.vel.x = this.vel.x + 1
                if (this.animPlaying != 2) {
                    this.animPlaying = 2
                    this.facing = "L"
                    this.playerAnimations['runAnim'].flipHorizontal = true
                    this.graphics.use(this.playerAnimations['runAnim'])
                }
                break;
            case !this.hit && this.attacking == 0 && this.vel.y < 0 && this.vel.x < 0: // Left jumping
                if (this.animPlaying != 3) {
                    this.animPlaying = 3
                    this.facing = "L"
                    this.playerAnimations['jumpAnim'].flipHorizontal = true
                    this.graphics.use(this.playerAnimations['jumpAnim'])
                }
                break;
            case !this.hit && this.attacking == 0 && this.vel.y < 0 && this.vel.x > 0: // Right jumping
                if (this.animPlaying != 4) {
                    this.animPlaying = 4
                    this.facing = "R"
                    this.playerAnimations['jumpAnim'].flipHorizontal = false
                    this.graphics.use(this.playerAnimations['jumpAnim'])
                }
                break;
            case !this.hit && this.attacking == 0 && this.vel.y > 0 && this.vel.x > 0: // Right falling
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
                        this.transition.reset()
                    }
                }
                break;
            case !this.hit && this.attacking == 0 && this.vel.y > 0 && this.vel.x < 0: // Left falling
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
                        this.transition.reset()
                    }
                }
                break;
            case !this.hit && this.attacking == 0 && this.vel.y > 0 && this.vel.x == 0: // Falling no movement
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
                        this.transition.reset()
                    }
                }
                break;
            case !this.hit && this.attacking == 0 && this.vel.y < 0 && this.vel.x == 0 : // Jumping no movement 
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
            case !this.hit && this.attacking == 0 && this.crouching && this.vel.y == 0 && this.vel.x == 0 : // Crouching no movement
                if (this.animPlaying != 12) {
                    switch(this.facing){
                        case "R":
                            this.playerAnimations['crouching'].flipHorizontal = false
                            break;
                        case "L":
                            this.playerAnimations['crouching'].flipHorizontal = true
                            break;
                    }
                    this.graphics.use(this.playerAnimations['crouching'])
                    this.animPlaying = 12
                }
                break;
            case !this.hit && this.attacking == 0 && this.crouching && this.vel.x < 0 && this.vel.y == 0 : // Right crouch walking
                if (this.animPlaying != 13) {
                    this.animPlaying = 13
                    this.facing = "L"
                    this.playerAnimations['crouchWalking'].flipHorizontal = true
                    this.graphics.use(this.playerAnimations['crouchWalking'])
                }
                break;
            case !this.hit && this.attacking == 0 && this.crouching && this.vel.x > 0 && this.vel.y == 0 : // Left crouch walking
                if (this.animPlaying != 14) {
                    this.animPlaying = 14
                    this.facing = "R"
                    this.playerAnimations['crouchWalking'].flipHorizontal = false
                    this.graphics.use(this.playerAnimations['crouchWalking'])
                }
                break;
            case !this.hit && !this.crouching && this.animPlaying != 0 && this.attacking == 0 && this.health > 0: // Idle
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
                case this.health == 0 : // Death
                    switch(this.facing){
                        case "R":
                            this.playerAnimations['deathAnim'].flipHorizontal = false
                            break;
                        case "L":
                            this.playerAnimations['deathAnim'].flipHorizontal = true
                            break;
                    }
                    this.graphics.use(this.playerAnimations['deathAnim'])
                break;
        }

        // Attacking logic
        if (this.attacking > 2) {
            this.attacking = 0
        } else if(this.attacking != 0) {
            this.vel.x = 0
            if(this.attackTransition.currentFrameIndex == 3 && this.attacking == 1 && !this.crouching) {
                this.addComponent( new ex.TagComponent('attacking1'));   
                this.attacking = 0    
            }
            if(this.attackTransition.currentFrameIndex == 5 && this.attacking >= 2 && !this.crouching) {
                this.addComponent( new ex.TagComponent('attacking2'));
                this.attacking = 0
            }
            if (this.crouching && this.attackTransition.currentFrameIndex == 3) {
                this.attacking = 0
            }

        }

        // Input logic
        if(engine.input.keyboard.isHeld(ex.Input.Keys.D) && !this.hit && this.attacking == 0 && this.health > 0 || engine.input.keyboard.isHeld(ex.Input.Keys.Right) && !this.hit && this.attacking == 0 && this.health > 0) {
            this.movePlayer("D")

        }
        if(engine.input.keyboard.isHeld(ex.Input.Keys.A) && !this.hit && this.attacking == 0 && this.health > 0 || engine.input.keyboard.isHeld(ex.Input.Keys.Left) && !this.hit && this.attacking == 0 && this.health > 0) {
            this.movePlayer("A")
        }  

        if (engine.input.keyboard.wasPressed(ex.Input.Keys.Space) && !this.hit && this.attacking == 0 && this.health > 0 || engine.input.keyboard.wasPressed(ex.Input.Keys.ArrowUp) && !this.hit && this.attacking == 0 && this.health > 0) {
            if(this.onGround) {
                this.jump()
                this.jumped = true
            }
        }
        if (engine.input.keyboard.isHeld(ex.Input.Keys.S) && !this.hit && this.attacking == 0 && this.health > 0 || engine.input.keyboard.isHeld(ex.Input.Keys.ArrowDown) && !this.hit && this.attacking == 0 && this.health > 0) {
            if(this.onGround) {
                this.crouch()
                this.crouching = true
            }
        }
        if (engine.input.keyboard.wasPressed(ex.Input.Keys.F) && !this.hit && this.health > 0 ){
            this.attacking += 1
            this.attack(this.attacking)
        }
        if (engine.input.keyboard.wasPressed(ex.Input.Keys.Escape)){
            engine.goToScene('pausescreen')
        }
            
    }

    // Movement logic
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
        this.transition.reset()
        this.vel.y = -300
        let sound = Resources.jumpingsounds[ex.randomIntInRange(0, 2)] 
        sound.play(this.SFXVolume)
    }
    crouch() {
        if (!this.crouching) {
            let sound = Resources.crouchingsounds[ex.randomIntInRange(0, 2)]
            sound.play(this.SFXVolume)
        }
    }
    attack(value) {
        if(value == 1) {
            if (this.animPlaying != 10) {
                this.animPlaying = 10
                switch(this.facing){
                    case "R":
                        this.playerAnimations['attackAnim1'].flipHorizontal = false
                        this.playerAnimations['crouchAttack'].flipHorizontal = false
                        break;
                    case "L":
                        this.playerAnimations['crouchAttack'].flipHorizontal = true
                        this.playerAnimations['attackAnim1'].flipHorizontal = true
                        break;
                }
                if (!this.crouching) {
                    this.attackTransition = this.playerAnimations['attackAnim1']
                    this.attackTransition.reset()
                } else {
                    this.attackTransition = this.playerAnimations['crouchAttack']
                    this.attackTransition.reset()
                }
                this.graphics.use(this.attackTransition)
                let sound = Resources.attack1sounds[ex.randomIntInRange(0, 2)] 
                sound.play(this.SFXVolume)
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
                if (!this.crouching) {
                    this.attackTransition = this.playerAnimations['attackAnim2']
                    this.attackTransition.reset()
                    this.graphics.use(this.attackTransition)
                    let sound = Resources.attack2sounds[ex.randomIntInRange(0, 2)] 
                    sound.play(this.SFXVolume)
                }
            }
        }
    }
    getHealth() {
        return this.health
    }
    takeDamage(ammount, side) {
        if (this.health > 0) {
            switch(this.facing){
                case "R":
                    this.playerAnimations['playerHit'].flipHorizontal = false
                    break;
                case "L":
                    this.playerAnimations['playerHit'].flipHorizontal = true
                    break;
            }
            switch(side) {
                case 3: 
                    this.vel.y = -200
                    setTimeout(() => {
                        this.vel.x = -200
                    }, 50)
                    break;
                case 1:
                    this.vel.y = -200
                    setTimeout(() => {
                        this.vel.x = 200
                    }, 50)
                    break;
            }
            this.graphics.use(this.playerAnimations['playerHit'])
            this.health -= ammount
            let sound = Resources.playerhitsounds[ex.randomIntInRange(0, 3)] 
            sound.play(this.SFXVolume)
            setTimeout(() => {
                this.hit = false
                this.graphics.use(this.playerAnimations['idleAnim'])
            }, 800)
        }
    }
}