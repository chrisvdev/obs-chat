import getVariable, { TTS, TTS_ACCENT, TTS_INDEX } from "../lib/get_variable"

const tts = getVariable(TTS)
const tts_accent = getVariable(TTS_ACCENT)
let tts_index = Number(getVariable(TTS_INDEX))
tts_index > 0 && (tts_accent -= 1)

const voices = {}

speechSynthesis.getVoices().forEach((v) => { voices[v.lang] ? voices[v.lang]++ : voices[v.lang] = 1 })


export default function speak (message) {
    if (tts) {
        Object.keys(voices).length === 0 && speechSynthesis.getVoices().forEach((v) => { voices[v.lang] ? voices[v.lang]++ : voices[v.lang] = 1 })
        let accent = tts_accent || 'es-AR'
        let voiceNumber = tts_index || 0
        let toRead = ''

        const words = message.split(' ')
        if (words[0][2] === '-') { // quiere decir que es un selector de acento como el 'es-AR'
            accent = words[0]
            if (!Number.isNaN(Number(words[1]))) { // quiere decir que elige un indice
                voiceNumber = Number(words[1]) - 1
                toRead = words.slice(2).join(' ')
            }
            else toRead = words.slice(1).join(' ');
        }
        else toRead = message;
        const toSynthesis = new SpeechSynthesisUtterance(toRead)
        voices[accent] && voiceNumber >= 0 && voiceNumber < voices[accent] && (toSynthesis.voice = speechSynthesis.getVoices().filter((v) => (v.lang === accent))[voiceNumber])
        speechSynthesis.speak(toSynthesis)
    }
    return false
}