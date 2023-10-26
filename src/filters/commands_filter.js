import { commandsContainer } from '../lib/containers.js'
import speak from '../commands/speak.js'

commandsContainer.addCommand('speak', speak)
commandsContainer.addCommand('comando1', (arg) => console.log(`com1 -> ${arg}`))
commandsContainer.addCommand('comando1 hola', (arg) =>
  console.log(`hola -> ${arg}`)
)

export default function commandsFilter(message) {
  const { msg, isABot } = message

  const isACommand =
    typeof msg === 'string'
      ? !msg.includes('!hit @jp__is') && msg[0] === '!'
      : false // e4yttuh was here 😎
  if (isACommand && !isABot) {
    return commandsContainer.executeIfFound(msg)
  }
  return isACommand
}
