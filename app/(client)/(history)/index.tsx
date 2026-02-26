import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from "@/lib/constants";

const MOCK_UPCOMING = [
  {
    id: "1",
    providerName: "María López",
    providerRating: 4.8,
    status: "En camino",
    service: "Limpieza general",
    dateLabel: "Hoy · 3:00 PM",
    time: "3:00 - 5:00 PM · 2 horas",
    address: "Av. Vallarta 1234",
    price: "$240",
    avatarColor: "#4A89F3",
    avatarInitial: "M",
  },
  {
    id: "2",
    providerName: "Carlos Ruiz",
    providerRating: 4.6,
    status: "Confirmado",
    service: "Plomería",
    dateLabel: "Mañana · 10:00 AM",
    time: "10:00 - 12:00 PM · 2 horas",
    address: "Av. Vallarta 1234",
    price: "$350",
    avatarColor: "#10CE8A",
    avatarInitial: "C",
  },
];

const MOCK_PAST: typeof MOCK_UPCOMING = [];

type Tab = "proximas" | "pasadas";

function ReservationCard({
  item,
}: {
  item: (typeof MOCK_UPCOMING)[number];
}) {
  const isEnCamino = item.status === "En camino";

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={[styles.avatar, { backgroundColor: item.avatarColor }]}>
          <Text style={styles.avatarText}>{item.avatarInitial}</Text>
        </View>
        <View style={styles.cardHeaderInfo}>
          <Text style={styles.providerName}>{item.providerName}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={12} color={COLORS.secondary} />
            <Text style={styles.ratingText}>{item.providerRating}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, isEnCamino && styles.statusBadgeActive]}>
          {isEnCamino && <Ionicons name="navigate" size={11} color={COLORS.primary} />}
          <Text style={[styles.statusText, isEnCamino && styles.statusTextActive]}>
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.detail}>
        <Ionicons name="construct-outline" size={14} color={COLORS.textSecondary} />
        <Text style={styles.detailText}>{item.service}</Text>
      </View>
      <View style={styles.detail}>
        <Ionicons name="calendar-outline" size={14} color={COLORS.textSecondary} />
        <Text style={styles.detailText}>{item.dateLabel}</Text>
      </View>
      <View style={styles.detail}>
        <Ionicons name="location-outline" size={14} color={COLORS.textSecondary} />
        <Text style={styles.detailText}>{item.address}</Text>
      </View>

      <Text style={styles.price}>{item.price}</Text>

      <TouchableOpacity
        style={[styles.detailButton, isEnCamino && styles.detailButtonActive]}
        onPress={() =>
          isEnCamino
            ? router.push("/(client)/(history)/service-progress" as any)
            : router.push("/(client)/(history)/booking-detail" as any)
        }
      >
        <Text style={[styles.detailButtonText, isEnCamino && styles.detailButtonTextActive]}>
          {isEnCamino ? "Ver estado" : "Ver detalles"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function ReservasScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("proximas");
  const data = activeTab === "proximas" ? MOCK_UPCOMING : MOCK_PAST;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis Reservas</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "proximas" && styles.tabActive]}
          onPress={() => setActiveTab("proximas")}
        >
          <Text style={[styles.tabText, activeTab === "proximas" && styles.tabTextActive]}>
            Próximas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "pasadas" && styles.tabActive]}
          onPress={() => setActiveTab("pasadas")}
        >
          <Text style={[styles.tabText, activeTab === "pasadas" && styles.tabTextActive]}>
            Pasadas
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          data.length > 0 ? (
            <View style={styles.monthHeader}>
              <Text style={styles.monthHeaderText}>Febrero 2026</Text>
              <Ionicons name="chevron-down" size={14} color={COLORS.textSecondary} />
            </View>
          ) : null
        }
        renderItem={({ item }) => <ReservationCard item={item} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No hay reservas</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    borderBottomLeftRadius: BORDER_RADIUS.xl,
    borderBottomRightRadius: BORDER_RADIUS.xl,
    marginBottom: SPACING.md,
  },
  headerTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: "800",
    color: "#fff",
  },
  tabs: {
    flexDirection: "row",
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    backgroundColor: "#F3F4F6",
    borderRadius: BORDER_RADIUS.full,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: BORDER_RADIUS.full
  },
  tabActive: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    fontWeight: "500"
  },
  tabTextActive: {
    color: COLORS.primary,
    fontWeight: "700"
  },
  list: { paddingHorizontal: SPACING.lg, paddingBottom: 40 },
  monthHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
    marginBottom: SPACING.lg
  },
  monthHeaderText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: "600",
    color: COLORS.text
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: SPACING.sm },
  avatar: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", marginRight: 12 },
  avatarText: { color: "#fff", fontWeight: "700" },
  cardHeaderInfo: { flex: 1 },
  providerName: { fontSize: FONT_SIZE.sm, fontWeight: "700" },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  ratingText: { fontSize: FONT_SIZE.xs, color: COLORS.textSecondary },
  statusBadge: { backgroundColor: "#E8F5E9", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, flexDirection: "row", alignItems: "center", gap: 4 },
  statusBadgeActive: { backgroundColor: COLORS.primaryLight },
  statusText: { fontSize: 10, fontWeight: "700", color: "#388E3C" },
  statusTextActive: { color: COLORS.primary },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 12 },
  detail: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  detailText: { fontSize: FONT_SIZE.sm, color: COLORS.textSecondary },
  price: { fontSize: FONT_SIZE.md, fontWeight: "700", color: COLORS.primary, marginVertical: 8 },
  detailButton: { borderWidth: 1, borderColor: COLORS.primary, borderRadius: 8, paddingVertical: 10, alignItems: "center" },
  detailButtonActive: { backgroundColor: COLORS.primary },
  detailButtonText: { color: COLORS.primary, fontWeight: "600" },
  detailButtonTextActive: { color: "#fff" },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", marginTop: 40 },
  emptyTitle: { color: COLORS.textTertiary },
});
