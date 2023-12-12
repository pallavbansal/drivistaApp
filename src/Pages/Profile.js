/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';




import ProfileComponent from '../components/reusableComponents/Profile';


const Profile = ({navigation}) => {
  const details = [
    {
        label: 'Email',
        data: 'kabir343@gmail.com',
    },
    {
        label: 'Mobile Number',
        data: '9867656767',
    }
  ];




  return (
    <ProfileComponent details={details} headerLabel="Profile details"/>
  );
};

const styles = StyleSheet.create({

});

export default memo(Profile);
