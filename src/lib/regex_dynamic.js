//by sonnyARG 😎

export default function regexDynamic (palabra) {
    if (typeof palabra !== 'string') return null;
    var rgx_letras = ``;
    [...palabra].forEach((letra) => { rgx_letras += `[\s]*` + letra; });
    return new RegExp('(' + rgx_letras + ')', 'gi');
}

