import React, {useEffect, useState, memo} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import {Colors} from '../../../constants/colors';
import StatusCard from '../../../components/cards/StatusCard';
import HeaderContainer from '../../../components/reusableComponents/Container/HeaderContainer';
import FooterContainer from '../../../components/reusableComponents/Container/FooterContainer';
import userLogo from '../../../storage/images/user.png';
import {useSelector} from 'react-redux';
import showDeleteConfirmation from '../../../components/reusableComponents/showDeleteConfirmation';
import AddItemCard from '../../../components/cards/AddItemCard';
import {Text} from 'react-native';
import {useDriverServiceHook} from '../../../services/hooks/driver/useDriverServiceHook';

const Home = ({navigation}) => {
  const {
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
  return (
    <View style={styles.mainContainer}>
      <HeaderContainer
        labels={labels}
        showPopUp={false}
        showBackArrow={true}
        showLabel={true}
        showBackground={true}
        label={'Your Employees'}
        containerStyle={styles.headContainer}
        handleNavigation={navigateScreen => {
          navigation.navigate(navigateScreen);
        }}
        handleBackNavigation={labels.handleDirectNavigation}
      />
      <AddItemCard label="Add Employee" handleAddItem={handleAddItem} />
      <View style={styles.cardContainer}>{renderCards(driversData)}</View>
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
        <TextInput
          style={styles.input}
          placeholder="Enter First Name"
          value={props.firstName}
          onChangeText={text => props.setFirstName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Last Number"
          value={props.lastName}
          onChangeText={text => props.setLastName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Email Id"
          value={props.email}
          onChangeText={text => props.setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={props.password}
          onChangeText={text => props.setPasssword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Mobile Number"
          value={props.mobileNumber}
          onChangeText={text => props.setMobileNumber(text)}
        />
        <View style={styles.modalButtons}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => props.handleDriverRequest()}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={props.handleClose}
            style={styles.closeButton}>
            <Text style={styles.buttonText}>Close</Text>
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
    flex: 0.2,
  },
  cardContainer: {
    flex: 0.7,
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
    backgroundColor: Colors.breakInfoContainerBg,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
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
    width: '100%',
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
});

export default Home;
