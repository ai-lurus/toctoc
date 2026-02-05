import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/authStore";
import { COLORS, SPACING, FONT_SIZE } from "@/lib/constants";

export default function ProviderDashboard() {
  const { profile } = useAuthStore();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Hola, {profile?.full_name?.split(" ")[0] ?? ""}
        </Text>
        <Text style={styles.subtitle}>Solicitudes entrantes</Text>
      </View>
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No tienes solicitudes pendientes</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: SPACING.md },
  greeting: { fontSize: FONT_SIZE.xl, fontWeight: "700", color: COLORS.text },
  subtitle: { fontSize: FONT_SIZE.md, color: COLORS.textSecondary, marginTop: SPACING.xs },
  empty: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyText: { fontSize: FONT_SIZE.md, color: COLORS.textTertiary },
});
