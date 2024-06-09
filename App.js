import * as React from 'react';
import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import OlayIzlemeScreen from './screens/OlayIzlemeScreen';
import KuralYonetimiScreen from './screens/KuralYonetimiScreen';
import KullaniciYonetimiScreen from './screens/KullaniciYonetimiScreen';
import SistemAyarlariScreen from './screens/SistemAyarlariScreen';
import CreateRuleScreen from './screens/CreateRuleScreen';
import UpdateRuleScreen from "./screens/UpdateRuleScreen";
import UpdateUserScreen from "./screens/UpdateUserScreen";
import CreateUserScreen from "./screens/CreateUserScreen";
import DetailLog from "./screens/DetailLog";
import CustomDrawerContent from "./modules/CustomDrawerContent"; // Optional

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Root() {
    return (
        <Drawer.Navigator initialRouteName="Giriş" drawerContent={(props) => <CustomDrawerContent {...props} navigation={props.navigation} />}>
            <Drawer.Screen name="Ana Sayfa" component={DashboardScreen}/>
            <Drawer.Screen name="Olay İzleme" component={OlayIzlemeScreen}/>
            <Drawer.Screen name="Kural Yönetimi" component={KuralYonetimiScreen}/>
            <Drawer.Screen name="Kullanıcı Yönetimi" component={KullaniciYonetimiScreen}/>
            <Drawer.Screen name="Sistem Ayarları" component={SistemAyarlariScreen}/>
        </Drawer.Navigator>
    );
}

const App = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Giriş" component={LoginScreen} options={{headerShown: false}}/>
                <Stack.Screen
                    name="drawer"
                    component={Root}
                    headerShown={false}
                    options={{headerMode: 'none', headerShown: false}}
                />
                <Stack.Screen name="Kural Oluştur" component={CreateRuleScreen}/>
                <Stack.Screen name="Kural Güncelle" component={UpdateRuleScreen}/>
                <Stack.Screen name="Kullanıcı Güncelle" component={UpdateUserScreen}/>
                <Stack.Screen name="Kullanıcı Oluştur" component={CreateUserScreen}/>
                <Stack.Screen name="Log Detay" component={DetailLog}/>
            </Stack.Navigator>

        </NavigationContainer>
    );


}

export default App;
