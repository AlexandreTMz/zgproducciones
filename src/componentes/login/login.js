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
import { login } from './../../config/api'
import { getData } from './../../config/token'

export const Login = ({ setIsLogen, setType }) => {

    //ESTADOS PARA CONTROLAR EL API
    const [isLoading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [persona, setPersona] = useState({ usuario: "", contrasenia: "" });
    const [modalVisible, setModalVisible] = useState(false);

    const login_usuario = () => {
        login(persona, setLoading, setIsError, setModalVisible, setIsLogen, setType)
    }

    useEffect(() => {
        const asyncFunctionData = async () => {
            try {
                const userDATA = await getData();
                if (userDATA) {
                    setIsLogen(true)
                    console.log(userDATA)
                } else {
                    setIsLogen(false)
                }
            } catch (e) {
                setIsLogen(false)
                console.log(e)
            }
        }
        asyncFunctionData();
        return () => {
            console.log("This will be logged on unmount");
        }
    }, [setIsLogen])

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
                        text => setPersona({ ...persona, usuario: text })
                    }
                    value={persona.usuario}
                    style={styles.inputText}
                    placeholder="Email..."
                    placeholderTextColor="#003f5c" />
            </View>
            <View style={styles.inputView} >
                <TextInput
                    name="contrasenia"
                    onChangeText={
                        text => setPersona({ ...persona, contrasenia: text })
                    }
                    value={persona.contrasenia}
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Password..."
                    placeholderTextColor="#003f5c" />
            </View>
            {isLoading ? (<ActivityIndicator size="large" color="#00ff00" />) : (<View />)}
            {isError ?
                <ModalCustom modalVisible={modalVisible} setModalVisible={setModalVisible} />
                : (<View />)}

            <TouchableOpacity disabled={isLoading} style={styles.loginBtn} onPress={() => login_usuario()}>
                <Text style={styles.loginText}>Iniciar session</Text>
            </TouchableOpacity>
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
        fontSize: 50,
        color: "#5f27cd",
        marginBottom: 10
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
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#5e92f8",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
        marginBottom: 10
    },
    loginText: {
        color: "white"
    }
});