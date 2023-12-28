/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import ProfileComponent from '../components/reusableComponents/Profile';
import FooterContainer from '../components/reusableComponents/Container/FooterContainer';


const Profile = ({route,navigation}) => {
    const { headLabel = 'Profile', type = 'Default Type', details = [
        {
          label: 'Email',
          data: 'kabir343@gmail.com',
        },
        {
          label: 'Mobile Number',
          data: '9867656767',
        }
      ] } = route.params;



  return (
    <View style={{flex:1}}>


        <ProfileComponent details={details} headerLabel={headLabel}/>
        {/* <FooterContainer
          showChildren={false}
          text={'hhhh'}
          containerStyle={styles.footerContainer}
        /> */}
    </View>


  );
};

const styles = StyleSheet.create({

});

export default memo(Profile);
