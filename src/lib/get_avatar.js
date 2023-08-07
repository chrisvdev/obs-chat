import userDataStorage from "./users_data_storage";
import getVariable, { DEFAULT_AVATAR } from "./get_variable";

const default_avatar = getVariable(DEFAULT_AVATAR)

export default function getAvatar (userId) {
    const avatar = userDataStorage
        .getUserData(userId)
        .profileImageUrl?.replaceAll("300", "70");
    return avatar ? avatar.includes("user-default-pictures") ? default_avatar : avatar : default_avatar
}