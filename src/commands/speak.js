import getVariable, { TTS, TTS_ACCENT, TTS_INDEX } from '../lib/get_variable'
import tts from '../lib/tts'

const ttsConfig = getVariable(TTS)
const ttsAccent = getVariable(TTS_ACCENT)
// eslint-disable-next-line prefer-const
let ttsIndex = Number(getVariable(TTS_INDEX))
ttsIndex > 0 && (ttsIndex -= 1)

export default function speak(message) {
  if (ttsConfig) {
    let accent = ttsAccent || 'es-AR'
    let voiceNumber = ttsIndex || 1
    let toRead = ''

    const words = message.split(' ')
    if (words[0][2] === '-') {
      accent = words[0]
      if (!Number.isNaN(Number(words[1]))) {
        voiceNumber = Number(words[1])
        toRead = words.slice(2).join(' ')
      } else toRead = words.slice(1).join(' ')
    } else toRead = message
    tts.speak(toRead, accent, voiceNumber)
  }
  return false
}
