class TTS {
  #voices
  #onReady
  #ready
  #whenSinthReady
  constructor() {
    this.#voices = {}
    this.#onReady = []
    this.#ready = false
    this.#whenSinthReady = () => {
      speechSynthesis.getVoices().forEach((voice) => {
        const { lang } = voice
        if (lang.length === 5)
          this.#voices[lang]
            ? (this.#voices[lang] += 1)
            : (this.#voices[lang] = 1)
        this.#ready = true
        this.#onReady.forEach((cb) => {
          cb(this.#voices)
        })
        speechSynthesis.removeEventListener(
          'voiceschanged',
          this.#whenSinthReady
        )
      })
    }
    speechSynthesis.addEventListener('voiceschanged', this.#whenSinthReady)
  }

  speak(msj, accent, variant) {
    const toSpeak = new SpeechSynthesisUtterance(msj)
    toSpeak.voice = this.#voices[accent]
      ? variant <= this.#voices[accent]
        ? speechSynthesis.getVoices().filter((voice) => voice.lang === accent)[
            variant - 1
          ]
        : speechSynthesis
            .getVoices()
            .filter((voice) => voice.lang === accent)[0]
      : speechSynthesis.getVoices()[0]
    speechSynthesis.speak(toSpeak)
  }

  getVoices() {
    return structuredClone(this.#voices)
  }

  whenReady(cb) {
    this.#ready ? cb(this.#voices) : this.#onReady.push(cb)
  }

  isAValidVoice(voice) {
    return Object.keys(this.#voices).includes(voice)
  }
}

const tts = new TTS()

export default tts
