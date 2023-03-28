import React from "react";
import useTwitchChat from "./hooks/useTwitchChat";

export default function App() {
  const chat = useTwitchChat();
  const filterMsgText = (rawMsg) => {
    return rawMsg.slice(2, rawMsg.length);
  };

  console.log(chat.messageCue);

  return (
    <>
      <div className="flex flex-col-reverse justify-center items-end">
        {chat.messageCue.map((msg, i) => (
          <div key={`msg_${i}`} className="flex justify-cente items-center py-1 px-2 m-1 rounded bg-zinc-800 border border-amber-400">
            <p
              style={{
                color: msg.color
                  ? msg.color
                  : `rgb(${Math.ceil(Math.random() * 128) + 128},${
                      Math.ceil(Math.random() * 128) + 128
                    },${Math.ceil(Math.random() * 128) + 128})`,
              }}
              className="mr-2"
            >
              {msg["display-name"]}:
            </p>
            <p className="my-1 text-slate-50" key={`msg_${i}`}>
              {filterMsgText((msg.vip || msg["user-type"]).split(":"))}
            </p>
          </div>
        ))}
      </div>
    </>
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
