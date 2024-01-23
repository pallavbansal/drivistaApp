import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setDriversData} from '../../../redux/actions/userActions';
import {
  fetchDriverListService,
  deleteDriverService,
  saveDriverDetailsService,
  updateDriverDetailsService,
  workHistoryDetailsService
} from '../../service';
export const useDriverServiceHook = () => {
  const {token} = useSelector(state => state.userState);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [shiftStartTime, setShiftStartTime] = useState('');
  const [shiftEndTime, setShiftEndTime] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPasssword] = useState('');

  const dispatch = useDispatch();

  const fetchDriverListRequest = async () => {
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };

    try {
      const response = await fetchDriverListService(config);
      console.log('response fetchDriverListRequest:', response.data.data.users);
      dispatch(setDriversData(response.data.data.users));
      //   if (response.data.status_code === 1) {
      //     console.log('login resounse:', response.data.data);
      //     dispatch(setUserData(response.data.data));
      //     return {result: 'success'};
      //   } else if (response.data.status_code === 2) {
      //     return {result: 'failed'};
      //   }
    } catch (error) {
      console.log('fetchVehicleListRequest:', error.response);
      // dispatch(logoutUser());
      //  return {result: 'unauthenticated.'};
      //console.log('fetchProfileRequest:', error.response);
      //  console.log(error.response);
    }
  };

  const deleteDriverRequest = async id => {
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };

    const params = {
      driver_id: id,
    };

    try {
      const response = await deleteDriverService(params, config);
      console.log('response profile:', response.data.data.vehicles);
      dispatch(setDriversData(response.data.data.users));
    } catch (error) {
      console.log('fetchVehicleListRequest:', error.response);
    }
  };

  const saveDriverRequest = async () => {
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };

    const params = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      mobile_number: mobileNumber,
    };
    console.log('before saveDriverRequest profile:', params, config);
    try {
      const response = await saveDriverDetailsService(params, config);
      console.log('after saveDriverRequest profile:', response.data.data);
      if (response.data.status_code === 1) {
        dispatch(setDriversData(response.data.data.users));
        return {result: 'success'};
      } else {
        return {result: 'failed', message: response.data.message};
      }
    } catch (error) {
      console.log('saveDriverRequest:', error.response);
    }
  };
  const driverDetailsEditRequest = async id => {
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log('before driverDetailsEditRequest profile:', firstName);
    if (
      firstName.length < 3 ||
      email.length < 3 ||
      //   password.length < 5 ||
      mobileNumber.length < 9
    ) {
      return {result: 'failed', message: 'Fields Input validation error!!'};
    }
    const params = {
      id: id,
      last_name: lastName,
      first_name: firstName,
      mobile_number: mobileNumber,
      password: password,
    };

    try {
      const response = await updateDriverDetailsService(params, config);
      console.log(
        'after driverDetailsEditRequest profile:',
        response.data.data.users,
      );
      dispatch(setDriversData(response.data.data.users));
      if (response.data.status_code === 1) {
        console.log('login resounse:', response.data.data.users);

        return {result: 'success'};
      } else if (response.data.status_code === 2) {
        return {result: 'failed', message: 'Somthing went wrong'};
      }
    } catch (error) {
      console.log('fetchVehicleListRequest:', error.response);
    }
  };

  const workHistoryDetailsRequest = async (driver_id, date) => {
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };

    const params = {
      driver_id: driver_id,
      date: date,
    };

    try {
      const response = await workHistoryDetailsService(params, config);
      console.log(
        'after workHistoryDetailsRequest :',
        response.data.data.shift_details,
      );

      if (response.data.status_code === 1) {
        console.log(
          'workHistoryDetailsRequest resounse:',
          response.data.data,
        );

        return {result: 'success', data: response.data.data};
      } else if (response.data.status_code === 2) {
        return {result: 'failed', message: 'Somthing went wrong'};
      }
    } catch (error) {
      console.log('fetchVehicleListRequest:', error.response);
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
    password,
    setPasssword,
    shiftStartTime,
    setShiftStartTime,
    shiftEndTime,
    setShiftEndTime,
    fetchDriverListRequest,
    deleteDriverRequest,
    saveDriverRequest,
    driverDetailsEditRequest,
    workHistoryDetailsRequest,
  };
};
