import React from 'react';
import { Button, View, Text} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

export const UsuarioVendedor = () =>{
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>
                Vendedor
            </Text>
            <Button
                onPress={() => navigation.goBack()}
                title="Go to notifications"
            />
        </View>
    )
}