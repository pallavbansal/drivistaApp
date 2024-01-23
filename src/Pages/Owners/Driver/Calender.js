import React, {useState, useEffect, memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import HeaderContainer from '../../../components/reusableComponents/Container/HeaderContainer';
import {navigationPopUpList} from '../../../constants/navigation';
import CustomButton from '../../../components/reusableComponents/CustomButton';

const Calender = ({navigation, route}) => {
  const [selected, setSelected] = useState('');
  console.log('selected day', selected);
  const {id} = route.params;
  const labels = {
    label: 'Calender',
    buttonLabel: 'Save',
    navigateBackScreen: '',
    handleNavigation: async screenName => {
      navigation.navigate('WorkHistoryDetails', {
        driver_id: id,
        date: selected,
      });
      // setLoading(true);
      // const response = await driverDetailsEditRequest(details.id);
      //setLoading(false);
      // try {
      //   if (response.result === 'success') {
      //   //  Alert.alert('Success');
      //   navigation.pop();
      //   } else if (response.result === 'failed') {
      //     Alert.alert(response.message);
      //   }
      // } catch (error) {
      //   console.error('Login error:', error);
      // }
    },
    handleDirectNavigation: screenName => navigation.pop(),
  };
  useEffect(() => {
    // Get the current date
    const currentDate = new Date();
    // Format the date as YYYY-MM-DD
    const formattedDate = currentDate.toISOString().split('T')[0];
    // Set the formatted date to the selected state
    setSelected(formattedDate);
  }, []);
  return (
    <View style={styles.mainContainer}>
      <HeaderContainer
        labels={labels}
        label={labels.label}
        showBackArrow={true}
        showLabel={true}
        showBackground={true}
        showPopUp={true}
        //  containerStyle={styles.headContainer}
        //  handleNavigation={handlePopUpNavigation}
        handleBackNavigation={labels.handleDirectNavigation}
        navigationPopUpList={navigationPopUpList}
      />
      <View style={styles.calenderContainer}>
        <Calendar
          horizontal={true}
          pagingEnabled={true}
          // Customize the appearance of the calendar
          disableAllTouchEventsForDisabledDays={false}
          style={{
            // borderRadius: 5,
            marginh: 12,
            // height: 450,
            // elevation: 5,
            // borderWidth: 4,
            borderColor: 'rgba(100, 100, 100, 0.2)',
          }}
          theme={{
            // backgroundColor: 'blue',
            selectedDayBackgroundColor: '#6d528f',
            todayTextColor: 'green',
            'stylesheet.calendar.header': {
              dayTextAtIndex0: {
                color: 'black',
                fontWeight: 'bold',
              },
              dayTextAtIndex1: {
                color: 'black',
                fontWeight: 'bold',
              },
              dayTextAtIndex2: {
                color: 'black',
                fontWeight: 'bold',
              },
              dayTextAtIndex3: {
                color: 'black',
                fontWeight: 'bold',
              },
              dayTextAtIndex4: {
                color: 'black',
                fontWeight: 'bold',
              },
              dayTextAtIndex5: {
                color: 'black',
                fontWeight: 'bold',
              },
              dayTextAtIndex6: {
                color: 'black',
                fontWeight: 'bold',
              },
            },
          }}
          onMonthChange={date => console.log('onMonthChange', date)}
          // Specify the current date
          current={selected}
          // Callback that gets called when the user selects a day
          onDayPress={day => {
            // console.log('selected day', day);
            navigation.navigate('WorkHistoryDetails', {
              driver_id: id,
              date: day.dateString,
            });
            // setSelected(day.dateString);
          }}
          // Mark specific dates as marked
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: false,
              selectedDotColor: 'orange',
              // dotColor: 'red'
            },
          }}
        />
      </View>
      {/* <View style={styles.buttonContainer}>
        <ButtonContainer {...labels} />
      </View> */}
    </View>
  );
};
const ButtonContainer = memo(props => (
  <View style={styles.button}>
    <CustomButton {...props} />
  </View>
));
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  calenderContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  buttonContainer: {
    marginBottom: 50,
    flex: 0.2,
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    // backgroundColor:'blue'
  },
  button: {
    flex: 1,
    //  marginHorizontal:40
  },
});

export default Calender;
