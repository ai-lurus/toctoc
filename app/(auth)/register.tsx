import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { Link, router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/authStore";
import { registerSchema, type RegisterFormData } from "@/utils/validation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { COLORS, SPACING, FONT_SIZE } from "@/lib/constants";

export default function RegisterScreen() {
  const { signUp, isLoading } = useAuthStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await signUp(data.email, data.password, data.fullName);
      router.replace("/(auth)/role-selection");
    } catch (error: any) {
      Alert.alert("Error", error.message || "No se pudo crear la cuenta");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>Crear cuenta</Text>
            <Text style={styles.subtitle}>
              Regístrate para comenzar a usar TocToc
            </Text>
          </View>

          <View style={styles.form}>
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Nombre completo"
                  placeholder="Juan Pérez"
                  autoCapitalize="words"
                  autoComplete="name"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.fullName?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Email"
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
                  placeholder="Mínimo 6 caracteres"
                  secureTextEntry
                  autoComplete="new-password"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Confirmar contraseña"
                  placeholder="Repite tu contraseña"
                  secureTextEntry
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.confirmPassword?.message}
                />
              )}
            />

            <Text style={styles.terms}>
              Al registrarte aceptas nuestros{" "}
              <Link href="/(auth)/terms" style={styles.link}>
                Términos y Condiciones
              </Link>
            </Text>

            <Button
              title="Crear cuenta"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>¿Ya tienes cuenta? </Text>
            <Link href="/(auth)/login" style={styles.link}>
              Inicia sesión
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
    justifyContent: "center",
    padding: SPACING.lg,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: "700",
    color: COLORS.text,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  form: {
    marginBottom: SPACING.lg,
  },
  terms: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
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
