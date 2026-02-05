import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACING, FONT_SIZE } from "@/lib/constants";

export default function ChatListScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Mensajes</Text>
      </View>
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No tienes conversaciones activas</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: SPACING.md },
  title: { fontSize: FONT_SIZE.xl, fontWeight: "700", color: COLORS.text },
  empty: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyText: { fontSize: FONT_SIZE.md, color: COLORS.textTertiary },
});
