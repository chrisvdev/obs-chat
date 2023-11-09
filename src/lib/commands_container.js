class CommandsContainer {
  addCommand(name, cb) {
    this[name] = cb
  }
}

export default CommandsContainer
