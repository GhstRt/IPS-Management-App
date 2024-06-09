import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import {useFocusEffect} from "@react-navigation/native";

const DashboardScreen = ({navigation}) => {
    const [deviceStatus, setDeviceStatus] = useState({"status": {"code": 1, "message": "Proxy Kapalı"}});
    const [logs, setLogs] = useState([]);

    const fetchDatas = async () => {
        try {
            fetch('http://10.0.2.2:8000/api/get-status/')
                .then(response => response.json())
                .then(data => setDeviceStatus(data))
                .catch(error => console.error('Cihaz durumu alınamadı:', error));

            fetch('http://10.0.2.2:8000/api/get-logs/')
                .then(response => response.json())
                .then(data => setLogs(data.slice(-6, -1))) // Son 5 olayı al
                .catch(error => console.error('Olaylar alınamadı:', error));
        } catch (error) {
            console.error('Hata:', error);
        }
    }

    useEffect(() => {
        fetchDatas();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchDatas();
        }, [])
    );

    const renderLogItem = ({item}) => (
        <View style={[styles.logItem, {backgroundColor: getLogItemColor(item.action)}]}>
            <TouchableOpacity onPress={() => navigation.navigate('Log Detay', {log_id: item.id})} style={styles.item}>
                <Text style={styles.logText}>{`${item.client} -> ${item.server}`}</Text>
            </TouchableOpacity>
        </View>
    );

    const getLogItemColor = (action) => {
        switch (action) {
            case 'block':
                return 'red';
            case 'alert':
                return 'orange';
            default:
                return 'blue';
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Cihaz Durumu</Text>
                <Text style={styles.deviceInfo}>Proxy Durumu: {deviceStatus.status.message || 'Bilgi yok'}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Son 5 Olay</Text>
                <FlatList
                    data={logs}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderLogItem}
                />
            </View>

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
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    deviceInfo: {
        fontSize: 16,
        marginBottom: 8,
        color: 'green'
    },
    logItem: {
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 8,
        borderRadius: 8,
    },
    logText: {
        fontSize: 16,
        color: 'white',
    },
});

export default DashboardScreen;
