import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as React from 'react';

export default function LoginScreen() {
    return (
        <View className="h-full w-full flex justify-around pt40 pb-10">
            <View className="flex items-center mx-4 spacey-4">
                <View className="flex items-center">
                    <Text className="text-black font-bold tracking-wider text-5xl">Giriş Yap</Text>
                </View>
                <View className='bg-black/5 p-5 rounded-3xl w-full'>
                    <TextInput placeholder='E-Mail' placeholderTextColor={'gray'}></TextInput>
                </View>
                <View className='bg-black/5 p-5 rounded-3xl w-full mb-3'>
                    <TextInput placeholder='Parola' placeholderTextColor={'gray'}></TextInput>
                </View>
                <View className='w-full'>
                    <TouchableOpacity className='w-full rounded-2xl mb-3 p-3 bg-black'>
                        <Text className='text-xl font-bold text-white text-center'>Giriş Yap</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}