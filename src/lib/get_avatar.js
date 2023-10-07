import userDataStorage from './users_data_storage'
import getVariable, { DEFAULT_AVATAR } from './get_variable'

const defaultAvatar = getVariable(DEFAULT_AVATAR)

console.log(defaultAvatar)

export default function getAvatar(userId) {
  const avatar = userDataStorage
    .getUserData(userId)
    .profileImageUrl?.replaceAll('300', '70')
  return avatar
    ? avatar.includes('user-default-pictures')
      ? defaultAvatar
      : avatar
    : defaultAvatar
}
