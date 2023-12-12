import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DropdownNumber = ({ placeholderName = 'Select', setDays, days ,daysChange}) => {
    const [value, setValue] = useState(null);

   useEffect(()=>{
    setValue('1')
   },[daysChange]);

    const handleSelectedLocation = item => {
      setValue(item.LocationPrimaryMasterID);  // Update to set the LocationPrimaryMasterID as the value
      setDays(item.days); // Update days using setDays when the value changes
    };

    const numbers = [...Array(10)].map((_, index) => ({
      LocationPrimaryMasterID: `${index + 1}`,
      days: `${index + 1}`,
    }));

    const renderItem = item => {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.days}</Text>
        </View>
      );
    };

    return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={numbers}
        maxHeight={200}
        labelField="days"
        placeholder={value ? value : placeholderName}  // Display the selected value in the placeholder
        valueField="LocationPrimaryMasterID"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => handleSelectedLocation(item)}
        renderLeftIcon={() => (
          <Ionicons style={styles.icon} name="search" size={20} color="#000000" />
        )}
        renderItem={renderItem}
      />
    );
  };

// export default DropdownDays;


const DropdownText = ({ placeholderName = 'Select',setCustomerGovtIDType}) => {
    const [value, setValue] = useState(null);

  const givernmentIDList=['Aadhar Card','Driving License','Passport','Pancard','Voter Card','Others'];

    const handleSelectedLocation = item => {
      setValue(item.id);
      setCustomerGovtIDType(item.text);
    };

    const list = givernmentIDList.map((item, index) => ({
      id: `${index + 1}`,
      text: item,
    }));

    const renderItem = item => {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.text}</Text>
        </View>
      );
    };

    return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={list}
        maxHeight={200}
        labelField="text"
        placeholder={value ? value : placeholderName}  // Display the selected value in the placeholder
        valueField="id"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => handleSelectedLocation(item)}
        renderLeftIcon={() => (
          <Ionicons style={styles.icon} name="search" size={20} color="#000000" />
        )}
        renderItem={renderItem}
      />
    );
  };

export  {DropdownNumber,DropdownText};

const styles = StyleSheet.create({
  dropdown: {
    height: 45,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    fontFamily: 'Verdana',
    fontSize: 12,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Verdana',
    // fontStyle: 'italic',
  },
  placeholderStyle: {
    fontFamily: 'Verdana',
    fontSize: 12,
    // fontStyle: 'italic',
    // color:'gray'
  },
  selectedTextStyle: {
    fontFamily: 'Verdana',
    fontSize: 12,
    // fontStyle: 'italic',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontFamily: 'Verdana',
    fontSize: 12,
    // fontStyle: 'italic',
  },
});
