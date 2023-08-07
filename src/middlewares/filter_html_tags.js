export default function filterHTMLTags (message) { // obra y gracia de JP__is ❤️
    message.msg = message.msg.replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
    return message;
}