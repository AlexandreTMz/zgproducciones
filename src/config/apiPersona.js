const API_TEST = {}
const API_URL = 'https://dbloopty.com/apiproducciones/';
const API_VERSION = '1.0';

API_TEST.listarPersonas = async (datos) => {
    let response = await fetch(`${API_URL}listar_personas`, {
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

API_TEST.personaId = async (id_persona) => {
    let response = await fetch(`${API_URL}persona/${id_persona}`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
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

API_TEST.actualizarPersonaEr = async (persona) => {
    let response = await fetch(`${API_URL}actualizar/persona`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        Accept: 'application/json',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(persona)
    })
    if (response.ok) {
        return await response.json()
    } else {
        return await response.json().then((err) => { throw err; });
    }
}

module.exports = API_TEST