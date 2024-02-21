import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import InfoCard from '../reusableComponents/InfoCard';
import BreakInfoCard from '../reusableComponents/BreakInfoCard';
import location from '../../storage/images/location.png';
import {globalStyles} from '../../constants/globalStyles';
import {Colors} from '../../constants/colors';

const BreakDetailsCard = ({
  label,
  breakData,
  navigateScreen,
  handleNavigation,
}) => {
  const formatTime = rawTime => {
    const formattedTime = new Date(rawTime);
    return formattedTime
      .toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })
      .toLowerCase();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.breakContainer}>
        <InfoCard
          label="Driver’s ongoing shift"
          time="12 PM"
          editShow={false}
        />

        {breakData.map((breakItem, index) => (
          <BreakInfoCard
            key={index}
            textName={`Break ${index + 1}`}
            time={`${formatTime(breakItem.start_time)} - ${formatTime(
              breakItem.end_time,
            )}   |   ${breakItem.duration_minutes}mins`}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.footerContainer}
        onPress={handleNavigation}>
        <View style={styles.buttonStyle}>
          <Image
            source={location}
            style={[globalStyles.logo, {width: 15, height: 15, marginRight: 5}]}
          />
          <Text style={[styles.buttonText]}>Current Location</Text>
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
    paddingHorizontal: 20,
    backgroundColor: Colors.breakInfoContainerBg,
    padding:20
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
    flexDirection: 'row',
    height: 30,
    width: '50%',
    borderRadius: 5,
    backgroundColor: '#1C8CF3',
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
