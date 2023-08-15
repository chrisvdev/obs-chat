import React from "react";
import useMessageCue from "./hooks/use_message_cue.js";
import Message from "./components/Message.jsx";
import getVariable, { RENDER } from "./lib/get_variable.js";

const render = getVariable(RENDER);

export default function App() {
  const cue = useMessageCue();
  /* useEffect(() => {
    console.log(cue);
  }, [cue]); */
  return render ? (
    <div className="flex flex-col h-[100vh] justify-end">
      {cue
        .filter((message) => Boolean(message.userId))
        .map((message, i) => (
          <Message key={`msg_${i}`} message={message} i={i} />
        ))}
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-medium text-lg text-black">No Render</h1>
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
