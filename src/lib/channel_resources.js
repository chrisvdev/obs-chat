import getVariable, { CHANNEL, ACCESS_TOKEN, CLIENT_ID } from "./get_variable"
import axios from "axios"

const channel = getVariable(CHANNEL)
const access_token = getVariable(ACCESS_TOKEN)
const client_id = getVariable(CLIENT_ID)

class ChannelResources {
    constructor () {
        this.channelData = {}
        this.badges = []
        axios({
            url: `https://api.twitch.tv/helix/users?login=${channel}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Client-Id": client_id
            }
        })
            .then(({ data }) => {
                this.channelData = data.data[0]
                axios({
                    url: `https://api.twitch.tv/helix/chat/badges?broadcaster_id=${this.channelData.id}`,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Client-Id": client_id
                    }
                })
                    .then(({ data }) => {
                        this.badges = [...this.badges, ...data.data.map(({ set_id, versions }) => ({ id: set_id, url: versions[0].image_url_2x }))]
                    })
            })
        axios({
            url: `https://api.twitch.tv/helix/chat/badges/global`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Client-Id": client_id
            }
        })
            .then(({ data }) => {
                this.badges = [...this.badges, ...data.data.map(({ set_id, versions }) => ({ id: set_id, url: versions[0].image_url_2x }))]
            })

    }

}

const channelResources = new ChannelResources()

export default channelResources