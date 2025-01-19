import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useLinkingURL } from "expo-linking";
import { Pressable, View, Text, ViewStyle } from "react-native";

export default function Nav({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View style={tabBarStyles}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label = options.title !== undefined ? options.title : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) {
          return null;
        }

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",

            target: route.key,

            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",

            target: route.key,
          });
        };

        const icon = options.tabBarIcon
          ? options.tabBarIcon({
              focused: isFocused,
              color: "#000", // doesn't matter
              size: 24,
            })
          : null;

        return (
          <Pressable
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              transform: !isFocused ? [{ scale: 0.8 }] : [],
            }}
          >
            {icon}
          </Pressable>
        );
      })}
    </View>
  );
}

const tabBarStyles: ViewStyle = {
  position: "absolute",
  bottom: 0,
  flexDirection: "row",
  justifyContent: "space-between",
  backgroundColor: "#fff",
  borderTopLeftRadius: 25,
  borderTopRightRadius: 25,
};
