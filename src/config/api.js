
import { storeToken } from './token'

const API_TEST = {}
const API_URL = 'https://dbloopty.com/apiproducciones/';
const API_VERSION = '1.0';

API_TEST.login = (persona, setLoading, setIsError, setModalVisible, setIsLogen, setType) => {
    console.log(persona)
    setLoading(true)
    //alert("Xdd")
    fetch(`${API_URL}login`, {
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
            //console.log(data);
            setLoading(false)
            setIsLogen(true)
            setType(data.us_tipo)
            storeToken(data)
        })
        .catch(function (error) {
            setLoading(false)
            setIsError(true)
            setModalVisible(true)
            //console.log(error);
        });
}

API_TEST.actualizarPerfilVendedor = async (persona) => {
    let response = await fetch(`${API_URL}actualizar_perfil_vendedor`, {
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

API_TEST.iniciarSession = async (usuario) => {
    //console.log(usuario)
    let response = await fetch(`${API_URL}login`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        Accept: 'application/json',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    if (response.ok) {
        return await response.json()
    } else {
        return await response.json().then((err) => { throw err; });
    }
}

module.exports = API_TEST