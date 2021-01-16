import React, { useEffect, useState } from 'react';
import {
    LogBox,
    View,
    Text,
    Dimensions,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { ButtonSuccess } from './../../componentes/button/buttonSuccess';

import { listarPersonas, compararPersonasVentas } from './../../config/apiPersona'

export const VersusPersona = () => {
    const [personas, setPersonas] = useState([])

    const [persona1, setPersona1] = useState({
        ventas: 0
    })
    const [persona2, setPersona2] = useState({
        ventas: 0
    })

    useEffect(() => {
        listaDePersonas()
        //console.log("Ingreso")
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    const listaDePersonas = async () => {
        try {
            const response = await listarPersonas()
            let data = []
            response.map((e) => {
                data.push({
                    value: e.id_persona,
                    label: `${e.pe_nombre} ${e.pe_apellido_paterno} ${e.pe_apellido_materno}`
                })
            })
            //console.log(data)
            setPersonas(data)
        } catch (error) {

        }
    }

    const comparar_persona = async () => {
        try {
            alert("Consulta exitosa!")
            const response = await compararPersonasVentas({
                id_persona1: persona1?.value,
                id_persona2: persona2?.value
            })
            setPersona1({ ...persona1, ventas: response.persona1 })
            setPersona2({ ...persona2, ventas: response.persona2 })
            console.log(response)
        } catch (error) {
            alert("No se encontro resultados!")
            console.log(error)
        }
    }

    return (
        <View style={{ width: '100%', padding: 10, backgroundColor: 'white' }}>
            <ScrollView>
                <Text style={[styles.textInfo, { marginBottom: 15 }]}>
                    Comparativa!
            </Text>
                <View style={stylesRow.formRow}>
                    <View style={stylesRow.column}>
                        <View style={[stylesRow.formRow2, { marginRight: 15 }]}>
                            <View style={{ borderWidth: 1, borderColor: 'red', borderRadius: 4 }}>
                                <Picker
                                    selectedValue={persona1?.value}
                                    style={{ height: 50, width: '100%', borderColor: 'black' }}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setPersona1({ ...persona1, value: itemValue, label: itemIndex })
                                    }
                                    }
                                >
                                    {personas.map((i, index) => (
                                        <Picker.Item key={index} label={i.label} value={i.value} />
                                    ))}
                                </Picker>
                            </View>
                            <Image style={styles.imgLogo}
                                source={require('./../../imagenes/profile.png')}></Image>
                            <View style={[stylesRow.formRow, { alignItems: 'center' }]}>
                                <Text style={{ fontSize: 20, marginTop: 10 }}>
                                    Ventas: {persona1?.ventas}
                                </Text>
                            </View>
                        </View>
                        <View style={stylesRow.formRow2}>
                            <View style={{ borderWidth: 1, borderColor: 'red', borderRadius: 4 }}>
                                <Picker
                                    selectedValue={persona2?.value}
                                    style={{ height: 50, width: '100%', borderColor: 'black' }}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setPersona2({ ...persona2, value: itemValue, label: itemIndex })
                                    }
                                    }
                                >
                                    {personas.map((i, index) => (
                                        <Picker.Item key={index} label={i.label} value={i.value} />
                                    ))}
                                </Picker>
                            </View>
                            <Image style={styles.imgLogo}
                                source={require('./../../imagenes/profile.png')}></Image>
                            <View style={[stylesRow.formRow, { alignItems: 'center' }]}>
                                <Text style={{ fontSize: 20, marginTop: 10 }}>
                                    Ventas: {persona2?.ventas}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[stylesRow.formRow, { alignItems: 'center' }]}>
                    <ButtonSuccess onPress={
                        () => {
                            comparar_persona()
                        }
                    }>
                        Generar comparativa
                    </ButtonSuccess>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
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
    },
    imgLogo: {
        flex: 1,
        alignSelf: 'center',
        marginTop: 20
    }
});

const stylesRow = StyleSheet.create({
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