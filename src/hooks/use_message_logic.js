import useConnectWebSocketToTwitchIRC from "./use_connect_websocket_to_twitch_irc";
import messagePreProcessor from "../lib/message_pre_processor";
import messageFilters from "../lib/massage_filters"
import botFilter from "../filters/botFilter";
import commandsFilter from "../filters/commandsFilter";
import messageToRenderProcessor from "../lib/message_to_render_processor"
import preloadUserData from "../middlewares/avatar_placer";
import { useEffect, useState } from "react";
import getVariable, { CHANNEL } from "../lib/get_variable";

const channel = getVariable(CHANNEL)

messagePreProcessor.setChannel(channel);
messagePreProcessor.useMiddleware(preloadUserData);

messageFilters.addFilter(botFilter)
messageFilters.addFilter(commandsFilter)

export default function useMessageLogic () {
    const message = useConnectWebSocketToTwitchIRC(channel)
    const [messageToRender, setMessageToRender] = useState({})
    useEffect(() => {
        const income = messagePreProcessor.processMessage(message)
        if (!messageFilters.mustBeFiltered(income)) {
            setMessageToRender(
                messageToRenderProcessor.processMessage(income)
            )
        }
    }, [message])
    return messageToRender
}