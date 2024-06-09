import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useFocusEffect} from "@react-navigation/native";

const OlayIzlemeScreen = ({navigation}) => {
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [servers, setServers] = useState([]);
    const [selectedServer, setSelectedServer] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            fetchLogs();
        }, [])
    );

    const fetchLogs = async () => {
        try {
            const response = await fetch('http://10.0.2.2:8000/api/get-logs/');
            const data = await response.json();
            setLogs(data);

            // Sunucu adlarını al
            const uniqueServers = [...new Set(data.map(log => log.server))];
            setServers(uniqueServers);

            // Tüm logları başlangıçta göster
            setFilteredLogs(data);
        } catch (error) {
            console.error('Hata:', error);
        }
    };

    const filterLogsByServer = (server) => {
        setSelectedServer(server);
        if (!server) {
            setFilteredLogs(logs);
        } else {
            const filtered = logs.filter(log => log.server === server);
            setFilteredLogs(filtered);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Olaylar</Text>
            <Picker
                selectedValue={selectedServer}
                onValueChange={(itemValue, itemIndex) => filterLogsByServer(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Tüm Sunucular" value=""/>
                {servers.map(server => (
                    <Picker.Item key={server} label={server} value={server}/>
                ))}
            </Picker>
            <FlatList
                data={filteredLogs}
                renderItem={({item}) => (
                    <View style={styles.item}>
                        <Text>{`${item.client} -> ${item.server}`}</Text>
                        <Button title="Detay" onPress={() => navigation.navigate('Log Detay', {log_id: item.id})}/>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />
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
    picker: {
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});

export default OlayIzlemeScreen;
