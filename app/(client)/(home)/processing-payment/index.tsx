import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    Animated,
    Easing,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from "@/lib/constants";
import { StyleSheet } from "react-native";

export default function ProcessingPaymentScreen() {
    const params = useLocalSearchParams<{
        serviceId: string;
        serviceName: string;
        providerId: string;
        providerName: string;
        config: string;
        amount: string;
    }>();

    const progressAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
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

        // Navigate after 5 seconds
        const timer = setTimeout(() => {
            router.replace({
                pathname: "/(client)/(home)/payment-receipt",
                params: {
                    serviceId: params.serviceId,
                    serviceName: params.serviceName,
                    providerId: params.providerId,
                    providerName: params.providerName,
                    config: params.config,
                    amount: params.amount ?? "240",
                },
            });
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

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
                            {params.providerName || "María López"}
                        </Text>
                    </View>

                    <View style={[styles.detailRow, styles.detailRowBorder]}>
                        <Text style={styles.detailLabel}>Monto</Text>
                        <Text style={styles.amountValue}>
                            ${params.amount || "240"}
                        </Text>
                    </View>

                    <View style={styles.secureRow}>
                        <Ionicons name="lock-closed" size={14} color={COLORS.success} />
                        <Text style={styles.secureText}>Pago 100% seguro y encriptado</Text>
                    </View>
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
});
