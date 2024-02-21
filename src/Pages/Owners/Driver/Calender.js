import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';
import HeaderContainer from '../../../components/reusableComponents/Container/HeaderContainer';
import {navigationPopUpList} from '../../../constants/navigation';


const Calender = ({navigation, route}) => {
  const [selected, setSelected] = useState('');
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
        showPopUp={false}
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
            marginh: 12,
            borderColor: 'rgba(100, 100, 100, 0.2)',
          }}
          theme={{
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
            navigation.navigate('WorkHistoryDetails', {
              driver_id: id,
              date: day.dateString,
            });
          }}
          // Mark specific dates as marked
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: false,
              selectedDotColor: 'orange',
            },
          }}
        />
      </View>
    </View>
  );
};

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
  },
  button: {
    flex: 1,
  },
});

export default Calender;
