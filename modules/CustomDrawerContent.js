import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';


const CustomDrawerContent = (props) => {
    const {navigation} = props;
    const handleSignOut = () => {
        // Çıkış işlemleri
        navigation.closeDrawer(); // Drawer'ı kapatabilirsiniz
        navigation.navigate('Giriş'); // Login sayfasına yönlendirme
    };

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.header}>
                <Text style={styles.headerText}>IPS Management App</Text>
            </View>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Çıkış Yap"
                onPress={handleSignOut}

            />
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#f5f5f5',
        padding: 16,
        marginBottom: 16,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default CustomDrawerContent;
