import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../redux/actions/userActions';
const useAuthService = () => {
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isTrialChecked, setIsTrialChecked] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    const errors = {};

    // Validate the form fields here
    if (fullName.trim() === '') {
      errors.fullName = 'Full Name is required';
      valid = false;
    }

    if (lastName.trim() === '') {
      errors.lastName = 'Last Name is required';
      valid = false;
    }

    // Add more validation rules as needed

    setErrors(errors);
    return valid;
  };

  const handleRegistrationSubmit = () => {
    const params = {
      fullName: fullName,
    };
    // Perform form submission logic here
    // e.g., send form data to the server
    dispatch(register(params));
    if (validateForm()) {
      console.log('Form submitted successfully');
    } else {
      console.log('Form has errors. Please correct them.');
    }
  };

  return {
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
    isTrialChecked,
    setIsTrialChecked,
    errors,
    handleRegistrationSubmit,
  };
};

export default useAuthService;
