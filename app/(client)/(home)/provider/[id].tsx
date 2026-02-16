import { View, Text, ScrollView, Image, Alert } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/lib/constants";
import { useSupabaseQuery } from "@/hooks/useSupabaseQuery";
import { getProviderById } from "@/services/providers";
import type { ProviderProfile } from "@/services/providers";
import { Button } from "@/components/ui/Button";
import { formatRating, formatDate, formatCurrency } from "@/utils/format";
import { styles } from "./styles";

/* ── Helpers ── */

function formatTimeRange(start: string, end: string) {
  const fmt = (t: string) => {
    const [h, m] = t.split(":");
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const display = hour % 12 || 12;
    return `${display}:${m} ${ampm}`;
  };
  return `${fmt(start)} - ${fmt(end)}`;
}

function groupAvailability(availability: ProviderProfile["availability"]) {
  const groups: { label: string; schedule: string }[] = [];
  const weekday = availability.filter(
    (a) => a.day_of_week >= 1 && a.day_of_week <= 5,
  );
  const saturday = availability.filter((a) => a.day_of_week === 6);
  const sunday = availability.filter((a) => a.day_of_week === 0);

  if (weekday.length > 0) {
    groups.push({
      label: "Lunes - Viernes",
      schedule: formatTimeRange(weekday[0].start_time, weekday[0].end_time),
    });
  } else {
    groups.push({ label: "Lunes - Viernes", schedule: "8:00 AM - 6:00 PM" });
  }

  if (saturday.length > 0) {
    groups.push({
      label: "Sábados",
      schedule: formatTimeRange(saturday[0].start_time, saturday[0].end_time),
    });
  } else {
    groups.push({ label: "Sábados", schedule: "9:00 AM - 2:00 PM" });
  }

  groups.push({
    label: "Domingos",
    schedule:
      sunday.length > 0
        ? formatTimeRange(sunday[0].start_time, sunday[0].end_time)
        : "No disponible",
  });

  return groups;
}

/* ── Screen ── */

