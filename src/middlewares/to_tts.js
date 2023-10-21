import tts from '../lib/tts'

export default function toTTS(message) {
  const { speak } = message
  if (speak) {
    const { toRead, accent, variant } = speak
    tts.speak(toRead, accent, variant)
  }
  return message
}
