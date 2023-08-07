class CommandsContainer {
    addCommand (cb) {
        this[cb.name] = cb
    }
}

const commandsContainer = new CommandsContainer()

export default commandsContainer