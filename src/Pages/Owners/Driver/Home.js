import React, {useEffect, useState, memo} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
} from 'react-native';
import {Colors} from '../../../constants/colors';
import StatusCard from '../../../components/cards/StatusCard';
import HeaderContainer from '../../../components/reusableComponents/Container/HeaderContainer';
import FooterContainer from '../../../components/reusableComponents/Container/FooterContainer';
import userLogo from '../../../storage/images/user.png';
import emailLogo from '../../../storage/images/email.png';
import phoneLogo from '../../../storage/images/phone.png';
import lockLogo from '../../../storage/images/lock.png';
import notfound from '../../../storage/images/notfound.jpg';
import cancelImage from '../../../storage/images/cancel.png';
import {useSelector} from 'react-redux';
import showDeleteConfirmation from '../../../components/reusableComponents/showDeleteConfirmation';
import AddItemCard from '../../../components/cards/AddItemCard';
import {Text} from 'react-native';
import {useDriverServiceHook} from '../../../services/hooks/driver/useDriverServiceHook';
import Space from '../../../components/reusableComponents/Space';
import CustomTextInput from '../../../components/reusableComponents/CustomTextInput';
import {globalStyles} from '../../../constants/globalStyles';
import {useAuthServiceHook} from '../../../services/hooks/auth/useAuthServiceHook';
import {navigationPopUpList} from '../../../constants/navigation';
import NotFound from '../../../components/reusableComponents/NotFound';
import Spinner from '../../../components/reusableComponents/Spinner';

const Home = ({navigation}) => {
  const {
    loading,
    setLoading,
    fetchDriverListRequest,
    deleteDriverRequest,
    saveDriverRequest,
    email,
    setEmail,
    mobileNumber,
    setFirstName,
    firstName,
    lastName,
    setLastName,
    setMobileNumber,
    password,
    setPasssword,
  } = useDriverServiceHook();
  const {logoutRequest} = useAuthServiceHook();
  const [modalVisible, setModalVisible] = useState(false);
  const {drivers} = useSelector(state => state.driverState);
  const [driversData, setDriversData] = useState([]);
  // console.log('hey vehicleReducer in home :', vehicle);
  useEffect(() => {
    setDriversData(drivers);
  }, [drivers]);

  useEffect(() => {
    fetchDriverListRequest();
  }, []);

  const handleNavigation = item => {
    navigation.navigate('DriverDetails', {
      // Pass additional parameters here as an object
      label: 'Driver Detalils',
      type: 'driver',
      details: item,
      // Add more parameters as needed
    });
  };

  const actions = {
    editShow: true,
    deleteShow: true,
  };
  const handleDriverRequest = async () => {
    if (
      firstName.length < 3 ||
      lastName.length < 3 ||
      email.length < 3 ||
      password < 6 ||
      mobileNumber.length < 10
    ) {
      Alert.alert('Fields Input length sould be atleast three !');
    } else {
      const response = await saveDriverRequest();
      if (response.result === 'failed') {
        Alert.alert(response.message);
      } else {
        handleClose();
      }
    }
  };
  const handleAddItem = () => {
    setModalVisible(true);
  };
  const handleClose = () => {
    setModalVisible(false);
    setFirstName(''); // Reset the input field on modal close
    setLastName('');
    setEmail('');
  };
  const handleDeleteItem = id => {
    showDeleteConfirmation(id, deleteDriverRequest);
  };
  const renderCards = vehicleData => {
    return driversData.map((item, index) => (
      <View>
        <View key={item.id}>
          <StatusCard
            imageLink={userLogo}
            textName={item.first_name}
            {...actions}
            {...item}
            handleDeleteItem={id => handleDeleteItem(id)}
            handleNavigation={id => handleNavigation(item)}
          />
          {/* onPress={() => handleNavigation(index)} */}
        </View>
      </View>
    ));
  };
  const labels = {
    navigateBackScreen: '',
    handleDirectNavigation: screenName => navigation.pop(),
  };
  const handlePopUpNavigation = navigateScreen => {
    if (navigateScreen === 'logout') {
      logoutRequest();
    } else {
      navigation.navigate(navigateScreen);
    }
  };
  const renderSpinner = () => {
    if (loading) {
      return <Spinner />;
    }
    return null;
  };
  return (
    <View style={styles.mainContainer}>
      {renderSpinner()}
      <HeaderContainer
        labels={labels}
        showPopUp={true}
        showBackArrow={true}
        showLabel={true}
        showBackground={true}
        label={'Your Employees'}
        containerStyle={styles.headContainer}
        handleNavigation={handlePopUpNavigation}
        handleBackNavigation={labels.handleDirectNavigation}
        navigationPopUpList={navigationPopUpList}
      />
      <AddItemCard label="Add Employee" handleAddItem={handleAddItem} />

      {driversData.length > 0 ? (
        <View style={styles.cardContainer}>{renderCards(driversData)}</View>
      ) : !loading ? (
        <NotFound />
      ) : (
        ''
      )}

      <FooterContainer containerStyle={styles.footerContainer} />
      <ModalContainer
        firstName={firstName}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPasssword={setPasssword}
        mobileNumber={mobileNumber}
        setMobileNumber={setMobileNumber}
        handleDriverRequest={handleDriverRequest}
        handleClose={handleClose}
      />
    </View>
  );
};
const ModalContainer = memo(props => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={props.modalVisible}
    onRequestClose={() => {
      props.setModalVisible(false);
    }}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <TouchableOpacity
          style={styles.cancelSection}
          onPress={() => props.setModalVisible(false)}>
          <Image source={cancelImage} style={[globalStyles.logoImage]} />
        </TouchableOpacity>
        <CustomTextInput
          logoName={userLogo}
          // errorText={'props.loginError.fullName'}
          placeholder={'Enter First Name'}
          onChangeText={text => {
            props.setFirstName(text);
          }}
        />

        <CustomTextInput
          logoName={userLogo}
          // errorText={'props.loginError.fullName'}
          placeholder={'Enter Last Name'}
          onChangeText={text => props.setLastName(text)}
        />
        <CustomTextInput
          logoName={emailLogo}
          // errorText={'props.loginError.fullName'}
          placeholder={'Enter Email '}
          onChangeText={text => {
            props.setEmail(text);
          }}
        />
        <CustomTextInput
          logoName={phoneLogo}
          // errorText={'props.loginError.fullName'}
          placeholder={'Enter Password'}
          onChangeText={text => props.setPasssword(text)}
        />
        <CustomTextInput
          logoName={lockLogo}
          // errorText={'props.loginError.fullName'}
          placeholder={'Enter Mobile '}
          onChangeText={text => {
            props.setMobileNumber(text);
          }}
        />
        <Space />
        <View style={styles.modalButtons}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => props.handleDriverRequest()}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
));

