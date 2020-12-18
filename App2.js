import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import ProfileStackScreen from './src/navigation/profileStackNavigator'
import AuthStackScreen from './src/navigation/authStackNavitgator'
import SplashScreen from './src/componentes/splash/splash'
import { createStackNavigator } from "@react-navigation/stack";

/// Contexto
import { useUsuario, UsuarioProvider } from "./src/contex/context";

const App = () => {
    //CONTEXT
    const { isLoading, isLogin } = useUsuario()

    if (isLoading) {
        console.log("Esta ingresando.... revisando login: ",isLogin)
        return <SplashScreen />;
    }

    const RootStack = createStackNavigator();

    return (
        <NavigationContainer>
                {isLogin ?
                    <ProfileStackScreen/>
                    :
                    <AuthStackScreen/>
                }
        </NavigationContainer>
    );
};

export default () =>
    <UsuarioProvider>
        <App />
    </UsuarioProvider>
