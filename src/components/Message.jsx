import React from "react";

export default function Message({ _mgs, renderBadges }) {
  const msg = {
    autoDestroy: 103,
    msg: "tuki\r\n",
    "@badge-info": "",
    badges: "vip/1,glitchcon2020/1",
    "client-nonce": "6b8fb868ae4e8bccd577a47895b33f1b",
    color: "#00FF7F",
    "display-name": "sharpydev",
    emotes: "",
    "first-msg": "0",
    flags: "",
    id: "216c53b4-70d4-4b18-aec0-85aef78855e2",
    mod: "0",
    "returning-chatter": "0",
    "room-id": "418319555",
    subscriber: "0",
    "tmi-sent-ts": "1681175417673",
    turbo: "0",
    "user-id": "576410540",
    "user-type": "",
    vip: "1 :sharpydev!sharpydev@sharpydev.tmi.twitch.tv ",
    avatar:
      "https://static-cdn.jtvnw.net/user-default-pictures-uv/41780b5a-def8-11e9-94d9-784f43822e80-profile_image-300x300.png",
  };
  return (
    <div
      key={`msg_1000`}
      className={`flex flex-col justify-end items-center px-2 py-1 m-1 rounded object-fill ${
        msg.badges.includes("mod")
          ? "border-4 border-twitch-mod"
          : msg.badges.includes("vip")
          ? "border-4 border-twitch-vip"
          : "border border-zinc-400"
      }`}
      style={{backgroundImage:`url(${msg.avatar})`}}
    >
      <p
        style={{
          color: msg.color
            ? msg.color
            : `rgb(${Math.ceil(Math.random() * 128) + 128},${
                Math.ceil(Math.random() * 128) + 128
              },${Math.ceil(Math.random() * 128) + 128})`,
        }}
        className="flex items-center mr-2 font-medium text-2xl self-start"
        dangerouslySetInnerHTML={{
          __html: `${
            msg.badges && renderBadges(msg.badges)
          }<strong class="mx-2 font-medium">${msg["display-name"]}:</string>`,
        }}
      />
      <p
        className={`my-1 self-end text-slate-50 text-2xl text-end flex flex-wrap break-all text-ellipsis font-inter`}
        key={`msg_1000`}
        dangerouslySetInnerHTML={{
          __html: msg.msg,
        }}
      />
    </div>
  );
}
