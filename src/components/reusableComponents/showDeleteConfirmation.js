import { Alert } from 'react-native';

const showDeleteConfirmation = (id, deleteVehicleRequest) => {
  Alert.alert(
    'Confirmation',
    'Are you sure you want to delete this item?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          deleteVehicleRequest(id);
        },
        style: 'destructive',
      },
    ],
    { cancelable: false }
  );
};

export default showDeleteConfirmation;
