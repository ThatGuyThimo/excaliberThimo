import { ImageSource, Sound, Resource, Loader} from 'excalibur'
import { TiledMapResource } from '@excaliburjs/plugin-tiled'
import idleImageSrc from '../images/120x80_PNGSheets/_idle.png'
import runImageSrc from '../images/120x80_PNGSheets/_Run.png'
import jumpImageSrc from '../images/120x80_PNGSheets/_Jump.png'
import fallImageSrc from '../images/120x80_PNGSheets/_Fall.png'
import jumptofallImageSrc from '../images/120x80_PNGSheets/_JumpFallInbetween.png'
import attack1ImageSrc from '../images/120x80_PNGSheets/_Attack.png'
import attack2ImageSrc from '../images/120x80_PNGSheets/_Attack2.png'
import overworld1AudioSrc from '../sounds/tracks/02_1_titles_LOOP.mp3'
import attack1_1AudioSrc from '../sounds/28_swoosh_01.wav'
import attack1_2AudioSrc from '../sounds/29_swoosh_02.wav'
import attack1_3AudioSrc from '../sounds/30_swoosh_03.wav'
import attack2_1AudioSrc from '../sounds/31_swoosh_sword_1.wav'
import attack2_2AudioSrc from '../sounds/32_swoosh_sword_2.wav'
import attack2_3AudioSrc from '../sounds/33_swoosh_sword_3.wav'
import jump_1AudioSrc from '../sounds/28_jump_01.wav'
import jump_2AudioSrc from '../sounds/29_jump_02.wav'
import jump_3AudioSrc from '../sounds/30_jump_03.wav'

const Resources = {
    tiledMap: new TiledMapResource("./src/images/testingmap2.tmx"),
    playeridle: new ImageSource(idleImageSrc),
    playerrun: new ImageSource(runImageSrc),
    playerjump: new ImageSource(jumpImageSrc),
    playerjumptofall: new ImageSource(jumptofallImageSrc),
    playerfall: new ImageSource(fallImageSrc),
    playerattack1: new ImageSource(attack1ImageSrc),
    playerattack2: new ImageSource(attack2ImageSrc),
    trackoverworld1: new Sound(overworld1AudioSrc),
    attack1sounds: [new Sound(attack1_1AudioSrc), new Sound(attack1_2AudioSrc), new Sound(attack1_3AudioSrc)],
    attack2sounds: [new Sound(attack2_1AudioSrc), new Sound(attack2_2AudioSrc), new Sound(attack2_3AudioSrc)],
    jumpingsounds: [new Sound(jump_1AudioSrc), new Sound(jump_2AudioSrc), new Sound(jump_3AudioSrc)],
}
const ResourceLoader = new Loader([Resources.playeridle, Resources.playerrun, Resources.playerfall, Resources.playerjump, Resources.playerjumptofall, Resources.playerattack1, Resources.playerattack2, Resources.trackoverworld1, Resources.attack1sounds[0], Resources.attack1sounds[1], Resources.attack1sounds[2], Resources.attack2sounds[0], Resources.attack2sounds[1], Resources.attack2sounds[2], Resources.jumpingsounds[0], Resources.jumpingsounds[1], Resources.jumpingsounds[2], Resources.tiledMap])

export { Resources, ResourceLoader }