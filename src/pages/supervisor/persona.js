import React, { useEffect, useState } from 'react';
import {
    Button,
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { TextInput } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text'
import RNPickerSelect from 'react-native-picker-select';
import { Switch } from 'react-native-switch';
import { LogBox } from 'react-native';

//get data
import { getData } from './../../config/token'
import { registrarPersonaUsuario } from './../../config/apiUsuario'
import { set } from 'react-native-reanimated';

export const Persona = () => {

    useEffect(() => {
        setPressButton(false)
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, [])

    const [persona, setPersona] = useState(
        {
            celular: "",
            fecha: "",
            documento: "",
            ciudad: 1
        }
    );

    const [usuario, setUsuario] = useState(
        {
            usuario: "",
            contrasenia: "",
            tipoUsuario: 1
        }
    );

    const [isEnabled, setIsEnabled] = useState(false);
    const [pressButton, setPressButton] = useState(false);

    const registrarPersona = async () => {
        let { mensaje, status } = validarInputsPersona()
        let { mensajeUs, statusUs } = validarInputsUsuario()
        if (!status) {
            if (isEnabled) {
                if (!statusUs) {
                    try {
                        const response = await registrarPersonaUsuario({ persona, usuario })
                        //console.log({ persona, usuario })
                        setPersona({})
                        setUsuario({})
                        alert("Registro correcto!")
                        setPressButton(false)
                    } catch (error) {
                        console.log(error)
                        alert("Error!!!")
                        setPressButton(false)
                    }
                } else {
                    alert(mensajeUs)
                }
            } else {
                try {
                    const response = await registrarPersonaUsuario({ persona, usuario })
                    //console.log({ persona, usuario })
                    setPersona({})
                    setUsuario({})
                    alert("Registro correcto!")
                    setPressButton(false)
                } catch (error) {
                    console.log(error)
                    alert("Error!!!")
                    setPressButton(false)
                }
            }
        } else {
            alert(mensaje)
        }
    }

    const validarInputsPersona = () => {
        let response = {
            mensaje: "Complete los siguientes datos:\n",
            status: false
        }
        if (!persona.pe_nombre) {
            response.mensaje += "- Nombre\n"
            response.status = true
        }
        if (!persona.pe_apellido_materno) {
            response.mensaje += "- Apellido materno\n"
            response.status = true
        }
        if (!persona.pe_apellido_paterno) {
            response.mensaje += "- Apellido paterno\n"
            response.status = true
        }
        if (!persona.pe_fecha_nacimiento) {
            response.mensaje += "- Fecha de nacimiento\n"
            response.status = true
        }
        if (!persona.pe_dni) {
            response.mensaje += "- DNI\n"
            response.status = true
        }
        if (!persona.pe_codigo) {
            response.mensaje += "- Codigo\n"
            response.status = true
        }
        return response
    }

    const validarInputsUsuario = () => {
        let response = {
            mensajeUs: "Complete los siguientes datos:\n",
            statusUs: false
        }
        if (!usuario.usuario) {
            response.mensajeUs += "- Usuario\n"
            response.statusUs = true
        }
        if (!usuario.contrasenia) {
            response.mensajeUs += "- Contraseña\n"
            response.statusUs = true
        }
        if (!usuario.tipoUsuario) {
            response.mensajeUs += "- Tipo de usuario\n"
            response.statusUs = true
        }
        return response
    }

    const renderUsuario = () => {
        if (isEnabled) {
            return (
                <View style={styles.formRow} >
                    <View style={styles.formRow}>
                        <View style={styles.fieldSet}>
                            <Text style={styles.legend}>
                                Usuario
                        </Text>
                            <TextInput
                                style={styles.inputView}
                                value={usuario.usuario}
                                onChangeText={
                                    (value) => setUsuario({ ...usuario, usuario: value })
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
                                value={usuario.contrasenia}
                                onChangeText={
                                    (value) => setUsuario({ ...usuario, contrasenia: value })
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
                                placeholder={{
                                    label: 'Seleccione su tipo de usuario...',
                                    value: null,
                                }}
                                style={{ ...pickerSelectStyles }}
                                onValueChange={
                                    (value) => setUsuario({ ...usuario, tipoUsuario: value })
                                }
                                items={[
                                    {
                                        label: 'Supervisor',
                                        value: 1
                                    },
                                    {
                                        label: 'Empleado',
                                        value: 2
                                    }
                                ]}
                                value={usuario.tipoUsuario}
                            />
                        </View>
                    </View>
                </View>
            )
        }
    }

    return (
        <View style={styles.contenedor}>
            <ScrollView style={{ width: '100%', paddingTop: 10 }}>
                <View style={styles.formRow}>
                    <View style={styles.fieldSet}>
                        <Text style={styles.legend}>
                            Nombres
                    </Text>
                        <TextInput
                            style={styles.inputView}
                            value={persona.pe_nombre}
                            onChangeText={
                                text => setPersona({ ...persona, pe_nombre: text })
                            }
                        />
                    </View>
                </View>
                <View style={styles.formRow}>
                    <View style={styles.column}>
                        <View style={[styles.formRow2, { marginRight: 15 }]}>
                            <View style={styles.fieldSet}>
                                <Text style={styles.legend}>
                                    Apellido Paterno
                                </Text>
                                <TextInput
                                    style={styles.inputView}
                                    value={persona.pe_apellido_paterno}
                                    onChangeText={
                                        text => setPersona({ ...persona, pe_apellido_paterno: text })
                                    }
                                />
                            </View>
                        </View>
                        <View style={styles.formRow2}>
                            <View style={styles.fieldSet}>
                                <Text style={styles.legend}>
                                    Apellido Materno
                                </Text>
                                <TextInput
                                    style={styles.inputView}
                                    value={persona.pe_apellido_materno}
                                    onChangeText={
                                        text => setPersona({ ...persona, pe_apellido_materno: text })
                                    }
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.formRow}>
                    <View style={styles.fieldSet}>
                        <Text style={styles.legend}>
                            Documento
                    </Text>
                        <TextInputMask
                            keyboardType={
                                "numeric"
                            }
                            type={
                                'custom'
                            }
                            options={{
                                mask: '99 99 99 99'
                            }}
                            value={
                                persona.pe_dni
                            }
                            onChangeText={
                                text => setPersona({ ...persona, pe_dni: text })
                            }
                            style={styles.inputView}
                        />
                    </View>
                </View>
                <View style={styles.formRow}>
                    <View style={styles.fieldSet}>
                        <Text style={styles.legend}>
                            Fecha nacimiento
                    </Text>
                        <TextInputMask
                            type={'datetime'}
                            options={{
                                format: 'YYYY/MM/DD'
                            }}
                            value={
                                persona.pe_fecha_nacimiento
                            }
                            onChangeText={
                                text => setPersona({ ...persona, pe_fecha_nacimiento: text })
                            }
                            style={styles.inputView}
                            placeholder="YYYY/MM/DD"
                        />
                    </View>
                </View>
                <View style={styles.formRow}>
                    <View style={styles.fieldSet}>
                        <Text style={styles.legend}>
                            Ciudad
                    </Text>
                        <RNPickerSelect
                            placeholder={{
                                label: 'Seleccione un distrito...',
                                value: null,
                            }}
                            style={{ ...pickerSelectStyles }}
                            items={[
                                {
                                    label: 'Sunampe',
                                    value: 1
                                },
                                {
                                    label: 'Chincha alta',
                                    value: 2
                                },
                                {
                                    label: 'Pueblo nuevo',
                                    value: 3
                                },
                                {
                                    label: 'Grocio prado',
                                    value: 4
                                },
                                {
                                    label: 'El carmen',
                                    value: 5
                                },
                            ]}
                            value={parseInt(persona.id_ciudad)}
                            onValueChange={
                                (value) => setPersona({ ...persona, id_ciudad: value })
                            }
                        />
                    </View>
                </View>
                <View style={styles.formRow}>
                    <View style={styles.fieldSet}>
                        <Text style={styles.legend}>
                            Celular
                    </Text>
                        <TextInputMask
                            keyboardType={
                                "numeric"
                            }
                            type={'cel-phone'}
                            options={{
                                maskType: 'BRL',//for international set it -&amp;nbsp;INTERNATIONAL type masking
                                withDDD: true,
                                dddMask: '+051 999999999'//this is a your define formatting you use according to your requirment
                            }}
                            maxLength={14}//set length according to your input requirment
                            value={
                                persona.pe_celular
                            }
                            onChangeText={
                                text => setPersona({ ...persona, pe_celular: text })
                            }
                            style={styles.inputView}
                        />
                    </View>
                </View>
                <View style={styles.formRow}>
                    <View style={styles.fieldSet}>
                        <Text style={styles.legend}>
                            Codigo
                    </Text>
                        <TextInput
                            style={styles.inputView}
                            value={
                                persona.pe_codigo
                            }
                            onChangeText={
                                text => setPersona({ ...persona, pe_codigo: text })
                            }
                        />
                    </View>
                </View>

                <View style={[styles.formRow, { flexDirection: 'row', alignItems: 'center', paddingRight: 10 }]}>
                    <Text style={{ color: 'black', flex: 1, flexGrow: 1 }}>
                        Desea registrar su usuario ?
                    </Text>
                    <Switch
                        value={isEnabled}
                        onValueChange={
                            () => setIsEnabled(previousState => !previousState)
                        }
                        activeText={'Si'}
                        inActiveText={'No'}
                        backgroundActive={'#0be881'}
                        backgroundInactive={'#d2dae2'}
                        circleActiveColor={'#05c46b'}
                        circleInActiveColor={'#808e9b'}
                        circleBorderWidth={0}
                    />
                </View>
                {
                    renderUsuario()
                }
                <View style={styles.formRow}>
                    <TouchableOpacity style={styleButton.buttonSuccess}
                        onPress={
                            () => {
                                registrarPersona()
                            }
                        }
                        disabled={pressButton}
                    >
                        <Text style={styleButton.textSuccess}>
                            Registrar
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
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