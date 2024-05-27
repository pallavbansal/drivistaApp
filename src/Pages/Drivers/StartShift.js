// /* eslint-disable react/no-unstable-nested-components */
// /* eslint-disable prettier/prettier */
// import React, {memo} from 'react';
// import {
//   View,
//   StyleSheet,
//   Text,
//   ImageBackground,
//   Image,
//   TouchableOpacity,
//   Alert as RNAlert,
// } from 'react-native';
// import BackgroundContainer from '../../components/reusableComponents/Container/BackgroundContainer';
// import HeaderContainer from '../../components/reusableComponents/Container/HeaderContainer';
// import {globalStyles} from '../../constants/globalStyles';
// import shiftbg from '../../storage/images/shiftbg.png';
// import themeLogo from '../../storage/images/theme.png';
// import journey from '../../storage/images/journey.png';
// import {useDriverShiftServiceHook} from '../../services/hooks/shift/useDriverShiftServiceHook';
// import {useAuthServiceHook} from '../../services/hooks/auth/useAuthServiceHook';
// import {startBackgroundLocationService} from '../../services/hooks/BackgroundLocationService.js';
// import Spinner from '../../components/reusableComponents/Spinner';
// import Alert from '../../components/reusableComponents/Alert';
// import {useSelector} from 'react-redux';

// const StartShift = ({navigation}) => {
//   const {
//     loading,
//     setLoading,
//     showAlert,
//     closeAlert,
//     handleOK,
//     alertVisible,
//     alertMessage,
//     startShiftRequest,
//   } = useDriverShiftServiceHook();
//   const {token} = useSelector(state => state.userState);
//   const {logoutRequest} = useAuthServiceHook();

//   const labels = {
//     label: 'Please click on the start button to start your shift',
//     navigateScreen: 'ActionShift',
//     navigateBackNavigation: navigation => navigation.pop(),
//     handleNavigation: async screenName => {
//       RNAlert.alert(
//         'Location Permission Required',
//         'To get real-time vehicle location, you need to grant location permission. Do you want to proceed?',
//         [
//           {
//             text: 'Cancel',
//             onPress: () => console.log('Permission denied'),
//           },
//           {
//             text: 'OK',
//             onPress: async () => {
//               setLoading(true);
//               const response = await startShiftRequest();
//               setLoading(false);
//               try {
//                 if (response.result === 'success') {
//                   console.log('response bb:', response);
//                   navigation.navigate(screenName);
//                 } else if (response.result === 'failed') {
//                   showAlert(response.message);
//                 } else {
//                   navigation.navigate(screenName);
//                 }
//               } catch (error) {
//                 console.error('StartShift error:', error);
//               }
//             },
//           },
//         ],
//         {cancelable: false},
//       );
//     },
//     // handleNavigation: async screenName => {
//     //   setLoading(true);
//     //   console.log('testing------------');
//     //   const response = await startShiftRequest();
//     //   setLoading(false);
//     //   try {
//     //     if (response.result === 'success') {
//     //       console.log('response bb:', response);
//     //       navigation.navigate(screenName);
//     //     } else if (response.result === 'failed') {
//     //       showAlert(response.message);
//     //     } else {
//     //       navigation.navigate(screenName);
//     //     }
//     //   } catch (error) {
//     //     console.error('StartShift error:', error);
//     //   }
//     // },
//   };

//   const navigationPopUpList = [
//     {
//       label: 'logout',
//       navigateScreen: 'logout',
//     },
//   ];

//   const startBackgroundService = async () => {
//     await startBackgroundLocationService(token);
//     // setIsServiceRunning(true);
//   };
//   const renderSpinner = () => {
//     if (loading) {
//       return <Spinner />;
//     }
//     return null;
//   };

//   return (
//     <BackgroundContainer source={themeLogo}>
//       {renderSpinner()}
//       <HeaderContainer
//         labels={labels}
//         showPopUp={true}
//         showBackArrow={false}
//         containerStyle={styles.headContainer}
//         navigationPopUpList={navigationPopUpList}
//         handleBackNavigation={() => labels.navigateBackNavigation(navigation)}
//         modalStyle={{height: 40, marginTop: 20}}
//         handleNavigation={navigateScreen => {
//           if (navigateScreen === 'logout') {
//             logoutRequest();
//           }
//           console.log('handleNavigation bb:', navigateScreen);
//         }}
//       />

//       <CardContainer labels={labels} />
//       <Alert
//         visible={alertVisible}
//         message={alertMessage}
//         onClose={closeAlert}
//         onOK={handleOK}
//       />
//     </BackgroundContainer>
//   );
// };
// const CardContainer = props => (
//   <View style={styles.mainContainer}>
//     <View style={styles.headingLabel}>
//       <Text style={[styles.text, {fontSize: 22}]}>{props.labels.label}</Text>
//     </View>
//     <TouchableOpacity
//       onPress={() => {
//         props.labels.handleNavigation(props.labels.navigateScreen);
//       }}
//       style={styles.cardContainer}>
//       <ImageBackground source={shiftbg} style={styles.imageBackground}>
//         <View style={styles.logoSection}>
//           <Image
//             source={journey}
//             style={[globalStyles.logoImage, {width: 80, height: 80}]}
//           />
//         </View>
//       </ImageBackground>
//     </TouchableOpacity>
//   </View>
// );
// const styles = StyleSheet.create({
//   headContainer: {
//     flex: 0.1,
//   },
//   mainContainer: {
//     flex: 0.9,
//     alignItems: 'center',
//     marginHorizontal: 5,
//   },
//   headingLabel: {
//     flex: 0.5,
//     color: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 5,
//   },
//   cardContainer: {
//     flex: 0.5,
//     width: '70%',
//     justifyContent: 'flex-start',
//     marginTop: -40,
//   },
//   imageBackground: {
//     flex: 0.5,
//     resizeMode: 'cover',
//   },
//   text: {
//     color: 'white',
//     fontSize: 25,
//     textAlign: 'center',
//   },
//   logoSection: {
//     flex: 1,
//     justifyContent: 'center',
//     marginLeft: -30,
//   },
// });

