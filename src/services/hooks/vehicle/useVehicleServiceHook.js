import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addDays, format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import {
  logoutUser,
  setRegisterUserData,
  setUserData,
  setUserProfileData,
  setVehicleData,
  setNewVehicleData,
} from '../../../redux/actions/userActions';
import {
  fetchVehicleListService,
  deleteVehicleService,
  updateVehicleDetailsService,
  saveVehicleDetailsService,
} from '../../service';
export const useVehicleServiceHook = () => {
  const navigation = useNavigation();
  const {user, token} = useSelector(state => state.userState);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [driverName, setDriverName] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(true);
  const [loginError, setLoginError] = useState({email: '', password: ''});
  const showAlert = message => {
    setAlertMessage(message);
    setAlertVisible(true);
  };
  const closeAlert = () => {
    setAlertVisible(false);
  };
  const handleOK = () => {
    closeAlert();
  };

  const dispatch = useDispatch();

  const fetchVehicleListRequest = async () => {
    setLoading(true);
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };

    try {
      const response = await fetchVehicleListService(config);
      console.log(
        'response fetchVehicleListRequest:',
        response.data.data.vehicles,
      );
      setLoading(false);
      dispatch(setVehicleData(response.data.data.vehicles));
    } catch (error) {
      console.log('fetchVehicleListRequest:', error.response);
    }
  };

  const deleteVehicleRequest = async id => {
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };

    const params = {
      vehicle_id: id,
    };

    try {
      const response = await deleteVehicleService(params, config);
      console.log('response profile:', response.data.data.vehicles);
      dispatch(setVehicleData(response.data.data.vehicles));
    } catch (error) {
      showAlert('No Internet Connection!');
      console.log('fetchVehicleListRequest:', error.response);
    }
  };

  const vehicleDetailsEditRequest = async id => {
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    if (
      driverName.length < 3 ||
      vehicleName.length < 3 ||
      vehicleNumber.length < 3
    ) {
      return {
        result: 'failed',
        message: 'Fields Input length sould be atleast three !',
      };
    }
    const params = {
      vehicle_id: id,
      vehicle_name: vehicleName,
      vehicle_number: vehicleNumber,
      driver_name: driverName,
    };
    console.log('before updateVehicleDetailsService profile:', params);
    try {
      const response = await updateVehicleDetailsService(params, config);
      console.log(
        'after updateVehicleDetailsService profile:',
        response.data.data,
      );
      dispatch(setVehicleData(response.data.data.vehicles));
      if (response.data.status_code === 1) {
        console.log('login resounse:', response.data.data.vehicles);

        return {result: 'success'};
      } else if (response.data.status_code === 2) {
        return {result: 'failed', message: 'Somthing went wrong'};
      }
    } catch (error) {
      console.log('fetchVehicleListRequest:', error.response);
    }
  };
  const saveVehicleRequest = async () => {
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };

    const params = {
      vehicle_name: vehicleName,
      vehicle_number: vehicleNumber,
      driver_name: driverName,
    };
    console.log('before saveVehicleRequest profile:', params);
    try {
      const response = await saveVehicleDetailsService(params, config);
      console.log('after saveVehicleRequest profile:', response.data.data);
      const res = await fetchVehicleListRequest();
    } catch (error) {
      showAlert('No Internet Connection!');
      console.log('saveVehicleRequest:', error.response);
    }
  };

  return {
    loading,
    setLoading,
    email,
    setEmail,
    mobileNumber,
    setFirstName,
    firstName,
    lastName,
    setLastName,
    setMobileNumber,
    vehicleNumber,
    setVehicleNumber,
    vehicleName,
    setVehicleName,
    driverName,
    setDriverName,
    alertVisible,
    setAlertVisible,
    alertMessage,
    setAlertMessage,
    showAlert,
    closeAlert,
    handleOK,
    setLoginError,
    loginError,
    isFormValid,
    setIsFormValid,
    fetchVehicleListRequest,
    deleteVehicleRequest,
    vehicleDetailsEditRequest,
    saveVehicleRequest,
  };
};
