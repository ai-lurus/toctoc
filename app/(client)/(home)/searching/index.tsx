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
import { styles } from "./styles";

export default function SearchingScreen() {
    const {
        serviceName,
        providerId,
        providerName,
        amount,
    } = useLocalSearchParams<{
        serviceName: string;
        providerId: string;
        providerName: string;
        amount: string;
    }>();

    return (
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: "¡Listo!",
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
                        <Ionicons name="checkmark" size={36} color={COLORS.success} />
                    </View>
                    <Text style={styles.successTitle}>Solicitud enviada</Text>
                    <Text style={styles.successSubtitle}>
                        Tu pago fue autorizado. Esperando que{"\n"}
                        {providerName || "María"} confirme.
                    </Text>
                </View>

                {/* Warning note */}
                <View style={styles.warningBanner}>
                    <Text style={styles.warningText}>
                        Recuerda: el pago solo se cobra si el proveedor acepta
                    </Text>
                </View>

                {/* Transaction info card */}
                <View style={styles.requestCard}>
                    <Text style={styles.requestTitle}>Información de transacción</Text>

                    <View style={styles.requestItem}>
                        <View style={styles.iconBubble}>
                            <Text style={styles.iconBubbleText}>
                                {(providerName || "M")[0]}
                            </Text>
                        </View>
                        <View style={styles.itemContent}>
                            <Text style={styles.itemLabel}>Proveedor</Text>
                            <Text style={styles.itemValue}>{providerName || "María López"}</Text>
                        </View>
                    </View>

                    <View style={[styles.requestItem, styles.itemBorder]}>
                        <Ionicons name="cash-outline" size={20} color={COLORS.secondary} />
                        <View style={styles.itemContent}>
                            <Text style={styles.itemLabel}>Monto autorizado</Text>
                            <Text style={styles.amountValue}>${amount || "240"}</Text>
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
                            <Text style={styles.itemLabel}>Método</Text>
                            <Text style={styles.itemValue}>Visa — 4242</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => router.replace("/(client)/(home)")}
                >
                    <Text style={styles.primaryButtonText}>Ver estado de mi solicitud</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
