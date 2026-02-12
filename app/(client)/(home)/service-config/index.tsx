import React from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, FONT_SIZE } from "@/lib/constants";
import { styles } from "./styles";

type ConfigField = {
    id: string;
    label: string;
    type: "number" | "selector";
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
    const nextDays = React.useMemo(() => {
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

    const [formState, setFormState] = React.useState<Record<string, string>>({
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
                            pathname: "/(client)/(home)/providers",
                            params: {
                                serviceId,
                                serviceName,
                                config: JSON.stringify(formState),
                            },
                        })
                    }
                >
                    <Text style={styles.submitButtonText}>Confirmar y Reservar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
