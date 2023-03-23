import React, { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import useTwitchParams from "./hooks/useTwitchParams";

export default function App() {
  const twitchParams = useTwitchParams();
  const [logged, setLogged] = useState(false)
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "ws://irc-ws.chat.twitch.tv:80",
    {
      share: true,
      shouldReconnect: () => true,
    }
  );

  useEffect(()=>{
    if (twitchParams.access_token && !logged && (readyState === ReadyState.OPEN)) {
      sendMessage('CAP REQ :twitch.tv/membership twitch.tv/tags twitch.tv/commands');
      sendMessage(`PASS oauth:${twitchParams.access_token}`);
      sendMessage('NICK ChrisVDev_OBS-Chat');
    }
  },[logged])

  useEffect(()=>{
    if (readyState!==ReadyState.OPEN) setLogged(false)
  },[readyState])

  useEffect(()=>(console.log(lastMessage)),[lastMessage])

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => console.log(lastMessage), [lastMessage]);

  return (
    <div className="text-center mt-10 font-bold text-7xl">
      {connectionStatus}
      {Object.keys(twitchParams).map((key) => (
        <p key={key}>{`key: ${key}, value: ${twitchParams[key]}`}</p>
      ))}
    </div>
  );
}

/*

TODO:
sustraer los params de la URI con el token de Twitch
https://dev.twitch.tv/docs/irc/authenticate-bot/
https://lenguajejs.com/javascript/peticiones-http/url/

http://localhost:5173/
http://localhost:5173/
*/
