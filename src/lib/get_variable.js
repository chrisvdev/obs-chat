import getURLParams from "./get_url_params";
import env from "./from_env_file";

//config de twitch
export const SECRET = "secret"
export const CLIENT_ID = "client_id"
export const ACCESS_TOKEN = "access_token"
export const CHANNEL = "channel"
export const PATO_BOT = "pato_bot"
export const TTS = "tts"
export const RENDER = "render"
export const TTS_ACCENT = "tts_accent"
export const TTS_INDEX = "tts_index"
export const BOTS = "bots"
export const STYLE = "style"

const active_by_default = [TTS, PATO_BOT, RENDER]
// pasar a un objeto compatible con la build lo traído por el .env ✅🥑

//estilos 
export const DEFAULT_AVATAR = "default_avatar"
//configuraciones
// habilitar o deshabilitar compatibilidad con el PatoBot 1 ✅🥑
// habilitar o deshabilitar TTS 1 ✅🥑
// Deshabilitar Render 1 ✅🥑
// elegir voz por defecto del TTS  2  ✅🥑
// nombres de bots filtrados 3 ✅🥑
// Custom CSS (cambiar estilo por defecto) 5 
//     poder cargar un css externo ✅🥑
//     reemplazar las clases nombres en notación BEM

export default function getVariable (variable) {
    const urlParams = getURLParams()
    const lSVariable = localStorage.getItem(variable)
    const envVariable = env[variable]
    if (!envVariable && urlParams[variable]) {
        localStorage.setItem(variable, urlParams[variable])
        return urlParams[variable]
    }
    return active_by_default.includes(variable) ? !Boolean(urlParams[variable] || lSVariable) : envVariable || urlParams[variable] || lSVariable
}