const afordiLove = { '&lt;3': 'emotesv2_2440c347e7344f0b9248beb83aa4ac87' }

export default function placeHearts(message) {
  if (message.msg?.includes('&lt;3')) {
    if (typeof message.emotes === 'object') {
      message.emotes = { ...message.emotes, ...afordiLove }
    } else message.emotes = afordiLove
  }
  if (message.msg?.includes(':3')) {
    message.msg = message.msg.replaceAll(':3', '😺')
  }
  return message
}
