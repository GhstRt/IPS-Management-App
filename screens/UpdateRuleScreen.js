import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const CreateRuleScreen = ({route, navigation}) => {
    const {rule_id} = route.params || {};
    const [ruleName, setRuleName] = useState('');
    const [ruleType, setRuleType] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [pattern, setPattern] = useState('');
    const [threshold, setThreshold] = useState(0);
    const [action, setAction] = useState('');
    const [showPortInput, setShowPortInput] = useState(false);
    const [showProtoInput, setShowProtoInput] = useState(false);
    const [showThreshInput, setShowThreshInput] = useState(false);

    const handleDelete = () => {
        fetch(`http://10.0.2.2:8000/api/delete-rule/${rule_id}/`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                navigation.navigate('Kural Yönetimi'); // Kural listesi sayfasına yönlendirme
            })
            .catch(error => {
                console.error('Hata:', error);
            });
    };

    const handleSave = () => {
        fetch(`http://10.0.2.2:8000/api/update-rule/${rule_id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rule_name: ruleName,
                rule_type: ruleType,
                description: description,
                address: address,
                pattern: pattern,
                threshold: threshold,
                action: action,
            }),
        })
            .then(response => response.json())
            .then(data => {
                navigation.navigate('Kural Yönetimi'); // Kural listesi sayfasına yönlendirme
            })
            .catch(error => {
                console.error('Hata:', error);
            });
    };

    useEffect(() => {
        if (rule_id) {
            fetch(`http://10.0.2.2:8000/api/get-rules/${rule_id}/`)
                .then(response => response.json())
                .then(data => {
                    setRuleName(data[0].rule_name);
                    setRuleType(data[0].rule_type);
                    setDescription(data[0].description);
                    setAddress(data[0].address);
                    setPattern(data[0].pattern);
                    setThreshold(data[0].threshold.toString()); // threshold sayısal bir değer olduğundan, stringe çevirdik
                    setAction(data[0].action);
                })

                .catch(error => {
                    console.error('Hata:', error);
                });
        }
    }, [rule_id]);


    const handleRuleTypeChange = (itemValue, itemIndex) => {
        setRuleType(itemValue);
        if (itemValue === 'port') {
            setShowPortInput(true);
        } else {
            setShowPortInput(false);
            setPattern(''); // Pattern input gizlendiğinde pattern değerini sıfırla
        }

        if (itemValue === 'proto') {
            setShowProtoInput(true);
        } else {
            setShowProtoInput(false);
            setPattern(''); // Pattern input gizlendiğinde pattern değerini sıfırla
        }

        if (itemValue === 'size') {
            setShowThreshInput(true);
        } else {
            setShowThreshInput(false);
            setThreshold(0); // Pattern input gizlendiğinde pattern değerini sıfırla
        }
    };


    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.label}>Kural Adı:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setRuleName}
                    value={ruleName}
                    placeholder="Kural adı giriniz"
                />
                <Text style={styles.label}>Kural Türü:</Text>
                <Picker
                    selectedValue={ruleType}
                    style={styles.input}
                    onValueChange={handleRuleTypeChange}
                >
                    <Picker.Item label="TLS-based Detection" value="tls"/>
                    <Picker.Item label="Size-based Detection" value="size"/>
                    <Picker.Item label="Protocol-based Detection" value="proto"/>
                    <Picker.Item label="Address-based Detection" value="address"/>
                    <Picker.Item label="Port-based Detection" value="port"/>
                </Picker>
                <Text style={styles.label}>Açıklama:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setDescription}
                    value={description}
                    placeholder="Açıklama Giriniz"
                />
                <Text style={styles.label}>Adres:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setAddress}
                    value={address}
                    placeholder="Adres Giriniz"
                />
                {showPortInput && (
                    <>
                        <Text style={styles.label}>Port:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setPattern}
                            value={pattern}
                            placeholder="Port giriniz"
                        />
                    </>
                )}
                {showProtoInput && (
                    <>
                        <Text style={styles.label}>Protokol:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setPattern}
                            value={pattern}
                            placeholder="Protokol giriniz"
                        />
                    </>
                )}
                {showThreshInput && (
                    <>
                        <Text style={styles.label}>Eşik Değer:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setThreshold}
                            value={threshold}
                            placeholder="Eşik Değeri Giriniz"
                        />
                    </>
                )}
                <Text style={styles.label}>Aksiyon:</Text>
                <Picker
                    selectedValue={action}
                    style={styles.input}
                    onValueChange={(itemValue, itemIndex) => setAction(itemValue)}
                >
                    <Picker.Item label="Block" value="block"/>
                    <Picker.Item label="Alert" value="alert"/>
                    <Picker.Item label="Log" value="log"/>
                </Picker>
            </ScrollView>
            <Button title="Sil" onPress={handleDelete} color="red"/>
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
