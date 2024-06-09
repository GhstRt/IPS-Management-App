import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Button, StyleSheet, ScrollView} from 'react-native';
import {useFocusEffect} from "@react-navigation/native";

const KullaniciYonetimiScreen = ({navigation}) => {
    const [kullanicilar, setKullanicilar] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://10.0.2.2:8000/api/get-users/');
            const data = await response.json();
            setKullanicilar(data);
        } catch (error) {
            console.error('Hata:', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchUsers();
        }, [])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Kullanıcılar</Text>
            <FlatList
                data={kullanicilar}
                renderItem={({item}) => (
                    <View style={styles.item}>
                        <Text>{item.name_surname}</Text>
                        <Button title="Düzenle"
                                onPress={() => navigation.navigate('Kullanıcı Güncelle', {user_id: item.id})}/>
                    </View>
                )}
                keyExtractor={item => item.id}
            />
            <Button title="Yeni Kullanıcı Ekle" onPress={() => navigation.navigate('Kullanıcı Oluştur')}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
        textAlign: 'center',
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default KullaniciYonetimiScreen;
