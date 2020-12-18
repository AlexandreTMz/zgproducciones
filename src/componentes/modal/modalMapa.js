import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    Modal,
    ScrollView
} from "react-native";

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export const ModalMapaVendedor = ({ mapa, modalVisible, setModalVisible }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false)
            }}
        >
            <MapView
                style={stylesMap.map}
                showsUserLocation={true}
                followUserLocation={true}
                zoomEnabled={true}
                initialRegion={{
                    latitude: parseFloat(mapa.latitude),
                    longitude: parseFloat(mapa.longitude),
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
            >
                <Marker
                    coordinate={{
                        latitude: parseFloat(mapa.latitude),
                        longitude: parseFloat(mapa.longitude)
                    }}
                    title={"Registro de venta"}
                    draggable />
            </MapView>
        </Modal>
    )
}
const stylesMap = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: '80%',
        height: '25%',
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 5,
        paddingRight: 5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        width: '80%',
        marginTop: 10,
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
