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
// import CustomCard from '../../components/cards/CustomCard';
import HeaderContainer from '../../../components/reusableComponents/Container/HeaderContainer';
import FooterContainer from '../../../components/reusableComponents/Container/FooterContainer';
import vehicleLogo from '../../../storage/images/car.png';
import BreakDetailsCard from '../../../components/cards/BreakDetailsCard';
import {useVehicleServiceHook} from '../../../services/hooks/vehicle/useVehicleServiceHook';
import {useSelector} from 'react-redux';
import showDeleteConfirmation from '../../../components/reusableComponents/showDeleteConfirmation';
import AddItemCard from '../../../components/cards/AddItemCard';
import {Text} from 'react-native';

const Home = ({navigation}) => {
  const {
    fetchVehicleListRequest,
    deleteVehicleRequest,
    vehicleName,
    setVehicleName,
    vehicleNumber,
    setVehicleNumber,
    driverName,
    setDriverName,
    saveVehicleRequest,
  } = useVehicleServiceHook();
  const [modalVisible, setModalVisible] = useState(false);
  const {vehicle} = useSelector(state => state.vehicleState);
  const [vehicleData, setVehicleData] = useState([]);
  // console.log('hey vehicleReducer in home :', vehicle);
  useEffect(() => {
    setVehicleData(vehicle);
  }, [vehicle]);

  useEffect(() => {
    fetchVehicleListRequest();
  }, []);

  const handleNavigation = item => {
    navigation.navigate('VehicleDetails', {
      // Pass additional parameters here as an object
      label: 'Vehicle Detalils',
      type: 'vehicle',
      details: item,
      // Add more parameters as needed
    });
  };

  const actions = {
    editShow: true,
    deleteShow: true,
  };
  const handleVehicleRequest = async () => {
    if (
      driverName.length < 3 ||
      vehicleName.length < 3 ||
      vehicleNumber.length < 3
    ) {
      Alert.alert('Fields Input length sould be atleast three !');
    } else {
      const response = await saveVehicleRequest();
      handleClose();
    }
  };
  const handleAddItem = () => {
    setModalVisible(true);
  };
  const handleClose = () => {
    setModalVisible(false);
    setVehicleName(''); // Reset the input field on modal close
    setVehicleNumber('');
    setDriverName('');
  };
  const handleDeleteItem = id => {
    showDeleteConfirmation(id, deleteVehicleRequest);
  };
  const renderCards = vehicleData => {
    return vehicleData.map((item, index) => (
      <View>
        <View key={item.id}>

          <StatusCard
            imageLink={vehicleLogo}
            textName={item.vehicle_name}
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
        label={'Your Vehicles'}
        containerStyle={styles.headContainer}
        handleNavigation={navigateScreen => {
          navigation.navigate(navigateScreen);
        }}
        handleBackNavigation={labels.handleDirectNavigation}
      />
      <AddItemCard label="Add Vehicle" handleAddItem={handleAddItem} />
      <View style={styles.cardContainer}>{renderCards(vehicleData)}</View>
      <FooterContainer containerStyle={styles.footerContainer} />
      <ModalContainer
        vehicleName={vehicleName}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setVehicleName={setVehicleName}
        vehicleNumber={vehicleNumber}
        setVehicleNumber={setVehicleNumber}
        driverName={driverName}
        setDriverName={setDriverName}
        handleVehicleRequest={handleVehicleRequest}
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
          placeholder="Enter Vehicle Name"
          value={props.vehicleName}
          onChangeText={text => props.setVehicleName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Vehicle Number"
          value={props.vehicleNumber}
          onChangeText={text => props.setVehicleNumber(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Driver Name"
          value={props.driverName}
          onChangeText={text => props.setDriverName(text)}
        />
        <View style={styles.modalButtons}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => props.handleVehicleRequest()}>
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
