import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { useAuthStore } from "@/store/authStore";
import { useSupabaseQuery } from "@/hooks/useSupabaseQuery";
import { getCategories } from "@/services/categories";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { COLORS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/database.types";
import { styles } from "./styles";

type RequestStatus = Database["public"]["Enums"]["request_status"];
type ServiceRequestRow = Database["public"]["Tables"]["service_requests"]["Row"];
type HomeTrackableStatus = "accepted" | "in_progress" | "completed";

type HomeActiveService = {
  requestId: string;
  serviceName: string;
  status: HomeTrackableStatus;
  etaText: string;
};

const HOME_TRACKABLE_STATUSES: HomeTrackableStatus[] = [
  "accepted",
  "in_progress",
  "completed",
];

const STATUS_LABEL: Record<HomeTrackableStatus, string> = {
  accepted: "Servicio en proceso",
  in_progress: "Servicio en proceso",
  completed: "Servicio finalizado",
};

const STATUS_SUBTITLE: Record<HomeTrackableStatus, string> = {
  accepted: "El proveedor está en camino • 15 min",
  in_progress: "Servicio iniciado",
  completed: "Servicio finalizado",
};

const SHOW_ACTIVE_SERVICE_MOCK = true;
const MOCK_ACTIVE_REQUEST_ID = "00000000-0000-0000-0000-000000000001";
const MOCK_ACTIVE_SERVICE: HomeActiveService = {
  requestId: MOCK_ACTIVE_REQUEST_ID,
  serviceName: "Limpieza general",
  status: "accepted",
  etaText: "El proveedor está en camino • 15 min",
};

export default function ClientHomeScreen() {
  const { profile, user } = useAuthStore();
  const { data: categories, isLoading, refetch } = useSupabaseQuery(getCategories);
  const [activeService, setActiveService] = useState<HomeActiveService | null>(null);

  useEffect(() => {
    if (!user?.id) {
      setActiveService(SHOW_ACTIVE_SERVICE_MOCK ? MOCK_ACTIVE_SERVICE : null);
      return;
    }

    let mounted = true;

    const fetchTrackableService = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from("service_requests")
        .select(`
          id,
          status,
          service:services(name)
        `)
        .eq("client_id", user.id)
        .in("status", HOME_TRACKABLE_STATUSES)
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error || !mounted) {
        return;
      }

      if (!data) {
        setActiveService(SHOW_ACTIVE_SERVICE_MOCK ? MOCK_ACTIVE_SERVICE : null);
        return;
      }

      const serviceName =
        Array.isArray(data.service) ? data.service[0]?.name : data.service?.name;
      const currentStatus = data.status as HomeTrackableStatus;

      setActiveService({
        requestId: data.id,
        status: currentStatus,
        serviceName: serviceName || "Servicio",
        etaText: STATUS_SUBTITLE[currentStatus],
      });
    };

    fetchTrackableService();

    const channel = supabase
      .channel(`home-service-status-${user?.id ?? "guest"}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "service_requests",
          filter: `client_id=eq.${user.id}`,
        },
        () => {
          fetchTrackableService();
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "service_requests",
          filter: `client_id=eq.${user.id}`,
        },
        (payload: RealtimePostgresChangesPayload<ServiceRequestRow>) => {
          const updatedRow = payload.new as Partial<ServiceRequestRow>;
          const nextStatus =
            typeof updatedRow.status === "string"
              ? (updatedRow.status as RequestStatus)
              : undefined;
          // Reconsultamos siempre para ocultar tarjeta cuando cambie a cancelado.
          if (nextStatus && HOME_TRACKABLE_STATUSES.includes(nextStatus as HomeTrackableStatus)) {
            fetchTrackableService();
            return;
          }
          fetchTrackableService();
        },
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "service_requests",
          filter: `client_id=eq.${user.id}`,
        },
        () => {
          fetchTrackableService();
        },
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  if (isLoading && !categories) {
    return <LoadingScreen />;
  }

  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.greeting}>
            Buenas noches, {profile?.full_name?.split(" ")[0] ?? "María"}
          </Text>
          <Text style={styles.subtitle}>¿Qué servicio necesitas hoy?</Text>
        </View>
        <TouchableOpacity
          style={styles.notificationContainer}
          onPress={() => router.push("/(client)/(home)/notifications")}
          activeOpacity={0.7}
        >
          <Ionicons name="notifications" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
      </View>

      {activeService ? (
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={styles.statusDot} />
            <Text style={styles.statusLabel}>
              {STATUS_LABEL[activeService.status].toUpperCase()}
            </Text>
          </View>
          <Text style={styles.statusTitle}>{activeService.serviceName}</Text>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width:
                    activeService.status === "accepted"
                      ? "38%"
                      : activeService.status === "in_progress"
                        ? "72%"
                        : "100%",
                },
              ]}
            />
          </View>
          <Text style={styles.statusSubtitle}>{activeService.etaText}</Text>
          <TouchableOpacity
            style={styles.statusButton}
            onPress={() =>
              router.push({
                pathname: "/(client)/(home)/service-active",
                params: { requestId: activeService.requestId },
              })
            }
          >
            <Text style={styles.statusButtonText}>Ver detalles del servicio</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <TouchableOpacity style={styles.expressBanner}>
        <View style={styles.expressContent}>
          <Ionicons name="flash" size={24} color="white" />
          <View style={styles.expressTextContainer}>
            <Text style={styles.expressTitle}>Servicio express</Text>
            <Text style={styles.expressSubtitle}>Proveedor disponible ahora</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="white" />
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Categorías de servicio</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            onPress={() =>
              router.push({
                pathname: "/(client)/(home)/providers",
                params: { categoryId: item.id, categoryName: item.name },
              })
            }
          />
        )}
        contentContainerStyle={styles.grid}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No hay categorías disponibles
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
