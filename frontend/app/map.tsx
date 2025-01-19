import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const INITIAL_REGION = {
	latitude: 49.33,
	longitude: -123.2,
	latitudeDelta: 0.00005,
	longitudeDelta: 0.00005
};

export default function Map() {
  return (
    <View style={styles.container}>
      <Text>Map</Text>
      <MapView 
        style={styles.map}
        initialRegion={INITIAL_REGION}
        showsUserLocation
    />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden',
    },
    map: {
        width: '100%',
        height: '60%',
        borderRadius: 20,
        overflow: 'hidden',
    },
});