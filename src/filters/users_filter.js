import getVariable, { BOTS, CHANNEL } from '../lib/get_variable'

const channel = getVariable(CHANNEL)

const userDefinedBots = getVariable(BOTS)?.split(',')
const defaultBots = ['nightbot', 'streamelements', 'el_pato_bot', 'afordibot']

const bots = userDefinedBots
  ? [...userDefinedBots, ...defaultBots]
  : defaultBots

class BannedUsersContainer {
  #bannedUsers = []
  constructor(users = []) {
    this.#bannedUsers.push(...users)
  }

  get bannedUsers() {
    return this.#bannedUsers
  }

  set bannedUsers(users) {
    this.#bannedUsers = users
  }

  addBannedUser(user) {
    if (!this.bannedUsers.includes(user) && user !== channel) {
      this.bannedUsers.push(user)
    }
  }

  addBannedUsers(users) {
    const filteredUsers = users.filter(
      (user) => !this.#bannedUsers.includes(user) && user !== channel
    )
    if (filteredUsers.length > 0) {
      this.bannedUsers.push(...filteredUsers)
    }
  }

  removeBannedUser(user) {
    if (!bots.includes(user)) {
      const index = this.bannedUsers.indexOf(user)
      if (index > -1) {
        this.bannedUsers.splice(index, 1)
      }
    }
  }

  removeBannedUsers(users) {
    const filteredUsers = users.filter((user) => !bots.includes(user))
    if (filteredUsers.length > 0) {
      this.bannedUsers = this.bannedUsers.filter(
        (user) => !filteredUsers.includes(user)
      )
    }
  }
}

export const bannedUsersContainer = new BannedUsersContainer(bots)

export default function usersFilter(msg) {
  if (bannedUsersContainer.bannedUsers.includes(msg.userName)) {
    msg.isABot = true
    return true
  }
  return false
}
