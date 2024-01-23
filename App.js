import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/Pages/Login';
import RegisterScreen from './src/Pages/Register';
import StartUpScreen from './src/Pages/StartUp';
import OwnerHomeScreen from './src/Pages/Owners/Owner/Home';
import ProfileScreen from './src/Pages/Profile';
import OtpScreen from './src/Pages/Otp';
import ForgotPasswordScreen from './src/Pages/ForgotPassword';
import OnlineDrivers from './src/Pages/Owners/Owner/OnlineDrivers';
import LocationScreen from './src/Pages/Owners/Owner/LocationScreen';
import VehicleHome from './src/Pages/Owners/Vehicle/Home';
import DriverHome from './src/Pages/Owners/Driver/Home';
import SubscriptionScreen from './src/Pages/Owners/Subscription/Home';
import SubscriptionDescription from './src/Pages/Owners/Subscription/SubscriptionDescription';
import EmployeeAdd from './src/Pages/Owners/Subscription/EmployeeAdd';
import PaymentDetails from './src/Pages/Owners/Subscription/PaymentDetails';
import SuccessScreen from './src/Pages/Owners/Subscription/SuccessScreen';
import ReminderScreen from './src/Pages/Owners/Subscription/ReminderScreen';
import VehicleDetails from './src/Pages/Owners/Vehicle/VehicleDetails';
import DriverDetails from './src/Pages/Owners/Driver/DriverDetails';
import CalenderScreen from './src/Pages/Owners/Driver/Calender';
import ChangePassword from './src/Pages/ChangePassword';

import {useSelector} from 'react-redux';
import StartShift from './src/Pages/Drivers/StartShift';
import ActionShift from './src/Pages/Drivers/ActionShift';
import BreakShift from './src/Pages/Drivers/BreakShift';
import WorkHistoryDetails from './src/Pages/Owners/Driver/WorkHistoryDetails';

const App = () => {
  // Create a navigation stack
  const {current} = useSelector(state => state.shiftState);
  const {isAuth, user} = useSelector(state => state.userState);
  console.log('in app js:', current);
  const Stack = createNativeStackNavigator();
  let initialScreen;

  if (user.role === '2' && isAuth && current) {
    initialScreen =
      current.current_status === 'started' ? 'ActionShift' : 'StartShift';
  } else if (user.role === '1' && isAuth) {
    initialScreen = 'OwnerHomeScreen';
  }

  console.log('in app:', isAuth);
  const currentStatus = current ? current.current_status : null;
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialScreen}
        screenOptions={{
          headerShown: false,
        }}>
        {isAuth && user.role === '2' ? (
          <>
            {currentStatus === 'started' ? (
              <>
                <Stack.Screen name="ActionShift" component={ActionShift} />
              </>
            ) : currentStatus === 'break' ? (
              <>
                <Stack.Screen name="BreakShift" component={BreakShift} />
              </>
            ) : (
              <>
                <Stack.Screen name="StartShift" component={StartShift} />
              </>
            )}
          </>
        ) : isAuth && user.role === '1' ? (
          <>
            <Stack.Screen name="OwnerHomeScreen" component={OwnerHomeScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />

            <Stack.Screen name="EmployeeAdd" component={EmployeeAdd} />
            <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
            <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
            <Stack.Screen name="OnlineDrivers" component={OnlineDrivers} />
            <Stack.Screen name="LocationScreen" component={LocationScreen} />
            <Stack.Screen name="VehicleHome" component={VehicleHome} />
            <Stack.Screen name="DriverHome" component={DriverHome} />
            <Stack.Screen name="VehicleDetails" component={VehicleDetails} />
            <Stack.Screen name="CalenderScreen" component={CalenderScreen} />

            <Stack.Screen
              name="WorkHistoryDetails"
              component={WorkHistoryDetails}
            />
            <Stack.Screen name="DriverDetails" component={DriverDetails} />
            <Stack.Screen name="ReminderScreen" component={ReminderScreen} />

            <Stack.Screen name="StartShift" component={StartShift} />
            <Stack.Screen name="BreakShift" component={BreakShift} />
            <Stack.Screen name="ActionShift" component={ActionShift} />
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
            <Stack.Screen name="StartUp" component={StartUpScreen} />

            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="OtpScreen" component={OtpScreen} />
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
            />
          </>
        )}

        <Stack.Screen name="ChangePassword" component={ChangePassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
