const API_TEST = {}
const API_URL = 'https://dbloopty.com/apiproducciones/';
const API_VERSION = '1.0';

API_TEST.registrarPersonaUsuario = async (datos) => {
    let response = await fetch(`${API_URL}registrar_persona`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        Accept: 'application/json',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    if (response.ok) {
        return await response.json()
    } else {
        return await response.json().then((err) => { throw err; });
    }
}

API_TEST.registrarUsuario = async (datos) => {
    let response = await fetch(`${API_URL}registrar_persona`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        Accept: 'application/json',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    if (response.ok) {
        return await response.json()
    } else {
        return await response.json().then((err) => { throw err; });
    }
}

API_TEST.registrarUsuarioSolo = async (datos) => {
    let response = await fetch(`${API_URL}registrar_s_usuario`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        Accept: 'application/json',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    if (response.ok) {
        return await response.json()
    } else {
        return await response.json().then((err) => { throw err; });
    }
}

API_TEST.actualizarUsuarioSolo = async (datos) => {
    let response = await fetch(`${API_URL}actualizar_s_usuario`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        Accept: 'application/json',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    if (response.ok) {
        return await response.json()
    } else {
        return await response.json().then((err) => { throw err; });
    }
}

API_TEST.listarUsuario = async (persona) => {
    let response = await fetch(`${API_URL}usuario/${persona}`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        Accept: 'application/json',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        return await response.json()
    } else {
        return await response.json().then((err) => { throw err; });
    }
}

module.exports = API_TEST