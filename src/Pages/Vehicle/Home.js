import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Colors} from '../../constants/colors';
import StatusCard from '../../components/cards/StatusCard';
// import CustomCard from '../../components/cards/CustomCard';
import HeaderContainer from '../../components/reusableComponents/Container/HeaderContainer';
import FooterContainer from '../../components/reusableComponents/Container/FooterContainer';
import vehicleLogo from '../../storage/images/drivers.png';
import BreakDetailsCard from '../../components/cards/BreakDetailsCard';

const Home = ({navigation}) => {
  const [expandedCard, setExpandedCard] = useState(null);

  const data = [{label: 'Ertiga'}, {label: 'Maruti'}, {label: 'Harrier'}];
  const details = [
    {
      label: 'Vehicle Name',
      data: 'Loader',
    },
    {
      label: 'Mobile Number',
      data: '9867656767',
    },
    {
        label:'Vehicle no.',
         data: 'DL872F98888'
    }
  ];
  const handleNavigation = () => {
    navigation.navigate('VehicleDetails', {
      // Pass additional parameters here as an object
      label: 'Vehicle Detalils',
      type: 'vehicle',
      details: details,
      // Add more parameters as needed
    });
  };

  const actions = {
    editShow: true,
    deleteShow: true,
  };

  const renderCards = () => {
    return data.map((item, index) => (
      <View>
        <TouchableOpacity key={index} onPress={() => handleNavigation(index)}>
          <StatusCard
            imageLink={vehicleLogo}
            textName={item.label}
            {...actions}
            {...item}
          />
        </TouchableOpacity>


      </View>
    ));
  };

  return (
    <View style={styles.mainContainer}>
      <HeaderContainer
        showPopUp={true}
        showBackArrow={true}
        showLabel={true}
        showBackground={true}
        label={'Your Vehicles'}
        containerStyle={styles.headContainer}
        handleNavigation={navigateScreen => {
          navigation.navigate(navigateScreen);
        }}
      />
      <View style={styles.cardContainer}>{renderCards()}</View>
      <FooterContainer containerStyle={styles.footerContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.containerBg,
  },
  headContainer: {
    flex: 0.2,
  },
  cardContainer: {
    flex: 0.7,
  },
  statusCardContainer: {
    height: 200,
  },
  footerContainer: {
    flex: 0.2,
  },
});

export default Home;
