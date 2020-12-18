import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal
} from 'react-native';

import { TextInput } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text'
import RNPickerSelect from 'react-native-picker-select';
import { LogBox } from 'react-native';

import { listarUsuario, registrarUsuarioSolo, actualizarUsuarioSolo } from '../../config/apiUsuario'

export default function EditarUsuarioModal({ modalVisible, setModalVisible, id_persona }) {

    const [usuario, setUsuario] = useState({
        id_persona: id_persona
    });

    console.log(id_persona, modalVisible)

    useEffect(() => {

        getUsuario()

        return () => {
            console.log('usuario....')
            LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        }
    }, [])

    const getUsuario = async () => {
        try {
            const response = await listarUsuario(id_persona)
            //console.log("Respuesta: ", response)
            //setUsuario2(state => ({ ...state, ...response }));
            setUsuario({ usuario, ...response });
            console.log(usuario)
        } catch (error) {
            let a = {}
            //setUsuario2(state => ({ ...state, a }));
            setUsuario({
                id_persona: id_persona
            });
            alert("Esta persona no cuenta con un usuario!")
            console.log(error)
        }
    }

    const [isLoad, setIsLoad] = useState(false)

    const registrarEditarUsuario = async () => {
        if (usuario?.id_usuarios) {
            setIsLoad(true)
            try {
                const response = await actualizarUsuarioSolo(usuario)
                alert("Actualizacion correcta!!")
                setIsLoad(false)
            } catch (error) {
                alert("Error!!")
                setIsLoad(false)
            }
            console.log("Si existe usuario")
        } else {
            console.log("No existe usuario")
            setIsLoad(true)
            try {
                const response = await registrarUsuarioSolo(usuario)
                console.log(usuario)
                alert("Registro correcto!!")
                setIsLoad(false)
            } catch (error) {
                alert("Error!!")
                setIsLoad(false)
            }
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false)
            }}
        >
            <View style={styles.contenedor}>
                <ScrollView style={{ width: '100%', paddingTop: 10 }}>
                    <View style={styles.formRow}>
                        <Text style={styles.textInfo}>
                            Editar usuario
                        </Text>
                    </View>
                    <View style={styles.formRow}>
                        <View style={styles.fieldSet}>
                            <Text style={styles.legend}>
                                Usuario
                            </Text>
                            <TextInput
                                style={styles.inputView}
                                value={
                                    usuario.us_nombre
                                }
                                onChangeText={
                                    text => setUsuario({ ...usuario, us_nombre: text })
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.formRow}>
                        <View style={styles.fieldSet}>
                            <Text style={styles.legend}>
                                Contraseña
                            </Text>
                            <TextInput
                                style={styles.inputView}
                                value={
                                    usuario?.us_contrasenia
                                }
                                onChangeText={
                                    text => setUsuario({ ...usuario, us_contrasenia: text })
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.formRow}>
                        <View style={styles.fieldSet}>
                            <Text style={styles.legend}>
                                Tipo de usuario
                            </Text>
                            <RNPickerSelect
                                key={usuario.us_tipo}
                                placeholder={{
                                    label: 'Seleccione su tipo de usuario...',
                                    value: null,
                                }}
                                style={{ ...pickerSelectStyles }}
                                onValueChange={
                                    (value) => setUsuario({ ...usuario, us_tipo: value })
                                }
                                items={[
                                    {
                                        label: 'Supervisor',
                                        value: "1"
                                    },
                                    {
                                        label: 'Empleado',
                                        value: "2"
                                    }
                                ]}
                                value={usuario.us_tipo}
                            />
                        </View>
                    </View>
                    <View style={styles.formRow}>
                        <TouchableOpacity style={styleButton.buttonSuccess}
                            onPress={() => {
                                registrarEditarUsuario()
                            }}
                        >
                            <Text style={styleButton.textSuccess}>
                                {usuario?.id_usuarios ? "Editar usuario" : "Registrar usuario"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    )

}


const styleButton = StyleSheet.create({
    buttonSuccess: {
        width: "100%",
        backgroundColor: "#5e92f8",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        marginBottom: 10
    },
    textSuccess: {
        color: "white"
    }
})

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 15,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    formRow: {
        flex: 1,
        width: '100%',
        marginTop: 5,
        marginBottom: 10
    },
    formRow2: {
        flex: 1,
        marginTop: 3,
        marginBottom: 5
    },
    column: {
        flex: 1,
        flexDirection: 'row',
        width: '100%'
    },
    fieldSet: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 0,
        //paddingTop: 5,
        //paddingBottom: 0,
        borderRadius: 7,
        borderWidth: 1,
        alignItems: 'center',
        borderColor: '#a0cfff'
    },
    legend: {
        paddingHorizontal: 10,
        position: 'absolute',
        top: -10,
        left: 10,
        //fontWeight: 'bold',
        backgroundColor: '#FFFFFF',
        fontSize: 11,
        //fontFamily: 'monospace',
        color: '#636e72'
    },
    inputView: {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#ecf9ff',
        height: 29
    },
    textInfo: {
        color: "#20232a",
        fontSize: 16,
        textAlign: 'center',
        backgroundColor: '#f2f9ff',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        width: '100%',
        fontFamily: 'monospace',
        marginBottom: 5,
        marginTop: 10,
        padding: 10
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        paddingVertical: 1,
        paddingHorizontal: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 8,
        paddingHorizontal: 1,
        paddingVertical: 1,
        borderWidth: 0.4,
        borderColor: 'purple',
        borderRadius: 8,
        color: '#636e72',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});