import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import InfoCard from '../reusableComponents/InfoCard';
import BreakInfoCard from '../reusableComponents/BreakInfoCard';
import CustomButton from '../reusableComponents/CustomButton';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const BreakDetailsCard = ({label, navigateScreen, handleNavigation}) => {
  const handleCardPress = () => {
    if (navigateScreen) {
      handleNavigation(navigateScreen);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.breakContainer}>
        <InfoCard
          label="Driver’s ongoing shift"
          time="12 PM"
          editShow={false}
        />
        <BreakInfoCard
          textName={'Break 1'}
          time={'12:00pm - 12:30pm   |   30mins.'}
        />
        <BreakInfoCard
          textName={'Break 1'}
          time={'12:00pm - 12:30pm   |   30mins.'}
        />
        <BreakInfoCard
          textName={'Break 1'}
          time={'12:00pm - 12:30pm   |   30mins.'}
        />
        <BreakInfoCard
          textName={'Break 1'}
          time={'12:00pm - 12:30pm   |   30mins.'}
        />
        <BreakInfoCard
          textName={'Break 1'}
          time={'12:00pm - 12:30pm   |   30mins.'}
        />
        <BreakInfoCard
          textName={'Break 1'}
          time={'12:00pm - 12:30pm   |   30mins.'}
        />
      </View>

      <TouchableOpacity
        style={styles.footerContainer}
        onPress={handleNavigation}>
        <View style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Current Location</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.breakInfoContainerBg,
  },
  breakContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  footerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonStyle: {
    height: 30,
    width: '60%',
    borderRadius: 5,
    backgroundColor: '#412160',
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
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    fontStyle: 'normal',
  },
});

export default BreakDetailsCard;
