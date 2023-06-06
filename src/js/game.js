import '../css/style.css'
import * as ex from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Testmap } from './Testmap'
import { Mainmenu } from './Mainmenu'
import { Settings } from './Settings'
import { DevTool } from '@excaliburjs/dev-tools'
import { PauseScreen } from "./Pause.js"
import { Data } from './Data'

export class Game extends ex.Engine {

  settings
  testmap
  mainmenu
  pausescreen
  DataClass

    constructor() {
      super({
        width: 854,
        height: 480,
        displayMode: ex.DisplayMode.FitScreenAndFill,
        maxFps: 60,
      });
      // this.showDebug(true)
      // const devtool = new DevTool(this);
      ex.Physics.acc = new ex.vec(0, 800)
      this.start(ResourceLoader).then(() => this.startGame());
      this.DataClass = new Data()
    }
  
    startGame() {

      this.settings = new Settings(this.DataClass)
      this.testmap = new Testmap(this.DataClass)
      this.mainmenu = new Mainmenu(this.DataClass)
      this.pausescreen = new PauseScreen(this.DataClass)

      this.add('testmap', this.testmap)
      this.add('mainmenu', this.mainmenu)
      this.add('settings', this.settings)
      this.add('pausescreen', this.pausescreen)
      this.goToScene('mainmenu')
    }

    onPreUpdate(Engine) {
      this.settings.getSettings()
      // console.log(volume)
      // this.testmap.setVolume(volume['SFXVolume'], volume['MuisicVolume'])
    }
  }
  
  new Game();