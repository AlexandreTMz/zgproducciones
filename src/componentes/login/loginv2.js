import React, { useEffect, useState } from 'react';
import {
    View,
    TouchableOpacity,
    TextInput,
    Text,
    StyleSheet,
    ActivityIndicator,
    Image
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { ModalCustom } from './../modal/modal'

// contexto global usuario!
import { useUsuario } from "./../../contex/context";

// token digital
import { setToken, token } from '../../config/token'

// Components custom
import { ButtonSuccess } from '../button/buttonSuccess'
import { ButtonPrimary } from '../button/buttonPrimary';

export const Loginv2 = () => {
    const [isLoading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [usuario, setUsuarioL] = useState({
        usuario: "",
        contrasenia: ""
    });
    const [modalVisible, setModalVisible] = useState(true);

    const { login, setIsLogin, setUsuario } = useUsuario()

    const iniciar_session = async () => {
        setLoading(true)
        try {
            const response = await login(usuario)
            if (response) {
                setUsuario(response)
                setToken(response)
                setIsLogin(true)
                console.log("Correcto!")
            }
            setLoading(false)
        } catch (error) {
            //console.log(error)
            setIsError(true)
            setLoading(false)
            setModalVisible(true)
        }
    }

    const getDataUsuario = async () => {
        try {
            const response = await token()
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>
                ZG PRODUCCIONES I.R.E.L
            </Text>
            <Image style={styles.imgLogo} source={require('./../../imagenes/profile.png')}></Image>
            <View style={styles.inputView} >
                <TextInput
                    name="usuario"
                    onChangeText={
                        text => setUsuarioL({ ...usuario, usuario: text })
                    }
                    value={usuario.usuario}
                    style={styles.inputText}
                    placeholder="Email..."
                    placeholderTextColor="#003f5c" />
            </View>
            <View style={styles.inputView} >
                <TextInput
                    name="contrasenia"
                    onChangeText={
                        text => setUsuarioL({ ...usuario, contrasenia: text })
                    }
                    value={usuario.contrasenia}
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Password..."
                    placeholderTextColor="#003f5c" />
            </View>

            {isLoading ? (<ActivityIndicator size="large" color="#00ff00" />) : (<View />)}
            {isError ?
                <ModalCustom modalVisible={modalVisible} setModalVisible={setModalVisible} />
                : (<View />)}

            <ButtonSuccess onPress={iniciar_session}>
                Iniciar session
            </ButtonSuccess>

            <ButtonPrimary onPress={getDataUsuario}>
                Registrarse
            </ButtonPrimary>

        </View>
    )
}

const styles = StyleSheet.create({
    searchIcon: {
        padding: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 45,
        color: "#e74c3c",
        marginBottom: 10,
        textAlign: 'center',
        paddingHorizontal: 10
    },
    imgLogo: {
        marginBottom: 18
    },
    inputView: {
        width: "80%",
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#c3c5d1",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "#a8a9af"
    },
    forgot: {
        color: "white",
        fontSize: 11
    }
});