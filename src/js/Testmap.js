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

    onInitialize(Engine) {

        const enemiesCanCollideWith = ex.CollisionGroup.collidesWith([
            this.playerGroup, // collide with players
        ])
        const playersCanCollideWith = ex.CollisionGroup.collidesWith([
            this.playerGroup, // collide with other players
            this.enemyGroup, // collide with enemies
        ])

        Resources.tiledMap.addTiledMapToScene(this)
        this.player = new Player(10, 0, playersCanCollideWith)
        this.enemy = new Enemy(900, -30, enemiesCanCollideWith)
        this.camera.strategy.lockToActor(this.player)
        this.add(this.player)
        this.add(this.enemy)
        this.trackplaying = Resources.trackoverworldinit
        this.trackplaying.play(0.1)
        // .then(() => {
        //     this.trackplaying = Resources.trackoverworld1
        //         this.looping = true
        // })
    }

    onPreUpdate(Engine) {
        if (this.player.getHealth() <= 0 && this.dead == false) {
            this.trackplaying.stop()
            Resources.trackgameover.play(0.1).then(()=> {
                this.trackplaying = Resources.trackgameoverloop
                    this.looping = true
            })
            this.dead = true
        }
        if (this.looping) {
            this.looping = false
            this.trackplaying.play(0.1).then(() => {
                this.looping = true
            })
        }
    }
}