import * as ex from 'excalibur'
import { Resources } from './resources'

export class DeathScreen extends ex.ScreenElement{
    
    constructor(x, y, Zindex) {
        super({
            x: x,
            y: y,
            width: 10,
            height: 12,
        })
        this.z = Zindex
    }

    onInitialize() {

        let inputButtons = ex.SpriteSheet.fromImageSource({
            image: Resources.buttons,
            grid: {
                rows: 16,
                columns: 16,
                spriteWidth: 16,
                spriteHeight: 16
            }
        })
        let blackscreen = Resources.blackscreen.toSprite()
        blackscreen.opacity = 0.5

        this.graphics.add('G', inputButtons.getSprite(6, 3))
        this.graphics.add('A', inputButtons.getSprite(2, 3))
        this.graphics.add('M', inputButtons.getSprite(8, 4))
        this.graphics.add('E', inputButtons.getSprite(4, 2))
        this.graphics.add('O', inputButtons.getSprite(10, 2))
        this.graphics.add('V', inputButtons.getSprite(5, 4))
        this.graphics.add('R', inputButtons.getSprite(5, 2))
        this.graphics.add('blackscreen', blackscreen)
        this.graphics.show('blackscreen', {offset: new ex.Vector(-500, -500)})
        
        let sound = Resources.bowhitsounds[ex.randomIntInRange(0, 2)]

        setTimeout(() => {
            this.graphics.show('G', {offset: new ex.Vector(0, 0)})
            sound.play(this.SFXVolume)
        }, 200)
        setTimeout(() => {
            this.graphics.show('A', {offset: new ex.Vector(16, 0)})
            sound.play(this.SFXVolume)
        }, 500)
        setTimeout(() => {
            this.graphics.show('M', {offset: new ex.Vector(32, 0)})
            sound.play(this.SFXVolume)
        }, 800)
        setTimeout(() => {
            this.graphics.show('E', {offset: new ex.Vector(48, 0)})
            sound.play(this.SFXVolume)
        }, 1100)
        setTimeout(() => {
            this.graphics.show('O', {offset: new ex.Vector(80, 0)})
            sound.play(this.SFXVolume)
        }, 1400)
        setTimeout(() => {
            this.graphics.show('V', {offset: new ex.Vector(96, 0)})
            sound.play(this.SFXVolume)
        }, 1700)
        setTimeout(() => {
            this.graphics.show('E', {offset: new ex.Vector(112, 0)})
            sound.play(this.SFXVolume)
        }, 2000)
        setTimeout(() => {
            this.graphics.show('R', {offset: new ex.Vector(128, 0)})
            sound.play(this.SFXVolume)
        }, 2300)
    }
}