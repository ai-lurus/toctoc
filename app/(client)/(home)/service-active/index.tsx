import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from "@/lib/constants";
import { getStandardHeaderOptions } from "@/lib/navigation";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import type { Database } from "@/types/database.types";

type RequestStatus = Database["public"]["Enums"]["request_status"];
type ServiceRequestRow = Database["public"]["Tables"]["service_requests"]["Row"];
type ProviderRow = Database["public"]["Tables"]["profiles"]["Row"];
type ActivePhase = "accepted" | "in_progress" | "completed";
type ActiveRequest = Pick<
  ServiceRequestRow,
  "id" | "status" | "address" | "provider_id"
> & {
  provider: Pick<ProviderRow, "id" | "full_name" | "avatar_url" | "avg_rating"> | null;
};

const ACTIVE_STATUSES: ActivePhase[] = ["accepted", "in_progress", "completed"];
const STATUS_FLOW: ActivePhase[] = ["accepted", "in_progress", "completed"];
const ACTIVE_STATUS_SET = new Set<ActivePhase>(ACTIVE_STATUSES);
const MOCK_ACTIVE_REQUEST_ID = "00000000-0000-0000-0000-000000000001";
const MOCK_ACTIVE_REQUEST: ActiveRequest = {
  id: MOCK_ACTIVE_REQUEST_ID,
  status: "accepted",
  address: "Av. Vallarta 1234, Zapopan",
  provider_id: "00000000-0000-0000-0000-000000000002",
  provider: {
    id: "00000000-0000-0000-0000-000000000002",
    full_name: "María López",
    avatar_url: null,
    avg_rating: 4.9,
  },
};

function isActivePhase(status: RequestStatus | undefined): status is ActivePhase {
  return Boolean(status && ACTIVE_STATUS_SET.has(status as ActivePhase));
}

const STATUS_COPY: Record<
  "accepted" | "in_progress" | "completed",
  {
    label: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
    bgColor: string;
  }
> = {
  accepted: {
    label: "En camino",
    description: "Tu proveedor está en camino a la dirección confirmada.",
    icon: "navigate",
    color: COLORS.primary,
    bgColor: COLORS.primaryLight,
  },
  in_progress: {
    label: "Servicio iniciado",
    description: "El proveedor ya comenzó el servicio en tu ubicación.",
    icon: "construct",
    color: "#7B61FF",
    bgColor: "#EFEAFF",
  },
  completed: {
    label: "Servicio finalizado",
    description: "El servicio terminó con éxito. Te llevaremos a calificarlo.",
    icon: "checkmark-circle",
    color: COLORS.success,
    bgColor: "#E8F9F3",
  },
};

function getParamValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default function ServiceActiveScreen() {
  const { user } = useAuthStore();
  const params = useLocalSearchParams<{ requestId?: string | string[]; request_id?: string | string[] }>();
  const [request, setRequest] = useState<ActiveRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const didNavigateToRate = useRef(false);

  const requestId = useMemo(
    () => getParamValue(params.requestId) ?? getParamValue(params.request_id),
    [params.requestId, params.request_id],
  );

  const fetchActiveRequest = useCallback(async () => {
    if (requestId === MOCK_ACTIVE_REQUEST_ID) {
      setError(null);
      setRequest(MOCK_ACTIVE_REQUEST);
      setLoading(false);
      return;
    }

    if (!user?.id) {
      setLoading(false);
      return;
    }

    setError(null);
    const query = supabase
      .from("service_requests")
      .select(
        `
        id,
        status,
        address,
        provider_id,
        provider:profiles!service_requests_provider_id_fkey(
          id,
          full_name,
          avatar_url,
          avg_rating
        )
      `,
      )
      .eq("client_id", user.id)
      .in("status", ACTIVE_STATUSES)
      .order("updated_at", { ascending: false })
      .limit(1);

    const { data, error: requestError } = requestId
      ? await query.eq("id", requestId)
      : await query;

    if (requestError) {
      setError("No se pudo cargar el estado del servicio.");
      setLoading(false);
      return;
    }

    const firstRow = (data?.[0] ?? null) as ActiveRequest | null;
    setRequest(firstRow);
    setLoading(false);
  }, [requestId, user?.id]);

  useEffect(() => {
    fetchActiveRequest();
  }, [fetchActiveRequest]);

  useEffect(() => {
    if (!user?.id || requestId === MOCK_ACTIVE_REQUEST_ID) return;

    const channel = supabase
      .channel(`service-request-active-${requestId ?? user.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "service_requests",
          filter: requestId ? `id=eq.${requestId}` : `client_id=eq.${user.id}`,
        },
        (payload: RealtimePostgresChangesPayload<ServiceRequestRow>) => {
          const updatedRow = payload.new as Partial<ServiceRequestRow>;
          const nextStatus =
            typeof updatedRow.status === "string"
              ? (updatedRow.status as RequestStatus)
              : undefined;
          if (!isActivePhase(nextStatus)) {
            return;
          }

          fetchActiveRequest();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchActiveRequest, requestId, user?.id]);

  useEffect(() => {
    if (!request || didNavigateToRate.current) return;
    if (request.status !== "completed") return;

    didNavigateToRate.current = true;
    router.replace({
      pathname: "/(client)/(history)/rate-service",
      params: { requestId: request.id },
    });
  }, [request]);

  const status: ActivePhase =
    request?.status === "in_progress" || request?.status === "completed"
      ? request.status
      : "accepted";
  const currentStatus = STATUS_COPY[status];
  const providerName = request?.provider?.full_name ?? "Proveedor asignado";
  const providerRating = request?.provider?.avg_rating?.toFixed(1) ?? "Sin calificación";
  const providerInitial = providerName.charAt(0).toUpperCase();

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={["left", "right"]}>
        <Stack.Screen
          options={getStandardHeaderOptions({
            title: "Servicio activo",
            subtitle: "Seguimiento en tiempo real",
          })}
        />
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.stateText}>Cargando estado del servicio...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!request || error) {
    return (
      <SafeAreaView style={styles.container} edges={["left", "right"]}>
        <Stack.Screen
          options={getStandardHeaderOptions({
            title: "Servicio activo",
            subtitle: "Seguimiento en tiempo real",
          })}
        />
        <View style={styles.centerState}>
          <Ionicons name="alert-circle-outline" size={28} color={COLORS.error} />
          <Text style={styles.stateText}>
            {error ?? "No encontramos un servicio activo por ahora."}
          </Text>
          <TouchableOpacity style={styles.goHomeButton} onPress={() => router.replace("/(client)/(home)")}>
            <Text style={styles.goHomeButtonText}>Volver al inicio</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <Stack.Screen
        options={getStandardHeaderOptions({
          title: "Servicio activo",
          subtitle: "Seguimiento en tiempo real",
        })}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.statusBanner, { backgroundColor: currentStatus.bgColor }]}>
          <View style={[styles.statusIcon, { backgroundColor: "#fff" }]}>
            <Ionicons name={currentStatus.icon} size={20} color={currentStatus.color} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.statusTitle, { color: currentStatus.color }]}>{currentStatus.label}</Text>
            <Text style={styles.statusDescription}>{currentStatus.description}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Proveedor asignado</Text>
          <View style={styles.providerRow}>
            {request.provider?.avatar_url ? (
              <Image source={{ uri: request.provider.avatar_url }} style={styles.avatar} />
            ) : (
              <View style={styles.fallbackAvatar}>
                <Text style={styles.fallbackAvatarText}>{providerInitial}</Text>
              </View>
            )}

            <View style={{ flex: 1 }}>
              <Text style={styles.providerName}>{providerName}</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color={COLORS.secondary} />
                <Text style={styles.ratingText}>{providerRating}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Estado del servicio</Text>
          {STATUS_FLOW.map((itemStatus, index) => {
            const isDone = STATUS_FLOW.indexOf(status) >= index;
            const isCurrent = status === itemStatus;
            const stepCopy = STATUS_COPY[itemStatus];

            return (
              <View key={itemStatus}>
                <View style={styles.stepRow}>
                  <View
                    style={[
                      styles.stepDot,
                      isDone && { backgroundColor: COLORS.success, borderColor: COLORS.success },
                      isCurrent && { borderColor: stepCopy.color, borderWidth: 2 },
                    ]}
                  >
                    {isDone ? <Ionicons name="checkmark" size={12} color="#fff" /> : null}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.stepTitle, isCurrent && { color: stepCopy.color }]}>
                      {stepCopy.label}
                    </Text>
                    <Text style={styles.stepDescription}>{stepCopy.description}</Text>
                  </View>
                </View>
                {index < STATUS_FLOW.length - 1 ? (
                  <View
                    style={[
                      styles.stepLine,
                      STATUS_FLOW.indexOf(status) > index && { backgroundColor: COLORS.success },
                    ]}
                  />
                ) : null}
              </View>
            );
          })}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Dirección confirmada</Text>
          <View style={styles.addressRow}>
            <Ionicons name="location" size={16} color={COLORS.error} />
            <Text style={styles.addressText}>{request.address}</Text>
          </View>
          <Text style={styles.addressHint}>
            Esta es la ubicación donde el proveedor realizará el servicio.
          </Text>
        </View>

        <TouchableOpacity style={styles.chatButton} activeOpacity={0.9} disabled>
          <Ionicons name="chatbubble-ellipses-outline" size={18} color={COLORS.text} />
          <Text style={styles.chatButtonText}>Chat</Text>
          <View style={styles.soonBadge}>
            <Text style={styles.soonBadgeText}>Disponible en breve</Text>
          </View>
        </TouchableOpacity>
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
    paddingBottom: SPACING.xl,
    gap: SPACING.md,
  },
  centerState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
  },
  stateText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  goHomeButton: {
    marginTop: SPACING.md,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  goHomeButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: FONT_SIZE.sm,
  },
  statusBanner: {
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    flexDirection: "row",
    gap: SPACING.sm,
    alignItems: "center",
  },
  statusIcon: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.full,
    alignItems: "center",
    justifyContent: "center",
  },
  statusTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: "700",
    marginBottom: 2,
  },
  statusDescription: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.sm,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  providerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  fallbackAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  fallbackAvatarText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: FONT_SIZE.md,
  },
  providerName: {
    fontSize: FONT_SIZE.md,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 2,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontWeight: "600",
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACING.sm,
  },
  stepDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  stepLine: {
    marginLeft: 10,
    width: 2,
    height: 20,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
  stepTitle: {
    fontSize: FONT_SIZE.sm,
    fontWeight: "700",
    color: COLORS.text,
  },
  stepDescription: {
    marginTop: 2,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  addressText: {
    flex: 1,
    fontSize: FONT_SIZE.sm,
    color: COLORS.text,
    fontWeight: "600",
  },
  addressHint: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
  chatButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.sm + 2,
    paddingHorizontal: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
  },
  chatButtonText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: "700",
    color: COLORS.text,
  },
  soonBadge: {
    backgroundColor: COLORS.secondaryLight,
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
  },
  soonBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#8A6A00",
  },
});
