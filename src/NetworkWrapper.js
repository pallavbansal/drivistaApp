// NetworkWrapper.js
import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from './Pages/NoInternet';

const NetworkWrapper = (WrappedComponent, screenNameOnNoInternet) => {
  const WithNetworkCheck = ({navigation, ...props}) => {
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
      // Navigate to the specified screen for no internet
      //  return <NoInternet navigateScreen={screenNameOnNoInternet} />;
      //   return (
      //     <NoInternet
      //       navigation={navigation}
      //       navigateScreen={screenNameOnNoInternet}
      //     />
      //   );
      navigation.navigate(navigation, screenNameOnNoInternet);
      return null; // Returning null to prevent rendering the original component
    }

    return <WrappedComponent {...props} navigation={navigation} />;
  };

  return WithNetworkCheck;
};

export default NetworkWrapper;
