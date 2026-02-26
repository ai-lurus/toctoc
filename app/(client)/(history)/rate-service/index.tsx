import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from "@/lib/constants";

export default function RateServiceScreen() {
    const [rating, setRating] = useState(0);

    return (
        <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.checkCircle}>
                    <Ionicons name="checkmark" size={48} color="#fff" />
                </View>

                <Text style={styles.title}>¡Servicio completado!</Text>
                <Text style={styles.subtitle}>¿Cómo fue tu experiencia?</Text>

                <Text style={styles.label}>Califica el servicio</Text>
                <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map((s) => (
                        <TouchableOpacity key={s} onPress={() => setRating(s)}>
                            <Ionicons name={s <= rating ? "star" : "star-outline"} size={40} color={s <= rating ? COLORS.secondary : COLORS.border} />
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.inputLabel}>Comentarios (opcional)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Cuéntanos sobre tu experiencia..."
                    multiline
                    numberOfLines={4}
                />

                <TouchableOpacity
                    style={[styles.submitBtn, rating === 0 && { opacity: 0.5 }]}
                    disabled={rating === 0}
                    onPress={() => router.replace("/(client)/(history)" as any)}
                >
                    <Text style={styles.submitBtnText}>Enviar calificación</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.skipBtn}
                    onPress={() => router.replace("/(client)/(history)" as any)}
                >
                    <Text style={styles.skipBtnText}>Omitir por ahora</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    content: { padding: SPACING.xl, alignItems: "center" },
    checkCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: COLORS.success, alignItems: "center", justifyContent: "center", marginBottom: 24, marginTop: 40 },
    title: { fontSize: FONT_SIZE.xl, fontWeight: "800", color: COLORS.text, marginBottom: 8 },
    subtitle: { fontSize: FONT_SIZE.sm, color: COLORS.textSecondary, marginBottom: 32 },
    label: { fontWeight: "700", marginBottom: 12 },
    starsRow: { flexDirection: "row", gap: 8, marginBottom: 32 },
    inputLabel: { alignSelf: "flex-start", fontWeight: "600", marginBottom: 8, fontSize: 12, color: COLORS.textSecondary },
    input: { width: "100%", borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, padding: 12, height: 100, textAlignVertical: "top", marginBottom: 32 },
    submitBtn: { width: "100%", backgroundColor: COLORS.primary, paddingVertical: 14, borderRadius: 12, alignItems: "center", marginBottom: 16 },
    submitBtnText: { color: "#fff", fontWeight: "700" },
    skipBtn: { padding: 8 },
    skipBtnText: { color: COLORS.textTertiary, fontSize: 12 },
});
