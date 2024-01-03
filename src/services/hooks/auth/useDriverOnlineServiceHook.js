import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addDays, format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import {
  logoutUser,
  setRegisterUserData,
  setUserProfileData,
} from '../../../redux/actions/userActions';
import {fetchProfileService} from '../../service';
export const useDriverOnlineServiceHook = () => {
  const navigation = useNavigation();
  const {user, token} = useSelector(state => state.userState);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const dispatch = useDispatch();

  const fetchProfileRequest = async () => {
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log('fetchProfileRequest:', token);
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
      // return {result: 'failed'};
      console.log('vvv:', error.response);
      //  console.log(error.response);
    }
  };

  return {
    loading,
    setLoading,
    email,
    setEmail,
    mobileNumber,
    setMobileNumber,
    fetchProfileRequest,
  };
};
