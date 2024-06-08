import 'react-native-gesture-handler';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { messaging } from './firebaseConfig';  // Importando a configuração do Firebase

import HomeScreen from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import EditProductScreen from './screens/EditProductScreen';
import NotificationsScreen from './screens/NotificationsScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function ProductsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductsScreen" component={ProductsScreen} options={{ title: 'Produtos' }} />
      <Stack.Screen name="EditProductScreen" component={EditProductScreen} options={{ title: 'Editar Produto' }} />
    </Stack.Navigator>
  );
}

export default function App() {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Products" component={ProductsStack} options={{ title: 'Produtos' }} />
        {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
