import React,{useState} from 'react';
import { View,StyleSheet,Text,TouchableOpacity,ToastAndroid,Image,TextInput,FlatList,Dimensions,SafeAreaView} from 'react-native';
import Space from './Space';
import Ionic from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';

export default function UploadComp() {

  const [images, setImages] = useState([]);
  const navigation = useNavigation();
  const TostMessage = () => {
    ToastAndroid.show('Sucessfully !', ToastAndroid.SHORT);
  };

  const openPicker = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        selectedAssets: images,
        isExportThumbnail: true,
        maxVideo: 1,
        usedCameraButton: true,
        maxVideoDuration:60,
        maxSelectedAssets:5,
        isExportThumbnail:true,
      });
      console.log('response: ', response);
      setImages(response);
    } catch (e) {
      console.log(e.code, e.message);
    }
  };

  const onDelete = (value) => {
    const data = images.filter(
      (item) =>
        item?.localIdentifier &&
        item?.localIdentifier !== value?.localIdentifier
    );
    setImages(data);
  };
  const renderItem = ({ item, index }) => {
    return (
      <View>
        <Image
          width={IMAGE_WIDTH}
          source={{ uri: item?.type === 'video' ? item?.thumbnail ?? '' :  (item.path)}}
          style={style.media}
        />
        <TouchableOpacity
          onPress={() => onDelete(item)}
          activeOpacity={0.9}
          style={style.buttonDelete}
        >
          <Text style={style.titleDelete}>X</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionic name="close-outline" style={{fontSize: 35}} />
          </TouchableOpacity>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Create Post</Text>
          <TouchableOpacity
            onPress={() => {
              TostMessage();
              navigation.goBack();
            }}>
            <Ionic name="checkmark" style={{fontSize: 35, color: '#3493D9'}} />
          </TouchableOpacity>
        </View>
        <Space></Space>
        <View>
          <TextInput
              multiline
              color="black"
              placeholderTextColor={'black'}
              numberOfLines={8}
              placeholder="What's on your mind ?"
              style={{
              fontSize: 19,
              fontWeight:'700',
              borderWidth: 0.5,
              paddingLeft:15,
              borderRadius:5,
              borderColor: '#CDCDCD',
              textAlignVertical: 'top'
              }}
          />
        </View>
        <View style={{marginVertical:10}}>
          <TextInput
           color="black"
           placeholderTextColor={'black'}
              placeholder="Make your trend- Add #tags"
              style={{
              fontSize: 16,
              fontWeight:'600',
              borderWidth: 0.5,
              paddingLeft:15,
              borderRadius:5,
              borderColor: '#CDCDCD',
              textAlignVertical: 'top'
              }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
          }}>
          <TouchableOpacity onPress={openPicker}>
            <Ionic name="images" style={{fontSize: 25,color:'#69ABC3'}} />
          </TouchableOpacity>
          <Text style={{fontSize: 16, fontWeight: '700',color:'#666666'}}> Image/Video</Text>
        </View>
        <SafeAreaView style={style.container}>
          <FlatList
            style={[
              style.container,
              {
                paddingTop: 6,
              },
            ]}
            data={images}
            keyExtractor={(item, index) => (item?.filename ?? item?.path) + index}
            renderItem={renderItem}
            numColumns={3}
          />
        </SafeAreaView>
    </View>
  );
}

const { width } = Dimensions.get('window');

const IMAGE_WIDTH = (width - 80) / 3;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 24,
  },
  media: {
    marginLeft: 6,
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    marginBottom: 6,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  bottom: {
    padding: 24,
  },
  openText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    paddingVertical: 12,
  },
  openPicker: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
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
});