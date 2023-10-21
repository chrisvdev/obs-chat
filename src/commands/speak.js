import getVariable, { TTS, TTS_ACCENT, TTS_INDEX } from '../lib/get_variable'
import tts from '../lib/tts'

const ttsConfig = getVariable(TTS)
const ttsAccent = getVariable(TTS_ACCENT)
const VAULT = 'TTS'
// eslint-disable-next-line prefer-const
let ttsIndex = Number(getVariable(TTS_INDEX))
ttsIndex > 0 && (ttsIndex -= 1)

class ConfigVault {
  #vault
  constructor() {
    this.#vault = JSON.parse(localStorage.getItem(VAULT))
    if (!this.#vault) {
      this.#vault = {}
      localStorage.setItem(VAULT, '{}')
    }
  }

  getConfig(userName) {
    if (this.#vault[userName]) {
      return this.#vault[userName]
    } else return null
  }

  setConfig(userName, accent, variant) {
    if (tts.isAValidVoice(accent)) {
      this.#vault[userName] = { accent, variant }
      localStorage.setItem(VAULT, JSON.stringify(this.#vault))
    }
  }

  resetConfig(userName) {
    if (this.#vault[userName]) {
      this.#vault[userName] = undefined
      console.log(this.#vault)
      localStorage.setItem(VAULT, JSON.stringify(this.#vault))
    }
  }
}

const vault = new ConfigVault()

function normalize(accent) {
  let [prev, post] = accent.split('-')
  prev = prev.toLowerCase()
  post = post.toUpperCase()
  return `${prev}-${post}`
}

export default function speak(message, userName) {
  if (ttsConfig) {
    let accent = ttsAccent || 'es-AR'
    let voiceNumber = ttsIndex || 1
    let toRead = ''

    const words = message.split(' ').map((word) => word.trim())
    if (words[0] === '-config') {
      const acce = normalize(words[1])
      if (tts.isAValidVoice(acce) && words[1][2] === '-') {
        vault.setConfig(userName, acce, words[2] ? Number(words[2]) : 1)
      }
      return true
    }

    if (words[0] === '-reset') {
      vault.resetConfig(userName)
      return true
    }

    if (words[0][0] !== '-') {
      if (words[0][2] === '-') {
        accent = normalize(words[0])
        if (!Number.isNaN(Number(words[1]))) {
          voiceNumber = Number(words[1])
          toRead = words.slice(2).join(' ')
        } else toRead = words.slice(1).join(' ')
      } else {
        toRead = message
        const config = vault.getConfig(userName)
        if (config) {
          accent = config.accent
          voiceNumber = config.variant
        }
      }
      tts.speak(toRead, accent, voiceNumber)
      return false
    }
    return true
  }
}
