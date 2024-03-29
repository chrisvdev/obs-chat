import getVariable, { BOTS } from '../lib/get_variable'

const bots = getVariable(BOTS)?.split(',')

const defaultBots = ['nightbot', 'streamelements', 'el_pato_bot', 'afordibot']

const bannedBots = bots ? [...defaultBots, ...bots] : defaultBots

export default function botFilter(msg) {
  if (bannedBots.includes(msg.userName)) {
    msg.isABot = true
    return true
  }
  return false
}
