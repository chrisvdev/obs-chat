import tts from '../lib/tts'
import getVariable, {
  TTS_ALWAYS_ON,
  TTS_ACCENT,
  TTS_INDEX,
  TTS_MENTIONS
} from '../lib/get_variable'

const ttsAlwaysOn = getVariable(TTS_ALWAYS_ON)
const ttsAccent = getVariable(TTS_ACCENT)
const ttsIndex = getVariable(TTS_INDEX)
const ttsMentions = getVariable(TTS_MENTIONS)

let lastUserName = null

export default function toTTS(message) {
  const { speak, userName } = message
  if (speak) {
    const { toRead, accent, variant } = speak
    if (ttsAlwaysOn && ttsMentions && lastUserName !== userName)
      tts.speak(`${userName} dicé`, ttsAccent, ttsIndex)
    tts.speak(toRead, accent, variant)
  }
  lastUserName = userName
  return message
}
