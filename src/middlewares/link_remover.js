import isURL from 'validator/es/lib/isURL'
const regURL = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g

export default function linkRemover (message) {
    Boolean(message.msg) && (message.msg = message.msg.split(' ').map((word) => {
        let url = isURL(word)
        regURL.test(word) && (url = true)
        return url ? `(${message.displayName} envió un link)` : word
    }).join(' '))
    return message;
}