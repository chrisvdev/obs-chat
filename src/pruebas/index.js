const msg = "Kappa Hola manzdevGuybrush Adios manzdevAngry Test manzdevDorito Kukoro manzdevCheck";

const rawEmotes = "emotesv2_97412675225b4d3aab171deaab5be51f:33-44/emotesv2_69135e9b67c147dc9ec18e7e000e866f:51-63/emotesv2_cad33bde946a4043991917b4391109da:72-83/25:0-4/emotesv2_bbe7c53fb47d4bb0aaa5af566fc143c4:11-25"

const getEmotes = (emotes) =>
    emotes.split("/").map((emote) => {
        const [id, positions] = emote.split(":");
        const emoteToRender = { id, positions: [] };
        positions.split(",").forEach((position) => {
            const [begin, end] = position.split("-");
            emoteToRender.positions.push({ begin, end });
        });
        return emoteToRender;
    });

const emotes = getEmotes(rawEmotes)

const getTemplate = (msg, rawEmotes) => {
    const emotes = getEmotes(rawEmotes)
    let sequence = [];
    const template = [];
    emotes.forEach((emote, i) =>
        emote.positions.forEach(({ begin, end }) =>
            sequence.push({ begin, end, emoteId: i })
        )
    );
    console.log
    const isAEmoji = (i) => {
        let result = -1;
        let index = 0;
        while (result < 0 && index < sequence.length) {
            if (i >= sequence[index].begin && i <= sequence[index].end)
                result = sequence[index].emoteId;
            index++
        }
        return result;
    };
    for (let i = 0; i < msg.length; i++)
        isAEmoji(i) < 0
            ? template.push(msg[i])
            : template.push(String.fromCharCode(1000 + isAEmoji(i)));
    return template.join('')
};

const renderEmoji = (id) => `<img src="https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/1.0"/>`

const placeEmojis = (msg, rawEmotes) => {
    let toRender = getTemplate(msg, rawEmotes)
    const emotes = getEmotes(rawEmotes)
    const toReplace = emotes.map(({ id, positions },i) => {
        const length = positions[0].end - positions[0].begin + 1
        return { id, pattern: String.fromCharCode(1000 + i).repeat(length) }
    })
    console.log(toReplace)
    toReplace.forEach(({id,pattern})=>(toRender =toRender.replaceAll(pattern,renderEmoji(id))))
    return toRender;
}

console.log(placeEmojis(msg,rawEmotes))