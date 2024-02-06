import React, {useEffect, useState, memo} from 'react';
import {View, StyleSheet, TouchableOpacity, Modal, Image} from 'react-native';
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
import Alert from '../../../components/reusableComponents/Alert';

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
    alertVisible,
    setAlertVisible,
    alertMessage,
    setAlertMessage,
    showAlert,
    closeAlert,
    handleOK,
    loginError,
    isFormValid,
    setIsFormValid,
    setLoginError,
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

  const checkFormValidity = () => {
    const isFirstNameValid = firstName.length >= 3;
    const isLastNameValid = lastName.length >= 3;
    const isMobileNumberValid = mobileNumber.length >= 10;
    const isPasswordValid = password.length > 5; // Ensure password length is greater than 6
    const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailValidationRegex.test(email);

    const errorCheck = {
      fullName:
        !isFirstNameValid && firstName !== ''
          ? 'First Name length should be atleast 3'
          : '',
      lastName:
        !isLastNameValid && lastName !== ''
          ? 'Last Name length should be atleast 3'
          : '',
      email:
        !isEmailValid && email !== '' ? 'Email should contain @ and .com' : '',
      mobileNumber:
        !isMobileNumberValid && mobileNumber !== ''
          ? 'Mobile Number should be atleast 10 letters'
          : '',
      password:
        !isPasswordValid && password !== ''
          ? 'Password should be of atleast length six '
          : '',
    };
    const isValid =
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isMobileNumberValid &&
      isPasswordValid;
    setLoginError({
      ...loginError,
      firstName: errorCheck.firstName,
      lastName: errorCheck.lastName,
      email: errorCheck.email,
      mobileNumber: errorCheck.mobileNumber,
      password: errorCheck.password,
    });

    setIsFormValid(!isValid);
  };

  useEffect(() => {
    checkFormValidity(); // Check validity on input change
  }, [firstName, lastName, mobileNumber, password, email]);

  const actions = {
    editShow: true,
    deleteShow: true,
  };
  const handleDriverRequest = async () => {
    setLoading(true);
    const response = await saveDriverRequest();

    if (response.result === 'failed') {
      // showAlert(response.message);
      setLoading(false);
    } else {
      //  showAlert('Success');
      setLoading(false);
      handleClose();
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
    setPasssword('');
    setMobileNumber('');
  };
  const handleDeleteItem = async id => {
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

      {driversData.length > 0 && !loading ? (
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
        loginError={loginError}
        isFormValid={isFormValid}
      />
      <Alert
        visible={alertVisible}
        message={alertMessage}
        onClose={closeAlert}
        onOK={handleOK}
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
          errorText={
            props.firstName.length > 0 ? props.loginError.firstName : ''
          }
          placeholder={'Enter First Name'}
          onChangeText={text => {
            props.setFirstName(text);
          }}
        />

        <CustomTextInput
          logoName={userLogo}
          errorText={props.lastName.length > 0 ? props.loginError.lastName : ''}
          placeholder={'Enter Last Name'}
          onChangeText={text => props.setLastName(text)}
        />
        <CustomTextInput
          logoName={emailLogo}
          errorText={props.email.length > 0 ? props.loginError.email : ''}
          placeholder={'Enter Email '}
          onChangeText={text => {
            props.setEmail(text);
          }}
        />
        <CustomTextInput
          logoName={lockLogo}
          errorText={props.password.length > 0 ? props.loginError.password : ''}
          placeholder={'Enter Password'}
          onChangeText={text => props.setPasssword(text)}
        />
        <CustomTextInput
          logoName={phoneLogo}
          errorText={
            props.mobileNumber.length > 0 ? props.loginError.mobileNumber : ''
          }
          keyboardType="numeric"
          type="number"
          placeholder={'Enter Mobile '}
          onChangeText={text => {
            props.setMobileNumber(text);
          }}
        />
        <Space />
        <View style={styles.modalButtons}>
          <TouchableOpacity
            onPress={() => props.handleDriverRequest()}
            style={[styles.saveButton, props.isFormValid && {opacity: 0.8}]}
            disabled={props.isFormValid}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
));

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
    marginTop: 20,
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
