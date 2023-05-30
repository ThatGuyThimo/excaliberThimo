import * as ex from "excalibur"

export class Slider extends ex.Actor {

    startingPosition
    dragable
    value = 0.5
    text

    constructor(x, y, text) {
        super({
        pos: new ex.Vector(x, y),
        height: 2,
        width: 100,
        color: ex.Color.White,
        collider: ex.Shape.Box(110, 20, ex.Vector.Half, ex.vec(0, 0))
        });
        this.startingPosition = new ex.Vector(x, y)
        this.text = text
    }

    onInitialize() {

        let label = new ex.Label	({
            pos: ex.vec(-55, -12),
            text: this.text,
            font: new ex.Font({ size: 10 }),
        })


        this.dragable = new ex.Actor({
            pos: new ex.vec(0,0),
            height: 15,
            width: 20,
            color: ex.Color.White,
            
        })
        this.addChild(this.dragable)
        this.addChild(label)

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
                break;
            case cursorposition >= 55 && cursorposition < 65 :
                this.dragable.pos.setTo(-40, 0)
                this.value = 0.1
                break;
            case cursorposition >= 65 && cursorposition < 75 :
                this.dragable.pos.setTo(-30, 0)
                this.value = 0.2
                break;
            case cursorposition >= 75 && cursorposition < 85 :
                this.dragable.pos.setTo(-20, 0)
                this.value = 0.3
                break;
            case cursorposition >= 85 && cursorposition < 95 :
                this.dragable.pos.setTo(-10, 0)
                this.value = 0.4
                break;
            case cursorposition >= 95 && cursorposition < 105 :
                this.dragable.pos.setTo(0, 0)
                this.value = 0.5
                break;
            case cursorposition >= 105 && cursorposition < 115 :
                this.dragable.pos.setTo(10, 0)
                this.value = 0.6
                break;
            case cursorposition >= 115 && cursorposition < 125 :
                this.dragable.pos.setTo(20, 0)
                this.value = 0.7
                break;
            case cursorposition >= 125 && cursorposition < 135 :
                this.dragable.pos.setTo(30, 0)
                this.value = 0.8
                break;
            case cursorposition >= 135 && cursorposition < 145 :
                this.dragable.pos.setTo(40, 0)
                this.value = 0.9
                break;
            case cursorposition >= 145 && cursorposition < 150 :
                this.dragable.pos.setTo(50, 0)
                this.value = 1
                break;
        }
    }

    getValue() {
        return this.value
    }

    setValue(value) {
        value = parseFloat(value)
        switch(value) {
            case 0:
                this.setSliderPosition(50)
                break;
            case 0.1:
                this.setSliderPosition(55)
                break;
            case 0.2:
                this.setSliderPosition(65)
                break;
            case 0.3:
                this.setSliderPosition(75)
                break;
            case 0.4:
                this.setSliderPosition(85)
                break;
            case 0.5:
                this.setSliderPosition(95)
                break;
            case 0.6:
                this.setSliderPosition(105)
                break;
            case 0.7:
                this.setSliderPosition(115)
                break;
            case 0.8:
                this.setSliderPosition(125)
                break;
            case 0.9:
                this.setSliderPosition(135)
                break;
            case 1:
                this.setSliderPosition(145)
                break;
        }
    }
}