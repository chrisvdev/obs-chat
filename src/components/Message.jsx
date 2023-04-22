import React, {useState} from 'react'

function _getOrnament(badges) {
    if (badges.includes("mod")) return "from-twitch-mod to-twitch-mod_light";
    if (badges.includes("vip")) return "from-twitch-vip to-twitch-vip_light";
    if (badges.includes("broadcaster"))
      return "from-twitch-brd to-twitch-brd_light";
    if (badges.includes("subscriber"))
      return "from-twitch-sub to-twitch-sub_light";
    return " from-[#111] to-[#333]";
  }

export default function Message({msg, i, renderBadges}) {
    const badges = renderBadges(msg.badges);
    const [loaded,setLoaded]=useState(false)
    return (
      <div
        className="relative flex flex-col items-start w-full mt-9"
      >
        {badges[0] && badges[0]("absolute top-2 left-11")}
        <div className="flex items-center p-2 rounded-full bg-[#222222] absolute left-1 -top-8">
          <div
            className={`flex justify-center items-center h-[3.15rem] w-[3.15rem] rounded-full bg-gradient-to-b ${_getOrnament(
              msg.badges
            )}`}
          >
          <img
              className="h-11 w-11 rounded-full"
              src={msg.quack ? msg.quack : msg.avatar}
              onLoad={() => {setLoaded(true)}}
            /> 
          <img
              className="absolute h-11 w-11 rounded-full"
              src="/assets/st-chrisvdev.gif"
              style={loaded?{display:"none"}:{}}
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
          className={`flex justify-center items-center w-[98%] rounded-3xl rounded-tl-none p-[.17rem] m-1 bg-gradient-to-b ${_getOrnament(
            msg.badges
          )}`}
        >
          <div
            className={`flex flex-col w-full h-full p-5 rounded-3xl rounded-tl-none justify-end items-center bg-[#0A0A0A]`}
          >
            <div className="flex self-end h-6">
              {badges
                .slice(1, badges.length)
                .map((badge, i) => badge("ml-1", i))}
            </div>
            <p
              className={`self-start text-slate-50 text-xl text-start flex flex-wrap break-all text-ellipsis font-inter`}
              key={`msg_${i}`}
              dangerouslySetInnerHTML={{
                __html: msg.msg,
              }}
            />
          </div>
        </div>
      </div>
    );
  }
