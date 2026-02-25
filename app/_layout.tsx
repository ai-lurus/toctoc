import { useEffect } from "react";
import { View, Text } from "react-native";
import { Stack, router, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useAuthStore } from "@/store/authStore";

SplashScreen.preventAutoHideAsync();

export function ErrorBoundary({ error, retry }: { error: Error; retry: () => void }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 8 }}>Algo salió mal</Text>
      <Text style={{ fontSize: 14, color: "#666", textAlign: "center" }}>{error.message}</Text>
    </View>
  );
}

export default function RootLayout() {
  const { initialize, isInitialized, session } = useAuthStore();
  const segments = useSegments();

  useEffect(() => {
    initialize().finally(() => {
      SplashScreen.hideAsync();
    });
  }, [initialize]);

  useEffect(() => {
    if (!isInitialized) return;

    const inProtectedGroup =
      segments[0] === "(client)" || segments[0] === "(provider)";

    if (!session && inProtectedGroup) {
      router.replace("/(auth)/login");
    }
  }, [isInitialized, session, segments]);

  if (!isInitialized) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(client)" />
        <Stack.Screen name="(provider)" />
      </Stack>
    </>
  );
}
