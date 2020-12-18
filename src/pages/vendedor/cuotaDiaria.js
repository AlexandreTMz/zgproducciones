import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    PermissionsAndroid,
    Dimensions,
    TextInput,
    Image
} from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import Geolocation from '@react-native-community/geolocation';

import { StyleMapCustom } from './customMapStyle'
//
import { getData } from './../../config/token'
import { obtenerCuotaDiaria, registrarCuotaDiaria } from './../../config/apiCuotaDiaria'

export const CuotaDiaria = () => {

    const [locationStatus, setLocationStatus] = useState('');

    let { width, height } = Dimensions.get('window')
    const ASPECT_RATIO = width / height
    const LATITUDE_DELTA = 0.01 //Very high zoom level
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
    const [isActive, setIsActive] = useState(true)
    let watchID;
    const mapRef = useRef(null);
    const timeChange = 10000

    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    });

    const [planes, setPlanes] = useState({
        npre: {
            usuario: 0,
            cantidad: 0
        },
        npost: {
            usuario: 0,
            cantidad: 0
        },
        ppre: {
            usuario: 0,
            cantidad: 0
        },
        ppost: {
            usuario: 0,
            cantidad: 0
        }
    })

    const [dataUser, setDataUser] = useState({})

    useEffect(() => {
        async function fetchData(id_persona) {
            try {
                const response = await obtenerCuotaDiaria({ id_persona: id_persona });
                //console.log(response)
                let objectData = {}
                response.map((e) => {
                    switch (parseInt(e.id_tpPlan)) {
                        case 1:
                            //setPlanes({...planes, npre:e})
                            objectData.npre = e
                            objectData.npre.usuario = 0
                            break;
                        case 2:
                            //setPlanes({...planes, npost:e})
                            objectData.npost = e
                            objectData.npost.usuario = 0
                            break;
                        case 3:
                            //setPlanes({...planes, ppre:e})
                            objectData.ppre = e
                            objectData.ppre.usuario = 0
                            break;
                        case 4:
                            //setPlanes({...planes, ppost:e})
                            objectData.ppost = e
                            objectData.ppost.usuario = 0
                            break;
                    }
                })
                setPlanes({ ...planes, ...objectData })
                setIsActive(false)
            } catch (e) {
                console.log(e)
                alert("Usted no tiene cuotas habilitadas!")
                setIsActive(true)
            }
        }
        const getDataUser = async () => {
            try {
                const data = await getData();
                if (data) {
                    ///console.log(data)
                    setDataUser({ ...dataUser, ...data })
                    fetchData(data.id_persona);
                    //setPersona({ ...persona, pe_nombre : data.pe_nombre })
                }
            } catch (e) {
                console.log(e)
            }
        }
        getDataUser();

        const requestLocationPermission = async () => {
            if (Platform.OS === 'ios') {
                getOneTimeLocation();
                subscribeLocationLocation();
            } else {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Access Required',
                            message: 'This App needs to Access your location',
                        },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        subscribeLocationLocation();
                    } else {
                        setLocationStatus('Permission Denied');
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
        };
        requestLocationPermission();
        console.log("Se repite!")

        return () => {
            Geolocation.clearWatch(watchID);
            isMounted = false
        };
    }, []);

    const subscribeLocationLocation = () => {
        watchID = Geolocation.watchPosition(
            (position) => {
                //Will give you the location on location change
                setLocationStatus('You are Here');

                //getting the Longitude from the location json
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);

                setRegion({
                    ...region,
                    latitude: parseFloat(currentLatitude),
                    longitude: parseFloat(currentLongitude)
                });

                if (mapRef !== null) {
                    //console.log("El mapa no es nulo")
                    mapRef.current.animateToRegion({
                        ...region,
                        latitude: parseFloat(currentLatitude),
                        longitude: parseFloat(currentLongitude)
                    }, 100);
                }
                console.log("Suscriber Latitude Geo: " + currentLatitude)
                console.log("Suscriber Longitude Geo: " + currentLongitude)
                console.log("Suscriber Latitude State: " + region.latitude)
                console.log("Suscriber Longitude State: " + region.longitude)
            },
            (error) => {
                setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false,
                showLocationDialog: true,
                forceRequestLocation: true,
                timeout: timeChange,
                maximumAge: 10000
            },
        );
    };

    const enviarDatos = async () => {
        try {
            const response = await registrarCuotaDiaria({ dataUser, planes, region })
            const data = await getData();
            const getOther = await fetchData(data.id_persona)
            alert("Registro correcto!")
            //console.log(getOther)
            //console.log("Se envio...")
            //console.log({ dataUser, planes, region })
        } catch (e) {
            //alert("Hubo un error en el registro!")
            console.log(e)
        }
    }


    async function fetchData(id_persona) {
        try {
            const response = await obtenerCuotaDiaria({ id_persona: id_persona });
            //console.log(response)
            let objectData = {}
            response.map((e) => {
                switch (parseInt(e.id_tpPlan)) {
                    case 1:
                        //setPlanes({...planes, npre:e})
                        objectData.npre = e
                        objectData.npre.usuario = 0
                        break;
                    case 2:
                        //setPlanes({...planes, npost:e})
                        objectData.npost = e
                        objectData.npost.usuario = 0
                        break;
                    case 3:
                        //setPlanes({...planes, ppre:e})
                        objectData.ppre = e
                        objectData.ppre.usuario = 0
                        break;
                    case 4:
                        //setPlanes({...planes, ppost:e})
                        objectData.ppost = e
                        objectData.ppost.usuario = 0
                        break;
                }
            })
            setPlanes({ ...planes, ...objectData })
            setIsActive(false)
        } catch (e) {
            console.log(e)
            //alert("Usted no tiene cuotas habilitadas!")
            setIsActive(true)
        }
    }

    return (
        <View style={styles.contenedor}>
            <ScrollView style={{ width: '100%', paddingTop: 10 }}>
                <View style={[StyleSheet.absoluteFillObject, { height: 250 }]}>
                    <MapView
                        style={stylesMap.map}
                        //customMapStyle={StyleMapCustom()}
                        showsUserLocation={false}
                        followUserLocation={false}
                        zoomEnabled={true}
                        ref={mapRef}
                    >
                        <Marker
                            coordinate={region}
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
                                    Jose Gonzales
                                </Text>
                            </View>
                        </Marker>
                    </MapView>
                </View>
                <View style={{ marginTop: 270 }}>
                    <View style={styles.formRow}>
                        <View style={styles.column}>
                            <View style={[styles.formRow2, { marginRight: 15 }]}>
                                <View style={styles.fieldSet}>
                                    <Text style={styles.legend}>
                                        Latitud
                                </Text>
                                    <TextInput
                                        editable={false}
                                        selectTextOnFocus={false}
                                        value={region.latitude.toString().substring(0, 11)}
                                        style={styles.inputView}
                                    />
                                </View>
                            </View>
                            <View style={styles.formRow2}>
                                <View style={styles.fieldSet}>
                                    <Text style={styles.legend}>
                                        Longitud
                                    </Text>
                                    <TextInput
                                        editable={false}
                                        selectTextOnFocus={false}
                                        value={region.longitude.toString().substring(0, 11)}
                                        style={styles.inputView}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.formRow}>
                        <View style={styles.fieldSet}>
                            <Text style={styles.legend}>
                                Nueva linea prepago : {planes?.npre.cantidad}
                            </Text>
                            <TextInput
                                keyboardType={
                                    "numeric"
                                }
                                style={styles.inputView}
                                value={planes?.npre.usuario.toString()}
                                onChangeText={
                                    text => {
                                        let num = parseInt(text) <= planes?.npre.cantidad ? text : '';
                                        setPlanes({
                                            ...planes,
                                            npre: {
                                                ...planes.npre,
                                                usuario: num
                                            }
                                        })

                                    }
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.formRow}>
                        <View style={styles.fieldSet}>
                            <Text style={styles.legend}>
                                Nueva linea post pago : {planes?.npost?.cantidad}
                            </Text>
                            <TextInput
                                keyboardType={
                                    "numeric"
                                }
                                style={styles.inputView}
                                value={planes?.npost.usuario.toString()}
                                onChangeText={
                                    text => {
                                        let num = parseInt(text) <= planes?.npost.cantidad ? text : '';
                                        setPlanes({
                                            ...planes,
                                            npost: {
                                                ...planes.npost,
                                                usuario: num
                                            }
                                        })
                                    }
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.formRow}>
                        <View style={styles.fieldSet}>
                            <Text style={styles.legend}>
                                Portabilidad prepago : {planes?.ppre.cantidad}
                            </Text>
                            <TextInput
                                keyboardType={
                                    "numeric"
                                }
                                style={styles.inputView}
                                value={planes?.ppre.usuario.toString()}
                                onChangeText={
                                    text => {
                                        let num = parseInt(text) <= planes.ppre.cantidad ? text : '';
                                        setPlanes({
                                            ...planes,
                                            ppre: {
                                                ...planes.ppre,
                                                usuario: num
                                            }
                                        })
                                    }
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.formRow}>
                        <View style={styles.fieldSet}>
                            <Text style={styles.legend}>
                                Portabilidad post pago : {planes?.ppost.cantidad}
                            </Text>
                            <TextInput
                                keyboardType={
                                    "numeric"
                                }
                                style={styles.inputView}
                                value={planes?.ppost.usuario.toString()}
                                onChangeText={
                                    text => {
                                        let num = parseInt(text) <= planes?.ppost.cantidad ? text : '';
                                        setPlanes({
                                            ...planes,
                                            ppost: {
                                                ...planes.ppost,
                                                usuario: num
                                            }
                                        })
                                    }
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.formRow}>
                        <TouchableOpacity
                            style={styleButton.buttonSuccess}
                            onPress={
                                () => {
                                    enviarDatos()
                                    //alert("ESTOY HABILITADO")
                                }
                            }
                            disabled={isActive}
                        >
                            <Text style={styleButton.textSuccess}>
                                Registrar
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const stylesMapEs = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

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