import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addDays, format} from 'date-fns';

import {useNavigation} from '@react-navigation/native';
import {
  logoutUser,
  resetSubscriptionUserData,
  setRegisterUserData,
  setUserData,
} from '../../../redux/actions/userActions';
import {
  loginService,
  registerService,
  registerVerifyService,
  forgotPasswordService,
  forgetPassVerifyService,
  changePasswordService,
  changeProfilePasswordService,
} from '../../service';
import io from 'socket.io-client';
import {Alert} from 'react-native';
import {stopBackgroundSocketService} from '../BackgroundSocketService';
export const useAuthServiceHook = () => {
  const navigation = useNavigation();
  const socket = io('https://drivista.onrender.com');
  const {user, token} = useSelector(state => state.userState);
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isTrialChecked, setIsTrialChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [loginError, setLoginError] = useState({email: '', password: ''});
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [checked, setChecked] = useState(true);
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
  const validateEmailAndPassword = (email, password) => {
    return email && password.length > 5;
  };

  function convertCamelToSnake(obj) {
    if (!obj || typeof obj !== 'object') {
      return obj;
    }

    const snakeObj = {};
    for (const [key, value] of Object.entries(obj)) {
      const snakeKey = key.replace(
        /[A-Z]/g,
        letter => `_${letter.toLowerCase()}`,
      );
      snakeObj[snakeKey] =
        value !== null && typeof value === 'object'
          ? convertCamelToSnake(value)
          : value;
    }
    return snakeObj;
  }

  const validateRegister = (email, password) => {
    console.log('validation ', email, ' ', password);
    return email && password.length > 5;
  };

  const handleLoginVerification = () => {
    if (validateEmailAndPassword(email, password)) {
      return {email, password};
    }
    return false;
  };

  const handleRegistrationVerification = () => {
    if (validateRegister(fullName, lastName, email, mobileNumber, password)) {
      return {fullName, lastName, email, mobileNumber, password};
    }
    return false;
  };

  const loginRequest = async () => {
    const validation = handleLoginVerification();
    if (!validation) {
      return {result: 'verfication_failed'};
    }

    try {
      const response = await loginService(validation);
      console.log('vvv login:', response);
      if (response.data.status_code === 1) {
        console.log('login resounse:', response.data.data);
        dispatch(setUserData(response.data.data));
        return {result: 'success', role: response.data.data.user.role};
      } else if (response.data.status_code === 2) {
        return {result: 'failed'};
      }
    } catch (error) {
      // console.log('vvv:', error.message);
      //  Alert.alert('No internet connection!');
      // if (error.message === 'No internet connection') {
      //   console.log('internet connection issue:');
      // }
      //   return {result: 'failed'};
      //  console.log('vvv:', error.response);
      //  console.log(error.response);
    }
  };
  const registrationRequest = async () => {
    if (fullName.length < 5) {
      return {result: 'failed', message: 'First Name  is too small'};
    }
    if (mobileNumber.length < 10) {
      return {result: 'failed', message: 'mobile Number is incorrect'};
    }
    if (email.length < 5) {
      return {result: 'failed', message: 'email is incorrect'};
    }
    if (password !== confirmPassword) {
      return {result: 'failed', message: 'password match is incorrect'};
    }

    const params = {
      first_name: fullName,
      last_name: lastName,
      email: email,
      mobile_number: mobileNumber,
      password: password,
    };
    console.log('before sending register:', params);
    // const params = convertCamelToSnake(validation);

    try {
      const response = await registerService(params);
      console.log('otp register:', response.data);
      if (response.data.status_code === 1) {
        return {result: 'success', id: response.data.data.id};
      } else if (response.data.status_code === 2) {
        return {result: 'failed', message: response.data.message};
      }
    } catch (error) {
      // console.log('vvv:', error.response);
      //return {result: 'failed'};
      //   console.log('vvv:', error.response);
      //  console.log(error.response);
    }
  };
  const otpVerifyRequest = async id => {
    if (isNaN(parseInt(otp.join(''), 10))) {
      return {
        result: 'failed',
        message: 'Please enter a valid OTP with  4 digits!',
      };
    }

    const params = {
      id: id,
      otp: parseInt(otp.join(''), 10),
    };
    console.log('verify otp before:', params);
    try {
      const response = await registerVerifyService(params);
      console.log('verify otp here:', response.data);
      if (response.data.status_code === 1) {
        dispatch(setUserData(response.data.data));
        return {result: 'success'};
      } else {
        return {result: 'failed', message: 'Envalid Otp!'};
      }
    } catch (error) {
      return {result: 'failed', message: 'Something went wrong!'};
      console.log('vvv:', error.response);
      //  console.log(error.response);
    }
  };

  const forgotPasswordRequest = async () => {
    if (email.length < 5) {
      return {result: 'failed', message: 'Enter Your  Email'};
    }
    const params = {
      email: email,
    };
    console.log('before check pass:', params);
    try {
      const response = await forgotPasswordService(params);

      console.log('check pass:', response.data);
      if (response.data.status_code === 1) {
        return {result: 'success', id: response.data.data.id};
      } else if (response.data.status_code === 2) {
        return {result: 'failed', message: response.data.message};
      }
    } catch (error) {
      console.log('vvv:', error.response);
      return {result: 'failed', message: 'Something went wrong'};

      //  console.log(error.response);
    }
  };
  const otpForgotPassVerifyRequest = async id => {
    if (isNaN(parseInt(otp.join(''), 10))) {
      return {
        result: 'failed',
        message: 'Please enter a valid OTP with  4 digits!',
      };
    }

    const params = {
      id: id,
      otp: parseInt(otp.join(''), 10),
    };

    try {
      const response = await forgetPassVerifyService(params);
      console.log('verify otp here:', response.data);
      if (response.data.status_code === 1) {
        return {
          result: 'success',
          id: response.data.data.id,
          verification_uid: response.data.data.uid,
        };
      } else {
        return {result: 'failed', message: 'Envalid Otp!'};
      }
    } catch (error) {
      return {result: 'failed', message: 'Something went wrong!'};
      console.log('vvv:', error.response);
      //  console.log(error.response);
    }
  };
  const changePasswordRequest = async (id, verification_uid) => {
    if (password !== confirmPassword) {
      return {result: 'failed', message: 'Password unmatch'};
    }
    const params = {
      id: id,
      verification_uid: verification_uid,
      password: password,
    };
    console.log('verify params here:', params);
    try {
      const response = await changePasswordService(params);

      if (response.data.status_code === 1) {
        return {
          result: 'success',
          id: response.data.data.id,
          verification_uid: response.data.data.uid,
        };
      } else {
        return {result: 'failed', message: 'Envalid Otp!'};
      }
    } catch (error) {
      console.log('vvv:', error.response);
      return {result: 'failed', message: 'Something went wrong!'};

      //  console.log(error.response);
    }
  };
  const changePasswordProfileRequest = async () => {
    if (password !== confirmPassword) {
      return {result: 'failed', message: 'Password unmatch'};
    }

    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const params = {
      old_password: oldPassword,
      new_password: password,
    };
    console.log('verify oyee params here:', params);
    try {
      const response = await changeProfilePasswordService(params, config);

      if (response.data.status_code === 1) {
        return {
          result: 'success',
        };
      } else {
        return {result: 'failed', message: 'Envalid Old Password!'};
      }
    } catch (error) {
      console.log('vvv:', error.response);
      return {result: 'failed', message: 'Something went wrong!'};

      //  console.log(error.response);
    }
  };

  const logoutRequest = async () => {
    console.log('lohgout is called');
    // socket.on('disconnect', () => {
    //   console.log('WebSocket disconnedted');
    // });

    dispatch(resetSubscriptionUserData());
    stopBackgroundSocketService('1');
    dispatch(logoutUser());
  };

  return {
    loading,
    setLoading,
    fullName,
    setFullName,
    lastName,
    setLastName,
    email,
    setEmail,
    mobileNumber,
    setMobileNumber,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    oldPassword,
    setOldPassword,
    isTrialChecked,
    setIsTrialChecked,
    checked,
    setChecked,
    setOtp,
    otp,
    errors,
    passwordVisible,
    setPasswordVisible,
    confirmPasswordVisible,
    isFormValid,
    setIsFormValid,
    setConfirmPasswordVisible,
    forgotPasswordRequest,
    loginRequest,
    logoutRequest,
    loginError,
    setLoginError,
    alertVisible,
    setAlertVisible,
    alertMessage,
    setAlertMessage,
    registrationRequest,
    otpVerifyRequest,
    showAlert,
    closeAlert,
    handleOK,
    otpForgotPassVerifyRequest,
    changePasswordRequest,
    changePasswordProfileRequest,
  };
};
