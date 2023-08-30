// by sonnyARG 😎

export default function regexDynamic(palabra) {
  if (typeof palabra !== 'string') return null
  let rgxLetras = ``
  // eslint-disable-next-line no-useless-escape
  ;[...palabra].forEach((letra) => {
    rgxLetras += `[\s]*` + letra
  })
  return new RegExp('(' + rgxLetras + ')', 'gi')
}
