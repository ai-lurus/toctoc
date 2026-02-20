import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING } from "@/lib/constants";
import { getStandardHeaderOptions } from "@/lib/navigation";
import { styles } from "./styles";

export default function SearchingScreen() {
    const { serviceName, providerId, providerName } = useLocalSearchParams<{
        serviceName: string;
        providerId: string;
        providerName: string;
    }>();

    return (
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
            <Stack.Screen
                options={getStandardHeaderOptions({
                    title: "Solicitud enviada",
                    showBackButton: false,
                })}
            />

            <View style={styles.content}>
                <View style={styles.searchIconContainer}>
                    <Image
                        source={{ uri: "https://i.pravatar.cc/100?u=maria" }}
                        style={styles.avatar}
                    />
                </View>

                <Text style={styles.searchingTitle}>Esperando respuesta de</Text>
                <Text style={styles.searchingSubtitle}>{providerName || "María"}</Text>

                <View style={styles.timerBadge}>
                    <Text style={styles.timerLabel}>Tiempo de espera</Text>
                    <Text style={styles.timerValue}>42 min restantes</Text>
                </View>

                <Text style={styles.disclaimerBar}>
                    Te notificaremos cuando {providerName || "María"} responda. Puedes seguir usando la app con normalidad.
                </Text>

                <View style={styles.requestCard}>
                    <Text style={styles.requestTitle}>Resumen de solicitud</Text>

                    <View style={styles.requestItem}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                            <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: COLORS.primaryLight, alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
                                <Text style={{ color: 'white', fontSize: 10, fontWeight: '700' }}>M</Text>
                            </View>
                            <Text style={[styles.requestText, { color: COLORS.text, fontWeight: '600', marginLeft: 0 }]}>{providerName || "María López"}</Text>
                            <Ionicons name="checkmark-circle" size={14} color={COLORS.primary} style={{ marginLeft: 4 }} />
                        </View>
                    </View>

                    <View style={[styles.requestItem, { marginTop: SPACING.md }]}>
                        <Ionicons name="brush-outline" size={16} color={COLORS.secondary} />
                        <Text style={styles.requestText}>Tipo de servicio: <Text style={{ color: COLORS.text, fontWeight: '600' }}>{serviceName || "Limpieza general"}</Text></Text>
                    </View>

                    <View style={styles.requestItem}>
                        <Ionicons name="calendar-outline" size={16} color={COLORS.error} />
                        <Text style={styles.requestText}>Fecha y hora: <Text style={{ color: COLORS.text, fontWeight: '600' }}>Hoy · 3:00 PM</Text></Text>
                    </View>

                    <View style={styles.requestItem}>
                        <Ionicons name="location-outline" size={16} color={COLORS.primary} />
                        <Text style={styles.requestText}>Dirección: <Text style={{ color: COLORS.text, fontWeight: '600' }}>Av. Vallarta 1234, Zapopan</Text></Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: SPACING.md, paddingTop: SPACING.sm, borderTopWidth: 1, borderTopColor: COLORS.border }}>
                        <Text style={{ fontSize: 12, color: COLORS.textSecondary }}>Total</Text>
                        <Text style={{ fontSize: 16, fontWeight: '700', color: COLORS.primary }}>$240</Text>
                    </View>
                    <Text style={{ fontSize: 10, color: COLORS.textTertiary, textAlign: 'right', marginTop: 4 }}>
                        El pago no se ha cobrado aún
                    </Text>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => router.replace("/(client)/(home)")}
                >
                    <Text style={styles.primaryButtonText}>Ir al inicio</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => router.replace("/(client)/(home)")}
                >
                    <Text style={styles.secondaryButtonText}>Cancelar solicitud</Text>
                </TouchableOpacity>

                <Text style={styles.bottomMessage}>Sin cargos si cancelas ahora</Text>
            </View>
        </SafeAreaView>
    );
}
