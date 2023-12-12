import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/Pages/Login';
import RegisterScreen from './src/Pages/Register';
import StartUpScreen from './src/Pages/StartUp';
import OwnerHomeScreen from './src/Pages/Owner/Home';
import ProfileScreen from './src/Pages/Profile';
const App = () => {
  // Create a navigation stack
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>

        <Stack.Screen name="StartUp" component={StartUpScreen} />
         <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
         <Stack.Screen name="LoginScreen" component={LoginScreen} />
         <Stack.Screen name="OwnerHomeScreen" component={OwnerHomeScreen} />
         <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
