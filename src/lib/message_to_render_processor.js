class MessageToRenderProcessor {
    constructor () {
        this.middlewares = []
    }
    useMiddleware (cb) {
        this.middlewares.push(cb)
    }
    processMessage (rawMessage) {
        let message = rawMessage
        this.middlewares.forEach((cb) => { message = cb(message) })
        return message
    }
}

const messageToRenderProcessor = new MessageToRenderProcessor()

export default messageToRenderProcessor