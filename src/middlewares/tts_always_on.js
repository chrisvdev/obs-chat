import getVariable, {
  TTS_ALWAYS_ON,
  TTS_ACCENT,
  TTS_INDEX
} from '../lib/get_variable'
import TTSConfigVault from '../lib/tts_config_vault'

const ttsAccent = getVariable(TTS_ACCENT) || 'es-AR'
const ttsVariant = getVariable(TTS_INDEX) || 1
const alwaysOn = getVariable(TTS_ALWAYS_ON)

export default function ttsAlwaysOn(message) {
  if (alwaysOn && !message.speak) {
    const userConfig = TTSConfigVault.getConfig(message.userName)
    if (userConfig) {
      message.speak = {
        toRead: message.msg.trim(),
        accent: userConfig.accent,
        variant: userConfig.variant
      }
    } else {
      message.speak = {
        toRead: message.msg.trim(),
        accent: ttsAccent,
        variant: ttsVariant
      }
    }
  }
  return message
}
