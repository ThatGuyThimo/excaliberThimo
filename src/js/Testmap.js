import * as ex from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './Player.js'

export class Testmap extends ex.Scene {

    onInitialize(Engine) {
        Resources.tiledMap.addTiledMapToScene(this)
        let player = new Player(10, 0)
        this.camera.strategy.lockToActor(player)
        this.add(player)
        Resources.trackoverworld1.loop = true
        Resources.trackoverworld1.play(0.1)
    }
}