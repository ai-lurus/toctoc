import { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, FONT_SIZE } from "@/lib/constants";

export default function WelcomeScreen() {
  const { role } = useLocalSearchParams<{ role: string }>();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/");
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const panelName = role === "provider" ? "proveedor" : "cliente";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons
            name="checkmark-circle"
            size={72}
            color={COLORS.primary}
          />
        </View>

        <Text style={styles.title}>
          ¡Bienvenido{"\n"}a Toctoc!
        </Text>

        <Text style={styles.message}>
          Tu perfil ha sido creado exitosamente
        </Text>

        <Text style={styles.redirect}>
          Redirigiendo a tu panel de {panelName}...
        </Text>

        <ActivityIndicator
          size="small"
          color={COLORS.primary}
          style={styles.loader}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.lg,
  },
  iconCircle: {
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
  redirect: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textTertiary,
    textAlign: "center",
    marginBottom: SPACING.lg,
  },
  loader: {
    marginTop: SPACING.sm,
  },
});
