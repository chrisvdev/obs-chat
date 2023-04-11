export default function patoBotMiddleware(msg) {
    if (msg.msg.includes("*quack*")) {
        let processed = structuredClone(msg)
        processed.msg = processed.msg.replaceAll("*quack*", "🦆")
        processed["quack"] = true
        return processed
    }
    else return msg
}