import { Enemy } from "./Enemy";
import * as ex from 'excalibur';
import { Resources } from "./resources";

export class EnemyCollection {

    constructor() {
    }

    enemyKnight(Dataclass, pos, scale) {
       return new Enemy(
         Dataclass,
         pos.x, 
         pos.y, 
         5,
         Resources.enemyknight, 
         [100, 50, 50, 50], 
         [ex.vec(0, 9), ex.vec(0, 9), ex.vec(0, 2), ex.vec(0, 9)],
         ex.Shape.Box(20, 40, ex.Vector.Half, ex.vec(-5, 20)),
         ex.vec(-5, 40),
         [ex.vec(1, 10), ex.vec(1, 10), ex.vec(1, 3), ex.vec(1, 10)],
         [ex.vec(120, 80), ex.vec(120, 80), ex.vec(120, 80), ex.vec(120, 80)],
         scale
         )
    }
    enemySkeleton(DataClass, pos, scale = ex.vec(0.9, 0.8)) {
      return new Enemy(
         DataClass,
         pos.x, 
         pos.y, 
         3,
         Resources.enemyskeleton, 
         [200, 200, 200, 200, 100], 
         [ex.vec(0, 3), ex.vec(0, 3), ex.vec(0, 3), ex.vec(0, 3), ex.vec(0, 3)],
         ex.Shape.Box(20, 40, ex.Vector.Half, ex.vec(0, 6.5)),
         ex.vec(0, 26),
         [ex.vec(1, 4), ex.vec(1, 4), ex.vec(1, 4), ex.vec(1, 4), ex.vec(1, 4)],
         [ex.vec(150, 150), ex.vec(150, 150), ex.vec(150, 150), ex.vec(150, 150), ex.vec(150, 150)],
         scale
         )
    }

}