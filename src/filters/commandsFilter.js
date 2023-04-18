const bannedBots = ["Nightbot", "StreamElements", "el_pato_bot"]
export default function commandsFilter(msg) {
    return !(msg.msg.includes("!hit @jp__is")) && msg.msg[0] === "!" 
} // e4yttuh was here 😎

