class ComManzContainer {
  #commands = {}
  #EXEC = Symbol('exec')
  #splitKeys(message) {
    return message.trim().split(/\s+/)
  }

  addCommand(command, cb) {
    const keys = this.#splitKeys(command)
    let lastRef = this.#commands
    keys.forEach((key) => {
      if (lastRef[key]) {
        lastRef = lastRef[key]
      } else {
        lastRef[key] = {}
        lastRef = lastRef[key]
      }
    })
    lastRef[this.#EXEC] = cb
  }

  foundCommand(message) {
    const keys = this.#splitKeys(message)
    let lastRef = this.#commands
    let keyIndex = 0
    const searchCommand = () => {
      if (lastRef) {
        if (lastRef[keys[keyIndex]]) {
          lastRef = lastRef[keys[keyIndex]]
          keyIndex++
          return searchCommand()
        }
        if (lastRef[this.#EXEC]) return lastRef[this.#EXEC]
        return false
      }
    }
    const command = searchCommand()
    return command
      ? (message) => {
          message.msg = keys.slice(keyIndex).join(' ')
          return command(message)
        }
      : false
  }
}

export default ComManzContainer
