import React, { useEffect } from "react";
import useTwitchChat from "./hooks/useTwitchChat";
import useTwitchBadges from "./hooks/useTwitchBadges";
import "./app.css";

export default function App() {
  const chat = useTwitchChat();
  const badges = useTwitchBadges("chrisvdev")

  useEffect(() => {
    console.log(badges);
  }, [badges]);

  return (
    <>
      <div className="flex flex-col-reverse h-[1080px] justify-start items-end">
        {chat.messageCue.map((msg, i) => (
          <div
            key={`msg_${i}`}
            className={`flex flex-col justify-end items-center px-2 py-1 m-1 rounded bg-[#1f1f22] ${
              msg.badges.includes("mod")
                ? "border-4 border-twitch-mod"
                : msg.badges.includes("vip")
                ? "border-4 border-twitch-vip"
                : "border border-zinc-400"
            } `}
          >
            <p
              style={{
                color: msg.color
                  ? msg.color
                  : `rgb(${Math.ceil(Math.random() * 128) + 128},${
                      Math.ceil(Math.random() * 128) + 128
                    },${Math.ceil(Math.random() * 128) + 128})`,
              }}
              className="mr-2 font-medium text-2xl self-start"
            >
              {msg["display-name"]}:
            </p>
            <p
              className={`my-1 self-end text-slate-50 text-2xl text-end flex flex-wrap break-all text-ellipsis`}
              key={`msg_${i}`}
              dangerouslySetInnerHTML={{
                __html: msg.msg,
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
}

/*

TODO:

Color mod #00AD03
Color vip #E005B9

Conseguir los datos del usuario (avatar) 🥑✅
Conseguir las medallas de cada usuario 
Agregar pato en caso de *quack*
hacer los estilos

*/