// export default memo(StartShift);

/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import BackgroundContainer from '../../components/reusableComponents/Container/BackgroundContainer';
import HeaderContainer from '../../components/reusableComponents/Container/HeaderContainer';
import {globalStyles} from '../../constants/globalStyles';
import shiftbg from '../../storage/images/shiftbg.png';
import themeLogo from '../../storage/images/theme.png';
import journey from '../../storage/images/journey.png';
import {useDriverShiftServiceHook} from '../../services/hooks/shift/useDriverShiftServiceHook';
import {useAuthServiceHook} from '../../services/hooks/auth/useAuthServiceHook';
import {startBackgroundLocationService} from '../../services/hooks/BackgroundLocationService.js';
import Spinner from '../../components/reusableComponents/Spinner';
import Alert from '../../components/reusableComponents/Alert';
import {useSelector} from 'react-redux';

const StartShift = ({navigation}) => {
  const {
    loading,
    setLoading,
    showAlert,
    closeAlert,
    handleOK,
    alertVisible,
    alertMessage,
    startShiftRequest,
  } = useDriverShiftServiceHook();
  const {token} = useSelector(state => state.userState);
  const {logoutRequest} = useAuthServiceHook();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const labels = {
    label: 'Please click on the start button to start your shift',
    navigateScreen: 'ActionShift',
    navigateBackNavigation: navigation => navigation.pop(),
  };

  const navigationPopUpList = [
    {
      label: 'logout',
      navigateScreen: 'logout',
    },
  ];

  const startBackgroundService = async () => {
    await startBackgroundLocationService(token);
  };

  const renderSpinner = () => {
    if (loading) {
      return <Spinner />;
    }
    return null;
  };

  const handleStartShift = () => {
    setIsModalVisible(true);
  };

  const handleStartShiftRequest = async () => {
    setIsModalVisible(false);
    setLoading(true);
    const response = await startShiftRequest();
    setLoading(false);
    try {
      if (response.result === 'success') {
        console.log('response bb:', response);
        navigation.navigate(labels.navigateScreen);
      } else if (response.result === 'failed') {
        showAlert(response.message);
      } else {
        navigation.navigate(labels.navigateScreen);
      }
    } catch (error) {
      console.error('StartShift error:', error);
    }
  };

  return (
    <BackgroundContainer source={themeLogo}>
      {renderSpinner()}
      <HeaderContainer
        labels={labels}
        showPopUp={true}
        showBackArrow={false}
        containerStyle={styles.headContainer}
        navigationPopUpList={navigationPopUpList}
        handleBackNavigation={() => labels.navigateBackNavigation(navigation)}
        modalStyle={{height: 40, marginTop: 20}}
        handleNavigation={navigateScreen => {
          if (navigateScreen === 'logout') {
            logoutRequest();
          }
          console.log('handleNavigation bb:', navigateScreen);
        }}
      />

      <CardContainer labels={labels} handleStartShift={handleStartShift} />
      <Alert
        visible={alertVisible}
        message={alertMessage}
        onClose={closeAlert}
        onOK={handleOK}
      />
      <PermissionModal
        isVisible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        onGrantPermission={handleStartShiftRequest}
        onDenyPermission={() => setIsModalVisible(false)}
      />
    </BackgroundContainer>
  );
};

const CardContainer = ({labels, handleStartShift}) => (
  <View style={styles.mainContainer}>
    <View style={styles.headingLabel}>
      <Text style={[styles.text, {fontSize: 22}]}>{labels.label}</Text>
    </View>
    <TouchableOpacity onPress={handleStartShift} style={styles.cardContainer}>
      <ImageBackground source={shiftbg} style={styles.imageBackground}>
        <View style={styles.logoSection}>
          <Image
            source={journey}
            style={[globalStyles.logoImage, {width: 80, height: 80}]}
          />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  </View>
);

const PermissionModal = ({
  isVisible,
  onRequestClose,
  onGrantPermission,
  onDenyPermission,
}) => (
  <Modal
    visible={isVisible}
    transparent
    animationType="fade"
    onRequestClose={onRequestClose}>
    <TouchableWithoutFeedback onPress={onRequestClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Location Permission Required</Text>
          <Text style={styles.modalMessage}>
            To get real-time vehicle location, you need to grant location
            permission. Do you want to proceed?
          </Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onDenyPermission}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.okButton]}
              onPress={onGrantPermission}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

const styles = StyleSheet.create({
  headContainer: {
    flex: 0.1,
  },
  mainContainer: {
    flex: 0.9,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  headingLabel: {
    flex: 0.5,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cardContainer: {
    flex: 0.5,
    width: '70%',
    justifyContent: 'flex-start',
    marginTop: -40,
  },
  imageBackground: {
    flex: 0.5,
    resizeMode: 'cover',
  },
  text: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  },
  logoSection: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: -30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '85%',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: 'lightgray',
    width: 100,
    alignItems: 'center',
  },
  okButton: {
    backgroundColor: 'green',
    width: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default memo(StartShift);
