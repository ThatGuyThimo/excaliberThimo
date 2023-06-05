import { Enemy } from "./Enemy";
import * as ex from 'excalibur';
import { Resources } from "./resources";

export class EnemyCollection {

    constructor() {
    }

    enemyKnight(pos) {
       return new Enemy(pos.x, pos.y, Resources.enemyknight, [100, 50, 50, 50], [ex.vec(0, 9), ex.vec(0, 9), ex.vec(0, 2), ex.vec(0, 9)], ex.Shape.Box(20, 40, ex.Vector.Half, ex.vec(-5, 20)))
    }
    enemySkelington(pos) {
       return new Enemy(pos.x, pos.y, Resources.enemyknight, [100, 50, 50, 50], [ex.vec(0, 9), ex.vec(0, 9), ex.vec(0, 2), ex.vec(0, 9)], ex.Shape.Box(20, 40, ex.Vector.Half, ex.vec(-5, 20)))
    }

}