import { View, Text } from "react-native";
import Nav from "../../components/nav";
import { Tabs } from "expo-router";
import HomeIcon from "../../components/SVGs/HomeIcon";
import GachaIcon from "../../components/SVGs/GachaIcon";
import RecordIcon from "../../components/SVGs/RecordIcon";
import MapIcon from "../../components/SVGs/MapIcon";
import ProfileIcon from "../../components/SVGs/ProfileIcon";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <Nav {...props} />}
    >
      <Tabs.Screen
        name="friend"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <HomeIcon />,
        }}
      />
      <Tabs.Screen
        name="gacha2"
        options={{
          title: "Gacha",
          tabBarIcon: ({ color }) => <GachaIcon />,
        }}
      />
      <Tabs.Screen
        name="record2"
        options={{
          title: "Record",
          tabBarIcon: ({ color }) => <RecordIcon />,
        }}
      />
      <Tabs.Screen
        name="map2"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => <MapIcon />,
        }}
      />
      <Tabs.Screen
        name="profile2"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <ProfileIcon />,
        }}
      />
    </Tabs>
  );
}
