// ":limontechnology!limontechnology@limontechnology.tmi.twitch.tv "

export default function usernamePlacer (message) {
    let toBeParsed = message.userType || message.vip
    if (toBeParsed) {
        message["userName"] = toBeParsed.split(":")[1].split("!")[0]
    }
    return message
}