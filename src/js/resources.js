import { ImageSource, Sound, Resource, Loader} from 'excalibur'
import { TiledMapResource } from '@excaliburjs/plugin-tiled'
import idleImageSrc from '../images/120x80_PNGSheets/_idle.png'
import runImageSrc from '../images/120x80_PNGSheets/_Run.png'
import jumpImageSrc from '../images/120x80_PNGSheets/_Jump.png'
import fallImageSrc from '../images/120x80_PNGSheets/_Fall.png'
import jumptofallImageSrc from '../images/120x80_PNGSheets/_JumpFallInbetween.png'
import attack1ImageSrc from '../images/120x80_PNGSheets/_Attack.png'
import attack2ImageSrc from '../images/120x80_PNGSheets/_Attack2.png'
// import enemy from '../images/enemy.png'

const Resources = {
    tiledMap: new TiledMapResource("./src/images/testingmap.tmx"),
    playeridle: new ImageSource(idleImageSrc),
    playerrun: new ImageSource(runImageSrc),
    playerjump: new ImageSource(jumpImageSrc),
    playerjumptofall: new ImageSource(jumptofallImageSrc),
    playerfall: new ImageSource(fallImageSrc),
    playerattack1: new ImageSource(attack1ImageSrc),
    playerattack2: new ImageSource(attack2ImageSrc),
    // enemy: new ImageSource(enemy)
}
const ResourceLoader = new Loader([Resources.playeridle, Resources.playerrun, Resources.playerfall, Resources.playerjump, Resources.playerjumptofall, Resources.playerattack1, Resources.playerattack2, Resources.tiledMap])

export { Resources, ResourceLoader }