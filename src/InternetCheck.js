// InternetCheck.js
import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from './Pages/NoInternet';

const InternetCheck = ({navigation, children, navigateScreen}) => {
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    const checkConnection = async () => {
      const state = await NetInfo.fetch();
      setIsConnected(state.isConnected);
    };

    checkConnection();
  }, []);

  if (isConnected === null) {
    // You can render a loading spinner or another loading indicator here
    return null;
  }

  if (!isConnected) {
    // If there is no internet connection, navigate to the NoInternet screen
    navigation.navigate('NoInternet', {navigateScreen});
    return null; // Returning null to prevent rendering the original component
  }

  // If there is an internet connection, render the children components
  return <>{children}</>;
};

export default InternetCheck;
