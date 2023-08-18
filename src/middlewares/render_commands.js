import { renderCommandsContainer } from "../lib/containers.js"
import html from "../render_commands/html.js"

renderCommandsContainer.addCommand("html", html)

export default function renderCommands (message) {
    let isACommand = typeof message.msg === 'string' ? message.msg[0] === '$' : false
    let messageToRender = null
    if (isACommand) {
        let [command, ...rest] = message.msg.split(' ')
        command = command.replace('$', '')
        rest = rest.join(' ')
        renderCommandsContainer[command] && (messageToRender = renderCommandsContainer[command]({ ...message, msg: rest }))
    }
    return messageToRender ? messageToRender : message
}

