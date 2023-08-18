import { commandsContainer } from '../lib/containers.js'
import speak from '../commands/speak.js'

commandsContainer.addCommand("speak", speak)

export default function commandsFilter ({ msg }) {
    let isACommand = typeof msg === 'string' ? (!(msg.includes('!hit @jp__is')) && msg[0] === '!') : false // e4yttuh was here 😎
    if (isACommand) {
        let [command, ...rest] = msg.split(' ')
        command = command.replace('!', '')
        rest = rest.join(' ')
        commandsContainer[command] && (isACommand = commandsContainer[command](rest))
    }
    return isACommand
}

{
    Nv: () => { }
}