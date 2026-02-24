import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from "@/lib/constants";

export default function BookingDetailScreen() {
    const [showCancel, setShowCancel] = useState(false);

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detalles de reserva</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.statusBadge}>
                    <Ionicons name="checkmark-circle" size={14} color="#388E3C" />
                    <Text style={styles.statusText}>Confirmado</Text>
                </View>

                <View style={styles.providerCard}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>M</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.providerName}>María López</Text>
                        <View style={styles.ratingRow}>
                            <Ionicons name="star" size={12} color={COLORS.secondary} />
                            <Text style={styles.ratingText}>4.8 (245 servicios)</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.infoSection}>
                    <InfoItem icon="construct-outline" label="Servicio" value="Limpieza general" />
                    <InfoItem icon="calendar-outline" label="Fecha" value="Viernes, 20 Feb 2026" />
                    <InfoItem icon="time-outline" label="Hora" value="3:00 PM - 5:00 PM (2 horas)" />
                    <InfoItem icon="location-outline" label="Dirección" value="Av. Vallarta 1234, Col. Americana" />
                </View>

                <View style={styles.paymentCard}>
                    <Text style={styles.sectionTitle}>Información de pago</Text>
                    <View style={styles.payRow}>
                        <Text style={styles.payLabel}>Servicio (2 horas)</Text>
                        <Text style={styles.payVal}>$200</Text>
                    </View>
                    <View style={styles.payRow}>
                        <Text style={styles.payLabel}>Tarifa de servicio</Text>
                        <Text style={styles.payVal}>$40</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.payRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalVal}>$240</Text>
                    </View>
                    <View style={styles.methodRow}>
                        <Ionicons name="card" size={16} color={COLORS.textSecondary} />
                        <Text style={styles.methodText}>Visa •••• 4242</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.contactBtn}
                >
                    <Text style={styles.contactBtnText}>Contactar proveedor</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelLink} onPress={() => setShowCancel(true)}>
                    <Text style={styles.cancelLinkText}>Cancelar servicio</Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal visible={showCancel} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBody}>
                        <View style={styles.warnIcon}>
                            <Ionicons name="warning" size={32} color={COLORS.warning} />
                        </View>
                        <Text style={styles.modalTitle}>¿Cancelar servicio?</Text>
                        <Text style={styles.modalSub}>Este servicio tiene cargos por cancelación tardía</Text>

                        <View style={styles.feeRow}>
                            <Text style={styles.feeLabel}>Cargo por cancelación</Text>
                            <Text style={styles.feeVal}>$120</Text>
                        </View>
                        <Text style={styles.feeNote}>Se cobrará el 50% del valor del servicio</Text>

                        <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowCancel(false)}>
                            <Text style={styles.modalCancelBtnText}>Confirmar cancelación</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalKeepBtn} onPress={() => setShowCancel(false)}>
                            <Text style={styles.modalKeepBtnText}>Mantener reserva</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

function InfoItem({ icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
                <Ionicons name={icon} size={16} color={COLORS.primary} />
            </View>
            <View>
                <Text style={styles.infoLabel}>{label}</Text>
                <Text style={styles.infoValue}>{value}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { backgroundColor: COLORS.primary, flexDirection: "row", alignItems: "center", padding: SPACING.md },
    backBtn: { marginRight: 12 },
    headerTitle: { color: "#fff", fontSize: FONT_SIZE.md, fontWeight: "700" },
    content: { padding: SPACING.lg },
    statusBadge: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#E8F5E9", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, alignSelf: "center", marginBottom: 20 },
    statusText: { fontSize: 10, fontWeight: "700", color: "#388E3C" },
    providerCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 16, borderRadius: 12, marginBottom: 16 },
    avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.primary, alignItems: "center", justifyContent: "center", marginRight: 12 },
    avatarText: { color: "#fff", fontWeight: "700" },
    providerName: { fontWeight: "700", fontSize: FONT_SIZE.sm },
    ratingRow: { flexDirection: "row", alignItems: "center", gap: 4 },
    ratingText: { fontSize: 12, color: COLORS.textSecondary },
    infoSection: { backgroundColor: "#fff", padding: 16, borderRadius: 12, marginBottom: 16 },
    infoItem: { flexDirection: "row", gap: 12, marginBottom: 16 },
    infoIcon: { width: 32, height: 32, borderRadius: 8, backgroundColor: COLORS.primaryLight, alignItems: "center", justifyContent: "center" },
    infoLabel: { fontSize: 10, color: COLORS.textSecondary },
    infoValue: { fontSize: FONT_SIZE.sm, fontWeight: "600" },
    paymentCard: { backgroundColor: "#fff", padding: 16, borderRadius: 12, marginBottom: 24 },
    sectionTitle: { fontWeight: "700", marginBottom: 16 },
    payRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
    payLabel: { fontSize: 12, color: COLORS.textSecondary },
    payVal: { fontSize: 12, fontWeight: "600" },
    divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 12 },
    totalLabel: { fontWeight: "700" },
    totalVal: { color: COLORS.primary, fontWeight: "700" },
    methodRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: COLORS.border },
    methodText: { fontSize: 12, color: COLORS.textSecondary },
    contactBtn: { backgroundColor: COLORS.primary, paddingVertical: 14, borderRadius: 8, alignItems: "center" },
    contactBtnText: { color: "#fff", fontWeight: "700" },
    cancelLink: { alignItems: "center", marginTop: 16 },
    cancelLinkText: { color: COLORS.error, fontWeight: "600" },
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", padding: 24 },
    modalBody: { backgroundColor: "#fff", borderRadius: 24, padding: 24, alignItems: "center" },
    warnIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: "#FFF4CC", alignItems: "center", justifyContent: "center", marginBottom: 16 },
    modalTitle: { fontSize: 18, fontWeight: "800", marginBottom: 8 },
    modalSub: { fontSize: 12, color: COLORS.textSecondary, textAlign: "center", marginBottom: 24 },
    feeRow: { flexDirection: "row", justifyContent: "space-between", width: "100%", padding: 16, backgroundColor: COLORS.background, borderRadius: 12 },
    feeLabel: { fontSize: 12, color: COLORS.textSecondary },
    feeVal: { fontSize: 14, fontWeight: "700", color: COLORS.error },
    feeNote: { fontSize: 10, color: COLORS.textTertiary, marginTop: 8, marginBottom: 24 },
    modalCancelBtn: { width: "100%", backgroundColor: COLORS.error, paddingVertical: 14, borderRadius: 12, alignItems: "center", marginBottom: 12 },
    modalCancelBtnText: { color: "#fff", fontWeight: "700" },
    modalKeepBtn: { width: "100%", borderWidth: 1, borderColor: COLORS.border, paddingVertical: 14, borderRadius: 12, alignItems: "center" },
    modalKeepBtnText: { color: COLORS.textSecondary, fontWeight: "600" },
});
