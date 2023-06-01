import * as ex from "excalibur"

export class BackgroundClass extends ex.Actor {

    offset
    DataClass

    constructor(Zindex, Xpos, Ypos, scale, paralex, sprite, dataclass) {
        super({
            pos: new ex.Vector(0,0)
        })

        this.DataClass = dataclass
        sprite = sprite.toSprite()
        sprite.scale = new ex.Vector(scale,scale)
        this.offset = sprite.width
        this.z = Zindex


        const group = new ex.GraphicsGroup({
            members: [
                {
                    graphic: sprite,
                    pos: new ex.Vector(Xpos, Ypos),
                },
                {
                    graphic: sprite,
                    pos: new ex.Vector(Xpos + sprite.width, Ypos),
                },
                {
                    graphic: sprite,
                    pos: new ex.Vector(Xpos + sprite.width * 2, Ypos),
                },
                {
                    graphic: sprite,
                    pos: new ex.Vector(Xpos + sprite.width * 3, Ypos),
                },
                {
                    graphic: sprite,
                    pos: new ex.Vector(Xpos + sprite.width * 4, Ypos),
                },
                {
                    graphic: sprite,
                    pos: new ex.Vector(Xpos + sprite.width * 5, Ypos),
                }
            ]
        })

        this.graphics.anchor = new ex.Vector(0,0)

        this.graphics.add(group)
        this.addComponent(new ex.ParallaxComponent(new ex.Vector(paralex, paralex)))
    }
}