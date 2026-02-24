import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Linking,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/authStore";
import { COLORS, SPACING } from "@/lib/constants";
import { styles } from "./styles";

export default function ProfileScreen() {
  const { profile, signOut, isLoading } = useAuthStore();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const insets = useSafeAreaInsets();

  const handleSignOut = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro que quieres salir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Salir",
        style: "destructive",
        onPress: async () => {
          await signOut();
          router.replace("/");
        },
      },
    ]);
  };

  const handleChangePassword = () => {
    Alert.alert(
      "Cambiar contraseña",
      "Se enviará un correo para restablecer tu contraseña.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Enviar correo", onPress: () => {} },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + SPACING.sm }]}>
          <Text style={styles.headerTitle}>Perfil</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color={COLORS.textTertiary} />
          </View>
          <Text style={styles.profileName}>
            {profile?.full_name ?? "Usuario"}
          </Text>
          <Text style={styles.profileEmail}>
            {profile?.email ?? ""}
          </Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.push("/(client)/(profile)/edit")}
            activeOpacity={0.7}
          >
            <Text style={styles.editButtonText}>Editar perfil</Text>
          </TouchableOpacity>
        </View>

        {/* Datos personales */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Datos personales</Text>

          <View style={[styles.row, styles.rowBorder]}>
            <View style={styles.rowLeft}>
              <View style={styles.rowIcon}>
                <Ionicons name="call-outline" size={18} color={COLORS.textSecondary} />
              </View>
              <Text style={styles.rowLabel}>Teléfono</Text>
            </View>
            <Text style={styles.rowValue}>
              {profile?.phone ?? "No registrado"}
            </Text>
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={styles.rowIcon}>
                <Ionicons name="location-outline" size={18} color={COLORS.textSecondary} />
              </View>
              <Text style={styles.rowLabel}>Dirección</Text>
            </View>
            <Text style={styles.rowValue} numberOfLines={1}>
              Sin dirección
            </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.rowAction}>Cambiar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Métodos de pago */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Métodos de pago</Text>

          <View style={styles.paymentRow}>
            <View style={styles.paymentInfo}>
              <Ionicons name="card-outline" size={20} color={COLORS.text} />
              <View style={styles.paymentDetails}>
                <Text style={styles.paymentCard}>Visa •••• 4242</Text>
                <Text style={styles.paymentExpiry}>Vence: 12/26</Text>
              </View>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.rowAction}>Cambiar</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.addCardButton} activeOpacity={0.7}>
            <Text style={styles.addCardText}>+ Agregar nueva tarjeta</Text>
          </TouchableOpacity>
        </View>

        {/* Seguridad */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Seguridad</Text>

          <View style={[styles.row, styles.rowBorder]}>
            <View style={styles.rowLeft}>
              <Text style={styles.rowLabel}>Contraseña</Text>
            </View>
            <Text style={styles.rowValue}>••••••••</Text>
            <TouchableOpacity onPress={handleChangePassword} activeOpacity={0.7}>
              <Text style={styles.rowAction}>Cambiar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Text style={styles.rowLabel}>Verificación</Text>
            </View>
            <View style={styles.verifiedRow}>
              <Text style={styles.verifiedText}>Correo verificado</Text>
              <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
            </View>
          </View>
        </View>

        {/* Preferencias */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Preferencias</Text>

          <View style={[styles.switchRow, styles.rowBorder]}>
            <Text style={styles.rowLabel}>Notificaciones</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: COLORS.border, true: COLORS.success }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.rowLabel}>Idioma</Text>
            <Text style={styles.rowValue}>Español</Text>
          </View>
        </View>

        {/* Soporte */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Soporte</Text>

          <TouchableOpacity
            style={[styles.linkRow, styles.linkRowBorder]}
            activeOpacity={0.7}
          >
            <Text style={styles.linkText}>Centro de ayuda</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.linkRow, styles.linkRowBorder]}
            activeOpacity={0.7}
          >
            <Text style={styles.linkText}>Contactar soporte</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkRow} activeOpacity={0.7}>
            <Text style={styles.linkText}>Términos y condiciones</Text>
          </TouchableOpacity>
        </View>

        {/* Cerrar sesión */}
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={handleSignOut}
          disabled={isLoading}
          activeOpacity={0.7}
        >
          <Text style={styles.signOutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
