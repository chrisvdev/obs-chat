import { useState, useEffect } from "react";
import useURLParams from "./useURLParams";
import axios from "axios";

export default function useTwitchBadges(streamer) {
    const { access_token } = useURLParams();
    const client_id = localStorage.getItem("client_id")
    const [badges, setBadges] = useState([])
    const [global, setGlobal] = useState(false)
    const [channel, setChannel] = useState(false)
    const [streamerId, setStreamerId] = useState(undefined)
    useEffect(()=>console.log(`tengo access_token ${Boolean(access_token)}`),[access_token])
    useEffect(()=>console.log(`tengo global ${Boolean(global)}`),[global])
    useEffect(()=>console.log(`tengo channel ${Boolean(channel)}`),[channel])
    useEffect(()=>console.log(`tengo streamerId ${Boolean(streamerId)}`),[streamerId])
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
                        setBadges((badges) => [...badges, ...data.data.map(({ set_id, versions }) => ({ id: set_id, url: versions.image_url_1x }))])
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
                        console.log(data)
                        setBadges((badges) => [...badges, ...data.data.map(({ set_id, versions }) => ({ id: set_id, url: versions[0].image_url_1x }))])
                        setChannel(true)
                    })
            }
        }
    }, [badges])
    return badges;
}