import React, { useState, useEffect } from 'react';
import {
    Button,
    View,
    Text,
    FlatList,
    StyleSheet,
    RefreshControl
} from 'react-native';
import ListViewPersona from '../../componentes/personas/listViewPersona';

import { listarPersonas } from './../../config/apiPersona'

export const Operaciones = () => {

    const [personas, setPersonas] = useState([])
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        listar()
        return () => {
            console.log("xd")
        }
    }, [])

    const listar = async () => {
        try {
            const respose = await listarPersonas();
            setPersonas(respose)
            console.log(respose)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View
            //style={{ flex: 1, width: '100%', alignItems: 'center' }}
            style={{ width: '100%' }}
        >
            <Text style={styles.textInfo}>
                Personas registradas
            </Text>
            <FlatList
                //style={{ flex: 1, width: '100%' }}
                //style={{width:'100%'}}
                contentContainerStyle={{ paddingBottom: 120 }}
                data={personas}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                    <ListViewPersona
                        title={`${item.pe_nombre} ${item.pe_apellido_paterno} ${item.pe_apellido_materno}`}
                        description={item.pe_codigo}
                        id_persona={item.id_persona}
                    />
                }
                refreshControl={
                    <RefreshControl
                        refreshing={isFetching}
                        onRefresh={listar}
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
        width: '100%',
        fontFamily: 'monospace',
        marginBottom: 5,
        marginTop: 10,
        padding: 10
    }
});