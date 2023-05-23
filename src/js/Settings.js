import * as ex from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Button } from './Button.js'
import { Slider } from "./Slider.js"

export class Settings extends ex.Scene {
    backButton
    settingsButton
    SFXVolumeSlider
    SFXVolume = 0.5
    MuisicVolumeSlider
    MuisicVolume = 0.5

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


        this.SFXVolumeSlider = new Slider(100, 100)
        this.MuisicVolumeSlider = new Slider(100, 130)
        this.backButton = new Button(16, 16, 50, 50)
        this.backButton.setText('Start', 12)
        this.backButton.setImages(uiButtonsSpriteSheet.sprites[117], uiButtonsSpriteSheet.sprites[20])
        
        this.settingsButton = new Button(16, 16, 50, 75)
        this.settingsButton.setText('Settings', 12)
        this.settingsButton.setImages(uiButtonsSpriteSheet.sprites[125], uiButtonsSpriteSheet.sprites[4])
        
        this.add(this.backButton)
        this.add(this.settingsButton)
        this.add(this.SFXVolumeSlider)
        this.add(this.MuisicVolumeSlider)
    }

    onPreUpdate(Engine) {
        if(this.backButton.isClicked()) {
            this.backButton.setClicked()
            Engine.goToScene('mainmenu')
        }
        if(this.settingsButton.isClicked()) {
            this.settingsButton.setClicked()

        }
        this.MuisicVolume = this.MuisicVolumeSlider.getValue()
        this.SFXVolume = this.SFXVolumeSlider.getValue()

        // console.log(this.MuisicVolume + " muisic,", this.SFXVolume + " SFX")
    }

    getSettings() {
        let settings = []
        settings['SFXVolume'] = this.SFXVolume
        settings['MuisicVolume'] = this.MuisicVolume
        return settings
    }
}