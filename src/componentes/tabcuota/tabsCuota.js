import React, { useEffect, useState } from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';
import { AgregarCuota } from './agregarCuota'
import { ListarCuotas } from './listaCuotas'

import {
    View,
    StyleSheet,
    Alert,
    Modal,
    Dimensions
} from "react-native";

const agregarCuotaComponent = (id_persona) => (
    <View style={[styles.scene, { backgroundColor: '#ecf0f1' }]}>
        <AgregarCuota id_persona={id_persona} />
    </View>
);

const listarCuotasComponent = (id_persona) => (
    <View style={[styles.scene, { backgroundColor: '#ecf0f1' }]}>
        <ListarCuotas id_persona={id_persona} />
    </View>
);

const initialLayout = { width: Dimensions.get('window').width };

export default function TabsCuota({ modalVisible, setModalVisible, id_persona }) {

    const [index, setIndex] = React.useState(0);

    const [routes] = React.useState([
        {
            key: 'first',
            title: 'Añadir cuota'
        },
        {
            key: 'second',
            title: 'Lista de cuotas'
        },
    ]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return agregarCuotaComponent(id_persona);
            case 'second':
                return listarCuotasComponent(id_persona);
            default:
                return null;
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false)
            }}
        >
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
            />
        </Modal>
    );
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});