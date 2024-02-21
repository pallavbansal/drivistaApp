import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {socket} from '../WebSocketService';
import {setCurrentShiftData} from '../../../redux/actions/userActions';
import {
  startShiftService,
  endShiftService,
  currentShiftService,
  startEndBreakShiftService,
} from '../../service';
export const useDriverShiftServiceHook = () => {
  const {token, user} = useSelector(state => state.userState);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPasssword] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const dispatch = useDispatch();
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
  function sendShiftStartEvent(userData) {
    console.log('sendShiftStartEvent Socket:', userData);
    socket.on('connect', () => {
      console.log('Socket connected');
    });
    socket.emit('shift_start', userData);
  }
  const startShiftRequest = async () => {
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log('before startShiftRequest profile:', config);
    try {
      const response = await startShiftService(config);
      await currentShiftRequest();
      console.log('after startShiftRequest profile:', response.data.data.shift);
      if (response.data.status_code === 1) {
        sendShiftStartEvent(user);
        return {result: 'success', message: 'Navigate to next screen'};
      } else if (response.data.status_code === 2) {
        return {result: 'failed', message: response.data.message};
      }
    } catch (error) {
      console.log('saveDriverRequest:', error.response);
    }
  };

  const endShiftRequest = async () => {
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log('before endShiftRequest profile:', config);
    try {
      const response = await endShiftService(config);
      await currentShiftRequest();
      console.log('after endShiftRequest profile:', response.data.data.shift);
      if (response.data.status_code === 1) {
        // console.log('login resounse:', response.data.data.users);

        return {result: 'success', message: response.data.message};
      } else if (response.data.status_code === 2) {
        return {result: 'failed', message: response.data.message};
      }
    } catch (error) {
      console.log('saveDriverRequest:', error.response);
    }
  };

  const currentShiftRequest = async () => {
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log('before currentShiftRequest :', config);
    try {
      const response = await currentShiftService(config);
      console.log('after currentShiftRequest:', response.data.data.current);
      dispatch(setCurrentShiftData(response.data.data.current));
      if (response.data.status_code === 1) {
        return {result: 'success', message: response.data.message};
      } else if (response.data.status_code === 2) {
        dispatch(setCurrentShiftData(response.data.data));
        return {result: 'failed', message: response.data.message};
      }
    } catch (error) {
      console.log('saveDriverRequest:', error.response);
    }
  };

  const startEndBreakShiftRequest = async () => {
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };

    try {
      const response = await startEndBreakShiftService(config);
      await currentShiftRequest();
      console.log('after startEndBreakShiftRequest:', response.data.data);

      if (response.data.status_code === 1) {
        return {result: 'success', message: response.data.message};
      } else if (response.data.status_code === 2) {
        return {result: 'failed', message: response.data.message};
      }
    } catch (error) {
      console.log('saveDriverRequest:', error.response);
    }
  };

  const sendLocationToServer = async (longitude, latitude) => {
    console.log('sendLocationToServer mmm', longitude);
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
    startShiftRequest,
    showAlert,
    closeAlert,
    handleOK,
    alertVisible,
    setAlertVisible,
    alertMessage,
    setAlertMessage,
    endShiftRequest,
    currentShiftRequest,
    startEndBreakShiftRequest,
    sendLocationToServer,
  };
};
