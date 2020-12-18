const API_TEST = {}
const API_URL = 'https://dbloopty.com/apiproducciones/';
const API_VERSION = '1.0';

API_TEST.registrarCuota = async (cuota) => {
    let response = await fetch(`${API_URL}registrar_cuota`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        Accept: 'application/json',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cuota)
    })
    if (response.ok) {
        return await response.json()
    } else {
        return await response.json().then((err) => { throw err; });
    }
}

API_TEST.buscarCuotas = async (cuota) => {
    let response = await fetch(`${API_URL}listar_cuotas`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        Accept: 'application/json',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cuota)
    })
    if (response.ok) {
        return await response.json()
    } else {
        return await response.json().then((err) => { throw err; });
    }
}

API_TEST.buscarCuotaIdPersona = async (persona) => {
    //console.log("Cuota api: ",persona)
    let response = await fetch(`${API_URL}listar_cuota_persona_id`, {
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

API_TEST.cuotaByMesIdCuota = async (cuota) => {
    //console.log("Cuota api: ",persona)
    let response = await fetch(`${API_URL}ventas_cuota_id`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        Accept: 'application/json',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cuota)
    })
    if (response.ok) {
        return await response.json()
    } else {
        return await response.json().then((err) => { throw err; });
    }
}

module.exports = API_TEST