// const ModalContainer = memo(props => (
//   <Modal
//     animationType="slide"
//     transparent={true}
//     visible={props.modalVisible}
//     onRequestClose={() => {
//       props.setModalVisible(false);
//     }}>
//     <View style={styles.modalContainer}>
//       <View style={styles.modalContent}>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter First Name"
//           value={props.firstName}
//           onChangeText={text => props.setFirstName(text)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Last Number"
//           value={props.lastName}
//           onChangeText={text => props.setLastName(text)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Email Id"
//           value={props.email}
//           onChangeText={text => props.setEmail(text)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Password"
//           value={props.password}
//           onChangeText={text => props.setPasssword(text)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Mobile Number"
//           value={props.mobileNumber}
//           onChangeText={text => props.setMobileNumber(text)}
//         />
//         <View style={styles.modalButtons}>
//           <TouchableOpacity
//             style={styles.saveButton}
//             onPress={() => props.handleDriverRequest()}>
//             <Text style={styles.buttonText}>Save</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={props.handleClose}
//             style={styles.closeButton}>
//             <Text style={styles.buttonText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   </Modal>
// ));

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.containerBg,
  },
  headContainer: {
    flex: 0.1,
  },
  cardContainer: {
    flex: 0.9,
  },
  statusCardContainer: {
    height: 200,
  },
  footerContainer: {
    flex: 0.2,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginHorizontal: 10,
  },
  modalContent: {
    backgroundColor: '#Fbfbf9',
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    //alignItems: 'center',

    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 5,
    width: 250,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelSection: {
    alignItems: 'flex-end',
  },
});

export default Home;
