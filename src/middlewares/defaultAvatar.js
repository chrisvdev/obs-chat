export default function defaultAvatar(msg) {
  if (msg && msg.avatar?.includes('/user-default-pictures-uv/'))
    msg.avatar = '/assets/st-chrisvdev.gif'
  return msg
}
