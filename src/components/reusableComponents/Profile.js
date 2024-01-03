/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo, useState} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../../constants/colors';
import vehicle from '../../storage/images/vehicle.png';
import edit from '../../storage/images/edit.png';
import HeaderContainer from './Container/HeaderContainer';
import {globalStyles} from '../../constants/globalStyles';
import InfoCard from './InfoCard';
import {Fonts} from '../../constants/fonts';

const Profile = ({details, headerLabel,caseType,email,setEmail,mobileNumber,setMobileNumber,headLabel}) => {
  const [editable, setEditable] = useState(false);
  const MainContainer = ({children}) => (
    <View style={styles.mainContainer}>{children}</View>
  );




  return (
    <MainContainer>

      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.actionContainer} onPress={()=>setEditable(true)}>
          <Text style={globalStyles.text}>{'Edit'}</Text>
          <Image
            source={edit}
            style={[globalStyles.logoImage, {width: 20, height: 20}]}
          />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image
            source={vehicle}
            style={[globalStyles.logoImage, {width: 100, height: 100}]}
          />
          <Text
            style={[
              globalStyles.text,
              {fontSize: 25, fontWeight: 'bold', opacity: 0.7},
            ]}>
            {details.first_name}{" "}{details.last_name}
          </Text>
        </View>
        <View style={styles.infoCardContainer}>

            {
              caseType === "user_profile" ? (
                <ProfileInfoContainer  email={email} setEmail={setEmail} mobileNumber={mobileNumber} setMobileNumber={setMobileNumber}/>
              ):""
            }
        </View>

      </View>
      {

      }
    </MainContainer>
  );
};
const ProfileInfoContainer = memo(props => (
  <View >
      <InfoCard label={'Email'} data={props.email} />
        <InfoCard  label={'Mobile Number'} data={props.mobileNumber} />
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
});

export default memo(Profile);
