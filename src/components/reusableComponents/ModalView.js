import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import NavigationPopUpCard from '../cards/NavigationPopUpCard';
import CancelCard from '../cards/CancelCard';
import MessageCard from '../cards/MessageCard';

const ModalView = ({
  navigationPopUpList,
  isNavigationPopUp = false,
  isCancelCard = false,
  isMessageCard = false,
  label,
  description,
  handleNavigation,
  handleCancelCardNavigation,
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isNavigationPopUp || isCancelCard || isMessageCard}>
        {isNavigationPopUp ? (
          <NavigationPopUpCard navigationPopUpList={navigationPopUpList} />
        ) : isCancelCard ? (
          <CancelCard
            handleNavigation={handleCancelCardNavigation}
            label={label}
            description={description}
          />
        ) : isMessageCard ? (
          <MessageCard label={label} description={description}   handleNavigation={handleCancelCardNavigation}/>
        ) : null}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {

    justifyContent: 'center',
    alignItems: 'center',

  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background to capture touches
  },
});

export default ModalView;
