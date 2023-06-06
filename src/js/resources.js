import { ImageSource, Sound, Resource, Loader} from 'excalibur'
import { TiledMapResource } from '@excaliburjs/plugin-tiled'
import idleImageSrc from '../images/120x80_PNGSheets/_idle.png'
import blackscreenImageSrc from '../images/blackscreen.png'
import crouchImageSrc from '../images/120x80_PNGSheets/_Crouch.png'
import crouchWalkImageSrc from '../images/120x80_PNGSheets/_CrouchWalk.png'
import crouchTransitionImageSrc from '../images/120x80_PNGSheets/_CrouchTransition.png'
import crouchAttackImageSrc from '../images/120x80_PNGSheets/_CrouchAttack.png'
import uiImageSrc from '../images/button_UI.png'
import buttonsImageSrc from '../images/BaltKeys_light.png'
import runImageSrc from '../images/120x80_PNGSheets/_Run.png'
import jumpImageSrc from '../images/120x80_PNGSheets/_Jump.png'
import damageImageSrc from '../images/120x80_PNGSheets/_Hit.png'
import fallImageSrc from '../images/120x80_PNGSheets/_Fall.png'
import jumptofallImageSrc from '../images/120x80_PNGSheets/_JumpFallInbetween.png'
import attack1ImageSrc from '../images/120x80_PNGSheets/_Attack.png'
import attack2ImageSrc from '../images/120x80_PNGSheets/_Attack2.png'
import deathImageSrc from '../images/120x80_PNGSheets/_Death.png'
import healthImageSrc from '../images/Heart&ManaUi.png'
import signImageSrc from '../images/sign.png'
import idleSkeletonImageSrc from '../images/Monsters/Skeleton/Idle.png'
import runSkeletonImageSrc from '../images/Monsters/Skeleton/Walk.png'
import deathSkeletonImageSrc from '../images/Monsters/Skeleton/Death.png'
import damageSkeletonImageSrc from '../images/Monsters/Skeleton/Take Hit.png'
import bgNightTownFrontImageSrc from '../images/Backgrounds/PNG/Night-Town/front.png'
import bgNightTownMiddleImageSrc from '../images/Backgrounds/PNG/Night-Town/middle.png'
import bgNightTownBackImageSrc from '../images/Backgrounds/PNG/Night-Town/back.png'
import overworld1AudioSrc from '../sounds/tracks/02_1_titles_LOOP.mp3'
import overworldInitAudioSrc from '../sounds/tracks/titles_INITIAL.mp3'
import gameoverAudioSrc from '../sounds/tracks/game_over_INITIAL.mp3'
import gameoverLoopAudioSrc from '../sounds/tracks/game_over_LOOP.mp3'
import attack1_1AudioSrc from '../sounds/28_swoosh_01.wav'
import attack1_2AudioSrc from '../sounds/29_swoosh_02.wav'
import attack1_3AudioSrc from '../sounds/30_swoosh_03.wav'
import attack2_1AudioSrc from '../sounds/31_swoosh_sword_1.wav'
import attack2_2AudioSrc from '../sounds/32_swoosh_sword_2.wav'
import attack2_3AudioSrc from '../sounds/33_swoosh_sword_3.wav'
import jump_1AudioSrc from '../sounds/28_jump_01.wav'
import jump_2AudioSrc from '../sounds/29_jump_02.wav'
import jump_3AudioSrc from '../sounds/30_jump_03.wav'
import landing_1AudioSrc from '../sounds/45_Landing_01.wav'
import landing_2AudioSrc from '../sounds/46_Landing_02.wav'
import landing_3AudioSrc from '../sounds/47_Landing_03.wav'
import crouch_1AudioSrc from '../sounds/16_Crouch_01.wav'
import crouch_2AudioSrc from '../sounds/17_Crouch_02.wav'
import crouch_3AudioSrc from '../sounds/18_Crouch_03.wav'
import hit_1AudioSrc from '../sounds/01_Claw_01.wav'
import hit_2AudioSrc from '../sounds/02_Claw_02.wav'
import hit_3AudioSrc from '../sounds/03_Claw_03.wav'
import hit_4AudioSrc from '../sounds/04_Claw_04.wav'

