class CommandsContainer {
    addCommand (cb) {
        this[cb.name] = cb
    }
}

export default CommandsContainer