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
} from 'react-native';
import {Colors} from '../../../constants/colors';
import driving from '../../../storage/images/driving.png';
import edit from '../../../storage/images/edit.png';
import calender from '../../../storage/images/calender.png';
import HeaderContainer from '../Container/HeaderContainer';
import {globalStyles} from '../../../constants/globalStyles';

const Drivers = ({
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

  return (
    <MainContainer>
      <View style={styles.profileContainer}>
        <TouchableOpacity
          style={styles.actionContainer}
          onPress={() => setEditable(!editable)}>
          {!editable ? (
            <View style={{flexDirection: 'row'}}>
              <Text style={globalStyles.text}>{'Edit'}</Text>
              <Image
                source={edit}
                style={[globalStyles.logoImage, {width: 20, height: 20}]}
              />
            </View>
          ) : (
            ''
            //  <View style={[styles.buttonStyle]}>
            //   <Text
            //     style={[
            //       globalStyles.text,
            //       {color: 'white', fontWeight: 'bold'},
            //     ]}>
            //     {'Reset'}
            //   </Text>
            // </View>
          )}
        </TouchableOpacity>
        <LogoHeaderContainer />
        <View style={styles.infoCardContainer}>
          <ProfileInfoContainer
            editable={editable}
            details={details}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPasssword={setPasssword}
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
            handleCalender={handleCalender}
          />
        </View>
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
          {'Employee Name'}
        </Text>
      </View>
      <View style={styles.inputWrapper}>
        {props.editable ? (
          <TextInput
            color="black"
            placeholderTextColor="black"
            style={[styles.input]}
            value={props.firstName}
            onChangeText={text => props.setFirstName(text)}
          />
        ) : (
          <Text style={styles.text}>: {props.firstName}</Text>
        )}
      </View>
    </View>
    <View style={styles.wrapper}>
      <View style={styles.textLabelWrapper}>
        <Text style={[globalStyles.text, {fontWeight: 'bold'}]}>
          {'Phone No'}
        </Text>
      </View>
      <View style={styles.inputWrapper}>
        {props.editable ? (
          <TextInput
            color="black"
            placeholderTextColor={'black'}
            keyboardType="numeric"
            maxLength={10}
            style={[styles.input, styles.text]}
            value={props.mobileNumber}
            onChangeText={text => props.setMobileNumber(text)}
          />
        ) : (
          <Text style={styles.text}>: {props.mobileNumber}</Text>
        )}
      </View>
    </View>
    <View style={styles.wrapper}>
      <View style={styles.textLabelWrapper}>
        <Text style={[globalStyles.text, {fontWeight: 'bold'}]}>
          {'Email Id'}
        </Text>
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.text}>: {props.email}</Text>
      </View>
    </View>
    {
      props.editable ?
      (
        <View style={styles.wrapper}>

        <View style={styles.textLabelWrapper}>
              <Text style={[globalStyles.text, {fontWeight: 'bold'}]}>
              {'Password'}
            </Text>
            </View>

          <View style={styles.inputWrapper}>
            {props.editable ? (
              <TextInput
                color="black"
                placeholderTextColor="black"
                style={[styles.input, styles.text]}
                value={props.password}
                onChangeText={text => props.setPasssword(text)}
              />
            ) : (""
              // <Text style={styles.text}>: {props.password}</Text>
            )}
          </View>
        </View>
      ):""
    }


    <TouchableOpacity
      onPress={() => props.handleCalender(props.details.id)}
      style={styles.wrapper}>
      <View style={styles.textLabelWrapper}>
        <Text style={[globalStyles.text, {fontWeight: 'bold'}]}>
          {'Work History:'}
        </Text>
      </View>
      <View style={styles.inputWrapper}>
        <Image
          source={calender}
          style={[globalStyles.logoImage, {width: 20, height: 20}]}
        />
      </View>
    </TouchableOpacity>
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
    justifyContent: 'space-evenly',
    marginHorizontal: 10,
    // borderRadius: 1,
    // borderWidth: 0.5,
    // borderColor: 'white',
    elevation: 1,
    //  backgroundColor:'red',
  },
  actionContainer: {
    flex: 0.1,
    marginHorizontal: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoContainer: {
    flex: 0.4,
    justifyContent: 'flex-start',
    alignItems: 'center',

    marginTop: -20,
  },
  infoCardContainer: {
    flex: 0.4,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  footerContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flex: 0.3,
    marginVertical: 10,
  },
  cardLogo: {
    height: 50,
    width: 50,
  },
  wrapper: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
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
    flex: 0.3,
  },
  inputWrapper: {
    flex: 0.7,
  },
});

export default memo(Drivers);
