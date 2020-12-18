const TOKEN = {}
import AsyncStorage from '@react-native-async-storage/async-storage';

TOKEN.storeToken = async (user) => {
    try {
        await AsyncStorage.setItem("userData", JSON.stringify(user));
    } catch (error) {
        console.log("Something went wrong", error);
    }
}

TOKEN.getData = async () => {
    const jsonValue = await AsyncStorage.getItem('userData')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
}

TOKEN.removeAllData = async () => {
    const keys = await AsyncStorage.getAllKeys()
    await AsyncStorage.multiRemove(keys)
}

TOKEN.setToken = async (usuario) => {
    try {
        await AsyncStorage.setItem("userData", JSON.stringify(usuario));
    } catch (error) {
        console.log("Something went wrong", error);
    }
}

TOKEN.token = async () => {
    const jsonValue = await AsyncStorage.getItem('userData')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
}

module.exports = TOKEN