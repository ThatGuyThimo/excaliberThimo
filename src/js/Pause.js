import * as ex from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Button } from './Button.js'

export class PauseScreen extends ex.Scene {

    settingsButton
    restartButton
    menuButton
    lastScene
    DataClass
    soundplayed

    constructor(Dataclass){
        super({})
        this.DataClass = Dataclass
    }

    onInitialize(Engine) {


        // this.lastScene = localStorage.getItem('Scene')
        this.lastScene = this.DataClass.getScene()
        this.DataClass.setScene('pausescreen')
        // localStorage.setItem('Scene', 'pausescreen')

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
        
        this.settingsButton = new Button(16, 16, 50, 75, this.DataClass);
        this.settingsButton.setText('Settings', 12);
        this.settingsButton.setImages(uiButtonsSpriteSheet.sprites[116], uiButtonsSpriteSheet.sprites[2]);

        this.restartButton = new Button(16, 16, 50, 100, this.DataClass);
        this.restartButton.setText('Restart', 12);
        this.restartButton.setImages(uiButtonsSpriteSheet.sprites[117], uiButtonsSpriteSheet.sprites[3]);

        this.menuButton = new Button(16, 16, 50, 125, this.DataClass);
        this.menuButton.setText('Main menu', 12);
        this.menuButton.setImages(uiButtonsSpriteSheet.sprites[130], uiButtonsSpriteSheet.sprites[16]);

        this.backButton = new Button(16, 16, 50, 50, this.DataClass);
        this.backButton.setText('Return to game', 12);
        this.backButton.setImages(uiButtonsSpriteSheet.sprites[117], uiButtonsSpriteSheet.sprites[3]);
        
        this.add(this.settingsButton);
        this.add(this.backButton);
        this.add(this.restartButton)
        this.add(this.menuButton)
        
    }

    onActivate(){
        let sound = Resources.pausesound
        sound.play(this.SFXVolume)
        setTimeout(() => {
            this.soundplayed = false
        }, 200)
    }

    onPreUpdate(Engine) {
        Engine.input.keyboard.on("press", (KeyEvent) => {
            if(KeyEvent.key == "Escape") {
                if(!this.soundplayed) {
                    this.soundplayed = true
                    let sound = Resources.unpausesound
                    sound.play(this.SFXVolume)
                    Engine.goToScene(this.lastScene)
                }
            }
        });
        Engine.input.gamepads.at(0).on('button', (event) => {
            if(event.button === ex.Input.Buttons.Select) {
                if(!this.soundplayed) {
                    this.soundplayed = true
                    let sound = Resources.unpausesound
                    sound.play(this.SFXVolume)
                    Engine.goToScene(this.lastScene)
                }
            }
        })
        if(this.settingsButton.isClicked()) {
            this.settingsButton.setClicked()
            Engine.goToScene('settings')
        }
        if(this.backButton.isClicked()) {
            this.backButton.setClicked()
            Engine.goToScene(this.lastScene)
        }
        if(this.restartButton.isClicked()) {
            this.restartButton.setClicked()
            this.DataClass.setRestart(true)
            Engine.goToScene('testmap')
        }
        if(this.menuButton.isClicked()) {
            this.menuButton.setClicked()
            this.DataClass.setRestart(true)
            Engine.goToScene('mainmenu')
        }
    }
}