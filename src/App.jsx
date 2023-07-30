import React from "react";
import useTwitchWebSocketIRC from "./hooks/use_twitch_websocket_irc";
import { useEffect } from "react";

export default function App() {
  const message = useTwitchWebSocketIRC("harryalexok");
  useEffect(() => {
    console.log(message);
  }, [message]);
  return <div>App</div>;
}
