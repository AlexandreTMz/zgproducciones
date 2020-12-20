import React, { useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import { TextInput } from 'react-native-gesture-handler';

import { registrarCuota } from './../../config/apiCuota'

export const AgregarCuota = ({ id_persona }) => {

    const [cuota, setCuota] = useState(
        {
            inicio: "",
            fin: "",
            id_persona: id_persona,
            n_pre: 0,
            n_post: 0,
            p_pre: 0,
            p_post: 0
        }
    );

    const [isLoad, setIsLoad] = useState(false)

    const agregarCuota = async () => {
        let { mensaje, status } = validarInputsCuota()
        if (!status) {
            setIsLoad(true)
            try {
                const response = await registrarCuota(cuota)
                setIsLoad(false)
                setCuota({
                    inicio: "",
                    fin: "",
                    id_persona: id_persona,
                    n_pre: 0,
                    n_post: 0,
                    p_pre: 0,
                    p_post: 0
                })
                alert("Registro correcto!")
            } catch (error) {
                setIsLoad(false)
                alert("Error!!")
                console.log(error)
            }
        } else {
            alert(mensaje)
        }
    }

    function isDate(str) {
        var parms = str.split(/[\.\-\/]/);
        var yyyy = parseInt(parms[0], 10);
        var mm = parseInt(parms[1], 10);
        var dd = parseInt(parms[2], 10);
        var date = new Date(yyyy, mm - 1, dd, 0, 0, 0, 0);
        return mm === (date.getMonth() + 1) && dd === date.getDate() && yyyy === date.getFullYear();
    }
    const validarInputsCuota = () => {
        let response = {
            mensaje: "Complete los siguientes datos:\n",
            status: false
        }
        if (!isDate(cuota?.inicio)) {
            response.mensaje += "- Fecha de inicio\n"
            response.status = true
        }
        if (!isDate(cuota?.fin)) {
            response.mensaje += "- Fecha de fin\n"
            response.status = true
        }
        if (!cuota?.n_post) {
            response.mensaje += "- Nueva linea post pago\n"
            response.status = true
        }
        if (!cuota?.n_pre) {
            response.mensaje += "- Nueva linea pre pago\n"
            response.status = true
        }
        if (!cuota?.p_post) {
            response.mensaje += "- Portabilidad post pago\n"
            response.status = true
        }
        if (!cuota?.p_pre) {
            response.mensaje += "- Portabilidad pre pago\n"
            response.status = true
        }

        if (new Date(cuota?.fin.split("/").join("-")).getTime() < new Date(cuota?.inicio.split("/").join("-")).getTime()) {
            response.mensaje += "- Fecha de fin menor que inicio\n"
            response.status = true
        }

        return response
    }

    return (
        <View style={styles.contenedor}>
            <ScrollView style={{ width: '100%', paddingTop: 10 }}>
                <View style={styles.formRow}>
                    <View style={styles.fieldSet}>
                        <Text style={styles.legend}>
                            Nueva linea prepago
                        </Text>
                        <TextInput
                            keyboardType={
                                "numeric"
                            }
                            style={styles.inputView}
                            onChangeText={
                                text => setCuota({ ...cuota, n_pre: text })
                            }
                            value={cuota.n_pre?.toString()}
                        />
                    </View>
                </View>
                <View style={styles.formRow}>
                    <View style={styles.fieldSet}>
                        <Text style={styles.legend}>
                            Nueva linea post pago
                        </Text>
                        <TextInput
                            keyboardType={
                                "numeric"
                            }
                            style={styles.inputView}
                            onChangeText={
                                text => setCuota({ ...cuota, n_post: text })
                            }
                            value={cuota.n_post?.toString()}
                        />
                    </View>
                </View>
                <View style={styles.formRow}>
                    <View style={styles.fieldSet}>
                        <Text style={styles.legend}>
                            Portabilidad prepago
                        </Text>
                        <TextInput
                            keyboardType={
                                "numeric"
                            }
                            style={styles.inputView}
                            onChangeText={
                                text => setCuota({ ...cuota, p_pre: text })
                            }
                            value={cuota.p_pre?.toString()}
                        />
                    </View>
                </View>
                <View style={styles.formRow}>
                    <View style={styles.fieldSet}>
                        <Text style={styles.legend}>
                            Portabilidad post pago
                        </Text>
                        <TextInput
                            keyboardType={
                                "numeric"
                            }
                            style={styles.inputView}
                            onChangeText={
                                text => setCuota({ ...cuota, p_post: text })
                            }
                            value={cuota.p_post?.toString()}
                        />
                    </View>
                </View>
                <View style={styles.formRow}>
                    <View style={styles.column}>
                        <View style={[styles.formRow2, { marginRight: 15 }]}>
                            <View style={styles.fieldSet}>
                                <Text style={styles.legend}>
                                    Fecha de inicio
                                </Text>
                                <TextInputMask
                                    type={'datetime'}
                                    options={{
                                        format: 'YYYY/MM/DD'
                                    }}
                                    onChangeText={
                                        text => setCuota({ ...cuota, inicio: text })
                                    }
                                    value={cuota.inicio}
                                    style={styles.inputView}
                                    placeholder="YYYY/MM/DD"
                                />
                            </View>
                        </View>
                        <View style={styles.formRow2}>
                            <View style={styles.fieldSet}>
                                <Text style={styles.legend}>
                                    Fecha final
                                </Text>
                                <TextInputMask
                                    type={'datetime'}
                                    options={{
                                        format: 'YYYY/MM/DD'
                                    }}
                                    onChangeText={
                                        text => setCuota({ ...cuota, fin: text })
                                    }
                                    value={cuota.fin}
                                    style={styles.inputView}
                                    placeholder="YYYY/MM/DD"
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.formRow}>
                    <TouchableOpacity
                        style={styleButton.buttonSuccess}
                        onPress={
                            () => {
                                agregarCuota()
                            }
                        }
                        disabled={isLoad}
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