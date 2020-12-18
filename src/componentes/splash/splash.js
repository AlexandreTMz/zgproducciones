import * as React from 'react';
import {
    Button,
    View,
    StyleSheet,
    Text,
    ActivityIndicator
} from 'react-native';

class SplashScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textStyles}>
                    Cargando...
                </Text>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    }
}
export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        backgroundColor: 'orange'
    },
    textStyles: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold'
    }
});

