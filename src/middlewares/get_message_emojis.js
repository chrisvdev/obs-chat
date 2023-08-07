export default function getMessageEmojis (message) {
    const emojis = {}
    if (Boolean(message.emotes)) {
        const letters = message.msg.split('')
        message.emotes.split('/').forEach((rawEmote) => {
            let [id, range] = rawEmote.split(':')
            const [start, end] = range.split(',')[0].split('-')
            range = {
                start: Number(start),
                end: Number(end) + 1
            }
            emojis[letters.slice(range.start, range.end).join('')] = id
        })
        message.emotes = emojis
    }
    return message;
}