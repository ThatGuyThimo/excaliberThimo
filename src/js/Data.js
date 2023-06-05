export class Data {

    SFXvolume
    Muisicvolume
    Scene
    restart = false
    playerXpos
    levels = ['testmap', 'level1', 'level2']
    currentLevel = 0
    multiplayer = false
    playerHealth = []

    setSFXvolume(value) {
        this.SFXvolume = parseFloat(value)
    }

    setMuisicvolume(value) {
        this.Muisicvolume = parseFloat(value)
    }

    setScene(value) {
        this.Scene = value 
    }

    setRestart(value) {
        this.restart = value
    }

    setPlayerXpos(value) {
        this.playerXpos = value
    }

    setMultiplayer(value) {
        this.multiplayer = value
    }

    setPlayerHealth(player, health) {
        this.playerHealth[player] = health
    }

    getSFXvolume() {
        return this.SFXvolume
    }

    getMuisicvolume() {
        return this.Muisicvolume
    }

    getScene() {
        return this.Scene
    }

    getRestart() {
        return this.restart
    }

    getPlayerXpos() {
        return this.playerXpos
    }

    getLevel(value) {
        return this.levels[value]
    }

    getCurrentLevel() {
        return this.currentLevel
    }

    getMultiplayer() {
        return this.multiplayer
    }

    getPlayerHealth(value) {
        return this.playerHealth[value]
    }
}