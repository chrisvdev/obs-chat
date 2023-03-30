import { useState, useEffect } from "react";
import useURLParams from "./useURLParams";
import useWebSocket, { ReadyState } from "react-use-websocket";
const MSG_AMOUNT = 13

export default function useTwitchChat() {
    const [messages, setMessages] = useState([])
    const [logged, setLogged] = useState(false);
    const params = useURLParams();
    const webSocket = useWebSocket(
        "ws://irc-ws.chat.twitch.tv:80",
        {
            share: true,
            shouldReconnect: () => true,
        }
    );
    const { sendMessage, lastMessage, readyState } = webSocket;
    const { access_token, client_id } = params;

    if (!access_token) {
        client_id && navigation.navigate(`https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${client_id}&redirect_uri=http://localhost:5173/&scope=chat%3Aread`)
    }

    useEffect(() => {
        if (
            params.access_token &&
            !logged &&
            readyState === ReadyState.OPEN
        ) {
            sendMessage(
                "CAP REQ :twitch.tv/membership twitch.tv/tags twitch.tv/commands"
            );
            sendMessage(`PASS oauth:${params.access_token}`);
            sendMessage("NICK ChrisVDev_OBS-Chat");
            sendMessage("JOIN #chrisvdev");
            setLogged(true);
        }
    }, [logged, webSocket]);

    useEffect(() => {
        if (readyState !== ReadyState.OPEN) setLogged(false);
    }, [readyState]);

    useEffect(() => {
        if (readyState === ReadyState.OPEN && logged) {
            const mkMsgObj = (rawMsg) => {
                const bomb = setTimeout(() => {
                    setMessages((previous) => previous.filter((msg) => msg.autoDestroy !== bomb))
                }, 10000)
                const [data,msg] = rawMsg.split("PRIVMSG #chrisvdev :")
                const objMsg = { autoDestroy: bomb, msg }
                data.split(";").map((element) => (objMsg[element.split('=')[0]] = element.split('=')[1]))
                console.log(objMsg)
                return objMsg
            }
            lastMessage && lastMessage.data.includes("PRIVMSG") &&
             setMessages((previousCue) => [mkMsgObj(lastMessage.data), ...(previousCue.filter((e, i) => i < MSG_AMOUNT))])
            lastMessage && lastMessage.data.includes("PING") && sendMessage("PONG :tmi.twitch.tv")
        }
    }, [lastMessage])

    return {
        connectionStatus: {
            [ReadyState.CONNECTING]: "Connecting",
            [ReadyState.OPEN]: "Open",
            [ReadyState.CLOSING]: "Closing",
            [ReadyState.CLOSED]: "Closed",
            [ReadyState.UNINSTANTIATED]: "Uninstantiated",
        }[readyState],
        messageCue: messages
    }
}