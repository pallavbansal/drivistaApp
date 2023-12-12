/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Colors} from '../../constants/colors';
import vehicle from '../../storage/images/vehicle.png';
import HeaderContainer from './Container/HeaderContainer';
import {globalStyles} from '../../constants/globalStyles';
import InfoCard from './InfoCard';

const Profile = ({details,headerLabel}) => {




  const MainContainer = ({children}) => (
    <View style={styles.mainContainer}>{children}</View>
  );

  return (
    <MainContainer>
      <HeaderContainer
        label={headerLabel}
        showBackArrow={true}
        showLabel={true}
        containerStyle={styles.headContainer}
      />
      <View style={styles.profileContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={vehicle}
            style={[globalStyles.logoImage, {width: 100, height: 100}]}
          />
          <Text style={[globalStyles.text,{fontSize:25,fontWeight:'bold',opacity:0.7}]}>{'Kabir Singh'}</Text>
        </View>
        <View style={styles.infoCardContainer}>
                    {details.map((item, index) => (
            <InfoCard key={index} label={item.label} data={item.data} />
            ))}


        </View>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: Colors.primary,
  },
  headContainer: {
    flex: 0.2,
  },
  profileContainer: {
    flex: 0.7,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
  logoContainer: {
    flex: 0.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  infoCardContainer: {
    flex: 0.5,
    justifyContent:'flex-start',
    alignItems:'center'
  },
  footerContainer: {
    flex: 0.2,
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
