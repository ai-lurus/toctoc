import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACING, FONT_SIZE } from "@/lib/constants";

export default function TermsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Términos y Condiciones",
          headerTintColor: COLORS.text,
        }}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Términos y Condiciones de Uso</Text>
        <Text style={styles.updated}>Última actualización: Enero 2026</Text>

        <Text style={styles.sectionTitle}>1. Aceptación de los Términos</Text>
        <Text style={styles.body}>
          Al descargar, instalar o utilizar la aplicación TocToc, aceptas estar
          sujeto a estos Términos y Condiciones. Si no estás de acuerdo, no
          utilices la aplicación.
        </Text>

        <Text style={styles.sectionTitle}>2. Descripción del Servicio</Text>
        <Text style={styles.body}>
          TocToc es una plataforma que conecta a personas que necesitan
          servicios a domicilio con profesionales independientes que los
          ofrecen. TocToc actúa como intermediario y no es responsable directo
          de la prestación de los servicios.
        </Text>

        <Text style={styles.sectionTitle}>3. Registro y Cuenta</Text>
        <Text style={styles.body}>
          Para utilizar TocToc debes crear una cuenta proporcionando
          información veraz y actualizada. Eres responsable de mantener la
          confidencialidad de tu cuenta y contraseña.
        </Text>

        <Text style={styles.sectionTitle}>4. Pagos y Comisiones</Text>
        <Text style={styles.body}>
          Los pagos se procesan a través de Stripe. TocToc retiene una
          comisión del 20% sobre cada transacción completada. Los precios se
          muestran en pesos mexicanos (MXN).
        </Text>

        <Text style={styles.sectionTitle}>5. Cancelaciones</Text>
        <Text style={styles.body}>
          Los clientes pueden cancelar una solicitud antes de que sea aceptada
          por un proveedor sin costo. Una vez aceptada, aplican las políticas
          de cancelación vigentes.
        </Text>

        <Text style={styles.sectionTitle}>6. Contacto</Text>
        <Text style={styles.body}>
          Para cualquier duda o aclaración, contacta a soporte@toctoc.mx
        </Text>
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
    paddingBottom: SPACING.xxl,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  updated: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textTertiary,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
    color: COLORS.text,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  body: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
});
