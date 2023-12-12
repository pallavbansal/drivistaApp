import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import { commonStyles } from '../../constants/globalStyles';
import { compressImage } from './compressImage';
 import CustomFlashMessage from './showMessage';

export default function UploadComp({ handleImageUplaod }) {

  const [image, setImage] = useState(null); // Changed state to single image
  const navigation = useNavigation();

  const TostMessage = () => {
    ToastAndroid.show('Successfully uploaded!', ToastAndroid.SHORT);
  };
  const showFlashMessage = message => {
    CustomFlashMessage({
      message: 'Error',
      description: message,
      status: 'danger',
    });
  };
  const openPicker = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        maxSelectedAssets: 1, // Limit selection to one image
      });
      console.log('response: ', response);
      if (response.length > 0) {

        const maxSizeInBytes = 1.5 * 1024 * 1024; // 1.5MB
      if (response[0].size <= maxSizeInBytes) {
        setImage(response[0]);
        handleImageUplaod(response[0]);
      }else{
        showFlashMessage('image is greater size than 1.5 mb!!');
      }
      }
    } catch (e) {
      console.log(e.code, e.message);
    }
  };

  const onDelete = () => {
    setImage(null);
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
        }}>
        <TouchableOpacity onPress={openPicker}>
          <Ionic name="images" style={{ fontSize: 25, color: '#69ABC3' }} />
        </TouchableOpacity>
        <Text onPress={openPicker} style={[
                  commonStyles.fileInputTextWrap,
                  {
                    color: 'black'
                  },
                ]} > Upload Your Government ID Image</Text>
      </View>
      <View style={style.container}>
        {image && (
          <View>
            <Image
              source={{ uri: image?.path }}
              style={style.media}
            />
            <TouchableOpacity
              onPress={onDelete}
              activeOpacity={0.9}
              style={style.buttonDelete}
            >
              <Text style={style.titleDelete}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  media: {
    width: '100%',
    height: 200,
    marginBottom: 6,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  buttonDelete: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#ffffff92',
    borderRadius: 4,
  },
  titleDelete: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#000',
  },
  textWrap: {
    fontFamily: 'Verdana',
    fontSize: 9,
    fontStyle: 'italic',
  },
});
