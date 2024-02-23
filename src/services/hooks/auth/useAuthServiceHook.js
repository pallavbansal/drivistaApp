import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {socket} from '../WebSocketService';
import {
  logoutUser,
  resetSubscriptionUserData,
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
import {stopBackgroundSocketService} from '../BackgroundSocketService';
export const useAuthServiceHook = () => {
  const {isAuth, user} = useSelector(state => state.userState);
  const {token} = useSelector(state => state.userState);
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

  const loginRequest = async () => {
    const validation = handleLoginVerification();
    if (!validation) {
      return {result: 'verfication_failed'};
    }

    try {
      const response = await loginService(validation);
      if (response.data.status_code === 1) {
        dispatch(setUserData(response.data.data));
        return {result: 'success', role: response.data.data.user.role};
      } else if (response.data.status_code === 2) {
        return {result: 'failed'};
      }
    } catch (error) {}
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

    try {
      const response = await registerService(params);
      console.log('otp register:', response.data);
      if (response.data.status_code === 1) {
        return {result: 'success', id: response.data.data.id};
      } else if (response.data.status_code === 2) {
        return {result: 'failed', message: response.data.message};
      }
    } catch (error) {}
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
      return {result: 'failed', message: 'Something went wrong!'};
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
    }
  };

  const logoutRequest = async () => {
    console.log('lohgout is called');
    // socket.on('disconnect', () => {
    //   console.log('WebSocket disconnedted');
    // });
    socket.disconnect();
    dispatch(resetSubscriptionUserData());
    let id = '';
    if (user && isAuth && user.parent_id === '-1') {
      id = user.id;

      stopBackgroundSocketService(id);
    }
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
