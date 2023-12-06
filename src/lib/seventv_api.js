import axios from 'axios'
import getVariable, { CHANNEL, ACCESS_TOKEN, CLIENT_ID } from './get_variable'

function apiDecouplerGlobal(rawData) {
  return {
    id: rawData.id,
    name: rawData.name,
    url: rawData.data.host.url + '/' + rawData.data.host.files[0].name,
    width: rawData.data.host.files[0].width,
    height: rawData.data.host.files[0].height
  }
}

const channel = getVariable(CHANNEL)
const accessToken = getVariable(ACCESS_TOKEN)
const clientId = getVariable(CLIENT_ID)

const config = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Client-Id': clientId
  }
}

class SevenTVClient {
  #seventvemotes
  constructor() {
    this.#seventvemotes = []
  }

  initialize() {
    const baseUrl = 'https://7tv.io/v3'

    const url = baseUrl + '/emote-sets/global'
    axios({
      url,
      method: 'GET'
    }).then((response) => {
      this.#seventvemotes = response.data.emotes.map((emoji) =>
        apiDecouplerGlobal(emoji)
      )
    })

    axios
      .get(`https://api.twitch.tv/helix/users?login=${channel}`, config)
      .then(({ data }) => {
        data = data.data[0]

        const userId = data.id

        const url = baseUrl + '/users/twitch/' + userId
        axios({
          url,
          method: 'GET'
        }).then((response) => {
          const myEmotes = response.data.emote_set.emotes.map((emoji) =>
            apiDecouplerGlobal(emoji)
          )

          this.#seventvemotes = [...this.#seventvemotes, ...myEmotes]
        })
      })
  }

  getSevenTVEmotes(name) {
    const emote = this.#seventvemotes.filter((x) => x.name === name)
    return emote[0]
  }
}

const seventvclient = new SevenTVClient()

export default seventvclient
