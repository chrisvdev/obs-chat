export default function defaultAvatar(msg) {
    if (msg && msg.avatar?.includes("/user-default-pictures-uv/")) msg.avatar = "/assets/st-chrisvdev.gif"
    return msg
}

//https://static-cdn.jtvnw.net/user-default-pictures-uv/215b7342-def9-11e9-9a66-784f43822e80-profile_image-70x70.png