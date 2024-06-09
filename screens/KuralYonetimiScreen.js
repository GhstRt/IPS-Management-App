import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import {Picker} from '@react-native-picker/picker';

const KuralYonetimiScreen = ({ navigation }) => {
    const [kurallar, setKurallar] = useState([]);
    const [selectedAction, setSelectedAction] = useState(''); // Seçilen eylemi saklar

    const fetchRules = async () => {
        try {
            const response = await fetch('http://10.0.2.2:8000/api/get-rules/');
            const data = await response.json();
            setKurallar(data);
        } catch (error) {
            console.error('Hata:', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchRules();
        }, [])
    );

    // Action türüne göre filtreleme fonksiyonu
    const filterRulesByAction = () => {
        if (!selectedAction) {
            return kurallar; // Eğer bir eylem seçilmemişse, tüm kuralları göster
        } else {
            return kurallar.filter(kural => kural.action === selectedAction);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Kurallar</Text>
            <Picker
                selectedValue={selectedAction}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedAction(itemValue)
                }>
                <Picker.Item label="Tümü" value="" />
                <Picker.Item label="Block" value="block" />
                <Picker.Item label="Alert" value="alert" />
                <Picker.Item label="Log" value="log" />
            </Picker>
            <FlatList
                data={filterRulesByAction()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.rule_name}</Text>
                        <Button title="Düzenle" onPress={() => navigation.navigate('Kural Güncelle', { rule_id: item.id })} />
                    </View>
                )}
                keyExtractor={item => item.id.toString()} // id'yi stringe çevirin
            />
            <Button title="Yeni Kural Ekle" onPress={() => navigation.navigate('Kural Oluştur')} />
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
    picker: {
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
});

export default KuralYonetimiScreen;
