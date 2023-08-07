import React from "react";
import useMessageLogic from "./hooks/use_message_logic.js";
import Message from "./components/Message.jsx";
import { useEffect } from "react";

export default function App() {
  const message = useMessageLogic();
  useEffect(() => {
    console.log(message);
  }, [message]);
  return (
    <div className="flex flex-col-reverse h-[100vh] justify-start items-en">
      {message.msg && <Message key={`msg_${1}`} message={message} i={1} />}
    </div>
  );
}
/* 
{
  chat.messageCue.map((msg, i) => (
    <Message key={`msg_${i}`} msg={msg} i={i} renderBadges={renderBadges} />
  ));
}
 */
