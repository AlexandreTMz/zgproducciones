import React from 'react';

export default async function getUserAsync(url, options) {
    //DATOS DE LA API
    const datos = []
    const API_URL = 'https://dbloopty.com/APP-VACUNAS/';
    const API_VERSION = '1.0';

    //ESTADOS PARA CONTROLAR EL API
    const [isLoading, setLoading] = useState(false);
    
    setLoading(true)
    //alert("Xdd")
    fetch(`${API_URL}api/buscar/paciente/156456456`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        Accept: 'application/json',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((data) => {
            if (data.ok) {
                return data.json();
            } else {
                return data.json().then((err) => { throw err; });
            }
        })
        .then((data) => {
            setLoading(false)
            alert(data.msg);
        })
        .catch(function (error) {
            setLoading(false)
            console.log(error);
        });
}