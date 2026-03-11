import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    Animated,
    Easing,
    TouchableOpacity,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from "@/lib/constants";
import { StyleSheet } from "react-native";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/database.types";

const UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isUuid(value?: string) {
    return Boolean(value && UUID_REGEX.test(value));
}

export default function ProcessingPaymentScreen() {
    const params = useLocalSearchParams<{
        serviceId: string;
        serviceName: string;
        providerId: string;
        providerName: string;
        providerImage?: string;
        config: string;
        amount: string;
        requestId?: string;
    }>();
    const serviceId = params.serviceId;
    const serviceName = params.serviceName;
    const providerId = params.providerId;
    const providerName = params.providerName;
    const providerImage = params.providerImage;
    const config = params.config;
    const amount = params.amount;
    const requestId = params.requestId;

    const progressAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const isMountedRef = useRef(true);
    const isSubmittingRef = useRef(false);
    const [errorMessage, setErrorMessage] = useState("");

    const continueToSearching = useCallback(async () => {
        if (isSubmittingRef.current) return;
        isSubmittingRef.current = true;
        setErrorMessage("");

        let nextRequestId = requestId;

        const goToSearching = (nextId?: string, previewMode?: boolean) => {
            router.replace({
                pathname: "/(client)/(home)/searching",
                params: {
                    serviceId,
                    serviceName,
                    providerId,
                    providerName,
                    providerImage,
                    config,
                    amount: amount ?? "240",
                    requestId: nextId,
                    previewMode: previewMode ? "1" : undefined,
                },
            });
        };

        if (!nextRequestId) {
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError || !user) {
                if (isMountedRef.current) {
                    setErrorMessage("Modo demo: no se pudo crear solicitud real. Continuando a espera.");
                }
                goToSearching(`preview-${Date.now()}`, true);
                return;
            }

            const estimatedPrice = Number(amount) || 240;
            let parsedConfig: unknown = null;
            if (config) {
                try {
                    parsedConfig = JSON.parse(config);
                } catch {
                    parsedConfig = null;
                }
            }
            const scheduledAt = new Date();
            const scheduledDate = scheduledAt.toISOString().slice(0, 10);
            const scheduledTime = scheduledAt.toTimeString().slice(0, 5);
            let requestServiceId = serviceId;

            if (!isUuid(requestServiceId) && serviceName) {
                const { data: matchedService, error: serviceLookupError } = await supabase
                    .from("services")
                    .select("id")
                    .eq("name", serviceName)
                    .limit(1)
                    .maybeSingle();

                if (serviceLookupError) {
                    if (isMountedRef.current) {
                        setErrorMessage("No pudimos validar el servicio seleccionado. Inténtalo nuevamente.");
                    }
                    isSubmittingRef.current = false;
                    return;
                }

                requestServiceId = matchedService?.id ?? "";
            }

            if (!isUuid(requestServiceId)) {
                const { data: fallbackService, error: fallbackServiceError } = await supabase
                    .from("services")
                    .select("id")
                    .eq("is_active", true)
                    .order("sort_order", { ascending: true })
                    .limit(1)
                    .maybeSingle();

                if (!fallbackServiceError && fallbackService?.id) {
                    requestServiceId = fallbackService.id;
                }
            }

            if (!isUuid(requestServiceId)) {
                if (isMountedRef.current) {
                    setErrorMessage("Modo demo: servicio no sincronizado. Continuando a espera.");
                }
                goToSearching(`preview-${Date.now()}`, true);
                return;
            }

            const { data, error } = await supabase
                .from("service_requests")
                .insert({
                    client_id: user.id,
                    provider_id: isUuid(providerId) ? providerId : null,
                    service_id: requestServiceId,
                    status: "pending",
                    address: "Av. Vallarta 1234, Zapopan",
                    scheduled_date: scheduledDate,
                    scheduled_time: scheduledTime,
                    variables:
                        parsedConfig as Database["public"]["Tables"]["service_requests"]["Insert"]["variables"],
                    estimated_price: estimatedPrice,
                })
                .select("id")
                .single();

            if (error || !data?.id) {
                if (isMountedRef.current) {
                    setErrorMessage("Modo demo: no se pudo crear solicitud real. Continuando a espera.");
                }
                goToSearching(`preview-${Date.now()}`, true);
                return;
            }

            nextRequestId = data.id;
        }

        if (!isMountedRef.current) return;

        goToSearching(nextRequestId, false);
    }, [amount, config, providerId, providerName, requestId, serviceId, serviceName]);

    useEffect(() => {
        isMountedRef.current = true;

        // Animate progress bar over 5 seconds
        Animated.timing(progressAnim, {
            toValue: 1,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();

        // Pulse animation on icon
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.1,
                    duration: 700,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 700,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Continue flow after 5 seconds
        const timer = setTimeout(() => {
            void continueToSearching();
        }, 5000);

        return () => {
            isMountedRef.current = false;
            clearTimeout(timer);
        };
    }, [continueToSearching, progressAnim, pulseAnim]);

    const progressWidth = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"],
    });

    return (
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: "Procesando pago",
                    headerStyle: { backgroundColor: COLORS.primary },
                    headerTintColor: "white",
                    headerShadowVisible: false,
                    gestureEnabled: false,
                    headerBackVisible: false,
                }}
            />

            <View style={styles.content}>
                {/* Animated icon */}
                <Animated.View
                    style={[styles.iconContainer, { transform: [{ scale: pulseAnim }] }]}
                >
                    <Ionicons name="shield-checkmark" size={52} color={COLORS.primary} />
                </Animated.View>

                <Text style={styles.title}>Procesando tu pago...</Text>
                <Text style={styles.subtitle}>Por favor no cierres esta pantalla</Text>

                {/* Progress bar */}
                <View style={styles.progressTrack}>
                    <Animated.View
                        style={[styles.progressBar, { width: progressWidth }]}
                    />
                </View>

                {/* Details card */}
                <View style={styles.card}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Proveedor</Text>
                        <Text style={styles.detailValue}>
                            {providerName || "María López"}
                        </Text>
                    </View>

                    <View style={[styles.detailRow, styles.detailRowBorder]}>
                        <Text style={styles.detailLabel}>Monto</Text>
                        <Text style={styles.amountValue}>
                            ${amount || "240"}
                        </Text>
                    </View>

                    <View style={styles.secureRow}>
                        <Ionicons name="lock-closed" size={14} color={COLORS.success} />
                        <Text style={styles.secureText}>Pago 100% seguro y encriptado</Text>
                    </View>

                    {errorMessage ? (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{errorMessage}</Text>
                            <TouchableOpacity style={styles.retryButton} onPress={() => void continueToSearching()}>
                                <Text style={styles.retryButtonText}>Reintentar</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: SPACING.xl,
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#EEF2FF",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: SPACING.xl,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 6,
    },
    title: {
        fontSize: FONT_SIZE.xl,
        fontWeight: "700",
        color: COLORS.text,
        textAlign: "center",
        marginBottom: SPACING.sm,
    },
    subtitle: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.textSecondary,
        textAlign: "center",
        marginBottom: SPACING.xl,
    },
    progressTrack: {
        width: "80%",
        height: 6,
        backgroundColor: COLORS.border,
        borderRadius: 3,
        overflow: "hidden",
        marginBottom: SPACING.xxl,
    },
    progressBar: {
        height: "100%",
        backgroundColor: COLORS.primary,
        borderRadius: 3,
    },
    card: {
        width: "100%",
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: SPACING.md,
    },
    detailRowBorder: {
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingTop: SPACING.md,
    },
    detailLabel: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.textSecondary,
    },
    detailValue: {
        fontSize: FONT_SIZE.sm,
        fontWeight: "600",
        color: COLORS.text,
    },
    amountValue: {
        fontSize: FONT_SIZE.xl,
        fontWeight: "700",
        color: COLORS.primary,
    },
    secureRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: SPACING.md,
        backgroundColor: "#E6FAF4",
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
    },
    secureText: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.success,
        fontWeight: "600",
        marginLeft: 6,
    },
    errorContainer: {
        marginTop: SPACING.md,
        alignItems: "center",
    },
    errorText: {
        color: COLORS.error,
        fontSize: FONT_SIZE.sm,
        textAlign: "center",
        marginBottom: SPACING.sm,
    },
    retryButton: {
        backgroundColor: COLORS.primary,
        borderRadius: BORDER_RADIUS.md,
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.lg,
    },
    retryButtonText: {
        color: "white",
        fontWeight: "700",
        fontSize: FONT_SIZE.sm,
    },
});
