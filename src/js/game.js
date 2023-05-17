import '../css/style.css'
import * as ex from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './Player'
import idleImageSrc from '../images/120x80_PNGSheets/_idle.png'

// const game = new ex.Engine({
//     width: 600,
//     height: 400
// });

// game.start(ResourceLoader).then(() => {
//     let player = new Player(game.halfCanvasWidth, game.halfCanvasHeight)
//     this.add(player)
// })

export class Game extends ex.Engine {
    constructor() {
      super();
      // this.showDebug(true)
      ex.Physics.acc = new ex.vec(0, 800)
      this.start(ResourceLoader).then(() => this.startGame());
    }
  
    startGame() {
        Resources.tiledMap.addTiledMapToScene(this.currentScene)
        let player = new Player(10, 0)
        this.currentScene.camera.strategy.lockToActor(player)
        this.add(player)
    }
  }
  
  new Game();