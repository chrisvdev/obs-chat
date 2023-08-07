const message = new SpeechSynthesisUtterance("")
const voices = {}
setTimeout(() => {
    speechSynthesis.getVoices().forEach((v) => { voices[v.lang] ? voices[v.lang]++ : voices[v.lang] = 1 })
}, 500)

export default function toTTS (msg) {
    const args = msg.split(" ")
    if (msg[2] === "-" && Boolean(voices[args[0]]) && Boolean(Number(args[1][0]) != NaN)) {
        message.voice = speechSynthesis.getVoices().filter((v) => (v.lang === args[0]))[isNaN(Number(args[1][0])) ? 0 : Number(args[1][0]) <= voices[args[0]] && Number(args[1][0]) > 0 ? Number(args[1][0]) - 1 : 0]
        message.text = msg.replace(`${args[0]}${isNaN(Number(args[1][0])) ? " " : ` ${args[1]}`}`, "")
    }
    else {
        message.voice = speechSynthesis.getVoices().filter((v) => (v.lang === "es-AR"))[0]
        message.text = msg
    }
    speechSynthesis.speak(message)
}

// !speak es - ES 1 sdkfposdjfpodsjf