export default function ProviderDetailScreen() {
  const params = useLocalSearchParams<{
    id: string;
    serviceName?: string;
    providerName?: string;
    providerImage?: string;
    providerRating?: string;
    providerReviews?: string;
    providerDistance?: string;
    providerPrice?: string;
    providerServiceType?: string;
  }>();

  const rating = parseFloat(params.providerRating ?? "0");
  const reviewsCount = parseInt(params.providerReviews ?? "0", 10);
  const distance = params.providerDistance ?? "—";
  const price = parseInt(params.providerPrice ?? "0", 10);

  // Intenta cargar datos completos de Supabase (puede fallar con IDs mock)
  const { data: provider } = useSupabaseQuery(
    () => getProviderById(params.id),
    [params.id],
  );

  const handleSelectProvider = () => {
    Alert.alert(
      "Solicitar servicio",
      "La funcionalidad de pago estará disponible próximamente (Sprint 3).",
      [{ text: "Entendido" }],
    );
    console.log("Ir a Pago — providerId:", params.id);
  };

  // Datos reales de Supabase o valores de los params
  const name = provider?.full_name ?? params.providerName ?? "Proveedor";
  const avatarUrl = provider?.avatar_url ?? params.providerImage;
  const avgRating = provider ? provider.avg_rating : rating;
  const totalReviews = provider ? provider.total_reviews : reviewsCount;
  const experienceYears = provider?.experience_years ?? 3;
  const bio = provider?.bio;
  const serviceLabel =
    params.serviceName ??
    params.providerServiceType ??
    "Servicio";

  const availabilityGroups = provider
    ? groupAvailability(provider.availability)
    : groupAvailability([]);

  const providerServices = provider?.services ?? [];
  const providerReviews = provider?.reviews ?? [];

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "",
          headerTintColor: COLORS.text,
          headerStyle: { backgroundColor: COLORS.surface },
          headerShadowVisible: false,
        }}
      />

      <SafeAreaView style={styles.container} edges={["left", "right"]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* ═══ Hero ═══ */}
          <View style={styles.hero}>
            {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatar}>
                <Ionicons name="person" size={48} color={COLORS.primary} />
              </View>
            )}

            <Text style={styles.providerName}>{name}</Text>
            <Text style={styles.providerService}>{serviceLabel}</Text>

            <View style={styles.ratingRow}>
              <Ionicons name="star" size={16} color="#FFC107" />
              <Text style={styles.ratingValue}>
                {formatRating(avgRating)}
              </Text>
              <Text style={styles.ratingCount}>
                ({totalReviews} reseñas)
              </Text>
            </View>
          </View>

          {/* ═══ Stats ═══ */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Ionicons
                name="navigate-outline"
                size={24}
                color={COLORS.text}
              />
              <Text style={styles.statValue}>{distance}</Text>
              <Text style={styles.statLabel}>Distancia</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons
                name="briefcase-outline"
                size={24}
                color={COLORS.text}
              />
              <Text style={styles.statValue}>{totalReviews}</Text>
              <Text style={styles.statLabel}>Trabajos</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="time-outline" size={24} color={COLORS.text} />
              <Text style={styles.statValue}>{experienceYears} años</Text>
              <Text style={styles.statLabel}>Exp.</Text>
            </View>
          </View>

          {/* ═══ Logros ═══ */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Logros</Text>
            <View style={styles.badgesGrid}>
              {avgRating >= 4.5 && (
                <View style={styles.badgeCard}>
                  <Ionicons name="trophy" size={22} color="#FFC107" />
                  <Text style={styles.badgeTitle}>Top Provider</Text>
                  <Text style={styles.badgeDesc}>Entre los mejores 10%</Text>
                </View>
              )}
              <View style={styles.badgeCard}>
                <Ionicons name="flash" size={22} color={COLORS.secondary} />
                <Text style={styles.badgeTitle}>Respuesta rápida</Text>
                <Text style={styles.badgeDesc}>{"Promedio < 1 hora"}</Text>
              </View>
              <View style={styles.badgeCard}>
                <Ionicons
                  name="shield-checkmark"
                  size={22}
                  color={COLORS.success}
                />
                <Text style={styles.badgeTitle}>Verificado</Text>
                <Text style={styles.badgeDesc}>Identidad confirmada</Text>
              </View>
              {totalReviews >= 50 && (
                <View style={styles.badgeCard}>
                  <Ionicons name="ribbon" size={22} color={COLORS.primary} />
                  <Text style={styles.badgeTitle}>
                    {totalReviews} trabajos
                  </Text>
                  <Text style={styles.badgeDesc}>Completados con éxito</Text>
                </View>
              )}
            </View>
          </View>

          {/* ═══ Disponibilidad ═══ */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Ionicons
                name="calendar-outline"
                size={20}
                color={COLORS.text}
              />
              <Text style={styles.sectionHeaderTitle}>Disponibilidad</Text>
            </View>
            <View style={styles.tableCard}>
              {availabilityGroups.map((group, i) => (
                <View
                  key={group.label}
                  style={[
                    styles.tableRow,
                    i < availabilityGroups.length - 1 && styles.tableRowBorder,
                  ]}
                >
                  <Text style={styles.tableLabel}>{group.label}</Text>
                  <Text
                    style={[
                      styles.tableValue,
                      group.schedule === "No disponible" &&
                        styles.tableValueMuted,
                    ]}
                  >
                    {group.schedule}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* ═══ Servicios y precios ═══ */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Ionicons
                name="pricetag-outline"
                size={20}
                color={COLORS.text}
              />
              <Text style={styles.sectionHeaderTitle}>Servicios y precios</Text>
            </View>
            <View style={styles.tableCard}>
              {providerServices.length > 0 ? (
                providerServices.map((svc, i) => (
                  <View
                    key={svc.id}
                    style={[
                      styles.tableRow,
                      i < providerServices.length - 1 && styles.tableRowBorder,
                    ]}
                  >
                    <View style={styles.serviceNameRow}>
                      <Ionicons
                        name="checkmark-circle"
                        size={18}
                        color={COLORS.success}
                      />
                      <Text style={styles.tableLabel}>{svc.service_name}</Text>
                    </View>
                    <Text style={styles.servicePriceText}>
                      {formatCurrency(svc.base_price)}
                    </Text>
                  </View>
                ))
              ) : (
                <View style={styles.tableRow}>
                  <View style={styles.serviceNameRow}>
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color={COLORS.success}
                    />
                    <Text style={styles.tableLabel}>{serviceLabel}</Text>
                  </View>
                  <Text style={styles.servicePriceText}>${price}</Text>
                </View>
              )}
            </View>
          </View>

          {/* ═══ Bio ═══ */}
          {bio && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Acerca de</Text>
              <Text style={styles.bioText}>{bio}</Text>
            </View>
          )}

          {/* ═══ Reseñas ═══ */}
          {providerReviews.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Reseñas ({totalReviews})
              </Text>
              {providerReviews.map((review) => (
                <View key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewerName}>
                      {review.reviewer_name}
                    </Text>
                    <View style={styles.reviewStarsRow}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Ionicons
                          key={s}
                          name={
                            review.rating >= s
                              ? "star"
                              : review.rating >= s - 0.5
                                ? "star-half"
                                : "star-outline"
                          }
                          size={12}
                          color="#FFC107"
                        />
                      ))}
                      <Text style={styles.reviewRatingText}>
                        {review.rating}
                      </Text>
                    </View>
                  </View>
                  {review.comment && (
                    <Text style={styles.reviewComment}>{review.comment}</Text>
                  )}
                  <Text style={styles.reviewDate}>
                    {formatDate(review.created_at)}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        {/* ═══ Bottom CTA ═══ */}
        <View style={styles.bottomBar}>
          <Button
            title="Seleccionar proveedor"
            onPress={handleSelectProvider}
            size="lg"
          />
        </View>
      </SafeAreaView>
    </>
  );
}
