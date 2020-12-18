import React, { useState, useEffect } from 'react';
import {
    Image,
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl
} from 'react-native';

import { buscarCuotas } from './../../config/apiCuota'

const ListViewCuotas = ({ title, description }) => {
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, flexGrow: 1 }}>
                <Image source={require('./../../imagenes/profile.png')} style={styles.photo} />
            </View>
            <View style={{ flex: 1, flexGrow: 3, alignItems: 'flex-start' }}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.description}>
                    {description}
                </Text>
            </View>
        </View>
    )
}


export const ListarCuotas = ({ id_persona }) => {

    const [cuota, setCuota] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [idPersona, setIdPersona] = useState(id_persona)

    useEffect(() => {
        listarCuotas()
        return () => {
            console.log("xdd")
        }
    }, [id_persona])

    const listarCuotas = async () => {
        try {
            const response = await buscarCuotas({id_persona:idPersona})
            setCuota([])
            setCuota(response)
            //alert("EXito")
        } catch (error) {
            setCuota([])
            //alert("Error")
            console.log(error)
        }
    }

    return (
        <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
            <Text style={styles.textInfo}>
                Cuotas registradas por el supervisor
        </Text>
            {cuota.length <= 0 && <Text style={{ marginTop: 15, color: "red" }}>NO TIENE NINGUNA CUOTA!</Text>}
            <FlatList
                style={{ flex: 1, width: '100%' }}
                data={cuota}
                keyExtractor={(item, index) => index.toString()}
                renderItem={
                    ({ item }) =>
                        <ListViewCuotas
                            title={
                                `Codigo de cuota: ${item.id_cuota}`
                            }
                            description={
                                `Inicio: ${item.cu_fecha_inicio} - Fin: ${item.cu_fecha_fin}`
                            }
                        />
                }
                refreshControl={
                    <RefreshControl
                        refreshing={isFetching}
                        onRefresh={listarCuotas}
                    />
                }
            />
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
        width: '95%',
        fontFamily: 'monospace',
        marginBottom: 5,
        marginTop: 10,
        padding: 10
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginTop: 6,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 3,
        backgroundColor: '#FFF',
        borderColor: '#74b9ff',
        elevation: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        color: '#000',
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
    },
    photo: {
        height: 50,
        width: 50,
    },
});