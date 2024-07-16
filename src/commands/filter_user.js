import { bannedUsersContainer } from '../filters/users_filter'

function addFilteredUser(message) {
  const { msg, mod, streamer } = message
  if (mod || streamer) {
    const userNames = msg.toLowerCase().split(' ')
    bannedUsersContainer.addBannedUsers(userNames)
  }
  return true
}
function removeFilteredUser(message) {
  const { msg, mod, streamer } = message
  if (mod || streamer) {
    const userNames = msg.toLowerCase().split(' ')
    bannedUsersContainer.removeBannedUsers(userNames)
  }
  return true
}

const filterUsers = {
  addFilteredUser,
  removeFilteredUser
}
export default filterUsers
