import * as ex from 'excalibur'

export class CheckBox extends ex.ScreenElement {
    buttonSprite
    buttonSpriteChecked
    text
    fontSize = 30
    clicked = false
    isActive = false
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

    // this.graphics.add('idle', this.buttonSprite)
    // this.graphics.add('hover', this.buttonSpriteHover)


    let label = new ex.Label ({
      pos: ex.vec(20, 10),
      text: this.text,
      font: new ex.Font({ size: this.fontSize }),
  })
    
    this.addChild(label)

    this.on('pointerup', () => {
        this.clicked = true
      if (this.isActive) {
        this.isActive = false
      } else {
        this.isActive = true
      }
    })
  }

  onPreUpdate() {
    if (!this.isActive) {
        this.graphics.use(this.buttonSprite)
      } else {
        this.graphics.use(this.buttonSpriteChecked)
      }
  }


  setImages(buttonSprite, buttonSpriteChecked) {
    this.buttonSprite = buttonSprite
    this.buttonSpriteChecked = buttonSpriteChecked
  }

  setText(text, fontSize) {
    this.text = text
    this.fontSize = fontSize
  }

  setActive(value) {
    this.isActive = value
  }

  isClicked() {
    return this.clicked
  }

  setClicked() {
    this.clicked = false
  }

  getActive() {
    return this.isActive
  }
}