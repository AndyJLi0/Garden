import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import {
  appBeige,
  header1size,
  header2size,
  textPrimary,
  textSecondary,
} from "../utilities/themeColors";
import { convertMinutesToHoursAndMinutes } from "../utilities/convertMinToHandM";

const user = {
  name: "Jim",
  session: {
    walked: 30,
    time: 150,
    steps: 200
  },
};

const INITIAL_REGION = {
	latitude: 49.31,
	longitude: -123.2,
	latitudeDelta: 0.005,
	longitudeDelta: 0.005
};

export default function Map() {
  const hm = convertMinutesToHoursAndMinutes(user.session.time);
  
  return (
    <View style={styles.container}>
      <Text style={ styles.title }>Map</Text>
      <MapView 
        style={styles.map}
        initialRegion={INITIAL_REGION}
        showsUserLocation
      />

      <Text
        style={{
          fontFamily: "JosefinSans_700Bold",
          fontSize: header2size,
          color: textPrimary,
        }}
      >
        Today
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            fontFamily: "JosefinSans_700Bold",
            fontSize: header2size,
            color: textSecondary,
          }}
        >
          Km walked:{" "}
        </Text>
        <Text
          style={{
            fontFamily: "JosefinSans_400Regular",
            fontSize: header2size,
            color: textSecondary,
          }}
        >
          {user.session.walked}km
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontFamily: "JosefinSans_700Bold",
            fontSize: header2size,
            color: textSecondary,
          }}
        >
          Time:{" "}
        </Text>
        <Text
          style={{
            fontFamily: "JosefinSans_400Regular",
            fontSize: header2size,
            color: textSecondary,
          }}
        >
          {hm.hours}h {hm.minutes}m
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            fontFamily: "JosefinSans_700Bold",
            fontSize: header2size,
            color: textSecondary,
          }}
        >
          Steps:{" "}
        </Text>
        <Text
          style={{
            fontFamily: "JosefinSans_400Regular",
            fontSize: header2size,
            color: textSecondary,
          }}
        >
          {user.session.steps} steps
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderRadius: 20,
      overflow: 'hidden',
      //justifyContent: 'center', //vertical align
      height: "100%",
      paddingHorizontal: 20,
      paddingTop: 80,
      backgroundColor: appBeige,
    },
    map: {
        width: '100%',
        height: '60%',
        borderRadius: 20,
        overflow: 'hidden',
    },
    title: {
      fontFamily: "JosefinSans_700Bold",
      fontSize: header1size,
      color: textPrimary,
      textAlign: "center",
    },
});