

function cabecalho() {
    let se = new Date();
    let seA = ("[" + se.toLocaleTimeString() + "]");
    return seA;
}

export default { cabecalho };
