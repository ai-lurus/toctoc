import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Link, router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/authStore";
import { loginSchema, type LoginFormData } from "@/utils/validation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { COLORS, SPACING, FONT_SIZE } from "@/lib/constants";

export default function LoginScreen() {
  const { signIn, isLoading } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signIn(data.email, data.password);
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message || "No se pudo iniciar sesión");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>Inicia sesión</Text>
            <Text style={styles.subtitle}>Bienvenido de nuevo</Text>
          </View>

          <View style={styles.form}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Correo electrónico"
                  placeholder="tu@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Contraseña"
                  placeholder="••••••••"
                  secureTextEntry
                  autoComplete="password"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.password?.message}
                />
              )}
            />

            <View style={styles.forgotRow}>
              <Link href="/(auth)/forgot-password" style={styles.forgotLink}>
                ¿Olvidaste tu contraseña?
              </Link>
            </View>

            <Button
              title="Iniciar sesión"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
              style={styles.button}
            />
          </View>

          <View style={styles.spacer} />

          <View style={styles.footer}>
            <Text style={styles.footerText}>¿No tienes cuenta? </Text>
            <Link href="/(auth)/role-selection" style={styles.link}>
              Regístrate
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: SPACING.lg,
    paddingTop: SPACING.xxl,
  },
  spacer: {
    flex: 1,
  },
  header: {
    marginBottom: SPACING.xl,
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
    marginTop: SPACING.xs,
  },
  form: {
    marginBottom: SPACING.lg,
  },
  forgotRow: {
    alignItems: "flex-end",
    marginBottom: SPACING.md,
  },
  forgotLink: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
    fontWeight: "500",
  },
  button: {
    marginTop: SPACING.xs,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: SPACING.lg,
  },
  footerText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  link: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
    fontWeight: "600",
  },
});
