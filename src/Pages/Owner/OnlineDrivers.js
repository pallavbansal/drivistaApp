import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Colors} from '../../constants/colors';
import StatusCard from '../../components/cards/StatusCard';
// import CustomCard from '../../components/cards/CustomCard';
import HeaderContainer from '../../components/reusableComponents/Container/HeaderContainer';
import FooterContainer from '../../components/reusableComponents/Container/FooterContainer';
import userLogo from '../../storage/images/user.png';
import BreakDetailsCard from '../../components/cards/BreakDetailsCard';

const OnlineDrivers = ({navigation}) => {
  const [expandedCard, setExpandedCard] = useState(null);

  const data = [
    {onlinestatus: true, label: 'Ramesh Mehta'},
    {onlinestatus: false, label: 'Raju Rastogi'},
    {onlinestatus: true, label: 'R Maddy'},
  ];

  const handleNavigation=()=>{
    navigation.navigate('LocationScreen');
  }

  const handleCardClick = index => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const renderCards = () => {
    return data.map((item, index) => (
      <View>
        <TouchableOpacity key={index} onPress={() => handleCardClick(index)}>
          <StatusCard imageLink={userLogo} textName={item.label} {...item} />
        </TouchableOpacity>

        {expandedCard === index && (
          <View style={styles.statusCardContainer}>
            <BreakDetailsCard handleNavigation={handleNavigation} />
          </View>
        )}
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
        label={'Online Drivers'}
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

export default OnlineDrivers;
