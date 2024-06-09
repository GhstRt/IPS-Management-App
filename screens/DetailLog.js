import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const NetworkLogDetailScreen = ({route}) => {
    const {log_id} = route.params || {};
    const [networkLog, setNetworkLog] = useState(null);

    useEffect(() => {
        fetch(`http://10.0.2.2:8000/api/get-logs/${log_id}/`)
            .then(response => response.json())
            .then(data => setNetworkLog(data))
            .catch(error => console.error('Veri alınamadı:', error));
    }, [log_id]);

    if (!networkLog) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.detailContainer}>
                <Text style={styles.label}>İstemci Adresi:</Text>
                <Text>{networkLog[0].client}</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.label}>Sunucu Adresi:</Text>
                <Text>{networkLog[0].server}</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.label}>Port Numarası:</Text>
                <Text>{networkLog[0].port}</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.label}>Protokol:</Text>
                <Text>{networkLog[0].protocol}</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.label}>TLS:</Text>
                <Text>{networkLog[0].tls ? 'Var' : 'Yok'}</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.label}>İçerik Boyutu:</Text>
                <Text>{networkLog[0].size}</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.label}>Aksiyon:</Text>
                <Text>{networkLog[0].action}</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.label}>Tarih:</Text>
                <Text>{networkLog[0].created_at}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingVertical: 20,
    },
    detailContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
});

export default NetworkLogDetailScreen;
