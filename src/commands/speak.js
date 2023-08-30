import getVariable, { TTS, TTS_ACCENT, TTS_INDEX } from '../lib/get_variable'

const tts = getVariable(TTS)
let ttsAccent = getVariable(TTS_ACCENT)
// eslint-disable-next-line prefer-const
let ttsIndex = Number(getVariable(TTS_INDEX))
ttsIndex > 0 && (ttsAccent -= 1)

const voices = {}

speechSynthesis.getVoices().forEach((v) => {
  voices[v.lang] ? voices[v.lang]++ : (voices[v.lang] = 1)
})

export default function speak(message) {
  if (tts) {
    Object.keys(voices).length === 0 &&
      speechSynthesis.getVoices().forEach((v) => {
        voices[v.lang] ? voices[v.lang]++ : (voices[v.lang] = 1)
      })
    let accent = ttsAccent || 'es-AR'
    let voiceNumber = ttsIndex || 0
    let toRead = ''

    const words = message.split(' ')
    if (words[0][2] === '-') {
      accent = words[0]
      if (!Number.isNaN(Number(words[1]))) {
        voiceNumber = Number(words[1]) - 1
        toRead = words.slice(2).join(' ')
      } else toRead = words.slice(1).join(' ')
    } else toRead = message
    const toSynthesis = new SpeechSynthesisUtterance(toRead)
    voices[accent] &&
      voiceNumber >= 0 &&
      voiceNumber < voices[accent] &&
      (toSynthesis.voice = speechSynthesis
        .getVoices()
        .filter((v) => v.lang === accent)[voiceNumber])
    speechSynthesis.speak(toSynthesis)
  }
  return false
}
