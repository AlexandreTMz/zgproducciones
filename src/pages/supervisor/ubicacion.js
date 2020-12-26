import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    PermissionsAndroid,
    Dimensions,
    TextInput,
    Image,
    Button
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { listarPersonas } from './../../config/apiPersona'
import { buscarCuotaDiariaUbicacion } from './../../config/apiCuotaDiaria'

export const Ubicacion = () => {

    const [selectPersona, setSelectPersona] = useState({})
    const [cuotas, setCuotas] = useState([])
    const [personas, setPersonas] = useState([])
    const mapRef = useRef(null);

    let { width, height } = Dimensions.get('window')
    const ASPECT_RATIO = width / height
    const LATITUDE_DELTA = 0.09 //Very high zoom level
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0321
    });

    useEffect(() => {
        listaDePersonas()
        console.log("Cuotas! markers")
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

    const ultimas3Ubicaciones = async (id_persona) => {
        try {
            const response = await buscarCuotaDiariaUbicacion({
                id_persona: id_persona
            });

            response.map((e, i) => {
                if (i == 0) {
                    mapRef.current.animateToRegion({
                        ...region,
                        longitude: parseFloat(e.cd_longitud),
                        latitude: parseFloat(e.cd_latitud)
                    }, 100);
                }
            })
            setCuotas(response)
            //console.log(response)
        } catch (e) {
            setCuotas([])
            console.log(e)
            alert("No se encontraron resultados!!")
        }
    }

    const renderMarkers = () => {
        let markers = [];
        markers = cuotas.map(e => (<Marker
            key={e.cd_global}
            coordinate={{
                longitude: parseFloat(e.cd_longitud),
                latitude: parseFloat(e.cd_latitud)
            }}
        />)
        );
        return markers
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    ref={mapRef}
                >
                    {/*renderMarkers()*/}

                    {cuotas.map((e) => (
                        <Marker
                            key={e.cd_global}
                            coordinate={{
                                longitude: parseFloat(e.cd_longitud),
                                latitude: parseFloat(e.cd_latitud)
                            }}
                            description={"Tu localizacion"}
                        >
                            <View style={{ backgroundColor: 'orange', flex: 1, flexDirection: 'row', alignItems: 'center', borderRadius: 20 }}>
                                <Image source={require('./../../imagenes/markerp.png')}
                                    style={{ width: 20, height: 20, marginRight: 5, marginLeft: 5 }}
                                    resizeMode="contain"
                                />
                                <Text
                                    style={{
                                        fontSize: 9,
                                        color: '#ffffff',
                                        fontWeight: 'bold',
                                        textDecorationLine: 'underline',
                                        paddingRight: 10,
                                        paddingLeft: 2,
                                        paddingTop: 10,
                                        paddingBottom: 10
                                    }}
                                >
                                    {e.tp_nombre}
                                </Text>
                            </View>
                        </Marker>
                    ))}

                </MapView>
                <View
                    style={{
                        backgroundColor: '#f6f6f6',
                        position: 'absolute',//use absolute position to show button on top of the map
                        top: 0, //for center align
                        alignSelf: 'center', //for align to right
                        borderWidth: 1,
                        borderColor: '#73c5ff',
                        borderRadius: 4,
                        width: '70%',
                        margin: 10
                    }}
                >
                    <Picker
                        selectedValue={selectPersona?.value}
                        style={{ height: 40, width: '100%', borderColor: 'black' }}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectPersona({ ...selectPersona, value: itemValue, label: itemIndex })
                            ultimas3Ubicaciones(itemValue)
                        }}
                    >
                        {personas.map((i, index) => (
                            <Picker.Item key={index} label={i.label} value={i.value} />
                        ))}
                    </Picker>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        position: 'absolute',
        bottom: 50
    }
});