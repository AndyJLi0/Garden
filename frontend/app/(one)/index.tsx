import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import RoseBlooming from "../../components/SVGs/Rose/RoseBlooming";
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
} from "../../utilities/themeColors";
import { convertMinutesToHoursAndMinutes } from "../../utilities/convertMinToHandM";

export default function Home() {
  useFonts({
    JosefinSans_400Regular,
    JosefinSans_700Bold,
  });

  const user = {
    name: "Jim",
    session: {
      walked: 30,
      time: 150,
    },
  };

  const hm = convertMinutesToHoursAndMinutes(user.session.time);
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
          fontFamily: "JosefinSans_400Regular",
          fontSize: header2size,
          color: textPrimary,
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
          marginTop: 0
        }}>
        Tulip
      </Text>

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

      <StatusBar style="inverted" />
    </View>
  );
}
