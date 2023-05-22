import '../css/style.css'
import * as ex from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './Player'
import { Testmap } from './Testmap'
import { Mainmenu } from './Mainmenu'

export class Game extends ex.Engine {
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
      this.add('testmap', new Testmap())
      this.add('mainmenu', new Mainmenu())
      this.goToScene('mainmenu')
    }
  }
  
  new Game();