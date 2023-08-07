export default function messageCleaner (message) {
    message.msg = message.msg.replace("\r\n", "")
    return message;
}