export default function renderSevenTVEmoji(emoji) {
  // eslint-disable-next-line max-len
  return `<img class="mx-1 w-[${emoji.width}] h-[${emoji.height}] object-cover" src="${emoji.url}"/>`
}
