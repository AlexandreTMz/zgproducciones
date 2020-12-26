import React, { useEffect, useState, useMemo, useContext } from 'react';
export const UsuarioContext = React.createContext();

//TOKEN
import { getData } from './../config/token'
import { iniciarSession } from './../config/api'


export function UsuarioProvider(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [usuario, setUsuario] = useState({});
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const isLogged = async () => {
            try {
                const response = await getData()
                if (response) {
                    setIsLogin(true)
                    setUsuario(response)
                }
                setIsLoading(false)
                //console.log(response)
            } catch (error) {
                setIsLogin(false)
                setIsLoading(false)
            }
        }
        isLogged()
        return () =>{
            console.log("clear")
        }
    }, []);

    const login = async (data) => {
        const response = await iniciarSession(data)
        return response
    }

    const value = useMemo(() => {
        return (
            {
                login,
                usuario,
                isLoading,
                isLogin,
                setIsLogin,
                setUsuario,
                setIsLogin
            }
        )
    }, [usuario, isLoading, isLogin])

    return <UsuarioContext.Provider value={value} {...props} />
}

export function useUsuario() {
    const context = React.useContext(UsuarioContext)
    if (!context) {
        throw new Error("useUsuario debe estar en un provider!")
    }
    return context
}