export default function action(message) {
  console.log(message)
  if (message.msg?.includes('\u0001ACTION ')) {
    console.log('action!')
    message.msg = message.msg.replace('\u0001ACTION ', '')
    message.msg = message.msg.replace('\u0001', '')
    message.msg = `💁 ${message.msg}`
  }
  return message
}
