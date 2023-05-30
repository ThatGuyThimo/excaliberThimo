import * as ex from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './Player.js'
import { Enemy } from "./Enemy.js"

export class Testmap extends ex.Scene {

    dead = false
    trackplaying
    looping = false
    player
    enemy
    enemyGroup = ex.CollisionGroupManager.create('enemyGroup')
    playerGroup = ex.CollisionGroupManager.create('player')
    muisicVolume = 0.1
    DataClass

    constructor(Dataclass){
        super({})
        this.DataClass = Dataclass
    }

    onInitialize(Engine) {
        this.DataClass.setScene('testmap')

        const enemiesCanCollideWith = ex.CollisionGroup.collidesWith([
            this.playerGroup, // collide with players
        ])
        const playersCanCollideWith = ex.CollisionGroup.collidesWith([
            this.playerGroup, // collide with other players
            this.enemyGroup, // collide with enemies
        ])

        let leftWallCollider = new ex.Actor({
            pos: ex.vec(-1, 200),
            width: 10,
            height: 300,
            collisionType: ex.CollisionType.Fixed
          })
        let rightWallCollider = new ex.Actor({
            pos: ex.vec(1520, 200),
            width: 10,
            height: 300,
            collisionType: ex.CollisionType.Fixed
          })

        Resources.tiledMap.addTiledMapToScene(this)
        this.player = new Player(20, 200, this.DataClass, playersCanCollideWith)
        this.enemy = new Enemy(900, -30, enemiesCanCollideWith)
        this.camera.strategy.lockToActor(this.player)
        this.add(leftWallCollider)
        this.add(rightWallCollider)
        this.add(this.player)
        this.add(this.enemy)

        if(this.muisicVolume != 0) {
            this.trackplaying = Resources.trackoverworldinit
            this.trackplaying.play(this.muisicVolume)
            // .then(() => {
            //     this.trackplaying = Resources.trackoverworld1
            //         this.looping = true
            // })
        }
    }

    onActivate() {
        this.muisicVolume = this.DataClass.getMuisicvolume()
        if(this.DataClass.getRestart()) {
            this.player.reset()
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