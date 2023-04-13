import nice from "../assets/niceDuck.jpg";
import pato1 from "../assets/pato1.jpg";
import pato2 from "../assets/pato2.jpg";
import pato3 from "../assets/pato3.jpg";
import pato4 from "../assets/pato4.jpg";
import pato5 from "../assets/pato5.jpg";
import quack from "../assets/quack.gif";

const patos = [nice, pato1, pato2, pato3, pato4, pato5, quack];

export default function patoBotMiddleware(msg) {
    if (msg.msg.includes("*quack*")) {
        let processed = structuredClone(msg)
        processed.msg = processed.msg.replaceAll("*quack*", "🦆")
        processed["quack"] = patos[Math.ceil(Math.random() * 7) - 1]
        return processed
    }
    else return msg
}