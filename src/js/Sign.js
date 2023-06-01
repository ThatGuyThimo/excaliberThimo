import * as ex from "excalibur"
import { Resources } from "./resources"
export class Sign extends ex.Actor {

    DataClass

    constructor(x, y, dataclass) {
        super({
            x: x,
            y: y,
            name: 'sign',
            collisionType: ex.CollisionType.Passive,
            collider: ex.Shape.Box(20, 20, ex.Vector.Half, ex.vec(0, 0))
        })
        this.DataClass = dataclass
    }

    onInitialize(engine) {

        let sprite = Resources.sign.toSprite()
        sprite.scale = new ex.Vector(0.1, 0.1)

        this.graphics.use(sprite)

        this.on('collisionstart', (event) => {
            if (event.other._name == "player" && event.other._tagsMemo[0] != 'dead') {
                this.DataClass.setRestart(true)
                // engine.goToScene('mainmenu')
                let level = this.DataClass.getLevel(0)
                engine.goToScene(level)
            }
        })
    }
}
