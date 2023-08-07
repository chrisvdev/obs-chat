import React from "react";
import useMessageCue from "./hooks/use_message_cue.js";
import Message from "./components/Message.jsx";
import { useEffect } from "react";

export default function App() {
  const cue = useMessageCue();
  /* useEffect(() => {
    console.log(cue);
  }, [cue]); */
  return (
    <div className="flex flex-col h-[100vh] justify-end">
      {cue
        .filter((message) => Boolean(message.userId))
        .map((message, i) => (
          <Message key={`msg_${i}`} message={message} i={i} />
        ))}
    </div>
  );
}
/* 
{
  cue.map((msg, i) => (
    <Message key={`msg_${i}`} msg={msg} i={i} />
  ));
}
 */
