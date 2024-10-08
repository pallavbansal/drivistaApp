/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {memo} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {Colors} from '../../../constants/colors';
import clock from '../../../storage/images/clock.png';
import HeaderContainer from '../../../components/reusableComponents/Container/HeaderContainer';
import {globalStyles} from '../../../constants/globalStyles';
import InfoCard from '../../../components/reusableComponents/InfoCard';
import Heading from '../../../components/reusableComponents/Heading';
import CustomButton from '../../../components/reusableComponents/CustomButton';
import {navigationPopUpList} from '../../../constants/navigation';
import {Fonts} from '../../../constants/fonts';
import Space from '../../../components/reusableComponents/Space';
import { useAuthServiceHook } from '../../../services/hooks/auth/useAuthServiceHook';


const SubscriptionDescription = ({navigation}) => {
  const props = {
    label: 'Forgot Password',
    heading: 'Subcribe & unlock features',
    subHeading: 'Starting from $5/week /employee.',
    buttonLabel: 'Proceed',
    navigateScreen: 'PaymentDetails',
    navigateBackNavigation:()=> navigation.pop(),
    handleNavigation: screenName => navigation.navigate(screenName),
  };
  const {logoutRequest} = useAuthServiceHook();
  const data = [
    {id: 1, description: 'Manage your staff status - ALL LIVE'},
    {
      id: 2,
      description:
        'Monitor your staff’s shifts begin and taken break of start & finish time.',
    },
    {id: 3, description: 'Manage your staff status - ALL LIVE'},
    {
      id: 4,
      description:
        'Monitor your staff’s shifts begin and taken break of start & finish time.',
    },
    {id: 5, description: 'Manage your staff status - ALL LIVE'},
    {
      id: 6,
      description:
        'Monitor your staff’s shifts begin and taken break of start & finish time.',
    },
    {id: 7, description: 'Manage your staff status - ALL LIVE'},
    {
      id: 8,
      description:
        'Monitor your staff’s shifts begin and taken break of start & finish time.',
    },
    {id: 9, description: 'Manage your staff status - ALL LIVE'},
    {
      id: 10,
      description:
        'Monitor your staff’s shifts begin and taken break of start & finish time.',
    },
    {id: 11, description: 'Manage your staff status - ALL LIVE'},
    {
      id: 124,
      description:
        'Monitor your staff’s shifts begin and taken break of start & finish time.',
    },
    {id: 13, description: 'Manage your staff status - ALL LIVE'},
    {
      id: 14,
      description:
        'Monitor your staff’s shifts begin and taken break of start & finish time.',
    },
    {
      id: 10,
      description:
        'Monitor your staff’s shifts begin and taken break of start & finish time.',
    },
    {id: 11, description: 'Manage your staff status - ALL LIVE'},
    {
      id: 124,
      description:
        'Monitor your staff’s shifts begin and taken break of start & finish time.',
    },
    {id: 13, description: 'Manage your staff status - ALL LIVE'},
    {
      id: 14,
      description:
        'Monitor your staff’s shifts begin and taken break of start & finish time.',
    },
    {
      id: 10,
      description:
        'Monitor your staff’s shifts begin and taken break of start & finish time.',
    },
    {id: 11, description: 'Manage your staff status - ALL LIVE'},
    {
      id: 124,
      description:
        'Monitor your staff’s shifts begin and taken break of start & finish time.',
    },
    {id: 13, description: 'Manage your staff status - ALL LIVE'},
    {
      id: 14,
      description:
        'Monitor your staff’s shifts begin and taken break of start & finish time.',
    },

    // Add more objects as needed
  ];

  const MainContainer = ({children}) => (
    <View style={styles.mainContainer}>{children}</View>
  );

  return (
    <MainContainer>
      <HeaderContainer
        showBackArrow={true}
        labels={props}
        showBackground={false}
        containerStyle={styles.headContainer}
        handleBackNavigation={props.navigateBackNavigation}

      />

      <View style={styles.container}>
        <LabelContainer {...props} />

        <ScrollView style={{flex: 0.9}}>
          <View style={styles.descriptionContainer}>
            {data.map(item => (
              <BulletContainer key={item.id} {...item} />
            ))}
          </View>
        </ScrollView>
        <Space />
        <ButtonContainer {...props} />
      </View>
    </MainContainer>
  );
};
const LabelContainer = memo(props => (
  <View style={styles.labelContainer}>
    <Text
      style={[
        globalStyles.text,
        {
          fontSize: 18,
          fontWeight: 'bold',
          color: Colors.primary,
        },
      ]}>
      {props.heading}
    </Text>
    <Text
      style={[
        globalStyles.text,
        {fontSize: Fonts.sizes.small, fontWeight: 'bold', color: 'green'},
      ]}>
      {props.subHeading}
    </Text>
  </View>
));
const BulletContainer = memo(({id, description}) => (
  <View key={id} style={styles.bulletContainer}>
    <Text style={styles.bullet} />
    <Text style={[globalStyles.text, {marginLeft: 5, margin: 'auto'}]}>
      {description}
    </Text>
  </View>
));
const ButtonContainer = memo(props => (
  <View style={styles.button}>
    <CustomButton {...props} />
  </View>
));

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.primary,
  },
  headContainer: {
    // flex: 0.1,
  },
  container: {
    flex: 0.9,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    marginHorizontal: 30,

    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  descriptionContainer: {
    flex: 0.9,
    marginVertical: 5,
  },
  buttonContainer: {
    flex: 0.5,
    justifyContent: 'flex-start',

  },
  bulletContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 5,
  },
  labelContainer: {
    flex: 0.1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop:10
  },

  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginVertical: 5,
    backgroundColor: 'grey',
    alignSelf: 'flex-start',
  },
  button:{
    marginHorizontal:20
  }
});

export default memo(SubscriptionDescription);
