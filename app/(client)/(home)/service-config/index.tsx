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
import { getStandardHeaderOptions } from "@/lib/navigation";
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
            options: ["1", "2", "3", "4"],
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
            options: ["2h", "3h", "4h", "5h"],
        },
    ];

    const [formState, setFormState] = React.useState<Record<string, string>>({
        area: "80",
        rooms: "3",
        bathrooms: "2",
        hours: "3h",
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

    return (
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
            <Stack.Screen
                options={getStandardHeaderOptions({
                    title: "Configurar servicio",
                    subtitle: serviceName || "Limpieza profunda",
                })}
            />

            <ScrollView style={styles.form} contentContainerStyle={styles.formContent}>
                {/* Fixed configurations */}
                {configFields.map(renderField)}

                {/* Notes Input */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Notas adicionales <Text style={{ fontWeight: '400', fontSize: 12, color: COLORS.textSecondary }}>(opcional)</Text></Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={formState.notes}
                        onChangeText={(val) => handleInputChange("notes", val)}
                        placeholder="Ej: Tengo dos mascotas, por favor traer productos hipoalergénicos"
                        placeholderTextColor={COLORS.textTertiary}
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                    />
                </View>

                {/* Estimated Price Card */}
                <View style={styles.priceCard}>
                    <Text style={styles.priceLabel}>Precio estimado</Text>
                    <Text style={styles.priceValue}>$290</Text>
                    <View style={styles.priceNoteContainer}>
                        <Ionicons name="information-circle" size={16} color="rgba(255, 255, 255, 0.6)" />
                        <Text style={styles.priceNote}>El pago se realiza solo si el proveedor acepta</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={() =>
                        router.push({
                            pathname: "/(client)/(home)/confirmation",
                            params: {
                                serviceId,
                                serviceName,
                                providerId,
                                providerName,
                                config: JSON.stringify(formState),
                            },
                        })
                    }
                >
                    <Text style={styles.searchButtonText}>Buscar proveedor</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
