import userDataStorage from "../lib/users_data_storage";

export default function preloadUserData (message) {
    if (message.userId) userDataStorage.getUserData(message.userId);
    return message;
}
