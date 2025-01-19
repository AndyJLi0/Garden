import { View, Text } from "react-native";
import Nav from "../../components/nav";
import { Tabs } from "expo-router";
import HomeIcon from "../../components/SVGs/HomeIcon";
import GachaIcon from "../../components/SVGs/GachaIcon";
import RecordIcon from "../../components/SVGs/RecordIcon";
import MapIcon from "../../components/SVGs/MapIcon";
import ProfileIcon from "../../components/SVGs/ProfileIcon";
import { StatusBar } from "expo-status-bar";
import { useRef, useEffect } from "react";
//import { callDuringRecord } from "../utilities/recordUtils";

export default function RootLayout() {
  // const locationUpdateIntervalRef = useRef(
  //   setInterval(() => {
  //     console.log("Location update interval");
  //     //callDuringRecord();
  //   }, 5000)
  // );

  // useEffect(() => {
  //   return () => {
  //     clearInterval(locationUpdateIntervalRef.current);
  //   };
  // }, [])

  // const onStopRecord = () => {
  //   clearInterval(locationUpdateIntervalRef.current);
  // }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <Nav {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <HomeIcon />,
        }}
      />
      <Tabs.Screen
        name="gacha"
        options={{
          title: "Gacha",
          tabBarIcon: ({ color }) => <GachaIcon />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => <RecordIcon />,
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: "Inventory",
          tabBarIcon: ({ color }) => <MapIcon />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <ProfileIcon />,
        }}
      />
    </Tabs>
  );
}
