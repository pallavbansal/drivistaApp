import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionic from 'react-native-vector-icons/Ionicons';
import EditProfile from './EditProfile';
import PostList from './PostList';

const TabView = () => {
  const Tab = createMaterialTopTabNavigator();

  const Profile = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#ffffff',
            flexWrap: 'wrap',
            flexDirection: 'row',
            paddingVertical: 5,
            justifyContent: 'space-between',
          }}>
         <EditProfile
            id={0}
            name="Mr Peobody"
            parentName="mr_happybody"
            grade="9th"
            age="14"
            schoolName="Spring Fields Collage"
            schoolLocation="Near Avenue 11 opposite Taj palace"
            gender="Male"
            mobile="+91-9999999999"
            email="mr_poebody@gmail.com"
            profileImage={require('../storage/images/userProfile.png')}
         />
        </View>
      </ScrollView>
    );
  };
  const Postlist = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#ffffff',
        }}>
        <View>
          <PostList/>
        </View>
      </ScrollView>
    );
  };
 
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: '#000000',
          height: 1.5,
        },
        tabBarIcon: ({focused, colour}) => {
          let iconName;
          if (route.name === 'Profile') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
            colour = focused ? 'black' : 'gray';
          } else if (route.name === 'Postlist') {
            iconName = focused ? 'ios-play-circle' : 'ios-play-circle-outline';
            colour = focused ? 'black' : 'gray';
          }

          return <Ionic name={iconName} color={colour} size={22} />;
        },
      })}>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Postlist" component={Postlist} />
    </Tab.Navigator>
  );
};

export default TabView;
