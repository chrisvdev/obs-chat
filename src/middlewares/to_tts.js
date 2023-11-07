import tts from '../lib/tts'
import getVariable, {
  TTS_ALWAYS_ON,
  TTS_ACCENT,
  TTS_INDEX
} from '../lib/get_variable'

const ttsAlwaysOn = getVariable(TTS_ALWAYS_ON)
const ttsAccent = getVariable(TTS_ACCENT)
const ttsIndex = getVariable(TTS_INDEX)

export default function toTTS(message) {
  const { speak, userName } = message
  if (speak) {
    const { toRead, accent, variant } = speak
    if (ttsAlwaysOn) tts.speak(`${userName} dice`, ttsAccent, ttsIndex)
    tts.speak(toRead, accent, variant)
  }
  return message
}
