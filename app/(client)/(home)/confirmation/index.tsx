import React from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, BORDER_RADIUS } from "@/lib/constants";
import { getStandardHeaderOptions } from "@/lib/navigation";
import { styles } from "./styles";

export default function ConfirmationScreen() {
    const { serviceId, serviceName, providerId, providerName, config } = useLocalSearchParams<{
        serviceId: string;
        serviceName: string;
        providerId: string;
        providerName: string;
        config: string;
    }>();

    const parsedConfig = config ? JSON.parse(config) : {};


    return (
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
            <Stack.Screen
                options={getStandardHeaderOptions({
                    title: "Confirmación y pago",
                    subtitle: "Revisa y confirma tu solicitud",
                })}
            />

            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Resumen del servicio</Text>

                    <View style={styles.summaryHeader}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{providerName?.[0] || "A"}</Text>
                        </View>
                        <View style={styles.providerInfo}>
                            <Text style={styles.providerNameText}>{providerName || "Ana García"}</Text>
                            <View style={styles.ratingRow}>
                                <Ionicons name="star" size={14} color="#FFC107" />
                                <Text style={styles.ratingText}>4.9</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.detailItem}>
                        <Ionicons name="brush-outline" size={20} color={COLORS.secondary} />
                        <View style={styles.detailContent}>
                            <Text style={styles.detailLabel}>Servicio</Text>
                            <Text style={styles.detailValue}>{serviceName || "Limpieza general"}</Text>
                        </View>
                    </View>

                    <View style={styles.detailItem}>
                        <Ionicons name="calendar-outline" size={20} color={COLORS.error} />
                        <View style={styles.detailContent}>
                            <Text style={styles.detailLabel}>Fecha y hora</Text>
                            <Text style={styles.detailValue}>Hoy · 3:00 PM</Text>
                        </View>
                    </View>

                    <View style={styles.subDetailContainer}>
                        <View style={styles.subDetailItem}>
                            <Text style={styles.subDetailLabel}>Área</Text>
                            <Text style={styles.subDetailValue}>{parsedConfig.area || "80"} m²</Text>
                        </View>
                        <View style={styles.subDetailItem}>
                            <Text style={styles.subDetailLabel}>Habitaciones</Text>
                            <Text style={styles.subDetailValue}>{parsedConfig.rooms || "3"}</Text>
                        </View>
                        <View style={styles.subDetailItem}>
                            <Text style={styles.subDetailLabel}>Baños</Text>
                            <Text style={styles.subDetailValue}>{parsedConfig.bathrooms || "2"}</Text>
                        </View>
                        <View style={styles.subDetailItem}>
                            <Text style={styles.subDetailLabel}>Duración estimada</Text>
                            <Text style={styles.subDetailValue}>{parsedConfig.hours || "3 horas"}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitleSmall}>Dirección del servicio</Text>
                        <TouchableOpacity>
                            <Text style={styles.changeLink}>Cambiar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.addressContainer}>
                        <View style={styles.addressIcon}>
                            <Ionicons name="location" size={20} color={COLORS.error} />
                        </View>
                        <Text style={styles.addressText}>Av. Vallarta 1234, Zapopan</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total a pagar</Text>
                        <Text style={styles.totalValue}>$240</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitleSmall}>Método de pago</Text>
                        <TouchableOpacity onPress={() => router.push("/(client)/(home)/payment-method")}>
                            <Text style={styles.changeLink}>Cambiar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.paymentContainer}>
                        <View style={styles.cardIcon}>
                            <Ionicons name="card-outline" size={24} color={COLORS.text} />
                        </View>
                        <View style={styles.paymentInfo}>
                            <Text style={styles.cardName}>Visa •••• 4242</Text>
                            <Text style={styles.cardExpiry}>Vence 12/26</Text>
                        </View>
                    </View>
                    <View style={styles.stripeBadge}>
                        <Ionicons name="star" size={10} color={COLORS.primary} />
                        <Text style={styles.stripeText}>Procesamiento seguro por Stripe</Text>
                    </View>
                </View>

                <View style={styles.securityCard}>
                    <Ionicons name="shield-checkmark" size={24} color={COLORS.success} />
                    <View style={styles.securityContent}>
                        <Text style={styles.securityTitle}>Protección de pago</Text>
                        <Text style={styles.securityText}>
                            Tu pago se retiene hasta que confirmes que el servicio fue completado. Solo se cobra si el proveedor acepta.
                        </Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => router.push({
                        pathname: "/(client)/(home)/searching",
                        params: {
                            serviceId,
                            serviceName,
                            config
                        }
                    })}
                >
                    <Text style={styles.confirmButtonText}>Confirmar solicitud</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
