const bannedBots = ["Nightbot", "StreamElements", "el_pato_bot"]
export default function botFilter (msg) {
    return bannedBots.includes(msg.displayName)
}

