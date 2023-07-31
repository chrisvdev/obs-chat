import React from "react";
import useTwitchWebSocketIRC from "./hooks/use_twitch_websocket_irc";
import messageProcessor from "./lib/process_message";
import preloadUserData from "./middlewares/avatar_placer";
import { useEffect } from "react";
import { useState } from "react";
const CHANNEL = "juliday97";
messageProcessor.setChannel(CHANNEL);
messageProcessor.useMiddleware(preloadUserData);

export default function App() {
  const message = useTwitchWebSocketIRC(CHANNEL);
  useEffect(() => {
    console.log(message);
    console.log(messageProcessor.processMessage(message));
  }, [message]);
  return <div>App</div>;
}
