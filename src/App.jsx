import React from "react";
import useMessageCue from "./hooks/use_message_cue.js";
import Message from "./components/Message.jsx";
import StyledMessage from "./components/StyleMessage.jsx";
import getVariable, { RENDER, STYLE } from "./lib/get_variable.js";

const render = getVariable(RENDER);
const style = getVariable(STYLE);

export default function App() {
  const cue = useMessageCue();
  console.log(render);
  return render !== "false" ? (
    style ? (
      <div className="messages_container">
        {cue
          .filter((message) => Boolean(message.userId))
          .map((message, i) => (
            <StyledMessage key={`msg_${i}`} message={message} i={i} />
          ))}
      </div>
    ) : (
      <div className="flex flex-col h-[100vh] justify-end text-zinc-100">
        {cue
          .filter((message) => Boolean(message.userId))
          .map((message, i) => (
            <Message key={`msg_${i}`} message={message} i={i} />
          ))}
      </div>
    )
  ) : (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-medium text-lg text-black">No Render</h1>
    </div>
  );
}
