import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addDays, format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import {
  logoutUser,
  setRegisterUserData,
  setUserData,
  setUserProfileData,
} from '../../../redux/actions/userActions';
import {fetchProfileService, updateUserProfileService} from '../../service';
export const useDriverOnlineServiceHook = () => {
  const navigation = useNavigation();
  const {user, token} = useSelector(state => state.userState);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const dispatch = useDispatch();

  const fetchProfileRequest = async () => {
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log('fetchProfileRequest token:', token);
    try {
      const response = await fetchProfileService(config);
      console.log('response profile:', response.data.data);
      dispatch(setUserProfileData(response.data.data));
      //   if (response.data.status_code === 1) {
      //     console.log('login resounse:', response.data.data);
      //     dispatch(setUserData(response.data.data));
      //     return {result: 'success'};
      //   } else if (response.data.status_code === 2) {
      //     return {result: 'failed'};
      //   }
    } catch (error) {
      console.log('fetchProfileRequest:', error.response);
      dispatch(logoutUser());
      //  return {result: 'unauthenticated.'};
      //console.log('fetchProfileRequest:', error.response);
      //  console.log(error.response);
    }
  };

  const updateUserProfileRequest = async () => {
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    if (firstName.length < 4 || lastName.length < 4) {
      return {
        result: 'failed',
        message: 'First Name and last Name length is too small!',
      };
    }
    if (mobileNumber.length < 10) {
      return {result: 'failed', message: 'Mobile Number should be atleast 10!'};
    }
    const params = {
      first_name: firstName,
      last_name: lastName,
      mobile_number: mobileNumber,
    };
    console.log('fetchProfileRequest:', params);
    try {
      const response = await updateUserProfileService(params, config);
      console.log('response updateUserProfileRequest:', response.data.data);

      if (response.data.status_code === 1) {
        dispatch(setUserProfileData(response.data.data));
        return {result: 'success'};
      } else if (response.data.status_code === 2) {
        return {result: 'failed'};
      }
    } catch (error) {
       dispatch(logoutUser());

      // return {result: 'unauthenticated.'};
      console.log('updateUserProfileRequest:', error.response);
      //  console.log(error.response);
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
    fetchProfileRequest,
    updateUserProfileRequest,
  };
};
