import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/authStore";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from "@/lib/constants";
import type { UserRole } from "@/types/enums";

const roles: { role: UserRole; title: string; description: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  {
    role: "client",
    title: "Busco servicios",
    description: "Quiero contratar profesionales para mi hogar u oficina",
    icon: "search",
  },
  {
    role: "provider",
    title: "Ofrezco servicios",
    description: "Soy profesional y quiero ofrecer mis servicios",
    icon: "construct",
  },
];

export default function RoleSelectionScreen() {
  const { setRole, isLoading, user } = useAuthStore();

  const handleSelectRole = async (role: UserRole) => {
    Alert.alert(
      "Confirmar rol",
      `¿Estás seguro? Esta elección no se puede cambiar después.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          onPress: async () => {
            try {
              await setRole(role);
              router.replace("/");
            } catch (error: any) {
              Alert.alert("Error", error.message);
            }
          },
        },
      ],
    );
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>¿Cómo quieres usar TocToc?</Text>
        <Text style={styles.subtitle}>
          Selecciona tu rol. Esta elección es permanente.
        </Text>

        <View style={styles.cards}>
          {roles.map((item) => (
            <TouchableOpacity
              key={item.role}
              style={styles.card}
              onPress={() => handleSelectRole(item.role)}
              activeOpacity={0.7}
              disabled={isLoading}
            >
              <Ionicons name={item.icon} size={40} color={COLORS.primary} />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  cards: {
    gap: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "600",
    color: COLORS.text,
    marginTop: SPACING.md,
  },
  cardDescription: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: SPACING.xs,
  },
});
