import React from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from "@/lib/constants";
import { StyleSheet } from "react-native";

// Generate a mock transaction ID
function generateTxId() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "TX";
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

const TX_ID = generateTxId();

export default function PaymentReceiptScreen() {
    const params = useLocalSearchParams<{
        serviceId: string;
        serviceName: string;
        providerId: string;
        providerName: string;
        config: string;
        amount: string;
    }>();

    const now = new Date();
    const dateStr = now.toLocaleDateString("es-MX", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
    const timeStr = now.toLocaleTimeString("es-MX", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

    const handleContinuar = () => {
        router.replace({
            pathname: "/(client)/(home)/searching",
            params: {
                serviceId: params.serviceId,
                serviceName: params.serviceName,
                providerId: params.providerId,
                providerName: params.providerName,
                config: params.config,
                amount: params.amount,
            },
        });
    };

    return (
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: "Recibo de pago",
                    headerStyle: { backgroundColor: COLORS.primary },
                    headerTintColor: "white",
                    headerShadowVisible: false,
                    gestureEnabled: false,
                    headerBackVisible: false,
                }}
            />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Success header */}
                <View style={styles.successHeader}>
                    <View style={styles.checkCircle}>
                        <Ionicons name="checkmark" size={36} color={COLORS.success} />
                    </View>
                    <Text style={styles.successTitle}>Pago completado</Text>
                    <Text style={styles.successSubtitle}>
                        Tu pago fue procesado correctamente
                    </Text>
                </View>

                {/* Transaction details */}
                <View style={styles.receiptCard}>
                    <Text style={styles.receiptTitle}>Información de transacción</Text>

                    <View style={styles.receiptRow}>
                        <Text style={styles.receiptLabel}>ID de transacción</Text>
                        <Text style={styles.receiptValueBold}>{TX_ID}</Text>
                    </View>

                    <View style={[styles.receiptRow, styles.rowBorder]}>
                        <Text style={styles.receiptLabel}>Fecha y hora</Text>
                        <Text style={styles.receiptValue}>{dateStr} · {timeStr}</Text>
                    </View>

                    <View style={[styles.receiptRow, styles.rowBorder]}>
                        <Text style={styles.receiptLabel}>Proveedor</Text>
                        <Text style={styles.receiptValue}>
                            {params.providerName || "María López"}
                        </Text>
                    </View>

                    <View style={[styles.receiptRow, styles.rowBorder]}>
                        <Text style={styles.receiptLabel}>Servicio</Text>
                        <Text style={styles.receiptValue}>
                            {params.serviceName || "Limpieza general"}
                        </Text>
                    </View>

                    <View style={[styles.receiptRow, styles.rowBorder]}>
                        <Text style={styles.receiptLabel}>Método de pago</Text>
                        <Text style={styles.receiptValue}>Visa — 4242</Text>
                    </View>

                    <View style={[styles.receiptRow, styles.rowBorder]}>
                        <Text style={styles.receiptLabel}>Monto cobrado</Text>
                        <Text style={styles.amountValue}>
                            ${params.amount || "240"}
                        </Text>
                    </View>

                    <View style={[styles.receiptRow, styles.rowBorder]}>
                        <Text style={styles.receiptLabel}>Estado</Text>
                        <View style={styles.statusBadge}>
                            <View style={styles.statusDot} />
                            <Text style={styles.statusText}>Completado</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.continueButton} onPress={handleContinuar}>
                    <Text style={styles.continueButtonText}>Continuar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.supportLink}>
                    <Text style={styles.supportLinkText}>
                        ¿Problema con tu pago? Contactar soporte
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        padding: SPACING.lg,
        paddingBottom: SPACING.xxl,
    },
    successHeader: {
        alignItems: "center",
        paddingVertical: SPACING.xl,
    },
    checkCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: "#E6FAF4",
        borderWidth: 2,
        borderColor: COLORS.success,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: SPACING.md,
    },
    successTitle: {
        fontSize: FONT_SIZE.xl,
        fontWeight: "700",
        color: COLORS.text,
        marginBottom: SPACING.xs,
    },
    successSubtitle: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.textSecondary,
        textAlign: "center",
    },
    receiptCard: {
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 2,
    },
    receiptTitle: {
        fontSize: FONT_SIZE.md,
        fontWeight: "700",
        color: COLORS.text,
        marginBottom: SPACING.lg,
    },
    receiptRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: SPACING.sm,
    },
    rowBorder: {
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    receiptLabel: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.textSecondary,
    },
    receiptValue: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.text,
        fontWeight: "500",
        maxWidth: "55%",
        textAlign: "right",
    },
    receiptValueBold: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.text,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    amountValue: {
        fontSize: FONT_SIZE.lg,
        fontWeight: "700",
        color: COLORS.primary,
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E6FAF4",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: COLORS.success,
        marginRight: 4,
    },
    statusText: {
        fontSize: 12,
        fontWeight: "600",
        color: COLORS.success,
    },
    footer: {
        padding: SPACING.lg,
        backgroundColor: COLORS.surface,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    continueButton: {
        backgroundColor: COLORS.primary,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.lg,
        alignItems: "center",
        marginBottom: SPACING.md,
    },
    continueButtonText: {
        color: "white",
        fontSize: FONT_SIZE.md,
        fontWeight: "700",
    },
    supportLink: {
        alignItems: "center",
    },
    supportLinkText: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.primary,
        textAlign: "center",
    },
});
