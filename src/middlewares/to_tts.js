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
    const country = accent.split('-')[1].toLowerCase()
    if (ttsAlwaysOn && ttsMentions && lastUserName !== userName)
      tts.speak(`${userName} dicé`, ttsAccent, ttsIndex)
    tts.speak(toRead, accent, variant)
    message.msg =
      `<div style="display: flex; align-items: center; margin-right: .5rem;"><img src="https://flagcdn.com/${country}.svg" style="width: 1,5rem; height: 1rem; margin-right: .5rem;" > 📢 </div>` +
      toRead
  }
  lastUserName = userName
  return message
}
