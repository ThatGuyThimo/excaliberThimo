import * as ex from 'excalibur'

export class Button extends ex.ScreenElement {
    buttonSprite
    buttonSpriteHover
    text
    fontSize = 30
    clicked = false
    pos

  constructor(w, h, x, y) {
    super({
      x: x,
      y: y,
      width: w,
      height: h,
    })

    this.pos = new ex.Vector(x, y)
  }

  onInitialize(Engine) {

    this.graphics.add('idle', this.buttonSprite)
    this.graphics.add('hover', this.buttonSpriteHover)
    // let text = new ex.Text({
    //   text: this.text,
    //   font: new ex.Font({ size: this.fontSize}),
    // })

    let label = new ex.Label	({
      pos: ex.vec(20, 10),
      text: this.text,
      font: new ex.Font({ size: this.fontSize }),
  })
    
    this.addChild(label)
    this.graphics.show('idle')
    // this.graphics.show(text)
    // this.addChild(text)
    this.on('pointerup', () => {
      this.clicked = true
    })

    this.on('pointerenter', () => {
      this.graphics.show('hover')
    })

    this.on('pointerleave', () => {
      this.graphics.hide('hover')
      this.graphics.show('idle')
    })
  }

  setImages(buttonSprite, buttonSpriteHover) {
    this.buttonSprite = buttonSprite
    this.buttonSpriteHover = buttonSpriteHover
  }
  setText(text, fontSize) {
    this.text = text
    this.fontSize = fontSize
  }
  isClicked() {
    return this.clicked
  }
  setClicked() {
    this.clicked = false
  }
}