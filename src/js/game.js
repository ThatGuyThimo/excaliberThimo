import '../css/style.css'
import * as ex from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Testmap } from './Testmap'
import { Mainmenu } from './Mainmenu'
import { Settings } from './Settings'

export class Game extends ex.Engine {

  settings
  testmap
  mainmenu

    constructor() {
      super({
        width: 854,
        height: 480,
        displayMode: ex.DisplayMode.FitScreenAndFill,
        maxFps: 60,
      });
      // this.showDebug(true)
      ex.Physics.acc = new ex.vec(0, 800)
      this.start(ResourceLoader).then(() => this.startGame());
    }
  
    startGame() {

      this.settings = new Settings()
      this.testmap = new Testmap()
      this.mainmenu = new Mainmenu()

      this.add('testmap', this.testmap)
      this.add('mainmenu', this.mainmenu)
      this.add('settings', this.settings)
      this.goToScene('mainmenu')
    }

    onPreUpdate(Engine) {
      let volume = this.settings.getSettings()
      // console.log(volume)
      this.testmap.setVolume(volume['SFXVolume'], volume['MuisicVolume'])
    }
  }
  
  new Game();