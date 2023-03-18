import React, { useState , useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export default function App() {
  const [message, setMessage] = useState("");
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "wss://echo.websocket.events",
    {
      share: true,
      shouldReconnect: () => true,
    }
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(()=>(console.log(lastMessage)),[lastMessage])

  return (
    <>
      <div className="text-center mt-10 font-bold text-7xl">
        {connectionStatus}
      </div>
      <div className="flex w-full flex-col items-center">
        <input
          className="border border-red-500 rounded mx-4 mt-8"
          type="text"
          value={message}
          onChange={(e)=>(setMessage(e.target.value))}
        />
        <button className="m-2 border border-blue-500 w-fit p-1 rounded "
        onClick={()=>{
          sendMessage(message);
          setMessage("");
        }}>
          Enviar
        </button>
        <p>{lastMessage?.data}</p>
      </div>
    </>
  );
}
