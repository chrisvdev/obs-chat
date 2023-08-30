import renderEmoji from '../lib/render_emoji'

export default function placeEmojis(message) {
  if (typeof message.emotes === 'object') {
    Object.keys(message.emotes).forEach((emojiPattern) => {
      message.msg = message.msg.replaceAll(
        emojiPattern,
        renderEmoji(message.emotes[emojiPattern])
      )
    })
  }
  return message
}
