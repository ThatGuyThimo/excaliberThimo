import * as ex from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './Player.js'
import { Enemy } from "./Enemy.js"
import { BackgroundClass } from "./Background.js"
import { Sign } from "./Sign.js"

export class Testmap extends ex.Scene {

    dead = false
    trackplaying
    looping = false
    player
    enemy
    sign
    enemyGroup = ex.CollisionGroupManager.create('enemyGroup')
    playerGroup = ex.CollisionGroupManager.create('player')
    muisicVolume = 0.1
    DataClass
    leftWallCollider
    rightWallCollider

    constructor(Dataclass){
        super({})
        this.DataClass = Dataclass
    }

    onInitialize(Engine) {
        this.DataClass.setScene('testmap')

        let sign = new Sign(1500, 230, this.DataClass)
        this.add(sign)

        Resources.tiledMap.addTiledMapToScene(this)

        this.initializeBackground(Engine)

        this.initializeActors()

        if(this.muisicVolume != 0) {
            this.trackplaying = Resources.trackoverworldinit
            this.trackplaying.play(this.muisicVolume)
            // .then(() => {
            //     this.trackplaying = Resources.trackoverworld1
            //         this.looping = true
            // })
        }
    }

    initializeActors() {
        if(this.DataClass.getRestart()) {
            this.DataClass.setRestart(false)
            this.player.kill()
            this.enemy.kill()
            this.leftWallCollider.kill()
            this.rightWallCollider.kill()
            this.sign.kill()
        }

        const enemiesCanCollideWith = ex.CollisionGroup.collidesWith([
            this.playerGroup, // collide with players
        ])
        const playersCanCollideWith = ex.CollisionGroup.collidesWith([
            this.playerGroup, // collide with other players
            this.enemyGroup, // collide with enemies
        ])

        this.leftWallCollider = new ex.Actor({
            pos: ex.vec(-1, 200),
            width: 10,
            height: 300,
            collisionType: ex.CollisionType.Fixed
          })
        this.rightWallCollider = new ex.Actor({
            pos: ex.vec(1520, 200),
            width: 10,
            height: 300,
            collisionType: ex.CollisionType.Fixed
          })

        this.player = new Player(20, 200, this.DataClass, playersCanCollideWith)
        this.enemy = new Enemy(900, 200, enemiesCanCollideWith)
        this.sign = new Sign(1500, 230, this.DataClass)
        this.camera.strategy.lockToActor(this.player)
        // this.camera.strategy.radiusAroundActor(this.Player, 100)

        let boundingBox = new ex.BoundingBox(
            0,
            -2000,
            1520,
            320
          )

        this.camera.strategy.limitCameraBounds(boundingBox)


        this.add(this.leftWallCollider)
        this.add(this.rightWallCollider)
        this.add(this.player)
        this.add(this.enemy)
        this.add(this.sign)
    }

    initializeBackground(Engine) {
        let BG1 = new BackgroundClass(-2, -400, -300, 4, 0.8, Resources.background[0], this.DataClass)
        let BG2 = new BackgroundClass(-3, -400, -300, 4, 0.6, Resources.background[1], this.DataClass)
        let BG3 = new BackgroundClass(-4, -400, -300, 4, 0.4, Resources.background[2], this.DataClass)

        this.add(BG1)
        this.add(BG2)
        this.add(BG3)
    }

    onActivate() {
        this.muisicVolume = this.DataClass.getMuisicvolume()
        if(this.DataClass.getRestart()) {
            this.initializeActors()
        }
    }

    onPreUpdate(Engine) {
        this.trackplaying.volume = this.muisicVolume
        if(this.muisicVolume != 0) {
            if (this.player.getHealth() <= 0 && this.dead == false) {
                this.trackplaying.stop()
                Resources.trackgameover.play(this.muisicVolume).then(()=> {
                    this.trackplaying = Resources.trackgameoverloop
                        this.looping = true
                })
                this.dead = true
            }
            if (this.looping) {
                this.looping = false
                this.trackplaying.play(this.muisicVolume).then(() => {
                    this.looping = true
                })
            }
        }
    }
}