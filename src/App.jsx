import React, { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export default function App() {
  const { sendMessage, lastMessage, readyState } = useWebSocket("ws://irc-ws.chat.twitch.tv:80", {
    share: true,
    shouldReconnect: () => true,
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(()=>(console.log(lastMessage)),[lastMessage])

  return (
    <div className="text-center mt-10 font-bold text-7xl">
      {connectionStatus}
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