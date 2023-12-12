// ItemComponent.js
import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import baseUrl from '../services/baseUrl';

const ItemComponent = ({data, navigation,handlePackageData}) => {
  return (
    <View style={{marginHorizontal:2,width:150,height:200}}>
      <TouchableOpacity onPress={()=>handlePackageData(data)}>
        <Image
          source={{
            uri:
              baseUrl.IMAGE_URL +
              '/' +
              // eslint-disable-next-line react/prop-types
              data.PackageAdImagePath,
          }}
          style={{height:100}}
        />
        <View style={{}}>
        <Text style={styles.textWrap} >
          Package Route:  {data.ItineraryDetail} .
        </Text>
        <Text style={styles.textWrap} wrap={true}>
          Package Discount: {data.PackageDuration}
        </Text>
        <Text style={styles.textWrap} wrap={true}>
          Package Price: {data.PackagePrice}
        </Text>
        <Text style={styles.textWrap} wrap={true}>
          Package Discount: {data.PackageDiscount}
        </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textWrap: {
    width: 150,
    color:'gray',
    fontWeight: 'bold',
    fontSize: 12,
    fontFamily: 'Verdana',
    fontStyle: 'normal',
    marginBottom:2
  },
});
ItemComponent.propTypes = {
  // test: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default ItemComponent;
