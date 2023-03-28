import { useState, useEffect } from "react";
import useURLParams from "./useURLParams";
import useWebSocket, { ReadyState } from "react-use-websocket";
const MSG_AMOUNT = 11

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
        console.log(`Twitch token:${Boolean(params.access_token)}`)
        console.log(`logged:${!logged}`)
        console.log(`open:${readyState === ReadyState.OPEN}`)
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
            console.log("mande el mensaje");
            setLogged(true);
        }
    }, [logged, webSocket]);

    useEffect(() => {
        if (readyState !== ReadyState.OPEN) setLogged(false);
    }, [readyState]);

    useEffect(() => {
        if (readyState === ReadyState.OPEN && logged) {
            const mkMsgObj = (rawMsg) => {
                const objMsg = {}
                rawMsg.split(";").map((element) => (objMsg[element.split('=')[0]] = element.split('=')[1]))
                return objMsg
            }
            lastMessage && lastMessage.data.includes("PRIVMSG") && setMessages((previousCue) => [mkMsgObj(lastMessage.data), ...(previousCue.filter((e, i) => i < MSG_AMOUNT))])
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