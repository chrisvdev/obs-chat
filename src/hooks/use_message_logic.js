import { useEffect, useState } from 'react'
// eslint-disable-next-line max-len
import useConnectWebSocketToTwitchIRC from './use_connect_websocket_to_twitch_irc.js'
import messagePreProcessor from '../lib/message_pre_processor.js'
import messageFilters from '../lib/massage_filters.js'
import messageToRenderProcessor from '../lib/message_to_render_processor.js'
import botFilter from '../filters/bot_filter.js'
import commandsFilter from '../filters/commands_filter.js'
import isNotAMessage from '../filters/is_not_a_message.js'
import antiGoose from '../middlewares/anti_ganzos.js'
import action from '../middlewares/action.js'
import usernamePlacer from '../middlewares/username_placer.js'
import renderCommands from '../middlewares/render_commands.js'
import getMessageEmojis from '../middlewares/get_message_emojis.js'
import linkRemover from '../middlewares/link_remover.js'
import preloadUserData from '../middlewares/avatar_placer.js'
import messageCleaner from '../middlewares/message_cleaner.js'
import speakMessageRender from '../middlewares/speak_message_render.js'
import filterHTMLTags from '../middlewares/filter_html_tags.js'
import placeEmojis from '../middlewares/place_emojis.js'
import placeHTML from '../middlewares/place_html.js'
import placeHearts from '../middlewares/place_hearts.js'
import patoBotMiddleware from '../middlewares/pato_bot_middleware.js'
import getVariable, { CHANNEL, HTMLI, PATO_BOT } from '../lib/get_variable.js'

const channel = getVariable(CHANNEL)
const patoBot = getVariable(PATO_BOT)
const htmli = getVariable(HTMLI)

messagePreProcessor.setChannel(channel)
messagePreProcessor.useMiddleware(getMessageEmojis)
messagePreProcessor.useMiddleware(preloadUserData)
messagePreProcessor.useMiddleware(linkRemover) // hay que arreglar
messagePreProcessor.useMiddleware(antiGoose)
messagePreProcessor.useMiddleware(usernamePlacer)
messagePreProcessor.useMiddleware(action)

messageFilters.addFilter(isNotAMessage)
messageFilters.addFilter(botFilter)
messageFilters.addFilter(commandsFilter)

messageToRenderProcessor.useMiddleware(renderCommands)
messageToRenderProcessor.useMiddleware(messageCleaner)
messageToRenderProcessor.useMiddleware(speakMessageRender)
messageToRenderProcessor.useMiddleware(filterHTMLTags)
messageToRenderProcessor.useMiddleware(placeHearts)
messageToRenderProcessor.useMiddleware(placeEmojis)
htmli && messageToRenderProcessor.useMiddleware(placeHTML)
patoBot && messageToRenderProcessor.useMiddleware(patoBotMiddleware)

export default function useMessageLogic() {
  const message = useConnectWebSocketToTwitchIRC(channel)
  const [messageToRender, setMessageToRender] = useState({})
  useEffect(() => {
    const income = messagePreProcessor.processMessage(message)

    if (messageFilters.mustBeFiltered(income)) {
      setMessageToRender(messageToRenderProcessor.processMessage(income))
    }
  }, [message])
  return messageToRender
}
