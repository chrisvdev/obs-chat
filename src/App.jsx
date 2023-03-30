import React from "react";
import useTwitchChat from "./hooks/useTwitchChat";

export default function App() {
  const chat = useTwitchChat();

  const getEmotes = (emotes) =>
    emotes.split("/").map((emote) => {
      const [id, positions] = emote.split(":");
      const emoteToRender = { id, positions: [] };
      positions.split(",").forEach((position) => {
        const [begin, end] = position.split("-");
        emoteToRender.positions.push({ begin, end });
      });
      return emoteToRender;
    });

  const getTemplate = (msg, rawEmotes) => {
    const emotes = getEmotes(rawEmotes);
    let sequence = [];
    const template = [];
    emotes.forEach((emote, i) =>
      emote.positions.forEach(({ begin, end }) =>
        sequence.push({ begin, end, emoteId: i })
      )
    );
    const isAEmoji = (i) => {
      let result = -1;
      let index = 0;
      while (result < 0 && index < sequence.length) {
        if (i >= sequence[index].begin && i <= sequence[index].end)
          result = sequence[index].emoteId;
        index++;
      }
      return result;
    };
    for (let i = 0; i < msg.length; i++)
      isAEmoji(i) < 0
        ? template.push(msg[i])
        : template.push(String.fromCharCode(1000 + isAEmoji(i)));
    return template.join("");
  };

  const renderEmoji = (id) =>
    `<img class="mx-1 w-8 h-8 aspect-square object-cover" src="https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/1.0"/>`;

  const placeEmojis = (msg, rawEmotes) => {
    let toRender = getTemplate(msg, rawEmotes);
    const emotes = getEmotes(rawEmotes);
    const toReplace = emotes.map(({ id, positions }, i) => {
      const length = positions[0].end - positions[0].begin + 1;
      return { id, pattern: String.fromCharCode(1000 + i).repeat(length) };
    });
    console.log(toReplace);
    toReplace.forEach(
      ({ id, pattern }) =>
        (toRender = toRender.replaceAll(pattern, renderEmoji(id)))
    );
    return toRender;
  };
  return (
    <>
      <div className="flex flex-col-reverse h-[1080px] justify-center items-end">
        {chat.messageCue.map((msg, i) => (
          <div
            key={`msg_${i}`}
            className="flex justify-end items-center px-2 m-1 rounded bg-zinc-800 border border-amber-400"
          >
            <p
              style={{
                color: msg.color
                  ? msg.color
                  : `rgb(${Math.ceil(Math.random() * 128) + 128},${
                      Math.ceil(Math.random() * 128) + 128
                    },${Math.ceil(Math.random() * 128) + 128})`,
              }}
              className="mr-2 font-medium text-3xl"
            >
              {msg["display-name"]}:
            </p>
            <p
              className="my-1 text-slate-50 text-3xl text-end flex flex-wrap"
              key={`msg_${i}`}
              dangerouslySetInnerHTML={{
                __html: msg.emotes ? placeEmojis(msg.msg, msg.emotes) : msg.msg,
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
https://static-cdn.jtvnw.net/emoticons/v2/${id}/${format}/${theme}/${scale}
https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_5101a0ff70354ddc83ac4944dc32f25b/default/dark/1.0                                  id del emote  - Format probar con default - scale con 1.0
https://static-cdn.jtvnw.net/emoticons/v2/25/default/dark/1.0 (url a emotes estandar)

https://lenguajejs.com/javascript/peticiones-http/url/

http://localhost:5173/
http://localhost:5173/
*/
