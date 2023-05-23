import * as ex from "excalibur"

export class Slider extends ex.Actor {

    startingPosition
    dragable
    value = 0.5

    constructor(x, y) {
        super({
        pos: new ex.Vector(x, y),
        height: 2,
        width: 100,
        color: ex.Color.White,
        collider: ex.Shape.Box(110, 20, ex.Vector.Half, ex.vec(0, 0))
        });
        this.startingPosition = new ex.Vector(x, y)
    }

    onInitialize() {

        this.dragable = new ex.Actor({
            pos: new ex.vec(0,0),
            height: 15,
            width: 20,
            color: ex.Color.White,
            
        })
        this.addChild(this.dragable)

        this.on(ex.EventTypes.PointerDragStart, (e) => {
            this.dragable.color = ex.Color.Gray;
            this.setSliderPosition(e.coordinates.screenPos.x)
        });
        this.on(ex.EventTypes.PointerDragEnd, (e) => {
            this.dragable.color = ex.Color.White;
        });
        this.on(ex.EventTypes.PointerDragMove, (e) => {
            this.dragable.color = ex.Color.Gray;
            this.setSliderPosition(e.coordinates.screenPos.x)
        });
        this.on(ex.EventTypes.PointerLeave, (e) => {
            this.dragable.color = ex.Color.White;
        });
    }

    setSliderPosition(cursorposition) {
        switch(true) {
            case cursorposition >= 50 && cursorposition < 55:
                this.dragable.pos.setTo(-50, 0)
                this.value = 0
                // console.log(cursorposition, " " + this.value + " 1")
                break;
            case cursorposition >= 55 && cursorposition < 65 :
                this.dragable.pos.setTo(-40, 0)
                this.value = 0.1
                // console.log(cursorposition, " " + this.value + " 2")
                break;
            case cursorposition >= 65 && cursorposition < 75 :
                this.dragable.pos.setTo(-30, 0)
                this.value = 0.2
                // console.log(cursorposition, " " + this.value + " 3")
                break;
            case cursorposition >= 75 && cursorposition < 85 :
                this.dragable.pos.setTo(-20, 0)
                this.value = 0.3
                // console.log(cursorposition, " " + this.value + " 4")
                break;
            case cursorposition >= 85 && cursorposition < 95 :
                this.dragable.pos.setTo(-10, 0)
                this.value = 0.4
                // console.log(cursorposition, " " + this.value + " 5")
                break;
            case cursorposition >= 95 && cursorposition < 105 :
                this.dragable.pos.setTo(0, 0)
                this.value = 0.5
                // console.log(cursorposition, " " + this.value + " 6")
                break;
            case cursorposition >= 105 && cursorposition < 115 :
                this.dragable.pos.setTo(10, 0)
                this.value = 0.6
                // console.log(cursorposition, " " + this.value + " 7")
                break;
            case cursorposition >= 115 && cursorposition < 125 :
                this.dragable.pos.setTo(20, 0)
                this.value = 0.7
                // console.log(cursorposition, " " + this.value + " 8")
                break;
            case cursorposition >= 125 && cursorposition < 135 :
                this.dragable.pos.setTo(30, 0)
                this.value = 0.8
                // console.log(cursorposition, " " + this.value + " 9")
                break;
            case cursorposition >= 135 && cursorposition < 145 :
                this.dragable.pos.setTo(40, 0)
                this.value = 0.9
                // console.log(cursorposition, " " + this.value + " 10")
                break;
            case cursorposition >= 145 && cursorposition < 150 :
                this.dragable.pos.setTo(50, 0)
                this.value = 1
                // console.log(cursorposition, " " + this.value + " 11")
                break;
        }
    }

    getValue() {
        return this.value
    }
}