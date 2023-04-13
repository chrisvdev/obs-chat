import React, { useEffect } from "react";
import useTwitchChat from "./hooks/useTwitchChat";
import useTwitchBadges from "./hooks/useTwitchBadges";
import patoBotMiddleware from "./middlewares/patoBot";
import "./app.css";

function _getOrnament(badges){
  if (badges.includes("mod")) return "from-twitch-mod to-twitch-mod_light"
  if (badges.includes("vip")) return "from-twitch-vip to-twitch-vip_light"
  if (badges.includes("broadcaster")) return "from-twitch-brd to-twitch-brd_light"
  if (badges.includes("subscriber")) return "from-twitch-sub to-twitch-sub_light"
  return " from-[#111] to-[#333]" 
}

export default function App() {
  const chat = useTwitchChat();
  useEffect(() => {
    chat.use(patoBotMiddleware);
  }, []);

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
                <div className={`flex justify-center items-center h-[3.15rem] w-[3.15rem] rounded-full bg-gradient-to-b ${_getOrnament(msg.badges)}`}>
                <img
                  className="h-11 w-11 rounded-full"
                  src={msg.avatar}
                />
                </div>
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
                className={`flex z w-[98%] p-5 mr-4 rounded-3xl rounded-tl-none flex-col justify-end items-center m-1 bg-[#0A0A0A] ${
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
                    .map((badge, i) => badge("ml-1", i))}
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
} //-----------------------------------------------

/*    budges

TODO:

Color mod #00AD03
Color vip #E005B9

Conseguir los datos del usuario (avatar) 🥑✅
Conseguir las medallas de cada usuario 🥑✅
Agregar pato en caso de *quack* 🥑✅
poner el degrade en el Avatar
eliminar espacio, englobar con un elemento en position absolute al avatar y nick y mover con relative
solucionar la carga de los avatares (onload)
hacer los estilos 
filtrar mensajes de bots 

hacer interface para que los componentes no dependa de como nombra las propiedades el API de Twitch

*/
