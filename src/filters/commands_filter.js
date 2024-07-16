import { commandsContainer } from '../lib/containers.js'
import TextToSpeak from '../commands/speak.js'
import filterUsers from '../commands/filter_user.js'
import getVariable, { CHAR_COMMANDS } from '../lib/get_variable.js'

const charCommands = getVariable(CHAR_COMMANDS)?.split(',') || []

commandsContainer.addCommand('!speak', TextToSpeak.speak)
commandsContainer.addCommand('!speak -config', TextToSpeak.config)
commandsContainer.addCommand('!speak -reset', TextToSpeak.reset)
commandsContainer.addCommand('!iacaiate', filterUsers.addFilteredUser)
commandsContainer.addCommand('!iahabla', filterUsers.removeFilteredUser)

function isA3thPartyCommand(msg) {
  return !msg.includes('!hit @jp__is') && charCommands.includes(msg[0])
} // Pablo (A.K.A. e4yttuh) was here

export default function commandsFilter(message) {
  const { msg, isABot } = message
  const isAValidMessage = typeof msg === 'string'
  let isACommand = false
  if (isAValidMessage && !isABot) {
    const command = commandsContainer.foundCommand(msg)
    isACommand =
      (command && command(message)) ||
      (command ? false : isA3thPartyCommand(msg))
  }
  return isACommand
}
