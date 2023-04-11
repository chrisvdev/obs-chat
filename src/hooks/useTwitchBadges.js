import { createElement } from "react";
import { useState, useEffect } from "react";
import useURLParams from "./useURLParams";
import axios from "axios";

function _proceseBadges(data) {
    return (badges) => { return [...badges, ...data.data.map(({ set_id, versions }) => ({ id: set_id, url: versions[0].image_url_2x }))] }
}

function _getBadges(badges) {
    return badges.split(",").map((badge) => (badge.split("/")[0]))
}

export default function useTwitchBadges(streamer) {
    const { access_token } = useURLParams();
    const client_id = localStorage.getItem("client_id")
    const [badges, setBadges] = useState([])
    const [global, setGlobal] = useState(false)
    const [channel, setChannel] = useState(false)
    const [streamerId, setStreamerId] = useState(undefined)
    useEffect(() => {
        if (access_token) {
            if (!streamerId) {
                axios({
                    url: `https://api.twitch.tv/helix/users?login=${streamer}`,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Client-Id": client_id
                    }
                })
                    .then(({ data }) => {
                        setStreamerId(data.data[0].id)
                    })
            }
            if (!global) {
                axios({
                    url: `https://api.twitch.tv/helix/chat/badges/global`,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Client-Id": client_id
                    }
                })
                    .then(({ data }) => {
                        setBadges(_proceseBadges(data))
                        setGlobal(true)
                    })
            }
            if (!channel && streamerId) {
                axios({
                    url: `https://api.twitch.tv/helix/chat/badges?broadcaster_id=${streamerId}`,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Client-Id": client_id
                    }
                })
                    .then(({ data }) => {
                        setBadges(_proceseBadges(data))
                        setChannel(true)
                    })
            }
        }
    }, [badges])

    const _getBadge = (id) => badges.filter((badge) => badge.id === id)[0]

    //const _renderBadge = (id) => `<img class="ml-2 h-6 w-6" src="${badges.filter((badge)=>badge.id===id)[0].url}" alt="${id}" />`
    const _renderBadge = (id) => _getBadge(id)
        ? (className, key) => createElement("img", {key: `badges_${id}_${key}`, className: `z-10 h-5 w-5 ${className}`, src: `${_getBadge(id).url}`, alt: `${id}` }, null)
        : undefined

    const makeBadges = (badgesStr) => {
        const badges = _getBadges(badgesStr)
        return badges.map((badge) => {
            return _renderBadge(badge)
        })
    }

    return makeBadges;
}

// toDo: Refactorear promise.all() para evitar los estados Flag. Gracias Mayday221