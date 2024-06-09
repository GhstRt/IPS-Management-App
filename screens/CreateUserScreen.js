import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, ScrollView} from 'react-native';

const CreateRuleScreen = ({navigation}) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [nameSurname, setNameSurname] = useState('');

    const handleSave = () => {
        fetch(`http://10.0.2.2:8000/api/add-user/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userName,
                password: password,
                email: email,
                name_surname: nameSurname,
            }),
        })
            .then(response => response.json())
            .then(data => {
                navigation.navigate('Kullanıcı Yönetimi'); // Kural listesi sayfasına yönlendirme
            })
            .catch(error => {
                console.error('Hata:', error);
            });
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.label}>Kullanıcı Adı:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setUserName}
                    value={userName}
                    placeholder="Kullanıcı adı giriniz"
                />
                <Text style={styles.label}>Parola:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Parola giriniz"
                />
                <Text style={styles.label}>E-Mail:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="E-Mail giriniz"
                />
                <Text style={styles.label}>Ad Soyad:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNameSurname}
                    value={navigation}
                    placeholder="Ad Soyad giriniz"
                />
            </ScrollView>
            <Button title="Kaydet" onPress={handleSave}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
});

export default CreateRuleScreen;
