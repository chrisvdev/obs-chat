function toCamelCase (key) {
    let words = key.split("-")
    if (words.length > 1) {
        for (let i = 1; i < words.length; i++) words[i] = words[i].replace(words[i][0], words[i][0].toUpperCase())
        return words.join("")
    }
    return key
}

function apiDecoupler (rawObjMsg) {
    return ({
        msg: rawObjMsg.msg,
        badgeInfo: rawObjMsg["@badgeInfo"],
        badges: rawObjMsg.badges,
        clientNonce: rawObjMsg.clientNonce,
        color: rawObjMsg.color,
        displayName: rawObjMsg.displayName,
        emotes: rawObjMsg.emotes,
        firstMsg: rawObjMsg.firstMsg,
        flags: rawObjMsg.flags,
        id: rawObjMsg.id,
        mod: rawObjMsg.mod,
        vip: rawObjMsg.vip,
        returningChatter: rawObjMsg.returningChatter,
        roomId: rawObjMsg.roomId,
        subscriber: rawObjMsg.subscriber,
        tmiSentTs: rawObjMsg.tmiSentTs,
        turbo: rawObjMsg.turbo,
        userId: rawObjMsg.userId,
        userType: rawObjMsg.userType,
        replyParentDisplayName: rawObjMsg.replyParentDisplayName,
        replyParentMsgBody: rawObjMsg.replyParentMsgBody,
        replyParentMsgId: rawObjMsg.replyParentMsgId,
        replyParentUserId: rawObjMsg.replyParentUserId,
        replyParentUserLogin: rawObjMsg.replyParentUserLogin,
        replyThreadParentMsgId: rawObjMsg.replyThreadParentMsgId,
        replyThreadParentUserLogin: rawObjMsg.replyThreadParentUserLogin,
        emoteOnly: rawObjMsg.emoteOnly,
    })
}

class MessagePreProcessor {
    constructor () {
        this.middlewares = []
        this.channel = ""
    }
    _mkMsgObj = (rawMsg) => {
        const [data, msg] = rawMsg.split(`PRIVMSG #${this.channel} :`)
        const rawObjMsg = { msg }
        data.split(";").map((element) => {
            if (element) {
                const [key, value] = element.split('=')
                rawObjMsg[toCamelCase(key)] = value
            }
        })
        return apiDecoupler(rawObjMsg)
    }
    setChannel (channel) {
        this.channel = channel
    }
    useMiddleware (cb) {
        this.middlewares.push(cb)
    }
    processMessage (rawMessage) {
        let message = this._mkMsgObj(rawMessage)
        this.middlewares.forEach((cb) => { message = cb(message) })
        return message
    }
}

const messagePreProcessor = new MessagePreProcessor()

export default messagePreProcessor
