import getURLParams from "./get_url_params";

export const CLIENT_ID = "client_id"
export const ACCESS_TOKEN = "access_token"
export const CHANNEL = "channel"


export default function getVariable (variable) {
    const urlParams = getURLParams()
    const lSVariable = localStorage.getItem(variable)
    const envVariable = import.meta.env[`VITE_${variable.toUpperCase()}`]
    if (!envVariable && urlParams[variable]) {
        localStorage.setItem(variable, urlParams[variable])
        return urlParams[variable]
    }
    return envVariable || urlParams[variable] || lSVariable
}