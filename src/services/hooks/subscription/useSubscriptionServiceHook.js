import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addDays, format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import {
  setSubscriptionUserData,
  updateCancelledSubscriptionData,
} from '../../../redux/actions/userActions';
import {
  fetchSubscriptionDataService,
  checkoutSessionService,
  cancelSubscriptionService,
} from '../../service';
export const useSubscriptionServiceHook = () => {
  const navigation = useNavigation();
  const {user, token} = useSelector(state => state.userState);
  const [loading, setLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
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
  const fetchSubscriptionDataRequest = async () => {
    setLoading(true);
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log('response config:', config);
    try {
      const response = await fetchSubscriptionDataService(config);
      if (response.data.status_code === 1) {
        dispatch(setSubscriptionUserData(response.data.data.subscription));
        console.log(
          'response fetchSubscriptionDataRequest1:',
          response.data.data.subscription,
        );
      } else if (response.data.status_code === 2) {
        console.log('response fetchSubscriptionDataRequest:', response.data);
      }

      setLoading(false);
    } catch (error) {
      console.log('fetchSubscriptionDataRequest:', error.response);
    }
  };

  const cancelSubscription = async () => {
    setLoading(true);
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log('response config:', config);
    try {
      const response = await cancelSubscriptionService(config);
      if (response.data.status_code === 1) {
       // await fetchSubscriptionDataRequest();
        dispatch(updateCancelledSubscriptionData());
        return true;
      } else if (response.data.status_code === 2) {
        console.log('response fetchSubscriptionDataRequest:', response.data);
        return false;
      }

      setLoading(false);
    } catch (error) {
      console.log('fetchSubscriptionDataRequest:', error.response);
    }
  };
  const createCheckoutSession = async () => {
    setLoading(true);
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log('response config:', config);
    setLoading(false);

    try {
      const response = await checkoutSessionService(config);
      console.log('createCheckoutSession:', response.data.session.url);
      return response.data.session.url;
    } catch (error) {
      console.log('fetchSubscriptionDataRequest:', error.response);
    }
  };
  const createOrder = async () => {
    setLoading(true);
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log('response config:', config);
    setLoading(false);
    try {
      const response = {
        data: {
          paymentIntent: 'paymentIntent',
        },
      };
      return response;
    } catch (error) {
      console.log('fetchSubscriptionDataRequest:', error.response);
    }
  };

  return {
    loading,
    setLoading,
    fetchSubscriptionDataRequest,
    createCheckoutSession,
    createOrder,
    cancelSubscription,
  };
};
