import seventvclient from '../lib/seventv_api'
import renderSevenTVEmoji from '../lib/render_seventv_emoji'

export default function placeMessage7TVEmojis(message) {
  if (message.msg) {
    const words = message.msg.split(' ')

    words.forEach((word) => {
      const emote = seventvclient.getSevenTVEmotes(word)

      if (emote) {
        message.msg = message.msg.replaceAll(word, renderSevenTVEmoji(emote))
      }
    })
  }
  return message
}
