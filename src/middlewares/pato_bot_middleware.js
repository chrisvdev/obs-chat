const patos = [
  '/assets/niceDuck.jpg',
  '/assets/pato1.jpg',
  '/assets/pato2.jpg',
  '/assets/pato3.jpg',
  '/assets/pato4.jpg',
  '/assets/pato5.jpg',
  '/assets/quack.gif'
]

export default function patoBotMiddleware(message) {
  if (/(\*[\s]*q[\s]*u[\s]*a[\s]*c[\s]*k[\s]*\*)/gi.test(message.msg)) {
    // eslint-disable-next-line max-len
    message.msg = message.msg.replaceAll(
      /(\*[\s]*q[\s]*u[\s]*a[\s]*c[\s]*k[\s]*\*)/gi,
      '🦆'
    )
    message.quack = patos[Math.ceil(Math.random() * 7) - 1]
  }
  return message
}
