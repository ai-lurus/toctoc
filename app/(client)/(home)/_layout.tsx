import { Platform } from "react-native";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        ...(Platform.OS === "android" && { statusBarTranslucent: true }),
      }}
    />
  );
}
