import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';

import {
    Table,
    Row,
} from 'react-native-table-component';

import { TextInputMask } from 'react-native-masked-text'

import { ModalMapaVendedor } from './../../componentes/modal/modalMapa'
import { Picker } from '@react-native-picker/picker';

//tyoken
import { getData } from './../../config/token'
import { buscarCuotaDiaria } from './../../config/apiCuotaDiaria'
import { listarPersonas } from './../../config/apiPersona'

export const ReporteCuotaDiariaSup = () => {

    const [modalVisibleVeMap, setModalVisibleVeMap] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [selectPersona, setSelectPersona] = useState({})
    const [personas, setPersonas] = useState([])

    const [fecha, setFecha] = useState({
        fecha_inicio: '',
        fecha_final: '',
    })

    const [isLoading, setIsLoading] = useState(false);

    const [mapa, setMapa] = useState({})

    useEffect(() => {
        listaDePersonas()
    }, []);

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

    const buscarReporte = async () => {
        setIsLoading(true)
        try {
            const response = await buscarCuotaDiaria({
                id_persona: selectPersona.value,
                fecha_inicio: fecha.fecha_inicio,
                fecha_final: fecha.fecha_final
            });
            //console.log(response)
            //tableData.array.splice();
            tableData.length = 0

            let temp = []
            response.map((e) => {
                e.push(viewMap(
                    {
                        latitude: e[2],
                        longitude: e[3]
                    }
                ))
                temp.push(e)
            })

            setTableData([...tableData, ...temp])
            setIsLoading(false)
            //console.log(temp)
        } catch (e) {
            console.log(e)
            setIsLoading(false)
            alert("No se encontraron resultados!!")
        }
    }

    const viewMap = (value) => (
        <TouchableOpacity onPress={() => {
            setMapa(value)
            console.log(value)
            setModalVisibleVeMap(true)
        }}>
            <View style={styles.btnSuccess}>
                <Text style={styles.btnText}>
                    Ver mapa
                </Text>
            </View>
        </TouchableOpacity>
    );

    const abrirModalCuotas = () => {
        if (modalVisibleVeMap) {
            return (
                <ModalMapaVendedor mapa={mapa} modalVisible={modalVisibleVeMap} setModalVisible={setModalVisibleVeMap} />
            )
        }
    }

    const tableHead = [
        'Fecha',
        'Tipo de venta',
        'Latitud',
        'Longitud',
        'Cantidad',
        '% Ganado',
        'Ver'
    ]

    const widthArr = [180, 250, 120, 120, 150, 150, 150]

    return (
        <View style={styles.contenedor}>
            {
                abrirModalCuotas()
            }
            <ScrollView style={{ width: '100%', paddingTop: 10 }}>
                <View style={styles.formRow}>
                    <Text style={[styles.textInfo, { marginBottom: 15 }]}>
                        Establecer fechas
                    </Text>
                </View>
                <View style={styles.formRow}>
                    <View
                        style={{
                            backgroundColor: '#f6f6f6',
                            borderWidth: 1,
                            borderColor: '#73c5ff',
                            borderRadius: 4,
                            width: '100%',
                        }}
                    >
                        <Picker
                            selectedValue={selectPersona?.value}
                            style={{ height: 40, width: '100%', borderColor: 'black' }}
                            onValueChange={(itemValue, itemIndex) => {
                                setSelectPersona({ ...selectPersona, value: itemValue, label: itemIndex })
                            }}
                        >
                            {personas.map((i, index) => (
                                <Picker.Item key={index} label={i.label} value={i.value} />
                            ))}
                        </Picker>
                    </View>
                </View>
                <View style={styles.formRow}>
                    <View style={styles.column}>
                        <View style={[styles.formRow2, { marginRight: 15 }]}>
                            <View style={styles.fieldSet}>
                                <Text style={styles.legend}>
                                    Desde
                                </Text>
                                <TextInputMask
                                    type={'datetime'}
                                    options={{
                                        format: 'YYYY/MM/DD'
                                    }}
                                    value={
                                        fecha.fecha_inicio
                                    }
                                    onChangeText={
                                        text => setFecha({ ...fecha, fecha_inicio: text })
                                    }
                                    style={styles.inputView}
                                    placeholder="YYYY/MM/DD"
                                />
                            </View>
                        </View>
                        <View style={styles.formRow2}>
                            <View style={styles.fieldSet}>
                                <Text style={styles.legend}>
                                    Hasta
                                </Text>
                                <TextInputMask
                                    type={'datetime'}
                                    options={{
                                        format: 'YYYY/MM/DD'
                                    }}
                                    value={
                                        fecha.fecha_final
                                    }
                                    onChangeText={
                                        text => setFecha({ ...fecha, fecha_final: text })
                                    }
                                    style={styles.inputView}
                                    placeholder="YYYY/MM/DD"
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.formRow}>
                    <TouchableOpacity style={styleButton.loginBtn}
                        disabled={isLoading}
                        onPress={() => {
                            buscarReporte()
                        }}
                    >
                        <Text style={styleButton.loginText}>
                            Buscar
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.formRow}>
                    <ScrollView horizontal={true}>
                        <View style={{ width: '100%', padding: 10 }}>
                            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                                <Row data={tableHead} widthArr={widthArr} style={styles.head} textStyle={styles.text} />
                            </Table>
                            <ScrollView style={styles.dataWrapper}>
                                {isLoading ? <ActivityIndicator size="large" color="#00ff00" /> : (
                                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                        {
                                            tableData.map((rowData, index) => (
                                                <Row
                                                    key={index}
                                                    data={rowData}
                                                    widthArr={widthArr}
                                                    textStyle={styles.text}
                                                />
                                            ))
                                        }
                                    </Table>
                                )}
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    )
}
const styleButton = StyleSheet.create({
    loginBtn: {
        width: "100%",
        backgroundColor: "#5e92f8",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        marginBottom: 10
    },
    loginText: {
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
        padding: 10
    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff'
    },
    text: {
        textAlign: 'center',
        fontWeight: '100'
    },
    row: {
        height: 50,
        backgroundColor: '#E7E6E1'
    },
    btnSuccess: {
        backgroundColor: '#2ecc71',
        marginTop: 2,
        marginBottom: 2,
        width: '85%',
        borderRadius: 5,
        //paddingHorizontal: 20,
        //paddingVertical: 2,
        borderColor: '#27ae60',
        borderWidth: 2,
        paddingRight: 10,
        paddingLeft: 10,
        marginLeft: 10,
        marginRight: 10
    },
    btnText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});