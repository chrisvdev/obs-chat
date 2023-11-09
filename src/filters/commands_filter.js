import { commandsContainer } from '../lib/containers.js'
import TextToSpeak from '../commands/speak.js'

commandsContainer.addCommand('!speak', TextToSpeak.speak)
commandsContainer.addCommand('!speak -config', TextToSpeak.config)
commandsContainer.addCommand('!speak -reset', TextToSpeak.reset)

export default function commandsFilter(message) {
  const { msg, isABot } = message
  const isAValidMessage = typeof msg === 'string'
  const isACommand = isAValidMessage
    ? !msg.includes('!hit @jp__is') && msg[0] === '!'
    : false // Pablo (A.K.A. e4yttuh) was here 😎
  if (isAValidMessage && !isABot) {
    const command = commandsContainer.foundCommand(msg)
    return command ? command(message) : command
  }
  return isACommand
}
