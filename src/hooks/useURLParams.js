import { useState } from "react";

export default function useURLParams() {
    const url = new URL(document.location.href.replace('#','?'))
    const params = {}
    url.searchParams.forEach((value, name) => (params[name] = value))
    return params;
}
