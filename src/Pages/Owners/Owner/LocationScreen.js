import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const LocationScreen = ({navigation, route}) => {
  const {latitude, longitude} = route.params;
  console.log('location screen:', route.params);
  const initialRegion = {
    latitude: latitude ? parseFloat(latitude) : 37.78825, // Replace with your initial latitude
    longitude: longitude ? parseFloat(longitude) : -122.4324, // Replace with your initial longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        // Other MapView props can be added here
      >
        {/* Example Marker */}
        <Marker
          coordinate={{
            latitude: latitude ? parseFloat(latitude) : 37.78825, // Replace with marker latitude
            longitude: longitude ? parseFloat(longitude) : -122.4324, // Replace with marker longitude
          }}
          title="Marker Title"
          description="Marker Description"
        />
        {/* Additional markers can be added similarly */}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default LocationScreen;
