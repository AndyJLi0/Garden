import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import RoseBlooming from "../components/SVGs/Rose/RoseBlooming";
import { useFonts } from "expo-font";
import {
  JosefinSans_400Regular,
  JosefinSans_700Bold,
} from "@expo-google-fonts/josefin-sans";
import {
  appBeige,
  header1size,
  header2size,
  textPrimary,
  textSecondary,
} from "../utilities/themeColors";

export default function Home() {
  useFonts({
    JosefinSans_400Regular,
    JosefinSans_700Bold,
  });

  const user = {
    name: "Jim",
    session: {
      walked: 30,
      time: 180,
    },
  };

  const flower = <RoseBlooming />;

  return (
    <View
      style={{
        height: "100%",
        paddingHorizontal: 40,
        paddingTop: 80,
        backgroundColor: appBeige,
      }}
    >
      <Text
        style={{
          fontFamily: "JosefinSans_700Bold",
          fontSize: header1size,
          color: textPrimary,
          textAlign: "center",
        }}
      >
        {user.name}'s Garden
      </Text>
      <View
        style={{
          alignItems: "center",
          paddingVertical: 60,
        }}
      >
        {flower}
      </View>
      <Text
        style={{
          fontFamily: "JosefinSans_700Bold",
          fontSize: header2size,
          color: textPrimary,
        }}
      >
        Today
      </Text>
      <Text
        style={{
          fontFamily: "JosefinSans_700Bold",
          fontSize: header2size,
          color: textSecondary,
        }}
      >
        Km walked: {user.session.walked}
      </Text>
      <Text
        style={{
          fontFamily: "JosefinSans_700Bold",
          fontSize: header2size,
          color: textSecondary,
        }}
      >
        Time: {user.session.time}
      </Text>

      <StatusBar style="inverted" />
    </View>
  );
}
