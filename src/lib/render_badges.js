import { createElement } from "react";
import channelResources from "./channel_resources"

function _getBadges (badges) {
    return badges.split(",").map((badge) => (badge.split("/")[0]))
}

const _getBadge = (id) => channelResources.badges.filter((badge) => badge.id === id)[0]

//const _renderBadge = (id) => `<img class="ml-2 h-6 w-6" src="${badges.filter((badge)=>badge.id===id)[0].url}" alt="${id}" />`
const _renderBadge = (id) => _getBadge(id)
    ? (className, key, noStyle) => createElement("img", { key: `badges_${id}_${key}`, className: `${noStyle ? "message_userBadge" : "z-10 h-5 w-5"} ${className}`, src: `${_getBadge(id).url}`, alt: `${id}` }, null)
    : undefined

export default function renderBadges (badgesStr) {
    const badges = _getBadges(badgesStr)
    return badges.map((badge) => {
        return _renderBadge(badge)
    })
}