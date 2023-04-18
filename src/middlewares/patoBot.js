const patos = ["/assets/niceDuck.jpg", "/assets/pato1.jpg", "/assets/pato2.jpg", "/assets/pato3.jpg", "/assets/pato4.jpg", "/assets/pato5.jpg", "/assets/quack.gif"];

export default function patoBotMiddleware(msg) {
    if (/(\*[\s]*q[\s]*u[\s]*a[\s]*c[\s]*k[\s]*\*)/gi.test(msg.msg) ) {
        let processed = structuredClone(msg)
        processed.msg = processed.msg.replaceAll(/(\*[\s]*q[\s]*u[\s]*a[\s]*c[\s]*k[\s]*\*)/gi, "🦆")
        processed["quack"] = patos[Math.ceil(Math.random() * 7) - 1]
        return processed
    }
    else return msg
}


