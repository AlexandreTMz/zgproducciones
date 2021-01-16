import React, { useEffect, useState } from 'react';
import {
    LogBox,
    View,
    Text,
    Dimensions,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { Picker } from '@react-native-picker/picker';


import { TextInput } from 'react-native-gesture-handler';
import {
    LineChart,
    PieChart,
    ProgressChart,
} from "react-native-chart-kit";

import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

//APIS
import { listarPersonas } from './../../config/apiPersona'
import { reporte_ventas } from './../../config/apiReporte'
import { buscarCuotaIdPersona, cuotaByMesIdCuota } from './../../config/apiCuota'

import moment from 'moment'

export const ReporteVentas = () => {

    const [personas, setPersonas] = useState([])
    const [selectItems, setSelectItems] = useState()
    const [cuotas, setCuotas] = useState([])
    const [selectCuota, setSelectCuota] = useState({})

    useEffect(() => {
        listaDePersonas()
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

    const [desde, setDesde] = useState(false)
    const [hasta, setHasta] = useState(false)

    const [fDesde, setFdesde] = useState(new Date().getTime())
    const [fHasta, setFhasta] = useState(new Date().getTime())

    const [usuario, setUsuario] = useState({
        id_persona: 0,
        desde: moment(new Date()).format("YYYY-MM-DD"),
        hasta: moment(new Date()).format("YYYY-MM-DD"),
        id_cuota: 0
    })

    const [ventas, setVentas] = useState({
        vendido: 0,
        vender: 0
    })

    const buscar = async () => {
        if (usuario.id_persona == 0) {
            alert("Seleccione una persona!!!")
            return
        }

        if (cuotas.value == 0) {
            alert("Seleccione una cuota!!!")
            return
        }

        //console.log("Usuario: ", usuario)
        //console.log("Cuotas: ", selectCuota)
        try {
            alert("Consulta exitosa!")
            const response = await reporte_ventas(usuario)
            console.log("REes: ", response)
            //setVentas({...ventas,...response})
            setVentas({ ...ventas, ...response })
        } catch (error) {
            alert("Ocurrio un problema..!")
            console.log(error)
        }
    }
    let controller;

    const buscarCuotaPersona = async (item) => {
        setUsuario({ ...usuario, id_persona: item.value })
        try {
            const response = await buscarCuotaIdPersona({ id_persona: item.value })
            let data = []
            response.map((e) => {
                data.push({
                    value: e.id_cuota,
                    label: `Inicio: ${e.cu_fecha_inicio} - Fin: ${e.cu_fecha_fin}`
                })
            })
            setCuotas(data)
        } catch (error) {
            console.log(error)
            cuotas.splice();
            cuotas.length = 0
            setCuotas([])
        }
    }


    const [dataSet, setDataSet] = useState({
        labels: ["Ene"],
        datasets: [1]
    })

    const cuotaByMesIdCuotaEs = async (item) => {
        try {
            const response = await cuotaByMesIdCuota({ id_cuota: item })
            let labels = []
            let datasets = []
            response.map((e) => {
                labels.push(e.mes)
                datasets.push(parseInt(e.cantidad))
            })
            console.log(labels, datasets)
            setDataSet({ ...dataSet, labels: labels, datasets: datasets })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={{ width: '100%', padding: 10, backgroundColor: 'white' }}>
            <ScrollView>

                <Text style={[styles.textInfo, { marginBottom: 15 }]}>
                    Establecer fechas
                </Text>

                <View style={stylesRow.formRow}>
                    <DropDownPicker
                        searchable={true}
                        items={personas}
                        containerStyle={{ height: 40 }}
                        style={{ backgroundColor: '#fafafa' }}
                        placeholder="Seleccione a una persona"
                        labelStyle={{
                            fontSize: 16,
                            textAlign: 'left',
                            color: '#000',
                        }}
                        selectedtLabelStyle={{
                            color: '#39739d'
                        }}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={item => {
                            //setSelectItems(item.value)
                            console.log(item.value)
                            buscarCuotaPersona(item)
                        }
                        }
                    />
                </View>

                <View style={stylesRow.formRow}>
                    <View style={{ borderWidth: 1, borderColor: 'red', borderRadius: 4 }}>
                        <Picker
                            selectedValue={selectCuota?.value}
                            style={{ height: 40, width: '100%', borderColor: 'black' }}
                            onValueChange={(itemValue, itemIndex) => {
                                setSelectCuota({ ...selectCuota, value: itemValue, label: itemIndex })
                                setUsuario({ ...usuario, id_cuota: itemValue })
                                cuotaByMesIdCuotaEs(itemValue)
                            }
                            }
                        >
                            {cuotas.map((i, index) => (
                                <Picker.Item key={index} label={i.label} value={i.value} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={stylesRow.formRow}>
                    <View style={stylesRow.column}>
                        <View style={[stylesRow.formRow2, { marginRight: 15 }]}>
                            <View style={stylesRow.fieldSet}>
                                <Text style={stylesRow.legend}>
                                    Desde
                                </Text>
                                <TextInput
                                    style={stylesRow.inputView}
                                    onTouchStart={() => {
                                        console.log(desde)
                                        setDesde(true)
                                    }}
                                    value={
                                        usuario.desde
                                    }
                                />
                                {desde &&
                                    <DateTimePicker
                                        value={moment(usuario.desde, 'YYYY-MM-DD').toDate()}
                                        mode={'date'}
                                        display="default"
                                        style={{ backgroundColor: 'white' }}
                                        onChange={
                                            (date) => {
                                                console.log(date)
                                                if (date.type === "set") {
                                                    setDesde(false)
                                                    setUsuario({
                                                        ...usuario,
                                                        desde: moment(date.nativeEvent.timestamp, "x").format("YYYY-MM-DD")
                                                    })
                                                } else {
                                                    setDesde(false)
                                                    setUsuario({ ...usuario, desde: usuario.desde })
                                                }
                                            }
                                        }
                                    />
                                }
                            </View>
                        </View>
                        <View style={stylesRow.formRow2}>
                            <View style={stylesRow.fieldSet}>
                                <Text style={stylesRow.legend}>
                                    Hasta
                                </Text>
                                <TextInput
                                    style={stylesRow.inputView}
                                    value={
                                        usuario.hasta
                                    }
                                    onTouchStart={() => {
                                        console.log(desde)
                                        setHasta(true)
                                    }}
                                />
                                {hasta &&
                                    <DateTimePicker
                                        value={moment(usuario.hasta, 'YYYY-MM-DD').toDate()}
                                        mode={'date'}
                                        display="default"
                                        style={{ backgroundColor: 'white' }}
                                        onChange={
                                            (date) => {
                                                if (date.type === "set") {
                                                    setHasta(false)
                                                    setUsuario({
                                                        ...usuario,
                                                        hasta: moment(date.nativeEvent.timestamp, "x").format("YYYY-MM-DD")
                                                    })
                                                } else {
                                                    setHasta(false)
                                                    setUsuario({ ...usuario, hasta: usuario.desde })
                                                }
                                            }
                                        }
                                    />
                                }
                            </View>
                        </View>
                    </View>
                </View>

                <View style={stylesRow.formRow}>
                    <TouchableOpacity style={styleButton.buttonSuccess}
                        onPress={
                            () => {
                                buscar()
                            }
                        }
                    >
                        <Text style={styleButton.textSuccess}>
                            Buscar
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.textInfo}>
                    Porcentaje de avance
                </Text>
                <PieChart
                    data={[
                        {
                            name: 'Vendidos',
                            population: parseInt(ventas.vendido),
                            color: '#fbc531',
                            legendFontColor: '#f5f6fa',
                            legendFontSize: 15,
                        },
                        {
                            name: 'Asignados',
                            population: parseInt(ventas.vender),
                            color: '#00a8ff',
                            legendFontColor: '#f5f6fa',
                            legendFontSize: 15,
                        }
                    ]}
                    width={Dimensions.get('window').width - 16}
                    height={220}
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#2691ff",
                        backgroundGradientTo: "#267dff",
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                    accessor="population"
                    backgroundColor="#7f8fa6"
                    paddingLeft="15"
                    absolute //for the absolute number remove if you want percentage
                />

                <Text style={{ padding: 10, width: '100%', backgroundColor: '#e4e6e8', color: '#242729', textAlign: 'center' }}>
                    Le quedan <Text style={{ color: 'red' }}>{(ventas.vender - ventas.vendido)}</Text> ventas por completar!
                </Text>

                <Text style={styles.textInfo}>
                    Compras por mes
                </Text>

                <LineChart
                    data={{
                        labels: dataSet.labels,
                        datasets: [
                            {
                                data: dataSet.datasets
                            }
                        ]
                    }}
                    width={
                        Dimensions.get("window").width - 20
                    } // from react-native
                    height={250}
                    yAxisLabel="U"
                    yAxisSuffix=""
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />

                <View style={{ marginTop: 70 }}></View>

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
    }
});