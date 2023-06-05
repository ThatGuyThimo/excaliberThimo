import * as ex from 'excalibur'
import { Resources } from './resources'

export class Hp extends ex.Actor {

    DataClass
    player

    constructor(x, y, DataClass, player) {
        super({
            x: x,
            y: y,
        })
        this.DataClass = DataClass
        this.player = player
    }

    onInitialize() {

        let hearts = ex.SpriteSheet.fromImageSource({
            image: Resources.healthui,
            grid: {
                rows: 4,
                columns: 4,
                spriteWidth: 46,
                spriteHeight: 50
            }
        })

        this.addChild(hearts.getSprite(0,0))



        if(this.DataClass.getMultiplayer()) {

        } else {

        }
    }

    setHearts() {
        if(this.DataClass.getMultiplayer()) {

        } else {

        }
    }

    updatehearts() {

    }

}