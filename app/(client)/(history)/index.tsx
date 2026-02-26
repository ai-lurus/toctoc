import { useMemo, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";

type ReservationStatus = "upcoming" | "past";

interface ReservationItem {
  id: string;
  providerName: string;
  rating: number;
  status: ReservationStatus;
  statusText: string;
  service: string;
  datetime: string;
  address: string;
  price: string;
  month: string;
}

const RESERVATIONS: ReservationItem[] = [
  {
    id: "1",
    providerName: "María López",
    rating: 4.9,
    status: "upcoming",
    statusText: "En camino",
    service: "Limpieza general",
    datetime: "Hoy · 3:00 PM",
    address: "Av. Vallarta 1234",
    price: "$240",
    month: "Febrero 2026",
  },
  {
    id: "2",
    providerName: "Carlos Ruiz",
    rating: 4.8,
    status: "upcoming",
    statusText: "Confirmado",
    service: "Plomería",
    datetime: "Mañana · 10:00 AM",
    address: "Av. Vallarta 1234",
    price: "$350",
    month: "Febrero 2026",
  },
  {
    id: "3",
    providerName: "Ana Torres",
    rating: 4.7,
    status: "past",
    statusText: "Completado",
    service: "Limpieza profunda",
    datetime: "16 Feb · 9:30 AM",
    address: "Col. Americana 456",
    price: "$420",
    month: "Febrero 2026",
  },
  {
    id: "4",
    providerName: "Jorge Ramos",
    rating: 4.6,
    status: "past",
    statusText: "Completado",
    service: "Instalación eléctrica",
    datetime: "28 Ene · 6:00 PM",
    address: "Providencia 889",
    price: "$580",
    month: "Enero 2026",
  },
];

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<ReservationStatus>("upcoming");
  const [selectedMonth, setSelectedMonth] = useState("Febrero 2026");

  const monthOptions = useMemo(
    () => Array.from(new Set(RESERVATIONS.map((reservation) => reservation.month))),
    []
  );

  const filteredReservations = useMemo(
    () =>
      RESERVATIONS.filter(
        (reservation) =>
          reservation.status === activeTab && reservation.month === selectedMonth
      ),
    [activeTab, selectedMonth]
  );

  const openMonthSelector = () => {
    Alert.alert(
      "Selecciona un mes",
      "Elige el periodo de reservas que deseas ver",
      [
        ...monthOptions.map((month) => ({
          text: month,
          onPress: () => setSelectedMonth(month),
        })),
        { text: "Cancelar", style: "cancel" as const },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
          <Text style={styles.headerTitle}>Mis Reservas</Text>
        </View>

        <View style={styles.filtersWrap}>
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "upcoming" && styles.tabButtonActive,
              ]}
              activeOpacity={0.8}
              onPress={() => setActiveTab("upcoming")}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === "upcoming" && styles.tabButtonTextActive,
                ]}
              >
                Próximas
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabButton, activeTab === "past" && styles.tabButtonActive]}
              activeOpacity={0.8}
              onPress={() => setActiveTab("past")}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === "past" && styles.tabButtonTextActive,
                ]}
              >
                Pasadas
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.monthButton}
            activeOpacity={0.8}
            onPress={openMonthSelector}
          >
            <View style={styles.monthTextWrap}>
              <Ionicons name="calendar-outline" size={16} color="#6B7280" />
              <View>
                <Text style={styles.monthTitle}>{selectedMonth}</Text>
                <Text style={styles.monthSubtitle}>Ver calendario</Text>
              </View>
            </View>
            <Ionicons name="chevron-down" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>
          {activeTab === "upcoming" ? "Servicios próximos" : "Servicios pasados"}
        </Text>

        <View style={styles.listWrap}>
          {filteredReservations.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>
                No hay reservas para este periodo.
              </Text>
            </View>
          ) : (
            filteredReservations.map((reservation) => (
              <View key={reservation.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.providerWrap}>
                    <View style={styles.avatar}>
                      <Ionicons name="person" size={20} color="#4A89F3" />
                    </View>
                    <View>
                      <Text style={styles.providerName}>{reservation.providerName}</Text>
                      <View style={styles.ratingWrap}>
                        <Ionicons name="star" size={12} color="#FFB400" />
                        <Text style={styles.ratingText}>{reservation.rating.toFixed(1)}</Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      reservation.status === "upcoming"
                        ? styles.statusUpcoming
                        : styles.statusPast,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        reservation.status === "upcoming"
                          ? styles.statusTextUpcoming
                          : styles.statusTextPast,
                      ]}
                    >
                      {reservation.statusText}
                    </Text>
                  </View>
                </View>

                <Text style={styles.serviceLine}>• {reservation.service}</Text>

                <View style={styles.infoRow}>
                  <Ionicons name="calendar-outline" size={12} color="#6B7280" />
                  <Text style={styles.infoText}>{reservation.datetime}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons name="location-outline" size={12} color="#6B7280" />
                  <Text style={styles.infoText}>{reservation.address}</Text>
                </View>

                <Text style={styles.price}>{reservation.price}</Text>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={
                    reservation.status === "upcoming"
                      ? styles.cardButtonPrimary
                      : styles.cardButtonSecondary
                  }
                >
                  <Text
                    style={
                      reservation.status === "upcoming"
                        ? styles.cardButtonPrimaryText
                        : styles.cardButtonSecondaryText
                    }
                  >
                    {reservation.status === "upcoming" ? "Ver estado" : "Ver detalles"}
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
