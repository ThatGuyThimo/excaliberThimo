import * as ex from 'excalibur'
import { Resources } from './resources'

export class ControllButtons extends ex.Actor {

    inputButtons
    
    constructor(x, y, Zindex) {
        super({
            x: x,
            y: y,
            collisionType: ex.CollisionType.PreventCollision
        })
        this.z = Zindex

        this.inputButtons = ex.SpriteSheet.fromImageSource({
            image: Resources.buttons,
            grid: {
                rows: 16,
                columns: 16,
                spriteWidth: 16,
                spriteHeight: 16
            }
        })
    }

    arrowKeys() {
        let arrowLeft = new ex.Actor({
            x: 0,
            y: 0,
            name: 'arrowleft',
            collisionType: ex.CollisionType.PreventCollision
        })
        let arrowRight = new ex.Actor({
            x: 32,
            y: 0,
            name: 'arrowRight',
            collisionType: ex.CollisionType.PreventCollision
        })
        let arrowUp = new ex.Actor({
            x: 16,
            y: -16,
            name: 'arrowUp',
            collisionType: ex.CollisionType.PreventCollision
        })
        let arrowDown = new ex.Actor({
            x: 16,
            y: 0,
            name: 'arrowDown',
            collisionType: ex.CollisionType.PreventCollision
        })


        arrowLeft.graphics.use(this.inputButtons.getSprite(0, 7))
        arrowRight.graphics.use(this.inputButtons.getSprite(2, 7))
        arrowUp.graphics.use(this.inputButtons.getSprite(1, 6))
        arrowDown.graphics.use(this.inputButtons.getSprite(1, 7))
        this.addChild(arrowLeft)
        this.addChild(arrowRight)
        this.addChild(arrowUp)
        this.addChild(arrowDown)
    }

    attackKey() {
        let Fkey = new ex.Actor({
            x: 0,
            y: 0,
            name: 'Fkey',
            collisionType: ex.CollisionType.PreventCollision
        })

        Fkey.graphics.use(this.inputButtons.getSprite(5, 3))
        this.addChild(Fkey)
    }

}