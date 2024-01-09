import tts from './tts.js'

const VAULT = 'TTS'

class TTSConfigVault {
  #vault
  #ls_outdated
  constructor() {
    this.#vault = JSON.parse(localStorage.getItem(VAULT))
    if (!this.#vault) {
      this.#vault = {}
      localStorage.setItem(VAULT, '{}')
    }
    this.#ls_outdated = false
  }

  getVault() {
    return this.#vault
  }

  #LSVaultListener(event) {
    console.log('se ha cambiado en LS')
    if (event.key === VAULT) {
      if (JSON.stringify(this.#vault) === event.newValue) {
        this.#ls_outdated = false
        window.removeEventListener('storage', this.#LSVaultListener)
        console.log('Memoria y LS son iguales')
      } else {
        localStorage.setItem(VAULT, JSON.stringify(this.#vault))
        console.log('Memoria y LS son diferentes')
      }
      this.#ls_outdated = false
    }
  }

  #lsIsOutdated() {
    console.log('se ha cambiado en memoria', this.#vault)
    if (!this.#ls_outdated)
      window.addEventListener('storage', this.#LSVaultListener)
    this.#ls_outdated = true
    localStorage.setItem(VAULT, JSON.stringify(this.#vault))
  }

  getConfig(userName) {
    if (this.getVault()[userName]) {
      return this.getVault()[userName]
    } else return null
  }

  setConfig(userName, accent, variant) {
    if (tts.isAValidVoice(accent)) {
      this.#vault[userName] = {
        accent,
        variant: tts.isAValidVariant(accent, variant) ? variant : 1
      }
      this.#lsIsOutdated()
    }
  }

  resetConfig(userName) {
    if (this.#vault[userName]) {
      this.#vault[userName] = undefined
      this.#ls_outdated = true
    }

    this.#lsIsOutdated()
  }
}

const ttsConfigVault = new TTSConfigVault()

export default ttsConfigVault
