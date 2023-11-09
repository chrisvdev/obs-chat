// Based on the logic of a code madded from SonnyArg, THX <3

class Trigger {
  constructor(pattern, priority, execute) {
    this.pattern = pattern
    this.execute = execute
    this.priority = priority
  }

  test(msg) {
    const result = /^!comando1\s+hola(?:\s+(.+))?$/i.test(msg)
    console.log(typeof msg, this.pattern instanceof RegExp, result)
    return result
  }

  getArgs(msg) {
    let ref, ref1
    const match = (ref = this.pattern.exec(msg)) != null ? ref : ['']
    const capture = (ref1 = match[1]) != null ? ref1 : ''
    if (!/\S/.test(capture)) {
      return []
    }
    return capture.split(/\s+/)
  }
}

function escapeRegex(string) {
  return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

function buildTrigger(command, execute) {
  let words
  words = command.split(' ')
  words = words.map((word) => escapeRegex(word))
  const regex = new RegExp('^!' + words.join('\\s+') + '(?:\\s+(.+))?$', 'i')
  console.log(regex)
  const priority = words.length
  return new Trigger(regex, priority, execute)
}

class CommandsContainer {
  #commands = []
  addCommand(command, cb) {
    this.#commands.push(buildTrigger(command, cb))
    this.#commands.sort(
      ({ priority: priorityA }, { priority: priorityB }) =>
        priorityB - priorityA
    )
  }

  matchCommand(message) {
    return this.#commands.find((trigger) => trigger.test(message))
  }

  executeIfFound(message) {
    const trigger = this.matchCommand(message)
    if (trigger && typeof trigger.execute === 'function')
      return trigger.execute(trigger.getArgs(message))
    return false
  }
}

export default CommandsContainer
