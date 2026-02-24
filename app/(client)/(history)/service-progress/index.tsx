import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from "@/lib/constants";

const STEPS = [
    { id: 1, label: "En camino", description: "Tu proveedor está en camino", done: true, current: false },
    { id: 2, label: "Servicio iniciado", description: "El servicio está en progreso", done: true, current: false },
    { id: 3, label: "Finalizado", description: "El servicio ha sido completado", done: true, current: true },
];

export default function ServiceProgressScreen() {
    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Servicio en progreso</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.providerCard}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>M</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.providerName}>María López</Text>
                        <View style={styles.ratingRow}>
                            <Ionicons name="star" size={12} color={COLORS.secondary} />
                            <Text style={styles.ratingText}>4.8</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.actionBtn}>
                        <Ionicons name="chatbubble" size={20} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>

                <View style={styles.stepper}>
                    {STEPS.map((step, index) => (
                        <View key={step.id}>
                            <View style={styles.stepRow}>
                                <View style={[styles.stepDot, step.done && styles.stepDotDone]}>
                                    {step.done && <Ionicons name="checkmark" size={14} color="#fff" />}
                                </View>
                                <View style={styles.stepInfo}>
                                    <Text style={[styles.stepLabel, step.done && styles.stepLabelDone]}>{step.label}</Text>
                                    <Text style={styles.stepDesc}>{step.description}</Text>
                                </View>
                            </View>
                            {index < STEPS.length - 1 && (
                                <View style={[styles.stepLine, step.done && styles.stepLineDone]} />
                            )}
                            {step.current && (
                                <View style={styles.finalizedBanner}>
                                    <View style={styles.checkBig}>
                                        <Ionicons name="checkmark" size={32} color="#fff" />
                                    </View>
                                    <Text style={styles.finalizedTitle}>Finalizado</Text>
                                    <Text style={styles.finalizedSub}>El servicio ha sido completado</Text>
                                </View>
                            )}
                        </View>
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.completeBtn}
                    onPress={() => router.push("/(client)/(history)/rate-service" as any)}
                >
                    <Text style={styles.completeBtnText}>Completar y calificar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.chatLink}>
                    <Text style={styles.chatLinkText}>Abrir chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelLink}>
                    <Text style={styles.cancelLinkText}>Cancelar servicio</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { backgroundColor: COLORS.primary, flexDirection: "row", alignItems: "center", padding: SPACING.md },
    backBtn: { marginRight: 12 },
    headerTitle: { color: "#fff", fontSize: FONT_SIZE.md, fontWeight: "700" },
    content: { padding: SPACING.lg },
    providerCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 16, borderRadius: 12, marginBottom: 24, elevation: 2 },
    avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.primary, alignItems: "center", justifyContent: "center", marginRight: 12 },
    avatarText: { color: "#fff", fontWeight: "700" },
    providerName: { fontWeight: "700", fontSize: FONT_SIZE.sm },
    ratingRow: { flexDirection: "row", alignItems: "center", gap: 4 },
    ratingText: { fontSize: 12, color: COLORS.textSecondary },
    actionBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primaryLight, alignItems: "center", justifyContent: "center" },
    stepper: { backgroundColor: "#fff", padding: 20, borderRadius: 12, elevation: 2 },
    stepRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
    stepDot: { width: 24, height: 24, borderRadius: 12, backgroundColor: COLORS.border, alignItems: "center", justifyContent: "center" },
    stepDotDone: { backgroundColor: COLORS.success },
    stepInfo: { flex: 1 },
    stepLabel: { fontSize: FONT_SIZE.sm, fontWeight: "600", color: COLORS.textTertiary },
    stepLabelDone: { color: COLORS.text },
    stepDesc: { fontSize: 12, color: COLORS.textSecondary },
    stepLine: { width: 2, height: 24, backgroundColor: COLORS.border, marginLeft: 11, marginVertical: 4 },
    stepLineDone: { backgroundColor: COLORS.success },
    finalizedBanner: { backgroundColor: "#E8F9F3", borderRadius: 12, padding: 20, alignItems: "center", marginTop: 12 },
    checkBig: { width: 56, height: 56, borderRadius: 28, backgroundColor: COLORS.success, alignItems: "center", justifyContent: "center", marginBottom: 8 },
    finalizedTitle: { fontSize: FONT_SIZE.md, fontWeight: "700" },
    finalizedSub: { fontSize: 12, color: COLORS.textSecondary },
    completeBtn: { backgroundColor: COLORS.primary, paddingVertical: 14, borderRadius: 8, alignItems: "center", marginTop: 24 },
    completeBtnText: { color: "#fff", fontWeight: "700" },
    chatLink: { alignItems: "center", marginTop: 16 },
    chatLinkText: { color: COLORS.primary, fontWeight: "600" },
    cancelLink: { alignItems: "center", marginTop: 12 },
    cancelLinkText: { color: COLORS.error, fontSize: 12 },
});
