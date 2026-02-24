import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from "@/lib/constants";

export default function RegisterErrorScreen() {
  const { role } = useLocalSearchParams<{ role: string }>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="close" size={48} color={COLORS.error} />
        </View>

        <Text style={styles.title}>Error al crear{"\n"}usuario</Text>

        <Text style={styles.message}>
          No se pudo completar el registro
        </Text>
        <Text style={styles.submessage}>
          Por favor, verifica tu información e intenta nuevamente
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace("/(auth)/login")}
            activeOpacity={0.7}
          >
            <Text style={styles.backLink}>
              Volver a <Text style={styles.backLinkBold}>Inicio</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.lg,
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: SPACING.md,
    lineHeight: 40,
  },
  message: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: SPACING.xs,
  },
  submessage: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textTertiary,
    textAlign: "center",
    marginBottom: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
  },
  actions: {
    width: "100%",
    gap: SPACING.md,
    alignItems: "center",
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: 16,
    alignItems: "center",
    width: "100%",
  },
  retryButtonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
    color: "#FFF",
  },
  backLink: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  backLinkBold: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});
