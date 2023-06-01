export class Data {

    SFXvolume
    Muisicvolume
    Scene
    restart = false
    playerXpos

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
}