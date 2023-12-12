import NetInfo from '@react-native-community/netinfo';

const checkInternetConnectivity = async () => {
  const state = await NetInfo.fetch();
  console.log("check for internet connectivity:",state.isConnected);
  return state.isConnected;
};

export default checkInternetConnectivity;
