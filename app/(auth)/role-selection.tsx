import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/authStore";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from "@/lib/constants";
import type { UserRole } from "@/types/enums";

const roles: {
  role: UserRole;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  {
    role: "client",
    title: "Cliente",
    description: "Solicito servicios para mi hogar",
    icon: "person-outline",
  },
  {
    role: "provider",
    title: "Proveedor",
    description: "Ofrece tus servicios profesionales",
    icon: "briefcase-outline",
  },
];

export default function RoleSelectionScreen() {
  const { setRole, isLoading, user } = useAuthStore();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedLabel = roles.find((r) => r.role === selectedRole)?.title ?? "";

  const handleContinue = () => {
    if (!selectedRole) return;
    setShowConfirm(true);
  };

  const handleConfirmRole = async () => {
    if (!selectedRole) return;

    if (!user) {
      setShowConfirm(false);
      router.push({
        pathname: "/(auth)/register",
        params: { role: selectedRole },
      });
    } else {
      try {
        await setRole(selectedRole);
        setShowConfirm(false);
        router.replace({
          pathname: "/(auth)/welcome",
          params: { role: selectedRole },
        });
      } catch (err: any) {
        setShowConfirm(false);
        setError(err.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Selecciona tu rol</Text>
        <Text style={styles.subtitle}>
          Elige cómo quieres usar TocToc. Esta decisión no se puede cambiar
          después.
        </Text>

        <View style={styles.cards}>
          {roles.map((item) => {
            const isSelected = selectedRole === item.role;
            return (
              <TouchableOpacity
                key={item.role}
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => {
                  setSelectedRole(item.role);
                  setError(null);
                }}
                activeOpacity={0.7}
                disabled={isLoading}
              >
                <View style={styles.cardHeader}>
                  <View
                    style={[
                      styles.iconCircle,
                      isSelected && styles.iconCircleSelected,
                    ]}
                  >
                    <Ionicons
                      name={item.icon}
                      size={28}
                      color={isSelected ? COLORS.primary : COLORS.textSecondary}
                    />
                  </View>
                  {isSelected && (
                    <View style={styles.checkCircle}>
                      <Ionicons name="checkmark" size={14} color="#FFF" />
                    </View>
                  )}
                </View>
                <Text
                  style={[
                    styles.cardTitle,
                    isSelected && styles.cardTitleSelected,
                  ]}
                >
                  {item.title}
                </Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {error && (
          <View style={styles.errorBanner}>
            <Ionicons name="alert-circle" size={16} color={COLORS.error} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, !selectedRole && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!selectedRole || isLoading}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={[styles.continueText, !selectedRole && styles.continueTextDisabled]}>
              Continuar
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <Modal
        visible={showConfirm}
        transparent
        animationType="slide"
        onRequestClose={() => setShowConfirm(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setShowConfirm(false)}>
          <Pressable style={styles.sheet} onPress={() => {}}>
            <View style={styles.sheetHandle} />

            <View style={styles.sheetIconCircle}>
              <Ionicons
                name={selectedRole === "provider" ? "briefcase-outline" : "person-outline"}
                size={36}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.sheetTitle}>
              ¿Confirmas tu rol como{"\n"}
              {selectedLabel}?
            </Text>

            <View style={styles.warningBanner}>
              <Ionicons name="warning" size={18} color="#D97706" />
              <Text style={styles.warningText}>
                Importante: No podrás cambiar tu rol después de confirmar esta
                selección.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmRole}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowConfirm(false)}
              disabled={isLoading}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: SPACING.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xl,
    lineHeight: 22,
  },
  cards: {
    gap: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  cardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: "#F0F6FF",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING.sm,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircleSelected: {
    backgroundColor: "#DBEAFE",
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "600",
    color: COLORS.text,
  },
  cardTitleSelected: {
    color: COLORS.primary,
  },
  cardDescription: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    backgroundColor: "#FEF2F2",
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginTop: SPACING.md,
  },
  errorText: {
    flex: 1,
    fontSize: FONT_SIZE.sm,
    color: COLORS.error,
  },
  footer: {
    padding: SPACING.lg,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: 16,
    alignItems: "center",
  },
  continueButtonDisabled: {
    backgroundColor: COLORS.border,
  },
  continueText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
    color: "#FFF",
  },
  continueTextDisabled: {
    color: COLORS.textTertiary,
  },

  // Bottom sheet
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: SPACING.lg,
    paddingBottom: 40,
    alignItems: "center",
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  sheetIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.md,
  },
  sheetTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: SPACING.lg,
  },
  warningBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    backgroundColor: "#FFFBEB",
    borderWidth: 1,
    borderColor: "#FDE68A",
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    width: "100%",
  },
  warningText: {
    flex: 1,
    fontSize: FONT_SIZE.sm,
    color: "#92400E",
    lineHeight: 20,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: 16,
    alignItems: "center",
    width: "100%",
    marginBottom: SPACING.sm,
  },
  confirmButtonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
    color: "#FFF",
  },
  cancelButton: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: 16,
    alignItems: "center",
    width: "100%",
  },
  cancelButtonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
});
