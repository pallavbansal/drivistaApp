import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/Pages/Login';
import RegisterScreen from './src/Pages/Register';
import StartUpScreen from './src/Pages/StartUp';
import OwnerHomeScreen from './src/Pages/Owner/Home';
import ProfileScreen from './src/Pages/Profile';
import OtpScreen from './src/Pages/Otp';
import ForgotPasswordScreen from './src/Pages/ForgotPassword';
import OnlineDrivers from './src/Pages/Owner/OnlineDrivers';
import LocationScreen from './src/Pages/Owner/LocationScreen';
import VehicleHome from './src/Pages/Vehicle/Home';
import SubscriptionScreen from './src/Pages/Subscription/Home';
import SubscriptionDescription from './src/Pages/Subscription/SubscriptionDescription';
import EmployeeAdd from './src/Pages/Subscription/EmployeeAdd';
import PaymentDetails from './src/Pages/Subscription/PaymentDetails';
import SuccessScreen from './src/Pages/Subscription/SuccessScreen';
import ReminderScreen from './src/Pages/Subscription/ReminderScreen';
import VehicleDetails from './src/Pages/Vehicle/VehicleDetails';
import ChangePassword from './src/Pages/ChangePassword';
import {useSelector} from 'react-redux';

const App = () => {
  // Create a navigation stack
  const Stack = createNativeStackNavigator();
  const {isAuth} = useSelector(state => state.userState);
  console.log('in app:', isAuth);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>

        {isAuth ? (
          <>
            <Stack.Screen name="OwnerHomeScreen" component={OwnerHomeScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />

            <Stack.Screen name="EmployeeAdd" component={EmployeeAdd} />
            <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
            <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
            <Stack.Screen name="OnlineDrivers" component={OnlineDrivers} />
            <Stack.Screen name="LocationScreen" component={LocationScreen} />
            <Stack.Screen name="VehicleHome" component={VehicleHome} />
            <Stack.Screen name="VehicleDetails" component={VehicleDetails} />
            <Stack.Screen name="ReminderScreen" component={ReminderScreen} />
            <Stack.Screen
              name="SubscriptionScreen"
              component={SubscriptionScreen}
            />
            <Stack.Screen
              name="SubscriptionDescription"
              component={SubscriptionDescription}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="OtpScreen" component={OtpScreen} />
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen name="StartUp" component={StartUpScreen} />
          </>
        )}
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
