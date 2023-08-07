export default function speakMessageRender (message) {
    let toRead = ''
    const words = message.msg.split(' ')
    if (words[0] === "!speak") {
        if (words[1][2] === '-') { // quiere decir que es un selector de acento como el 'es-AR'
            if (`${Number(words[2])}` !== 'NaN') { // quiere decir que elige un indice
                toRead = words.slice(3).join(' ')
            }
            else toRead = words.slice(2).join(' ');
        }
        else toRead = words.slice(1).join(' ');
        message.msg = `📢 ${toRead}`
    }
    return message;
}