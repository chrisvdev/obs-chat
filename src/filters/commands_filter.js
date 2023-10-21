import { commandsContainer } from '../lib/containers.js'
import speak from '../commands/speak.js'

commandsContainer.addCommand('speak', speak)

export default function commandsFilter(message) {
  const { msg, isABot } = message

  let isACommand =
    typeof msg === 'string'
      ? !msg.includes('!hit @jp__is') && msg[0] === '!'
      : false // e4yttuh was here 😎
  if (isACommand && !isABot) {
    let [command] = msg.split(' ')
    command = command.replace('!', '')
    commandsContainer[command] &&
      (isACommand = commandsContainer[command](message))
  }
  return isACommand
}
