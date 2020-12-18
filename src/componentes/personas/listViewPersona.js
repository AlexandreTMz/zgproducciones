import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

//Modals
import TabsCuota from '../tabcuota/tabsCuota';
import EditarPersonaModal from '../personas/editarPersona';
import EditarUsuarioModal from '../usuario/editarUsuario';

const ListViewPersona = ({ title, description, id_persona }) => {

    const [modalVisibleTab, setModalVisibleTab] = useState(false);
    const [modalVisibleEdPer, setModalVisibleEdPer] = useState(false);
    const [modalVisibleEdUser, setModalVisibleEdUser] = useState(false);

    const abrirModalCuotas = () => {
        if (modalVisibleTab) {
            return (
                <TabsCuota id_persona={id_persona} modalVisible={modalVisibleTab} setModalVisible={setModalVisibleTab} />
            )
        }
    }

    const abrirModalEditarPersona = () => {
        if (modalVisibleEdPer) {
            return (
                <EditarPersonaModal id_persona={id_persona} modalVisible={modalVisibleEdPer} setModalVisible={setModalVisibleEdPer} />
            )
        }
    }

    const abrirModalEditarUsuario = () => {
        if (modalVisibleEdUser) {
            return (
                <EditarUsuarioModal id_persona={id_persona} modalVisible={modalVisibleEdUser} setModalVisible={setModalVisibleEdUser} />
            )
        }
    }

    //<TabViewExample modalVisible={modalVisible} setModalVisible={setModalVisible} />

    return (
        <View style={styles.container}>
            {
                abrirModalCuotas()
            }
            {
                abrirModalEditarPersona()
            }
            {
                abrirModalEditarUsuario()
            }
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
            <View style={{ flex: 1, flexGrow: 2, marginRight: 'auto' }}>
                <TouchableOpacity
                    style={[styles.btnSuccess, { flex: 1, flexDirection: 'row' }]}
                    onPress={() => {
                        setModalVisibleTab(true)
                    }}
                >
                    <Icon name="bar-chart" size={20} color="#fff" style={{ marginRight: 5 }} />
                    <Text style={styles.btnText}>
                        Cuota
                </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnPrimary, { flex: 1, flexDirection: 'row' }]}
                    onPress={() => {
                        setModalVisibleEdUser(true)
                    }}
                >
                    <Icon name="user" size={20} color="#fff" style={{ marginRight: 5 }} />
                    <Text style={styles.btnText}>
                        Usuario
                </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btnOrange, { flex: 1, flexDirection: 'row' }]}
                    onPress={() => {
                        setModalVisibleEdPer(true)
                    }}
                >
                    <Icon name="pencil" size={20} color="#fff" style={{ marginRight: 5 }} />
                    <Text style={styles.btnText}>
                        Editar
                </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
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
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
    },
    photo: {
        height: 50,
        width: 50,
    },
    btnSuccess: {
        backgroundColor: '#2ecc71',
        marginTop: 2,
        marginBottom: 2,
        width: 100,
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderColor: '#27ae60',
        borderWidth: 2
    },
    btnPrimary: {
        backgroundColor: '#3498db',
        marginTop: 2,
        marginBottom: 2,
        width: 100,
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderColor: '#2980b9',
        borderWidth: 2
    },
    btnOrange: {
        backgroundColor: '#f1c40f',
        marginTop: 2,
        marginBottom: 2,
        width: 100,
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderColor: '#f39c12',
        borderWidth: 2
    },
    btnText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

export default ListViewPersona;