/*
Aquí estaba aprendiendo por primera vez lo que es una clase con métodos estáticos
asi que me los puse a implementar por aprenderlos. No me juzgues, es por amor a
incorporar conocimiento nuevo. Para que veas que se hacer Singletons mírate el
TTS.js
*/

import tts from './tts.js'

const VAULT = 'TTS'

export default class TTSConfigVault {
  static getVault() {
    let vault = JSON.parse(localStorage.getItem(VAULT))
    if (!vault) {
      vault = {}
      localStorage.setItem(VAULT, '{}')
    }
    return vault
  }

  static getConfig(userName) {
    if (this.getVault()[userName]) {
      return this.getVault()[userName]
    } else return null
  }

  static setConfig(userName, accent, variant) {
    if (tts.isAValidVoice(accent)) {
      const vault = this.getVault()

      vault[userName] = {
        accent,
        variant: tts.isAValidVariant(accent, variant) ? variant : 1
      }
      localStorage.setItem(VAULT, JSON.stringify(vault))
    }
  }

  static resetConfig(userName) {
    if (this.getVault()[userName]) {
      const vault = this.getVault()
      vault[userName] = undefined
      localStorage.setItem(VAULT, JSON.stringify(vault))
    }
  }
}
