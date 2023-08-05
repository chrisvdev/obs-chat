import React from "react";
import useMessageLogic from "./hooks/use_message_logic.js";
import { useEffect } from "react";

export default function App() {
  const message = useMessageLogic();
  useEffect(() => {
    console.log(message);
  }, [message]);
  return <div>App</div>;
}
