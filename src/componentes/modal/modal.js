import React, { useEffect, useState } from 'react';
import {
    View,
    TouchableOpacity,
    TextInput,
    Text,
    StyleSheet,
    ActivityIndicator,
    Alert,
    Modal,
    TouchableHighlight
} from "react-native";

export const ModalCustom = ({ modalVisible, setModalVisible }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                        El usuario ingresado es incorrecto o su cuenta esta deshabilitada!
                    </Text>
                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <Text style={styles.textStyle}>
                            Volver a ingresar
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width:'80%',
        height:'25%',
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingTop:25,
        paddingBottom:25,
        paddingLeft:5,
        paddingRight:5,
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
        width:'80%',
        marginTop:10,
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
