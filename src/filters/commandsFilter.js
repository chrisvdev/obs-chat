const bannedBots = ["Nightbot", "StreamElements", "el_pato_bot"]
export default function commandsFilter (msg) {
    return typeof msg.msg === 'string' ? (!(msg.msg.includes("!hit @jp__is")) && msg.msg[0] === "!") : true
} // e4yttuh was here 😎

