import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Colors} from '../../../constants/colors';
import StatusCard from '../../../components/cards/StatusCard';
// import CustomCard from '../../components/cards/CustomCard';
import HeaderContainer from '../../../components/reusableComponents/Container/HeaderContainer';
import FooterContainer from '../../../components/reusableComponents/Container/FooterContainer';
import userLogo from '../../../storage/images/user.png';
import BreakDetailsCard from '../../../components/cards/BreakDetailsCard';
import {useDriverOnlineServiceHook} from '../../../services/hooks/auth/useDriverOnlineServiceHook';
import {useAuthServiceHook} from '../../../services/hooks/auth/useAuthServiceHook';
import {navigationPopUpList} from '../../../constants/navigation';
import NotFound from '../../../components/reusableComponents/NotFound';
import Spinner from '../../../components/reusableComponents/Spinner';
import Alert from '../../../components/reusableComponents/Alert';

const OnlineDrivers = ({navigation}) => {
  const {
    loading,
    setLoading,
    fetchOnlineDriversRequest,
    alertVisible,
    setAlertVisible,
    alertMessage,
    setAlertMessage,
    closeAlert,
    handleOK,
    showAlert,
  } = useDriverOnlineServiceHook();
  const {logoutRequest} = useAuthServiceHook();
  const [data, setData] = useState([]);
  //  const [editable, setEditable] = useState(false);
  const labels = {
    navigateBackScreen: '',
  };
  const [expandedCard, setExpandedCard] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchOnlineDriversRequest();
        console.log('response fetchOnlineDriversRequest:', response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching online drivers:', error);
      }
    };
    setLoading(true);
    fetchData();
  }, []);

  const handleLocationNavigation = item => {
    if (item.latitude && item.longitude) {
      navigation.navigate('LocationScreen', {
        latitude: item.latitude,
        longitude: item.longitude,
      });
    } else {
      showAlert('No Data Available to show location!!');
    }
  };

  const handleCardClick = index => {
    setExpandedCard(expandedCard === index ? null : index);
  };
  const handlePopUpNavigation = navigateScreen => {
    if (navigateScreen === 'logout') {
      logoutRequest();
    } else {
      navigation.navigate(navigateScreen);
    }
  };

  const renderCards = () => {
    return data.map((item, index) => (
      <View>
        <TouchableOpacity key={index} onPress={() => handleCardClick(index)}>
          <StatusCard
            imageLink={userLogo}
            textName={item.first_name}
            {...item}
            handleNavigation={id => handleCardClick(index)}
          />
        </TouchableOpacity>

        {expandedCard === index && (
          <View style={styles.statusCardContainer}>
            <BreakDetailsCard
              breakData={item.breaks}
              handleNavigation={() => handleLocationNavigation(item)}
            />
          </View>
        )}
      </View>
    ));
  };
  const renderSpinner = () => {
    if (loading) {
      return <Spinner />;
    }
    return null;
  };

  return (
    <View style={styles.mainContainer}>
      {renderSpinner()}
      <HeaderContainer
        labels={labels}
        showPopUp={true}
        showBackArrow={true}
        showLabel={true}
        showBackground={true}
        label={'Online Drivers'}
        containerStyle={styles.headContainer}
        handleNavigation={handlePopUpNavigation}
        handleBackNavigation={labels.handleDirectNavigation}
        navigationPopUpList={navigationPopUpList}
      />

      {data.length > 0 && !loading ? (
        <View style={styles.cardContainer}>{renderCards()}</View>
      ) : !loading ? (
        <NotFound />
      ) : (
        ''
      )}
      <FooterContainer containerStyle={styles.footerContainer} />
      <Alert
        visible={alertVisible}
        message={alertMessage}
        onClose={closeAlert}
        onOK={handleOK}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.containerBg,
  },
  headContainer: {
    flex: 0.1,
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
