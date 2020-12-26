const API_TEST = {}
const API_URL = 'https://dbloopty.com/apiproducciones/';
const API_VERSION = '1.0';

API_TEST.actualizarPerfilVendedor = (persona, setIsLoading) => {
    console.log(persona)
    setIsLoading(true)
    fetch(`${API_URL}actualizar_perfil_vendedor`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        Accept: 'application/json',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(persona)
    })
        .then((data) => {
            if (data.ok) {
                return data.json();
            } else {
                return data.json().then((err) => { throw err; });
            }
        })
        .then((data) => {
            alert("Actualizacion correcta")
            setIsLoading(false)
        })
        .catch(function (error) {
            alert("No se pudo actualizar a la persona")
            setIsLoading(false)
        });
}

API_TEST.obtenerCuotaDiaria = async (persona) => {
    //console.log(persona)
    let response = await fetch(`${API_URL}cuota_diaria`, {
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

    /*return new Promise((resolve, reject) => {

        fetch(`${API_URL}cuota_diaria`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            Accept: 'application/json',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(persona)
        })
            .then((data) => {
                if (data.ok) {
                    return data.json();
                } else {
                    return data.json().then((err) => { throw err; });
                }
            })
            .then((data) => {
                resolve(data);
            })
            .catch(function (error) {
                console.log(error)
            });
    })*/

}

API_TEST.registrarCuotaDiaria = async (cuota) => {
    let response = await fetch(`${API_URL}registrar_cuota_diria`, {
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


API_TEST.buscarCuotaDiaria = async (cuota) => {
    let response = await fetch(`${API_URL}buscar_cuota_diaria`, {
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

API_TEST.buscarCuotaDiariaUbicacion = async (cuota) => {
    let response = await fetch(`${API_URL}buscar_cuota_diaria_ubicacion`, {
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