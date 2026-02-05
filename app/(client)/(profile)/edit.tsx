import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { router, Stack } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/authStore";
import { profileSchema, type ProfileFormData } from "@/utils/validation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { COLORS, SPACING } from "@/lib/constants";

export default function EditProfileScreen() {
  const { profile, updateProfile, isLoading } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: profile?.full_name ?? "",
      phone: profile?.phone ?? "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile({
        full_name: data.fullName,
        phone: data.phone || null,
      });
      Alert.alert("Listo", "Perfil actualizado correctamente");
      router.back();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Editar Perfil",
          headerTintColor: COLORS.text,
        }}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Nombre completo"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.fullName?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Teléfono"
              placeholder="10 dígitos"
              keyboardType="phone-pad"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value ?? ""}
              error={errors.phone?.message}
            />
          )}
        />

        <Button
          title="Guardar cambios"
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
  },
});
