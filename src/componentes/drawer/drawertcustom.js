import React, { useMemo } from 'react';

import {
    SafeAreaView,
    View,
    StyleSheet,
    Image,
    Text,
    Linking,
    ImageBackground
} from 'react-native';

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

import { removeAllData } from './../../config/token'

import { useUsuario, } from './../../contex/context'

const CustomDrawerContent = ({ props }) => {
    const { login, usuario, setIsLogin, isLoading } = useUsuario()

    useMemo(
        () =>
            Object.keys(usuario)
        , [usuario]
    );

    const cerrar_session = async () => {
        try {
            const response = await removeAllData()
            setIsLogin(false)
            isLoading(true)
        } catch (error) {

        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <ImageBackground
                        source={require('./../../imagenes/headerperfil.jpg')}
                        style={{ flex: 1, width: 280, justifyContent: 'center' }} >
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Image
                                style={
                                    [
                                        styles2.sideMenuProfileIcon,
                                        { flex: 1 }
                                    ]
                                }
                                source={require('./../../imagenes/profile2.png')}
                            />
                            <View style={{ flex: 2, justifyContent: 'center', paddingHorizontal:13 }}>
                                <Text style={[styles.headerText, {fontSize:16}]}>
                                    Usuario: {usuario.us_nombre}
                                </Text>
                                <Text style={styles.headerText}>
                                    Perfil: {parseInt(usuario.us_tipo) === 2 ? 'Vendedor' : 'Supervisor'}
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Salir"
                    onPress={() => {
                        cerrar_session()
                        console.log("Presionado salir")
                    }}
                />
            </DrawerContentScrollView>
            <Text
                style={{
                    fontSize: 16,
                    textAlign: 'center',
                    color: 'grey'
                }}>
                www.dbloopty.com
            </Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    headerContainer: {
        height: 150,
    },
    headerText: {
        color: '#fff8f8',
    },
    screenContainer: {
        paddingTop: 20,
        width: '100%',
    },
    screenStyle: {
        height: 30,
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    screenTextStyle: {
        fontSize: 20,
        marginLeft: 20,
        textAlign: 'center'
    },
    selectedTextStyle: {
        fontWeight: 'bold',
        color: '#00adff'
    },
    activeBackgroundColor: {
        backgroundColor: 'grey'
    }
});

const styles2 = StyleSheet.create({
    sideMenuProfileIcon: {
        resizeMode: 'center',
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        alignSelf: 'center',
    },
    iconStyle: {
        width: 15,
        height: 15,
        marginHorizontal: 5,
    },
    customItem: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default CustomDrawerContent;