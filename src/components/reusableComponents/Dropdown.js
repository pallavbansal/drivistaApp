import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Ionic from 'react-native-vector-icons/Ionicons';
import {useHomeServiceHook} from '../services/hooks/useHomeServiceHook';
import {useDispatch, useSelector} from 'react-redux';
import {setLocationdata} from '../redux/actions/userActions';

const DropdownComponent = ({
  locationType,
  selectedLocation,
  DropdownType = '',
  resetDropdown = false,
  setIsLoading,
  placeholderName = 'Select',
  BoardedLocationID = '',
  navigation,
}) => {
  const {
    handleLocationFetch,
    handleNearByLocationFetch,
    setBoardingSelected,
    boardingSelected,
  } = useHomeServiceHook();
  // alert(BoardedLocationID);
  const user = useSelector(state => state.userState);
  console.log('oyee dropdown');
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);
  const [primaryLocations, setPrimaryLocations] = useState(user.LocationData);

  useEffect(() => {
    if(user.LocationData && DropdownType == 'Destination' )
    {
      const filteredLocations = user.LocationData.filter(
        item => item.LocationPrimaryMasterID !== BoardedLocationID,
      );

      setPrimaryLocations(filteredLocations);
    }
    else if(user.LocationData)
    {
      setPrimaryLocations(user.LocationData);
    }

  }, [user.LocationData]);

  const getLocationData = async () => {
    const resp = await handleLocationFetch();
    if (resp) {
      if (DropdownType == 'Destination') {
        console.log('destination screen:', resp.data);
        const filteredLocations = resp.data.filter(
          item => item.LocationPrimaryMasterID !== BoardedLocationID,
        );

       // setPrimaryLocations(filteredLocations);
      } else {
       // setPrimaryLocations(resp.data);
      }
     dispatch(setLocationdata(resp.data));
    }
    // else{
    //   dispatch(setLocationdata([]))
    // }

    setIsLoading(false);
  };

  // useEffect(() => {
  //   if (DropdownType == 'Destination') {
  //     console.log('destination screen:', primaryLocations);
  //     const filteredLocations = primaryLocations.filter(
  //       item => item.LocationPrimaryMasterID !== BoardedLocationID,
  //     );
  //     setPrimaryLocations(filteredLocations);
  //   }
  // }, []);

  const handleSelectedLocation = item => {
    // alert(item.PrimaryLocation)
    // if (value !== item.PrimaryLocation) {

    // alert(value.PrimaryLocation)
    setBoardingSelected(true);
    //  alert(value.PrimaryLocation);
    // alert(value.PrimaryLocation);
    setValue(item);
    selectedLocation(item);
  };

  useEffect(() => {
    setBoardingSelected(false);
  }, [resetDropdown]);

  useEffect(() => {
    getLocationData();
    // DropdownType === 'Home'
    //   ? getLocationData()
    //   : DropdownType === 'Destination'
    //   ? getNearByLocationData()
    //   : null;
  }, []);

  const renderItem = item => {
    // if (!item) {
    //   return null;
    // }

    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.PrimaryLocation}</Text>
      </View>
    );
  };

  return (
    <Dropdown
      // style={styles.dropdown}
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      maxHeight={300}
      data={primaryLocations}
      labelField="PrimaryLocation"
      placeholder={placeholderName}
      valueField={'LocationPrimaryMasterID'}
      searchPlaceholder="Search..."
      value={value}
      onChange={item => handleSelectedLocation(item)}
      renderLeftIcon={() => (
        <Ionic style={styles.icon} name="search" size={20} color="#000000" />
      )}
      renderItem={renderItem}
    />
  );
};

export default DropdownComponent;

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
