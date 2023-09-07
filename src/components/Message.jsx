/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import renderBadges from '../lib/render_badges'
import getAvatar from '../lib/get_avatar'
import './message.css'
import getVariable, { DEFAULT_AVATAR } from '../lib/get_variable'

const defaultAvatar = getVariable(DEFAULT_AVATAR)

function _getOrnament(badges) {
  if (badges.includes('mod')) return 'from-twitch-mod to-twitch-mod_light'
  if (badges.includes('vip')) return 'from-twitch-vip to-twitch-vip_light'
  if (badges.includes('broadcaster'))
    return 'from-twitch-brd to-twitch-brd_light'
  if (badges.includes('subscriber'))
    return 'from-twitch-sub to-twitch-sub_light'
  return ' from-[#111] to-[#333]'
}

export default function Message({ message, i }) {
  const avatar = getAvatar(message.userId)
  const badges = renderBadges(message.badges)
  const [loaded, setLoaded] = useState(false)
  return (
    <div
      className={`relative flex flex-col items-start w-full mt-9 ${
        message.new ? 'newMessage' : ''
      } ${message.dieing ? 'dieingMessage' : ''}`}
      key={`msg_${i}`}
    >
      {badges[0] && badges[0]('absolute top-2 left-11')}
      <div className="flex items-center p-2 rounded-full bg-[#222222] absolute left-1 -top-8">
        <div
          className={`flex justify-center items-center h-[3.15rem] w-[3.15rem] rounded-full bg-gradient-to-b ${_getOrnament(
            message.badges
          )}`}
        >
          <img
            className="h-11 w-11 rounded-full"
            src={message.quack ? message.quack : avatar}
            onLoad={() => {
              setLoaded(true)
            }}
          />
          <img
            className="absolute h-11 w-11 rounded-full"
            src={defaultAvatar || '/assets/st-chrisvdev.gif'}
            style={loaded ? { display: 'none' } : {}}
          />
        </div>
        <span
          className="ml-2 font-bold text-lg mr-4"
          style={{
            color: message.color
              ? message.color
              : `rgb(${Math.ceil(Math.random() * 128) + 128},${
                  Math.ceil(Math.random() * 128) + 128
                },${Math.ceil(Math.random() * 128) + 128})`
          }}
        >
          {message.displayName}
        </span>
      </div>
      <div
        className={`flex justify-center items-center w-[98%] rounded-3xl rounded-tl-none p-[.17rem] m-1 bg-gradient-to-b ${_getOrnament(
          message.badges
        )}`}
      >
        <div
          className={`flex flex-col w-full h-full p-5 rounded-3xl rounded-tl-none justify-end items-center bg-[#0A0A0A]`}
        >
          <div className="flex self-end h-6">
            {badges.slice(1, badges.length).map((badge, i) => badge('ml-1', i))}
          </div>
          <p
            className={`self-start text-slate-50 text-xl text-start flex flex-wrap font-inter`}
            dangerouslySetInnerHTML={{
              __html: message.msg
            }}
          />
        </div>
      </div>
    </div>
  )
}
