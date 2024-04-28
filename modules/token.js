import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from "@react-navigation/native";

const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.error('AsyncStorage error:', e);
    }
};

export const storeTokenAndNavigateToMainPage = async (token) => {
    await storeData('token', token);
};
