import getVariable, { TTS, TTS_ACCENT, TTS_INDEX } from '../lib/get_variable'
import tts from '../lib/tts'
import TTSConfigVault from '../lib/tts_config_vault'

const ttsEnabled = getVariable(TTS)
const ttsAccent = getVariable(TTS_ACCENT) || 'es-AR'
// eslint-disable-next-line prefer-const
let ttsIndex = Number(getVariable(TTS_INDEX))
ttsIndex > 0 && (ttsIndex -= 1)

// eslint-disable-next-line no-unused-vars
const [ACCENT_OR_MODIFIER, VARIANT] = [0, 1]

const isAAccent = /^[a-zA-Z]{1,2}-[a-zA-Z]{1,2}$/g

function normalize(accent) {
  if (isAAccent.test(accent)) {
    let [prev, post] = accent.split('-')
    prev = prev.toLowerCase()
    post = post.toUpperCase()
    return `${prev}-${post}`
  }
  return 'nt-VD'
}

function isAnAccent(toEvaluate) {
  const result = tts.isAValidVoice(toEvaluate)
  return result
}

/*
function isAnModifier (toEvaluate) {
  return toEvaluate[0] === '-'
}
*/

const ACC = 0
const VAR = 1

function config(message) {
  const { msg, userName } = message
  const words = msg.split(' ').map((word) => word.trim())
  const acce = normalize(words[ACC])
  const vari = Math.ceil(Number(words[VAR])) || 1
  if (tts.isAValidVoice(acce) && tts.isAValidVariant(acce, vari)) {
    TTSConfigVault.setConfig(userName, acce, !isNaN(vari) ? vari : 1)
  }
  return true
}

function reset({ userName }) {
  TTSConfigVault.resetConfig(userName)
  return true
}

function speak(message) {
  const { msg, userName } = message

  if (ttsEnabled) {
    let accent = ttsAccent
    let variant = ttsIndex || 1
    let toRead = ''
    const words = msg.split(' ').map((word) => word.trim())
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
}

const TextToSpeak = {
  speak,
  reset,
  config
}

export default TextToSpeak
