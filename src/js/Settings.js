import * as ex from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Button } from './Button.js'
import { Slider } from "./Slider.js"
import { CheckBox } from "./checkbox.js"

export class Settings extends ex.Scene {
    backButton
    multiplayerButton
    multiplayer
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

        this.multiplayerButton = new CheckBox(16, 16, 50, 160)
        this.multiplayerButton.setText('Multiplayer', 12)
        this.multiplayerButton.setImages(uiButtonsSpriteSheet.sprites[108], uiButtonsSpriteSheet.sprites[125])
        
        this.add(this.backButton)
        this.add(this.multiplayerButton)
        this.add(this.SFXVolumeSlider)
        this.add(this.MuisicVolumeSlider)
    }

    onActivate() {
        if (localStorage.getItem('SFXvolume') != undefined && localStorage.getItem('Muisicvolume') != undefined && localStorage.getItem('Multiplayer') != undefined) {
            this.MuisicVolumeSlider.setValue(localStorage.getItem('Muisicvolume'))
            this.SFXVolumeSlider.setValue(localStorage.getItem('SFXvolume'))
            this.multiplayerButton.setActive(JSON.parse(localStorage.getItem('Multiplayer')))
            this.DataClass.setSFXvolume(this.SFXVolume)
            this.DataClass.setMuisicvolume(this.MuisicVolume)
            this.DataClass.setMultiplayer(this.multiplayer)
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
        if(this.multiplayerButton.isClicked()) {
            this.multiplayerButton.setClicked()
        }
        this.MuisicVolume = this.MuisicVolumeSlider.getValue()
        this.SFXVolume = this.SFXVolumeSlider.getValue()
        this.multiplayer = this.multiplayerButton.getActive()

        localStorage.setItem('SFXvolume', this.SFXVolume)
        localStorage.setItem('Muisicvolume', this.MuisicVolume)
        localStorage.setItem('Multiplayer', this.multiplayer)
        this.DataClass.setSFXvolume(this.SFXVolume)
        this.DataClass.setMuisicvolume(this.MuisicVolume)
        this.DataClass.setMultiplayer(this.multiplayer)
    }

    getSettings() {
        let settings = []
        if (localStorage.getItem('SFXvolume') != undefined && localStorage.getItem('Muisicvolume') && localStorage.getItem('Multiplayer') != undefined) {
            this.MuisicVolume = localStorage.getItem('Muisicvolume')
            this.SFXVolume = localStorage.getItem('SFXvolume')
            this.multiplayer = JSON.parse(localStorage.getItem('Multiplayer'))
            this.DataClass.setSFXvolume(this.SFXVolume)
            this.DataClass.setMuisicvolume(this.MuisicVolume)
            this.DataClass.setMultiplayer(this.multiplayer)
        } else {
            this.MuisicVolume = 0.5
            this.SFXVolume = 0.5
            this.multiplayer = false
            this.DataClass.setSFXvolume(this.SFXVolume)
            this.DataClass.setMuisicvolume(this.MuisicVolume)
            this.DataClass.setMultiplayer(this.multiplayer)
            localStorage.setItem('SFXvolume', this.SFXVolume)
            localStorage.setItem('Muisicvolume', this.MuisicVolume)
            localStorage.setItem('Multiplayer', this.multiplayer)
        }
        settings['SFXVolume'] = this.SFXVolume
        settings['MuisicVolume'] = this.MuisicVolume
        settings['Multiplayer'] = this.Multiplayer
        return settings
    }
}