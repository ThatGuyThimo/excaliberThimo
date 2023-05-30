import * as ex from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Button } from './Button.js'
import { Slider } from "./Slider.js"

export class Settings extends ex.Scene {
    backButton
    SFXVolumeSlider
    SFXVolume = 0.5
    MuisicVolumeSlider
    MuisicVolume = 0.5
    DataClass

    constructor(Dataclass){
        super({})
        this.DataClass = Dataclass
    }

    onInitialize(Engine) {

        let uiButtonsSpriteSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.uibuttons,
            grid: {
                rows: 12,
                columns: 12,
                spriteHeight: 16,
                spriteWidth: 16
            },
            spacing: {
                margin: {
                    x: 0,
                    y: 0
                }
            }
        });

        this.SFXVolumeSlider = new Slider(100, 115, 'SFX volume')
        this.MuisicVolumeSlider = new Slider(100, 145, 'Muisic volume')
        this.backButton = new Button(16, 16, 50, 50)
        this.backButton.setText('Back', 12)
        this.backButton.setImages(uiButtonsSpriteSheet.sprites[117], uiButtonsSpriteSheet.sprites[3])
        
        this.add(this.backButton)
        this.add(this.SFXVolumeSlider)
        this.add(this.MuisicVolumeSlider)
    }

    onActivate() {
        if (localStorage.getItem('SFXvolume') != undefined && localStorage.getItem('Muisicvolume') != undefined) {
            this.MuisicVolumeSlider.setValue(localStorage.getItem('Muisicvolume'))
            this.SFXVolumeSlider.setValue(localStorage.getItem('SFXvolume'))
            this.DataClass.setSFXvolume(this.SFXVolume)
            this.DataClass.setMuisicvolume(this.MuisicVolume)
        }
    }

    onPreUpdate(Engine) {

        if (Engine.input.keyboard.wasPressed(ex.Input.Keys.Esc)){
            Engine.goToScene(this.DataClass.getScene())
        }
        if(this.backButton.isClicked()) {
            this.backButton.setClicked()
            Engine.goToScene(this.DataClass.getScene())
        }
        this.MuisicVolume = this.MuisicVolumeSlider.getValue()
        this.SFXVolume = this.SFXVolumeSlider.getValue()

        localStorage.setItem('SFXvolume', this.SFXVolume)
        localStorage.setItem('Muisicvolume', this.MuisicVolume)
        this.DataClass.setSFXvolume(this.SFXVolume)
        this.DataClass.setMuisicvolume(this.MuisicVolume)
    }

    getSettings() {
        let settings = []
        if (localStorage.getItem('SFXvolume') != undefined && localStorage.getItem('Muisicvolume')) {
            this.MuisicVolume = localStorage.getItem('Muisicvolume')
            this.SFXVolume = localStorage.getItem('SFXvolume')
            this.DataClass.setSFXvolume(this.SFXVolume)
            this.DataClass.setMuisicvolume(this.MuisicVolume)
        }
        settings['SFXVolume'] = this.SFXVolume
        settings['MuisicVolume'] = this.MuisicVolume
        return settings
    }
}