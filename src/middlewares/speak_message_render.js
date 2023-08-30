export default function speakMessageRender(message) {
  let toRead = ''
  const words = message.msg.split(' ')
  if (words[0] === '!speak') {
    if (words[1][2] === '-') {
      if (`${Number(words[2])}` !== 'NaN') {
        toRead = words.slice(3).join(' ')
      } else toRead = words.slice(2).join(' ')
    } else toRead = words.slice(1).join(' ')
    message.msg = `📢 ${toRead}`
  }
  return message
}
