const notAllowedWords = [
  'script',
  'src',
  'iframe',
  'fixed',
  'absolute',
  '!important',
  'url(',
  '<audio>',
  '<video>',
  '<style',
  'svg',
  'onload',
  'dialog',
  'link',
  'href',
  'url',
  'meta'
]

export default function placeHTML(message) {
  if (message.html) {
    // eslint-disable-next-line max-len
    message.msg = `<div style="max-height: 15rem; max-width: 90svw; overflow: hidden;">${message.msg}</div>`
    message.msg = message.msg.replaceAll('&lt;', '<').replaceAll('&gt;', '>')
    notAllowedWords.forEach((word) => {
      message.msg = message.msg.replaceAll(word, 'div')
    })
  }
  return message
}