const Resources = {
    tiledMap: new TiledMapResource("./src/images/testingmap2.tmx"),
    blackscreen: new ImageSource(blackscreenImageSrc),
    playeridle: new ImageSource(idleImageSrc),
    playerrun: new ImageSource(runImageSrc),
    playerjump: new ImageSource(jumpImageSrc),
    playerjumptofall: new ImageSource(jumptofallImageSrc),
    playerfall: new ImageSource(fallImageSrc),
    playerattack1: new ImageSource(attack1ImageSrc),
    playerattack2: new ImageSource(attack2ImageSrc),
    playerdeath: new ImageSource(deathImageSrc),
    uibuttons: new ImageSource(uiImageSrc),
    buttons: new ImageSource(buttonsImageSrc),
    sign: new ImageSource(signImageSrc),
    healthui: new ImageSource(healthImageSrc),
    trackoverworldinit: new Sound(overworldInitAudioSrc),
    trackoverworld1: new Sound(overworld1AudioSrc),
    trackgameover: new Sound(gameoverAudioSrc),
    trackgameoverloop: new Sound(gameoverLoopAudioSrc),
    enemyknight: [new ImageSource(idleImageSrc), new ImageSource(runImageSrc), new ImageSource(jumpImageSrc), new ImageSource(deathImageSrc), [new ImageSource(damageImageSrc), true],],
    enemyskeleton: [new ImageSource(idleSkeletonImageSrc), new ImageSource(runSkeletonImageSrc), new ImageSource(idleSkeletonImageSrc), new ImageSource(deathSkeletonImageSrc), [new ImageSource(damageSkeletonImageSrc), false],],
    background: [new ImageSource(bgNightTownFrontImageSrc), new ImageSource(bgNightTownMiddleImageSrc), new ImageSource(bgNightTownBackImageSrc)],
    attack1sounds: [new Sound(attack1_1AudioSrc), new Sound(attack1_2AudioSrc), new Sound(attack1_3AudioSrc)],
    attack2sounds: [new Sound(attack2_1AudioSrc), new Sound(attack2_2AudioSrc), new Sound(attack2_3AudioSrc)],
    jumpingsounds: [new Sound(jump_1AudioSrc), new Sound(jump_2AudioSrc), new Sound(jump_3AudioSrc)],
    landingsounds: [new Sound(landing_1AudioSrc), new Sound(landing_2AudioSrc), new Sound(landing_3AudioSrc)],
    crouchingsounds: [new Sound(crouch_1AudioSrc), new Sound(crouch_2AudioSrc), new Sound(crouch_3AudioSrc)],
    playerhitsounds: [new Sound(hit_1AudioSrc), new Sound(hit_2AudioSrc), new Sound(hit_3AudioSrc), new Sound(hit_4AudioSrc)],
    crouchinganims: [new ImageSource(crouchImageSrc), new ImageSource(crouchTransitionImageSrc), new ImageSource(crouchWalkImageSrc), new ImageSource(crouchAttackImageSrc)],
    playerhit: new ImageSource(damageImageSrc),
}
const ResourceLoader = new Loader([
        Resources.uibuttons, 
        Resources.playerdeath, 
        Resources.playeridle, 
        Resources.playerrun, 
        Resources.playerfall, 
        Resources.playerjump, 
        Resources.playerjumptofall, 
        Resources.playerattack1, 
        Resources.playerattack2, 
        Resources.trackoverworld1,
        Resources.trackoverworldinit,
        Resources.trackgameover,
        Resources.trackgameoverloop,
        Resources.playerhit,
        Resources.sign,
        Resources.healthui,
        Resources.buttons,
        Resources.blackscreen,
        Resources.enemyknight[0],
        Resources.enemyknight[1],
        Resources.enemyknight[2],
        Resources.enemyknight[3],
        Resources.enemyknight[4][0],
        Resources.enemyskeleton[0],
        Resources.enemyskeleton[1],
        Resources.enemyskeleton[2],
        Resources.enemyskeleton[3],
        Resources.enemyskeleton[4][0],
        Resources.background[0],
        Resources.background[1],
        Resources.background[2],
        Resources.playerhitsounds[0],
        Resources.playerhitsounds[1],
        Resources.playerhitsounds[2],
        Resources.playerhitsounds[3],
        Resources.attack1sounds[0], 
        Resources.attack1sounds[1], 
        Resources.attack1sounds[2], 
        Resources.attack2sounds[0], 
        Resources.attack2sounds[1], 
        Resources.attack2sounds[2], 
        Resources.jumpingsounds[0], 
        Resources.jumpingsounds[1], 
        Resources.jumpingsounds[2], 
        Resources.crouchinganims[0], 
        Resources.crouchinganims[1], 
        Resources.crouchinganims[2], 
        Resources.crouchinganims[3], 
        Resources.landingsounds[0], 
        Resources.landingsounds[1], 
        Resources.landingsounds[2], 
        Resources.crouchingsounds[0], 
        Resources.crouchingsounds[1], 
        Resources.crouchingsounds[2], 
        Resources.tiledMap
    ])

export { Resources, ResourceLoader }