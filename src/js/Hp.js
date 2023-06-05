import * as ex from 'excalibur'
import { Resources } from './resources'

export class Hp extends ex.ScreenElement {

    DataClass
    player
    pos
    health
    mp = false

    constructor(x, y, DataClass, player) {
        super({
            x: x,
            y: y,
            width: 10,
            height: 12,
        })
        this.DataClass = DataClass
        this.player = player
        this.pos = new ex.Vector(x, y)
    }

    onInitialize() {

        let hearts = ex.SpriteSheet.fromImageSource({
            image: Resources.healthui,
            grid: {
                rows: 4,
                columns: 4,
                spriteWidth: 11,
                spriteHeight: 12
            }
        })

        let playerText = new ex.Text({
            color: ex.Color.White,
            text: "",
            width: 10,
            height: 10,
            font: new ex.Font({ size: 10 }),
        })

        this.graphics.add('H', hearts.getSprite(0, 0))
        this.graphics.add('P', hearts.getSprite(1, 0))
        this.graphics.add('Heart', hearts.getSprite(2, 0))
        this.graphics.add('EmptyHeart', hearts.getSprite(3, 0))
        this.graphics.add('Player', playerText)

        // let layer = new ex.GraphicsLayer({name: 'MPlayer', order: 1})
        // layer.graphics.push({items: {graphic: playerText, options: {offset: new ex.Vector(-5, 8)} }})

        // this.graphics.show(layer.graphics[0].graphic)
        // console.log(layer)

        switch(this.player) {
            case 1:
                playerText.text = "P1"
                break;
            case 2:
                playerText.text = "P2"
                break;
        }
    }

    showHP() {
        this.graphics.show("H", {offset: new ex.Vector(10, 0)} )
        this.graphics.show("P", {offset: new ex.Vector(21, 0)} )
    }

    onPreUpdate() {
        if(this.health != this.DataClass.getPlayerHealth(this.player)) {
            this.health = this.DataClass.getPlayerHealth(this.player)
            this.updateHearts()
        }
        if(this.DataClass.getMultiplayer() != this.mp) {
            this.mp = this.DataClass.getMultiplayer() 
            this.updateHearts()
        }

    }

    checkMP() {
        if(this.DataClass.getMultiplayer()) {
            this.graphics.show("Player", {offset: new ex.Vector(-5, 8)} )
        } else {
            this.graphics.hide('Player')
        }
    }

    updateHearts() {
        switch(true){
            case this.player == 2 && this.DataClass.getPlayerHealth(this.player) == 3 && this.DataClass.getMultiplayer() || this.player == 1 && this.DataClass.getPlayerHealth(this.player) == 3:
                this.graphics.hide()
                this.showHP()
                this.checkMP()
                this.graphics.show("Heart", {offset: new ex.Vector(31, 0)} )
                this.graphics.show("Heart", {offset: new ex.Vector(41, 0)} )
                this.graphics.show("Heart", {offset: new ex.Vector(51, 0)} )
                break;
            case this.player == 2 && this.DataClass.getMultiplayer() && this.DataClass.getPlayerHealth(this.player) == 2 || this.player == 1 && this.DataClass.getPlayerHealth(this.player) == 2:
                this.graphics.hide()
                this.showHP()
                this.checkMP()
                this.graphics.show("Heart", {offset: new ex.Vector(31, 0)} )
                this.graphics.show("Heart", {offset: new ex.Vector(41, 0)} )
                this.graphics.show("EmptyHeart", {offset: new ex.Vector(51, 0)} )
                break;
            case this.player == 2 && this.DataClass.getPlayerHealth(this.player) == 1 && this.DataClass.getMultiplayer() || this.player == 1 && this.DataClass.getPlayerHealth(this.player) == 1 :
                this.graphics.hide()
                this.showHP()
                this.checkMP()
                this.graphics.show("Heart", {offset: new ex.Vector(31, 0)} )
                this.graphics.show("EmptyHeart", {offset: new ex.Vector(41, 0)} )
                this.graphics.show("EmptyHeart", {offset: new ex.Vector(51, 0)} )
                break;
            case this.player == 2 && this.DataClass.getPlayerHealth(this.player) <= 0 && this.DataClass.getMultiplayer() || this.player == 1 && this.DataClass.getPlayerHealth(this.player) <= 0:
                this.graphics.hide()
                this.showHP()
                this.checkMP()
                this.graphics.show("EmptyHeart", {offset: new ex.Vector(31, 0)} )
                this.graphics.show("EmptyHeart", {offset: new ex.Vector(41, 0)} )
                this.graphics.show("EmptyHeart", {offset: new ex.Vector(51, 0)} )
                break;
            default:
                this.graphics.hide()
                break;
        }
    }
}