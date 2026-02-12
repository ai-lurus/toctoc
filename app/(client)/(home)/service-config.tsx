import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from "@/lib/constants";

type ConfigField = {
    id: string;
    label: string;
    type: "number" | "selector" | "date" | "time" | "text" | "multiline";
    options?: string[];
    placeholder?: string;
};

export default function ServiceConfigScreen() {
    const { serviceId, serviceName, providerId, providerName } = useLocalSearchParams<{
        serviceId: string;
        serviceName: string;
        providerId: string;
        providerName: string;
    }>();

    // Helper to generate next 7 days
    const nextDays = useMemo(() => {
        const days = [];
        const now = new Date();
        const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
        const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(now.getDate() + i);
            days.push({
                fullDate: date.toISOString().split("T")[0],
                dayName: dayNames[date.getDay()],
                dayNumber: date.getDate().toString(),
                month: monthNames[date.getMonth()],
            });
        }
        return days;
    }, []);

    // Mocked configuration fields
    const configFields: ConfigField[] = [
        {
            id: "area",
            label: "Metros cuadrados",
            type: "number",
            placeholder: "80",
        },
        {
            id: "rooms",
            label: "Habitaciones",
            type: "selector",
            options: ["1", "2", "3", "4", "5"],
        },
        {
            id: "bathrooms",
            label: "Baños",
            type: "selector",
            options: ["1", "2", "3", "4"],
        },
        {
            id: "hours",
            label: "Horas estimadas",
            type: "selector",
            options: ["2h", "3h", "4h", "5h", "6h"],
        },
    ];

    const [formState, setFormState] = useState<Record<string, string>>({
        area: "80",
        rooms: "3",
        bathrooms: "2",
        hours: "3h",
        selectedDate: nextDays[0].fullDate,
        selectedTime: "10:00",
        address: "",
        notes: "",
    });

    const handleInputChange = (id: string, value: string) => {
        setFormState((prev) => ({ ...prev, [id]: value }));
    };

    const renderField = (field: ConfigField) => {
        switch (field.type) {
            case "number":
                return (
                    <View key={field.id} style={styles.fieldContainer}>
                        <Text style={styles.label}>{field.label}</Text>
                        <TextInput
                            style={styles.input}
                            value={formState[field.id]}
                            onChangeText={(val) => handleInputChange(field.id, val)}
                            keyboardType="numeric"
                            placeholder={field.placeholder}
                            placeholderTextColor={COLORS.textTertiary}
                        />
                    </View>
                );
            case "selector":
                return (
                    <View key={field.id} style={styles.fieldContainer}>
                        <Text style={styles.label}>{field.label}</Text>
                        <View style={styles.selectorContainer}>
                            {field.options?.map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={[
                                        styles.selectorItem,
                                        formState[field.id] === option && styles.selectorItemActive,
                                    ]}
                                    onPress={() => handleInputChange(field.id, option)}
                                >
                                    <Text
                                        style={[
                                            styles.selectorText,
                                            formState[field.id] === option && styles.selectorTextActive,
                                        ]}
                                    >
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    const timeSlots = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"];

    return (
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: () => (
                        <View>
                            <Text style={{ fontSize: FONT_SIZE.lg, fontWeight: "700", color: COLORS.text }}>
                                Configurar servicio
                            </Text>
                            <Text style={{ fontSize: FONT_SIZE.sm, color: COLORS.textSecondary }}>
                                {serviceName}
                            </Text>
                        </View>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => router.back()}
                            style={{ marginLeft: -SPACING.xs, padding: SPACING.xs }}
                        >
                            <Ionicons name="chevron-back" size={24} color={COLORS.text} />
                        </TouchableOpacity>
                    ),
                    headerTintColor: COLORS.text,
                }}
            />

            <ScrollView style={styles.form} contentContainerStyle={styles.formContent}>
                {/* Fixed configurations */}
                {configFields.map(renderField)}

                {/* Day Selection */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Selecciona un día</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.dateList}
                    >
                        {nextDays.map((date) => (
                            <TouchableOpacity
                                key={date.fullDate}
                                style={[
                                    styles.dateCard,
                                    formState.selectedDate === date.fullDate && styles.dateCardActive,
                                ]}
                                onPress={() => handleInputChange("selectedDate", date.fullDate)}
                            >
                                <Text style={[styles.dateDayName, formState.selectedDate === date.fullDate && styles.dateTextActive]}>
                                    {date.dayName}
                                </Text>
                                <Text style={[styles.dateDayNumber, formState.selectedDate === date.fullDate && styles.dateTextActive]}>
                                    {date.dayNumber}
                                </Text>
                                <Text style={[styles.dateMonth, formState.selectedDate === date.fullDate && styles.dateTextActive]}>
                                    {date.month}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Time Selection */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Horario</Text>
                    <View style={styles.timeGrid}>
                        {timeSlots.map((slot) => (
                            <TouchableOpacity
                                key={slot}
                                style={[
                                    styles.timeItem,
                                    formState.selectedTime === slot && styles.timeItemActive,
                                ]}
                                onPress={() => handleInputChange("selectedTime", slot)}
                            >
                                <Text style={[styles.timeText, formState.selectedTime === slot && styles.timeTextActive]}>
                                    {slot}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Address Input */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Dirección</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.address}
                        onChangeText={(val) => handleInputChange("address", val)}
                        placeholder="Ingresa tu dirección"
                        placeholderTextColor={COLORS.textTertiary}
                    />
                </View>

                {/* Notes Input */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Notas adicionales</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={formState.notes}
                        onChangeText={(val) => handleInputChange("notes", val)}
                        placeholder="Comparte más especificaciones con tu proveedor(a) de servicio"
                        placeholderTextColor={COLORS.textTertiary}
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                    />
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() =>
                        router.push({
                            pathname: "/(client)/(home)/checkout",
                            params: {
                                serviceId,
                                serviceName,
                                config: JSON.stringify(formState),
                            },
                        })
                    }
                >
                    <Text style={styles.submitButtonText}>Continuar</Text>
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
    form: {
        flex: 1,
    },
    formContent: {
        padding: SPACING.lg,
    },
    fieldContainer: {
        marginBottom: SPACING.lg,
    },
    label: {
        fontSize: FONT_SIZE.lg,
        fontWeight: "600",
        color: COLORS.text,
        marginBottom: SPACING.md,
    },
    input: {
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        fontSize: FONT_SIZE.md,
        color: COLORS.text,
    },
    textArea: {
        height: 120,
    },
    selectorContainer: {
        flexDirection: "row",
        gap: SPACING.sm,
    },
    selectorItem: {
        flex: 1,
        height: 50,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.surface,
    },
    selectorItemActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    selectorText: {
        fontSize: FONT_SIZE.md,
        color: COLORS.text,
    },
    selectorTextActive: {
        color: "white",
        fontWeight: "600",
    },
    dateList: {
        gap: SPACING.sm,
    },
    dateCard: {
        width: 65,
        paddingVertical: SPACING.sm,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: "center",
        backgroundColor: COLORS.surface,
    },
    dateCardActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
        // shadow for premium look
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    dateDayName: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.textSecondary,
    },
    dateDayNumber: {
        fontSize: FONT_SIZE.lg,
        fontWeight: "700",
        color: COLORS.text,
        marginVertical: 2,
    },
    dateMonth: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.textSecondary,
    },
    dateTextActive: {
        color: "white",
    },
    timeGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: SPACING.sm,
    },
    timeItem: {
        width: "31%", // roughly 3 columns
        height: 50,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.surface,
    },
    timeItemActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    timeText: {
        fontSize: FONT_SIZE.md,
        color: COLORS.text,
    },
    timeTextActive: {
        color: "white",
        fontWeight: "600",
    },
    footer: {
        padding: SPACING.lg,
        backgroundColor: COLORS.background,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    submitButton: {
        backgroundColor: COLORS.primary,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.lg,
        alignItems: "center",
    },
    submitButtonText: {
        fontSize: FONT_SIZE.lg,
        fontWeight: "600",
        color: "white",
    },
});
