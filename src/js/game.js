import '../css/style.css'
import * as ex from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './Player'

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
        Resources.tiledMap.addTiledMapToScene(this.currentScene)
        let player = new Player(10, 0)
        this.currentScene.camera.strategy.lockToActor(player)
        this.add(player)
        Resources.trackoverworld1.loop = true
        Resources.trackoverworld1.play(0.1)
    }
  }
  
  new Game();