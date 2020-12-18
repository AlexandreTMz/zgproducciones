import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text
} from "react-native";

export const ButtonPrimary = (props) => {
    const { children } = props
    return (
        <TouchableOpacity style={styles.loginBtn} {...props}>
            <Text style={styles.loginText}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    loginBtn: {
        width: "80%",
        backgroundColor: "#5e92f8",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
        marginBottom: 10
    },
    loginText: {
        color: "white",
        fontSize:15
    }
});