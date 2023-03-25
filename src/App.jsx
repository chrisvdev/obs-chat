import React, { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import useTwitchParams from "./hooks/useTwitchParams";

export default function App() {
  const twitchParams = useTwitchParams();
  const [logged, setLogged] = useState(false);
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "ws://irc-ws.chat.twitch.tv:80",
    {
      share: true,
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    console.log(`Twitch token:${Boolean(twitchParams.access_token)}`)
      console.log(`logged:${!logged}`)
      console.log(`open:${readyState === ReadyState.OPEN}`)
    if (
      twitchParams.access_token &&
      !logged &&
      readyState === ReadyState.OPEN
    ) {
      sendMessage(
        "CAP REQ :twitch.tv/membership twitch.tv/tags twitch.tv/commands"
      );
      sendMessage(`PASS oauth:${twitchParams.access_token}`);
      sendMessage("NICK ChrisVDev_OBS-Chat");
      sendMessage("JOIN #chrisvdev");
      console.log("mande el mensaje");
      setLogged(true);
    }
  }, [logged,readyState]);

  useEffect(() => {
    if (readyState !== ReadyState.OPEN) setLogged(false);
  }, [readyState]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(
    () => console.log(lastMessage ? lastMessage.data : "aun no conectado")
  );

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
