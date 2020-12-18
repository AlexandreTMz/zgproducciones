const API_TEST = {}
const API_URL = 'https://dbloopty.com/apiproducciones/';
const API_VERSION = '1.0';

API_TEST.reporte_ventas = async (cuota) => {
    let response = await fetch(`${API_URL}reporte_ventas`, {
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