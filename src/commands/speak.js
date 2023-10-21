import getVariable, { TTS, TTS_ACCENT, TTS_INDEX } from '../lib/get_variable'
import tts from '../lib/tts'
import TTSConfigVault from '../lib/tts_config_vault'

const ttsEnabled = getVariable(TTS)
const ttsAccent = getVariable(TTS_ACCENT) || 'es-AR'
// eslint-disable-next-line prefer-const
let ttsIndex = Number(getVariable(TTS_INDEX))
ttsIndex > 0 && (ttsIndex -= 1)

// eslint-disable-next-line no-unused-vars
const [COMMAND, ACCENT_OR_MODIFIER, VARIANT] = [0, 1, 2]

const isAAccent = /^[a-zA-Z]{1,2}-[a-zA-Z]{1,2}$/g

function normalize(accent) {
  if (isAAccent.test(accent)) {
    let [prev, post] = accent.split('-')
    prev = prev.toLowerCase()
    post = post.toUpperCase()
    return `${prev}-${post}`
  }
  return ttsAccent
}

function isAnAccent(toEvaluate) {
  const result = tts.isAValidVoice(toEvaluate)
  return result
}

function isAnModifier(toEvaluate) {
  return toEvaluate[0] === '-'
}

export default function speak(message) {
  const { msg, userName } = message

  if (ttsEnabled) {
    let accent = ttsAccent
    let variant = ttsIndex || 1
    let toRead = ''

    const words = msg.split(' ').map((word) => word.trim())
    if (words[ACCENT_OR_MODIFIER] === '-config') {
      const acce = normalize(words[1])
      if (tts.isAValidVoice(acce) && words[1][2] === '-') {
        TTSConfigVault.setConfig(
          userName,
          acce,
          words[2] ? Number(words[2]) : 1
        )
      }
      return true
    }

    if (words[ACCENT_OR_MODIFIER] === '-reset') {
      TTSConfigVault.resetConfig(userName)
      return true
    }

    if (!isAnModifier(words[ACCENT_OR_MODIFIER])) {
      if (isAnAccent(words[ACCENT_OR_MODIFIER])) {
        accent = normalize(words[ACCENT_OR_MODIFIER])
        if (!Number.isNaN(Number(words[VARIANT]))) {
          variant = Number(words[VARIANT])
          toRead = words.slice(3).join(' ')
        } else toRead = words.slice(2).join(' ')
      } else {
        toRead = msg.replace('!speak ', '')
        const config = TTSConfigVault.getConfig(userName)
        if (config) {
          accent = config.accent
          variant = config.variant
        }
      }
      message.speak = {
        toRead: toRead.trim(),
        accent,
        variant
      }
      return false
    }
    return true
  }
}
