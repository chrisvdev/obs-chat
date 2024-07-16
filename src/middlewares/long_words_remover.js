const mostLongWordInSpanish = 'electroencefalografista'

export default function longWordsRemover(message) {
  Boolean(message.msg) &&
    (message.msg = message.msg
      .split(' ')
      .map((word) => {
        const longerWord = mostLongWordInSpanish.length < word.length
        return longerWord
          ? `Muvaffakiyetsezlestiricilestiriveremeyebileceklerimizdenmissinizcesine`
          : word
      })
      .join(' '))
  return message
}
