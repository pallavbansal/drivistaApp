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
import {Colors} from '../../constants/colors';
import vehicle from '../../storage/images/vehicle.png';
import edit from '../../storage/images/edit.png';

import {globalStyles} from '../../constants/globalStyles';
import InfoCard from './InfoCard';
import {Fonts} from '../../constants/fonts';
import CustomButton from './CustomButton';
import CustomTextInput from './CustomTextInput';
import ProfileEdit from './Profile/Owner';
import Spinner from './Spinner';

const Profile = ({
  labels,
  details,
  loading,
  setLoading,
  headerLabel,
  caseType,
  email,
  setEmail,
  mobileNumber,
  setMobileNumber,
  setFirstName,
  firstName,
  lastName,
  setLastName,
  headLabel,
  updateUserProfileRequest,
}) => {
  const [editable, setEditable] = useState(false);
  const MainContainer = ({children}) => (
    <View style={styles.mainContainer}>{children}</View>
  );
  console.log('check for editable:', editable);
  const textInputRef = useRef(null);

  const handlePress = async () => {
    setEditable(!editable);

     if(editable)
     {
      // setLoading(true);
      updateUserProfileRequest();
      // if(response.result === "failed")
      // {
      //   Alert.alert("Something went wrong!")
      // }
      // setLoading(false);
     }

    // if (textInputRef.current) {
    //   textInputRef.current.focus();
    // }
  };

  return (
    <MainContainer>

      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.actionContainer} onPress={handlePress}>
           {
            !editable ? (
              <View style={{flexDirection:'row'}}>
              <Text style={globalStyles.text}>{'Edit'}</Text>
              <Image
                source={edit}
                style={[globalStyles.logoImage, {width: 20, height: 20}]}
              />
               </View>
            ):(
              <View
          style={[styles.buttonStyle]}>
          <Text
            style={[globalStyles.text, {color: 'white', fontWeight: 'bold'}]}>
            {'update'}
          </Text>
        </View>
            )
           }



        </TouchableOpacity>
        <LogoHeaderContainer
          editable={editable}
          details={details}
          setFirstName={setFirstName}
          firstName={firstName}
          lastName={lastName}
          setLastName={setLastName}
        />
        <View style={styles.infoCardContainer}>
          {caseType === 'user_profile' ? (
            <ProfileInfoContainer
              editable={editable}
              email={email}
              setEmail={setEmail}
              mobileNumber={mobileNumber}
              setMobileNumber={setMobileNumber}
              textInputRef={textInputRef}
            />
          ) : (
            ''
          )}
        </View>
      </View>

      {/* <ProfileEdit editable={editable} email={email} mobileNumber={mobileNumber} labels={labels} setEmail={setEmail} setMobileNumber={setMobileNumber}/> */}
    </MainContainer>
  );
};
const LogoHeaderContainer = memo(props => (
  <View style={styles.logoContainer}>
    <View style={{flex:0.5}}>
    <Image
      source={vehicle}
      style={[globalStyles.logoImage, {width: 100, height: 100}]}
    />
    </View>
    <View style={{flexDirection: 'row',flex:0.2,justifyContent:'space-evenly',width:'70%'}}>
      {props.editable ? (
        <TextInput
        color="black"
        placeholderTextColor={'black'}
          ref={props.textInputRef}
          style={[styles.input, styles.text]}
          value={props.firstName}
          onChangeText={text => props.setFirstName(text)}
        />
      ) : (
        <Text
          style={[
            globalStyles.text,
            {fontSize: 25, fontWeight: 'bold', opacity: 0.7},
          ]}>
          {props.firstName}{' '}
        </Text>
      )}

      {props.editable ? (
        <TextInput
          ref={props.textInputRef}
          style={[styles.input, styles.text]}
          value={props.lastName}
          onChangeText={text => props.setLastName(text)}
        />
      ) : (
        <Text
          style={[
            globalStyles.text,
            {fontSize: 25, fontWeight: 'bold', opacity: 0.7},
          ]}>
          {props.lastName}
        </Text>
      )}
    </View>
  </View>
));

const ProfileInfoContainer = memo(props => (
  <View>
    <View style={styles.wrapper}>
      <Text style={[globalStyles.text, {fontWeight: 'bold'}]}>{'Email '}</Text>

      <Text style={styles.text}>: {props.email}</Text>
    </View>
    <View style={styles.wrapper}>
      <Text style={[globalStyles.text, {fontWeight: 'bold'}]}>
        {'Mobile Number'}
      </Text>
      {props.editable ? (
        <TextInput
          style={[styles.input, styles.text]}
          value={props.mobileNumber}
          onChangeText={text => props.setMobileNumber(text)}
        />
      ) : (
        <Text style={styles.text}>: {props.mobileNumber}</Text>
      )}
    </View>
  </View>
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
    margin: 10,
    // borderRadius: 1,
    // borderWidth: 0.5,
    // borderColor: 'white',
    elevation: 1,
  },
  actionContainer: {
    flex: 0.1,
    margin: 5,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  logoContainer: {
    flex: 0.4,
    justifyContent: 'flex-start',
    alignItems: 'center',


  },
  infoCardContainer: {
    flex: 0.4,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 5,
    width:'50%',
    marginHorizontal:5
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
    width:'30%',
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
});

export default memo(Profile);
