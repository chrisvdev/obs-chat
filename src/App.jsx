import React, { useEffect } from "react";
import useTwitchChat from "./hooks/useTwitchChat";
import useTwitchBadges from "./hooks/useTwitchBadges";
import patoBotMiddleware from "./middlewares/patoBot";
import botFilter from "./filters/botFilter";
import commandsFilter from "./filters/commandsFilter";
import defaultAvatar from "./middlewares/defaultAvatar";
import Message from "./components/Message";
import "./app.css";

export default function App() {
  const chat = useTwitchChat();
  useEffect(() => {
    chat.use(patoBotMiddleware);
    chat.use(defaultAvatar);
    chat.useFilter(botFilter);
    chat.useFilter(commandsFilter);
  }, []);

  const renderBadges = useTwitchBadges("chrisvdev");

  /* useEffect(() => console.log(chat.messageCue[0]), [chat]); */

  // ryonen1: chris fijate este background por defecto: linear-gradient(to top left, #0d1321, #000) y este borde rgba(100,116,139,.2)
  // bg-[#1f1f22]

  return (
    <>
      <div className="flex flex-col-reverse h-[100vh] justify-start items-en">
        {chat.messageCue.map((msg, i) => (
          <Message
            key={`msg_${i}`}
            msg={msg}
            i={i}
            renderBadges={renderBadges}
          />
        ))}
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
poner el degrade en el Avatar 🥑✅
eliminar espacio, englobar con un elemento en position absolute al avatar y nick y mover con relative 🥑✅
hacer los estilos 🥑✅
filtrar mensajes de bots y filtrar comandos 🥑✅ 
solucionar la carga de los avatares (onload) -> En hilo de discord para subir Memes random

Refactorizar:

hacer interface para que los componentes no dependa de como nombra las propiedades el API de Twitch

*/
