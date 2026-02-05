import { Redirect } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export default function Index() {
  const { session, profile, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Not authenticated
  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  // Authenticated but no role selected
  if (!profile?.role) {
    return <Redirect href="/(auth)/role-selection" />;
  }

  // Route based on role
  if (profile.role === "provider") {
    return <Redirect href="/(provider)/(home)" />;
  }

  return <Redirect href="/(client)/(home)" />;
}
