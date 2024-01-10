import React, {useState} from 'react';
import {View, Alert} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Calender = () => {
  const [selected, setSelected] = useState('2012-03-01');
  console.log('selected day', selected);
  return (
    <View style={{}}>
      <Calendar
        horizontal={true}
        pagingEnabled={true}
        // Customize the appearance of the calendar
        disableAllTouchEventsForDisabledDays={false}
        style={{
          // borderRadius: 5,
          margin: 12,
          // elevation: 5,
          // borderWidth: 4,
          borderColor: 'rgba(100, 100, 100, 0.2)',
        }}
        theme={{
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
          setSelected(day.dateString);
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
  );
};

export default Calender;
