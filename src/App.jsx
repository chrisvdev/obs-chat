import React, { useEffect } from "react";
import useTwitchChat from "./hooks/useTwitchChat";
import useTwitchBadges from "./hooks/useTwitchBadges";
import patoBotMiddleware from "./middlewares/patoBot";
import "./app.css";
import nice from "./assets/niceDuck.jpg";
import pato1 from "./assets/pato1.jpg";
import pato2 from "./assets/pato2.jpg";
import pato3 from "./assets/pato3.jpg";
import pato4 from "./assets/pato4.jpg";
import pato5 from "./assets/pato5.jpg";
import quack from "./assets/quack.gif";

export default function App() {
  const chat = useTwitchChat();
  useEffect(() => {
    chat.use(patoBotMiddleware);
  }, []);

  const patos = [nice, pato1, pato2, pato3, pato4, pato5, quack];

  const renderBadges = useTwitchBadges("chrisvdev");

  useEffect(() => console.log(chat.messageCue[0]), [chat]);

  // ryonen1: chris fijate este background por defecto: linear-gradient(to top left, #0d1321, #000) y este borde rgba(100,116,139,.2)
  // bg-[#1f1f22]

  return (
    <>
      <div className="flex flex-col-reverse h-[1080px] justify-start items-en">
        {chat.messageCue.map((msg, i) => {
          const badges = renderBadges(msg.badges);
          return (
            <div className="flex flex-col items-start w-full" key={`msg_${i}`}>
              {badges[0] && badges[0]("relative top-24 left-11")}
              <div className="flex items-center p-2 rounded-full bg-[#222222] relative left-1 top-9">
                <img
                  className={`h-12 w-12 rounded-full ${
                    msg.badges.includes("mod")
                      ? "border-4 border-twitch-mod"
                      : msg.badges.includes("vip")
                      ? "border-4 border-twitch-vip"
                      : "border border-zinc-400"
                  }`}
                  src={
                    msg.quack
                      ? patos[Math.ceil(Math.random() * 7) - 1]
                      : msg.avatar
                  }
                  alt={`Avatar-${msg["display-name"]}}`}
                />
                <span
                  className="ml-2 font-bold text-lg mr-4"
                  style={{
                    color: msg.color
                      ? msg.color
                      : `rgb(${Math.ceil(Math.random() * 128) + 128},${
                          Math.ceil(Math.random() * 128) + 128
                        },${Math.ceil(Math.random() * 128) + 128})`,
                  }}
                >
                  {msg["display-name"]}
                </span>
              </div>
              <div
                className={`flex z w-[98%] p-5 mr-4 rounded-3xl rounded-tl-none flex-col justify-end items-center m-1 bg-gradient-to-l from-[#0d1321] to-[#000] ${
                  msg.badges.includes("mod")
                    ? "border-4 border-twitch-mod"
                    : msg.badges.includes("vip")
                    ? "border-4 border-twitch-vip"
                    : "border border-zinc-400"
                } `}
              >
                <div className="flex self-end h-6">
                  {badges
                    .slice(1, badges.length)
                    .map((badge, i) => badge("", i))}
                </div>
                <p
                  className={`self-start text-slate-50 text-xl text-end flex flex-wrap break-all text-ellipsis font-inter`}
                  key={`msg_${i}`}
                  dangerouslySetInnerHTML={{
                    __html: msg.msg,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/*

TODO:

Color mod #00AD03
Color vip #E005B9

Conseguir los datos del usuario (avatar) 🥑✅
Conseguir las medallas de cada usuario 🥑✅
Agregar pato en caso de *quack* 🥑✅
filtar mensajes de bots
hacer los estilos

hacer interface para que los componentes no dependa de como nombra las propiedades el API de Twitch

*/
