import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { loginUser } from '../modules/login';
import { storeTokenAndNavigateToMainPage } from '../modules/token';
import {useState} from "react";

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const response = await loginUser(username, password);
        //console.log(response.data.data.token)
        if (response.data.data.token) {
            await storeTokenAndNavigateToMainPage(response.data.data.token);
            navigation.navigate('drawer');
        } else {
            console.log(response.data)
        }
    };

    return (
        <View className="h-full w-full flex justify-around pt40 pb-10">
            <View className="flex items-center mx-4 spacey-4">
                <View className="flex items-center">
                    <Text className="text-black font-bold tracking-wider text-5xl">Giriş Yap</Text>
                </View>
                <View className='bg-black/5 p-5 rounded-3xl w-full'>
                    <TextInput
                        placeholder='Kullanıcı Adı'
                        placeholderTextColor={'gray'}
                        onChangeText={setUsername}
                        value={username}
                    />
                </View>
                <View className='bg-black/5 p-5 rounded-3xl w-full mb-3 space-y-3'>
                    <TextInput
                        placeholder='Parola'
                        placeholderTextColor={'gray'}
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={true}
                    />
                </View>
                <View className='w-full'>
                    <TouchableOpacity
                        className='w-full rounded-2xl mb-3 p-3 bg-black'
                        onPress={handleLogin}
                    >
                        <Text className='text-xl font-bold text-white text-center'>Giriş Yap</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default LoginScreen;
