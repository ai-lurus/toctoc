import { View, Text, StyleSheet, Alert, Platform } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/Button";
import { formatRating } from "@/utils/format";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from "@/lib/constants";

export default function ProviderProfileScreen() {
  const { profile, signOut, isLoading } = useAuthStore();

  const handleSignOut = () => {
    if (Platform.OS === "web") {
      if (!window.confirm("¿Estás seguro que quieres cerrar sesión?")) return;
      signOut().then(() => router.replace("/(auth)/login"));
      return;
    }

    Alert.alert("Cerrar sesión", "¿Estás seguro que quieres salir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Salir",
        style: "destructive",
        onPress: async () => {
          await signOut();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Perfil</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color={COLORS.primary} />
        </View>
        <Text style={styles.name}>{profile?.full_name}</Text>
        <Text style={styles.email}>{profile?.email}</Text>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>
              {formatRating(profile?.avg_rating ?? 0)}
            </Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{profile?.total_reviews ?? 0}</Text>
            <Text style={styles.statLabel}>Reseñas</Text>
          </View>
        </View>

        {profile?.bio && <Text style={styles.bio}>{profile.bio}</Text>}
      </View>

      <View style={styles.actions}>
        <Button
          title="Cerrar sesión"
          variant="ghost"
          onPress={handleSignOut}
          loading={isLoading}
          textStyle={{ color: COLORS.error }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: SPACING.md },
  title: { fontSize: FONT_SIZE.xl, fontWeight: "700", color: COLORS.text },
  profileCard: {
    alignItems: "center",
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: COLORS.primary + "15",
    alignItems: "center", justifyContent: "center", marginBottom: SPACING.md,
  },
  name: { fontSize: FONT_SIZE.lg, fontWeight: "600", color: COLORS.text },
  email: { fontSize: FONT_SIZE.sm, color: COLORS.textSecondary, marginTop: SPACING.xs },
  stats: { flexDirection: "row", marginTop: SPACING.md, gap: SPACING.xl },
  stat: { alignItems: "center" },
  statValue: { fontSize: FONT_SIZE.lg, fontWeight: "700", color: COLORS.primary },
  statLabel: { fontSize: FONT_SIZE.xs, color: COLORS.textSecondary, marginTop: 2 },
  bio: { fontSize: FONT_SIZE.sm, color: COLORS.textSecondary, textAlign: "center", marginTop: SPACING.md },
  actions: { paddingHorizontal: SPACING.lg, marginTop: SPACING.lg },
});
