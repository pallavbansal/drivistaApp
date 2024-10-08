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
import vehicle from '../../../storage/images/vehicle-front.png';
import edit from '../../../storage/images/edit.png';
import HeaderContainer from '../Container/HeaderContainer';
import {globalStyles} from '../../../constants/globalStyles';
import {Fonts} from '../../constants/fonts';
import CustomButton from '../CustomButton';
import CustomTextInput from '../CustomTextInput';
import Spinner from '../Spinner';

const Vehicles = ({
  editable,
  setEditable,
  vehicleName,
  setVehicleName,
  vehicleNumber,
  setVehicleNumber,
  driverName,
  setDriverName,
  details,
  updateUserProfileRequest,
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
            vehicleNumber={vehicleNumber}
            vehicleName={vehicleName}
            setVehicleName={setVehicleName}
            setVehicleNumber={setVehicleNumber}
            driverName={driverName}
            setDriverName={setDriverName}
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
    <View>
      <Image
        source={vehicle}
        style={[globalStyles.logoImage, {width: 180, height: 180}]}
      />
    </View>
  </View>
));
const ProfileInfoContainer = memo(props => (
  <>
    <View style={styles.wrapper}>
      <View style={styles.textLabelWrapper}>
        <Text style={[globalStyles.text, {fontWeight: 'bold'}]}>
          {'Vehicle Number'}
        </Text>
      </View>
      <View style={styles.inputWrapper}>
        {props.editable ? (
          <TextInput
          color="black"
          placeholderTextColor="black"
            style={[styles.input, styles.text]}
            value={props.vehicleNumber}
            onChangeText={text => props.setVehicleNumber(text)}
          />
        ) : (
          <Text style={styles.text}>: {props.vehicleNumber}</Text>
        )}
      </View>
    </View>
    <View style={styles.wrapper}>
      <View style={styles.textLabelWrapper}>
        <Text style={[globalStyles.text, {fontWeight: 'bold'}]}>
          {'Vehicle Name'}
        </Text>
      </View>
      <View style={styles.inputWrapper}>
        {props.editable ? (
          <TextInput
          color="black"
          placeholderTextColor="black"
            style={[styles.input, styles.text]}
            value={props.vehicleName}
            onChangeText={text => props.setVehicleName(text)}
          />
        ) : (
          <Text style={styles.text}>: {props.vehicleName}</Text>
        )}
      </View>
    </View>
    <View style={styles.wrapper}>
      <View style={styles.textLabelWrapper}>
        <Text style={[globalStyles.text, {fontWeight: 'bold'}]}>
          {'Driver Name'}
        </Text>
      </View>
      <View style={styles.inputWrapper}>
        {props.editable ? (
          <TextInput
          color="black"
          placeholderTextColor="black"
            style={[styles.input, styles.text]}
            value={props.driverName}
            onChangeText={text => props.setDriverName(text)}
          />
        ) : (
          <Text style={styles.text}>: {props.driverName}</Text>
        )}
      </View>
    </View>
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
    margin: 10,
    // borderRadius: 1,
    // borderWidth: 0.5,
    // borderColor: 'white',
    elevation: 1,
  },
  actionContainer: {
    flex: 0.1,
    marginHorizontal: 5,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  logoContainer: {
    flex: 0.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: -40,
  },
  infoCardContainer: {
    flex: 0.5,
    justifyContent: 'flex-start',
    marginLeft:40,

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

    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 0,
    // backgroundColor:'red'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 5,
    width: '50%',
    marginHorizontal: 5,
    marginVertical:2

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
});

export default memo(Vehicles);
