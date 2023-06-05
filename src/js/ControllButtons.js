import * as ex from 'excalibur'
import { Resources } from './resources'

export class ControllButtons extends ex.Actor {

    inputButtons
    controllerInputButtons
    
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
        this.controllerInputButtons = ex.SpriteSheet.fromImageSource({
            image: Resources.buttons,
            grid: {
                rows: 2,
                columns: 5,
                spriteWidth: 32,
                spriteHeight: 32
            },
            spacing: {
                originOffset: {
                    x: 91,
                    y: 160
                }
            }
        })
    }

    onInitialize() {
        this.graphics.add('arrowLeft',  this.inputButtons.getSprite(0, 7))
        this.graphics.add('arrowRight', this.inputButtons.getSprite(2, 7))
        this.graphics.add('arrowUp',    this.inputButtons.getSprite(1, 6))
        this.graphics.add('arrowDown',  this.inputButtons.getSprite(1, 7))
        this.graphics.add('Fkey',       this.inputButtons.getSprite(5, 3))

        this.graphics.add('DpadLeft',  this.controllerInputButtons.getSprite(3, 0))
        this.graphics.add('DpadRight', this.controllerInputButtons.getSprite(2, 0))
        this.graphics.add('DpadUp',    this.controllerInputButtons.getSprite(0, 0))
        this.graphics.add('DpadDown',  this.controllerInputButtons.getSprite(1, 0))
        this.graphics.add('controlerBottomButton', this.controllerInputButtons.getSprite(1, 1))
        this.graphics.add('controlerRightButton', this.controllerInputButtons.getSprite(3, 1))
    }

    switchInput(value) {
        switch(value) {
            case 0:
                this.graphics.hide()
                this.graphics.show('arrowLeft', {offset: new ex.Vector(0, 0)})
                this.graphics.show('arrowRight', {offset: new ex.Vector(32, 0)})
                this.graphics.show('arrowUp', {offset: new ex.Vector(16, -16)})
                this.graphics.show('arrowDown', {offset: new ex.Vector(16, 0)})
                this.graphics.show('Fkey', {offset: new ex.Vector(420, 50)})
                break;
            case 1:
                this.graphics.hide()
                this.graphics.show('DpadRight', {offset: new ex.Vector(10, -5)})
                this.graphics.show('controlerBottomButton', {offset: new ex.Vector(40, -5)})
                this.graphics.show('controlerRightButton', {offset: new ex.Vector(415, 50)})
                break;
        }
    }

}