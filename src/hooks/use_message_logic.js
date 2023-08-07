import { useEffect, useState } from "react";
import useConnectWebSocketToTwitchIRC from "./use_connect_websocket_to_twitch_irc";
import messagePreProcessor from "../lib/message_pre_processor";
import messageFilters from "../lib/massage_filters"
import botFilter from "../filters/bot_filter";
import commandsFilter from "../filters/commands_filter";
import isNotAMessage from "../filters/is_not_a_message";
import messageToRenderProcessor from "../lib/message_to_render_processor"
import getMessageEmojis from "../middlewares/get_message_emojis";
import linkRemover from "../middlewares/link_remover";
import preloadUserData from "../middlewares/avatar_placer";
import messageCleaner from "../middlewares/message_cleaner";
import speakMessageRender from "../middlewares/speak_message_render";
import filterHTMLTags from "../middlewares/filter_html_tags";
import placeEmojis from "../middlewares/place_emojis";
import patoBotMiddleware from "../middlewares/pato_bot_middleware";
import getVariable, { CHANNEL } from "../lib/get_variable";

const channel = getVariable(CHANNEL)

messagePreProcessor.setChannel(channel);
messagePreProcessor.useMiddleware(getMessageEmojis);
messagePreProcessor.useMiddleware(preloadUserData);
messagePreProcessor.useMiddleware(linkRemover);

messageFilters.addFilter(isNotAMessage)
messageFilters.addFilter(botFilter)
messageFilters.addFilter(commandsFilter)

messageToRenderProcessor.useMiddleware(messageCleaner);
messageToRenderProcessor.useMiddleware(speakMessageRender);
messageToRenderProcessor.useMiddleware(filterHTMLTags);
messageToRenderProcessor.useMiddleware(placeEmojis);
messageToRenderProcessor.useMiddleware(patoBotMiddleware);

export default function useMessageLogic () {
    const message = useConnectWebSocketToTwitchIRC(channel)
    const [messageToRender, setMessageToRender] = useState({})
    useEffect(() => {
        const income = messagePreProcessor.processMessage(message)
        if (messageFilters.mustBeFiltered(income)) {
            setMessageToRender(
                messageToRenderProcessor.processMessage(income)
            )
        }
    }, [message])
    return messageToRender
}