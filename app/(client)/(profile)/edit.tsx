import { View, Alert, ScrollView, Text, TouchableOpacity, TextInput } from "react-native";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/Button";
import { COLORS } from "@/lib/constants";
import { styles } from "./edit-styles";

const editProfileSchema = z.object({
  fullName: z.string().trim().min(2, "Ingresa tu nombre completo"),
  phone: z.string().trim().optional(),
  address: z.string().trim().optional(),
  reference: z.string().trim().optional(),
});

type EditProfileFormData = z.infer<typeof editProfileSchema>;

export default function EditProfileScreen() {
  const { profile, updateProfile, isLoading } = useAuthStore();
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      fullName: profile?.full_name ?? "",
      phone: profile?.phone ?? "",
      address: "",
      reference: "",
    },
  });

  const onSubmit = async (data: EditProfileFormData) => {
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
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Editar perfil</Text>
        </View>

        <TouchableOpacity
          style={styles.photoCard}
          activeOpacity={0.7}
          onPress={() => Alert.alert("Próximamente", "La edición de foto estará disponible pronto.")}
        >
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={36} color="#93C5FD" />
            </View>
            <View style={styles.avatarCameraBadge}>
              <Ionicons name="camera" size={12} color="#fff" />
            </View>
          </View>
          <Text style={styles.changePhotoText}>Cambiar foto</Text>
        </TouchableOpacity>

        <View style={styles.formCard}>
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Nombre completo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa tu nombre completo"
                  placeholderTextColor={COLORS.textTertiary}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
                {errors.fullName?.message ? <Text style={styles.errorText}>{errors.fullName.message}</Text> : null}
              </View>
            )}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Teléfono</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa tu teléfono"
                  placeholderTextColor={COLORS.textTertiary}
                  keyboardType="phone-pad"
                  value={value ?? ""}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              </View>
            )}
          />

          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Dirección</Text>
                <TextInput
                  style={[styles.input, styles.inputMultiline]}
                  placeholder="Ingresa tu dirección"
                  placeholderTextColor={COLORS.textTertiary}
                  value={value ?? ""}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  multiline
                />
              </View>
            )}
          />

          <Controller
            control={control}
            name="reference"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Referencia (opcional)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Referencia adicional"
                  placeholderTextColor={COLORS.textTertiary}
                  value={value ?? ""}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              </View>
            )}
          />
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Button title="Guardar cambios" onPress={handleSubmit(onSubmit)} loading={isLoading} />
      </View>
    </SafeAreaView>
  );
}
