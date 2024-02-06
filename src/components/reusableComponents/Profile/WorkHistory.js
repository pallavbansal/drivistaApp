/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ScrollView
} from 'react-native';
import {Colors} from '../../../constants/colors';
import driving from '../../../storage/images/driving.png';
import edit from '../../../storage/images/edit.png';
import calender from '../../../storage/images/calender.png';
import HeaderContainer from '../Container/HeaderContainer';
import {globalStyles} from '../../../constants/globalStyles';

const WorkHistory = ({
  editable,
  setEditable,
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
  details,
  updateUserProfileRequest,
  handleCalender,
}) => {
  console.log('vehicle data hry:', details);

  console.log('check for editable:', editable);
  const textInputRef = useRef(null);
  const handleInputPress = () => {
    textInputRef.current.focus();
  };

  const handlePress = async () => {
    setEditable(!editable);

    if (editable) {
      // setLoading(true);
      updateUserProfileRequest();

    }

    // if (textInputRef.current) {
    //   textInputRef.current.focus();
    // }
  };
  const formatTime = rawTime => {
    const formattedTime = new Date(rawTime);
    return formattedTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  return (
    <MainContainer>
      <View style={styles.profileContainer}>

        <LogoHeaderContainer />
        <View style={styles.employeeName}>
            <View style={styles.textLabelWrapper}>
              <Text style={[globalStyles.text, {fontWeight: 'bold'}]}>
                {'Employee Name'}
              </Text>
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.text}>: {firstName}</Text>
            </View>
          </View>
        <ScrollView style={{ flex:0.6}}>
      {details.shift_details.map((item,index) => (
        <ProfileInfoContainer
          key={index}
          details={item}
          length={details.length}
          formatTime={formatTime}
          handleCalender={() => handleCalender(item.shift_id)}
        />
      ))}

    </ScrollView>
      </View>

      {/* <ProfileEdit editable={editable} email={email} mobileNumber={mobileNumber} labels={labels} setEmail={setEmail} setMobileNumber={setMobileNumber}/> */}
    </MainContainer>
  );
};

const MainContainer = ({children}) => (
  <View style={styles.mainContainer}>{children}</View>
);
const LogoHeaderContainer = memo(props => (
  <View style={styles.logoContainer}>
    <Image
      source={driving}
      style={[globalStyles.logoImage, {width: 180, height: 180}]}
    />
  </View>
));

const ProfileInfoContainer = memo(props => (
  <>
    <View style={styles.wrapper}>
      <View style={styles.textLabelWrapper}>
        <Text style={[globalStyles.text, {fontWeight: 'bold'}]}>
          {'Shift Start time'}
        </Text>
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.text}>: {props.formatTime(props.details.shift_start_time)}</Text>
      </View>
    </View>
    <View style={styles.wrapper}>
      <View style={styles.textLabelWrapper}>
        <Text style={[globalStyles.text, {fontWeight: 'bold'}]}>
          {'Shift End time '}
        </Text>
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.text}>: {props.formatTime(props.details.shift_end_time)}</Text>
      </View>
    </View>
    <View style={styles.wrapper}>
      <View style={styles.textLabelWrapper}>
        <Text style={[globalStyles.text, {fontWeight: 'bold'}]}>
          {'Total number hours of shift '}
        </Text>
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.text}>: {props.details.duration_minutes}</Text>
      </View>
    </View>
    {props.details.breaks.map((breakItem, index) => (
      <View style={styles.wrapper} key={index}>
        <View style={styles.textLabelWrapper}>
          <Text style={[globalStyles.text, {fontWeight: 'bold'}]}>
            {'Break '}
            {index + 1}
          </Text>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.text}>
            :{' '}
            {`${props.formatTime(breakItem.start_time)} - ${props.formatTime(
              breakItem.end_time,
            )}   |   ${breakItem.duration_minutes}`}{ ' mins'}
          </Text>
        </View>
      </View>
    ))}

    {props.details.breaks.length > 0 ? <View style={styles.divider} /> : ''}
  </>
));
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',

  },

  profileContainer: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 10,
    elevation: 1,

  },

  logoContainer: {
    flex: 0.4,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop:10

   // marginTop: -20,
  },
  employeeName:{
  flex:0.2,
  flexDirection:'row',
  alignItems:'flex-end',
  paddingHorizontal: 10,

  },

  wrapper: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
  //  paddingVertical: 5,
    // backgroundColor:'red'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 5,
  },
  initialSection: {
    height: 40,
    flex: 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.inputWrapperBg, // Set the background color if needed
  },
  buttonStyle: {
    height: 45,
    width: '30%',
    borderRadius: 10,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    flexDirection: 'row',
    fontFamily: 'Verdana',
    fontSize: 9,
    fontStyle: 'italic',
  },
  textLabelWrapper: {
    flex: 0.4,
  },
  inputWrapper: {
    flex: 0.6,
  },
  divider: {
    height: 0.3,
    width: '100%',
    backgroundColor: 'black',
    marginVertical: 5,
  },
});

export default memo(WorkHistory);
