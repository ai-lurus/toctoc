import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Image,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from "@/lib/constants";
import { styles } from "@/styles/searching";
import { supabase } from "@/lib/supabase";
import type { RealtimeChannel } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

const SEARCH_TIMEOUT_MS = 42 * 60 * 1000;
const UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isUuid(value?: string) {
    return Boolean(value && UUID_REGEX.test(value));
}

type RequestStatus = Database["public"]["Tables"]["service_requests"]["Row"]["status"];
type ViewState =
    | "connecting"
    | "pending"
    | "accepted"
    | "rejected"
    | "timeout"
    | "error";

export default function SearchingScreen() {
    const {
        requestId,
        serviceName,
        providerId,
        providerName,
        providerImage,
        amount,
        previewMode,
    } = useLocalSearchParams<{
        requestId?: string;
        serviceName: string;
        providerId?: string;
        providerName: string;
        providerImage?: string;
        amount: string;
        previewMode?: string;
    }>();
    const isPreviewMode = previewMode === "1";

    const [state, setState] = useState<ViewState>(
        requestId || isPreviewMode ? (isPreviewMode ? "pending" : "connecting") : "error"
    );
    const [selectedProviderName, setSelectedProviderName] = useState(providerName || "Proveedor");
    const [selectedProviderImage, setSelectedProviderImage] = useState(providerImage || "");
    const [message, setMessage] = useState<string>("");
    const [remainingMs, setRemainingMs] = useState(SEARCH_TIMEOUT_MS);
    const expirationRef = useRef<number>(Date.now() + SEARCH_TIMEOUT_MS);
    const channelRef = useRef<RealtimeChannel | null>(null);
    const resolvedRef = useRef(false);

    const formattedTimer = useMemo(() => {
        const safeRemaining = Math.max(remainingMs, 0);
        const totalSeconds = Math.floor(safeRemaining / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }, [remainingMs]);
    const remainingMinutesLabel = useMemo(
        () => `${Math.max(0, Math.ceil(remainingMs / 60000))} min`,
        [remainingMs]
    );
    const timerProgressPercent = useMemo(
        () => `${Math.max(0, Math.min(100, (remainingMs / SEARCH_TIMEOUT_MS) * 100))}%` as `${number}%`,
        [remainingMs]
    );

    const navigateToActiveService = useCallback(() => {
        router.replace("/(client)/(history)/service-progress" as any);
    }, []);

    const goBackToProviders = useCallback(() => {
        router.replace({
            pathname: "/(client)/(home)/providers",
            params: {
                categoryName: serviceName ?? "",
            },
        });
    }, [serviceName]);

    const resolveAccepted = useCallback(() => {
        if (resolvedRef.current) return;
        resolvedRef.current = true;
        setState("accepted");
        navigateToActiveService();
    }, [navigateToActiveService]);

    const resolveRejected = useCallback(() => {
        if (resolvedRef.current) return;
        resolvedRef.current = true;
        setState("rejected");
        setMessage("El proveedor rechazó tu solicitud. Puedes buscar otro proveedor.");
    }, []);

    const expireRequest = useCallback(async () => {
        if (resolvedRef.current) return;

        if (isPreviewMode || !requestId) {
            resolvedRef.current = true;
            setState("timeout");
            setMessage("Se agotó el tiempo de espera y no aceptaron tu solicitud.");
            return;
        }

        resolvedRef.current = true;

        const { error } = await supabase
            .from("service_requests")
            .update({ status: "cancelled", updated_at: new Date().toISOString() })
            .eq("id", requestId)
            .in("status", ["pending", "waiting_acceptance"]);

        if (error) {
            setState("error");
            setMessage("No pudimos cancelar la solicitud al expirar. Intenta nuevamente.");
            return;
        }

        setState("timeout");
        setMessage("Se agotó el tiempo de espera y no aceptaron tu solicitud.");
    }, [isPreviewMode, requestId]);

    const cancelRequest = useCallback(async () => {
        if (resolvedRef.current) return;
        resolvedRef.current = true;

        if (!isPreviewMode && requestId) {
            await supabase
                .from("service_requests")
                .update({ status: "cancelled", updated_at: new Date().toISOString() })
                .eq("id", requestId)
                .eq("status", "pending");
        }

        setState("timeout");
        setMessage("Cancelaste la solicitud. Puedes volver a solicitar cuando quieras.");
    }, [isPreviewMode, requestId]);

    useEffect(() => {
        expirationRef.current = Date.now() + SEARCH_TIMEOUT_MS;
        setRemainingMs(SEARCH_TIMEOUT_MS);

        const interval = setInterval(() => {
            if (resolvedRef.current) return;
            const nextRemaining = expirationRef.current - Date.now();
            setRemainingMs(Math.max(nextRemaining, 0));
            if (nextRemaining <= 0) {
                void expireRequest();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [expireRequest]);

    const onRequestStatusChange = useCallback(
        (nextStatus: RequestStatus) => {
            if (nextStatus === "accepted") {
                resolveAccepted();
                return;
            }
            if (nextStatus === "rejected") {
                resolveRejected();
                return;
            }
            if (nextStatus === "pending" || nextStatus === "waiting_acceptance") {
                setState("pending");
                return;
            }
            if (nextStatus === "cancelled") {
                if (resolvedRef.current) return;
                resolvedRef.current = true;
                setState("timeout");
                setMessage("Se agotó el tiempo de espera y no aceptaron tu solicitud.");
            }
        },
        [resolveAccepted, resolveRejected]
    );

    useEffect(() => {
        setSelectedProviderName(providerName || "Proveedor");
        setSelectedProviderImage(providerImage || "");
    }, [providerImage, providerName]);

    useEffect(() => {
        if (!isUuid(providerId)) return;
        let cancelled = false;

        const loadProviderProfile = async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select("full_name, avatar_url")
                .eq("id", providerId as string)
                .single();

            if (cancelled || error || !data) return;

            if (data.full_name) setSelectedProviderName(data.full_name);
            if (data.avatar_url) setSelectedProviderImage(data.avatar_url);
        };

        void loadProviderProfile();

        return () => {
            cancelled = true;
        };
    }, [providerId]);

    useEffect(() => {
        if (!requestId) {
            if (isPreviewMode) {
                setState("pending");
                return;
            }
            setState("error");
            setMessage("No encontramos el identificador de tu solicitud. Vuelve a intentarlo.");
            return;
        }
        if (isPreviewMode) {
            setState("pending");
            return;
        }

        const loadCurrentStatus = async () => {
            const { data, error } = await supabase
                .from("service_requests")
                .select("status")
                .eq("id", requestId)
                .single();

            if (error) {
                setState("error");
                setMessage("No pudimos obtener el estado de tu solicitud.");
                return;
            }

            onRequestStatusChange(data.status);
        };

        void loadCurrentStatus();

        const channel = supabase
            .channel(`service_request_${requestId}`)
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "service_requests",
                    filter: `id=eq.${requestId}`,
                },
                (payload) => {
                    const status = (payload.new as Database["public"]["Tables"]["service_requests"]["Row"])
                        ?.status;
                    if (status) {
                        onRequestStatusChange(status);
                    }
                }
            )
            .subscribe();

        channelRef.current = channel;

        return () => {
            if (channelRef.current) {
                void supabase.removeChannel(channelRef.current);
                channelRef.current = null;
            }
        };
    }, [expireRequest, isPreviewMode, onRequestStatusChange, requestId]);

    const isResolvedState = state === "rejected" || state === "timeout" || state === "error";

    return (
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: "Solicitud enviada",
                    headerStyle: { backgroundColor: COLORS.primary },
                    headerTintColor: "white",
                    headerShadowVisible: false,
                    gestureEnabled: false,
                    headerBackVisible: false,
                }}
            />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Success icon */}
                <View style={styles.successHeader}>
                    <View style={styles.checkCircle}>
                        {state === "connecting" ? (
                            <ActivityIndicator size="large" color={COLORS.primary} />
                        ) : (
                            <Ionicons
                                name={
                                    state === "pending"
                                        ? "hourglass-outline"
                                        : state === "rejected" || state === "error"
                                          ? "close"
                                          : "time-outline"
                                }
                                size={34}
                                color={state === "rejected" || state === "error" ? COLORS.error : COLORS.primary}
                            />
                        )}
                    </View>
                    <Text style={styles.successTitle}>
                        {isResolvedState ? "Solicitud actualizada" : "Esperando respuesta de"}
                    </Text>
                    {!isResolvedState ? (
                        <Text style={styles.providerWaitingName}>{selectedProviderName || "María"}</Text>
                    ) : null}
                    <Text style={styles.successSubtitle}>
                        {state === "rejected" || state === "timeout" || state === "error"
                            ? message
                            : "Te notificaremos cuando respondan. Puedes seguir usando la app con normalidad."}
                    </Text>
                </View>

                {/* Warning note */}
                <View style={styles.warningBanner}>
                    {state === "pending" || state === "connecting" ? (
                        <>
                            <View style={styles.timerRow}>
                                <Text style={styles.timerLabel}>Tiempo de espera</Text>
                                <Text style={styles.timerValue}>{remainingMinutesLabel}</Text>
                            </View>
                            <View style={styles.timerTrack}>
                                <View style={[styles.timerFill, { width: timerProgressPercent }]} />
                            </View>
                            <Text style={styles.warningText}>
                                {formattedTimer} restantes
                            </Text>
                        </>
                    ) : (
                        <Text style={styles.warningText}>
                            {state === "rejected"
                                ? "Puedes intentar con otro proveedor sin costo adicional."
                                : state === "timeout"
                                  ? "No logramos confirmar a tiempo. Puedes volver a intentarlo."
                                  : "Hubo un problema al escuchar cambios en tiempo real."}
                        </Text>
                    )}
                </View>

                {/* Transaction info card */}
                <View style={styles.requestCard}>
                    <Text style={styles.requestTitle}>Resumen de solicitud</Text>

                    <View style={styles.requestItem}>
                        <View style={styles.providerChip}>
                            {selectedProviderImage ? (
                                <Image source={{ uri: selectedProviderImage }} style={styles.providerAvatarImage} />
                            ) : (
                                <View style={styles.iconBubble}>
                                    <Text style={styles.iconBubbleText}>
                                        {(selectedProviderName || "M")[0]}
                                    </Text>
                                </View>
                            )}
                            <Text style={styles.providerChipName}>{selectedProviderName || "María López"}</Text>
                            <Ionicons name="chevron-down" size={14} color={COLORS.textSecondary} />
                        </View>
                    </View>

                    <View style={[styles.requestItem, styles.itemBorder]}>
                        <Ionicons name="brush-outline" size={20} color={COLORS.secondary} />
                        <View style={styles.itemContent}>
                            <Text style={styles.itemLabel}>Tipo de servicio</Text>
                            <Text style={styles.itemValue}>{serviceName || "Limpieza general"}</Text>
                        </View>
                    </View>

                    <View style={[styles.requestItem, styles.itemBorder]}>
                        <Ionicons name="calendar-outline" size={20} color={COLORS.error} />
                        <View style={styles.itemContent}>
                            <Text style={styles.itemLabel}>Fecha y hora</Text>
                            <Text style={styles.itemValue}>Hoy · 3:00 PM</Text>
                        </View>
                    </View>

                    <View style={[styles.requestItem, styles.itemBorder]}>
                        <Ionicons name="card-outline" size={20} color={COLORS.text} />
                        <View style={styles.itemContent}>
                            <Text style={styles.itemLabel}>Dirección</Text>
                            <Text style={styles.itemValue}>Av. Vallarta 1234, Zapopan</Text>
                        </View>
                    </View>

                    <View style={[styles.requestItem, styles.itemBorder]}>
                        <View style={styles.itemContent}>
                            <Text style={styles.itemLabel}>Total</Text>
                            <Text style={styles.amountValue}>${amount || "240"}</Text>
                            <Text style={styles.unpaidNote}>El pago no se ha cobrado aún</Text>
                        </View>
                    </View>

                    {requestId && !isPreviewMode ? (
                        <View style={[styles.requestItem, styles.itemBorder]}>
                            <Ionicons name="document-text-outline" size={20} color={COLORS.textSecondary} />
                            <View style={styles.itemContent}>
                                <Text style={styles.itemLabel}>ID de solicitud</Text>
                                <Text style={styles.itemValue}>{requestId}</Text>
                            </View>
                        </View>
                    ) : null}
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                {isResolvedState ? (
                    <TouchableOpacity style={styles.primaryButton} onPress={goBackToProviders}>
                        <Text style={styles.primaryButtonText}>Buscar otro proveedor</Text>
                    </TouchableOpacity>
                ) : (
                    <>
                        <TouchableOpacity
                            style={styles.primaryButton}
                            onPress={() => router.replace("/(client)/(home)")}
                        >
                            <Text style={styles.primaryButtonText}>Ir al inicio</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secondaryButton} onPress={() => void cancelRequest()}>
                            <Text style={styles.secondaryButtonText}>Cancelar solicitud</Text>
                        </TouchableOpacity>
                        <Text style={styles.bottomMessage}>Sin cargos si cancelas ahora</Text>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
}
