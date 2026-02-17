import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Stack, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONT_SIZE, SPACING } from "@/lib/constants";
import { styles } from "./styles";

export default function PaymentMethodScreen() {
    const [cardData, setCardData] = useState({
        number: "",
        name: "",
        expiry: "",
        cvv: "",
    });

    const handleInputChange = (field: string, value: string) => {
        setCardData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: () => (
                        <View>
                            <Text style={{ fontSize: FONT_SIZE.lg, fontWeight: "700", color: COLORS.text }}>
                                Método de pago
                            </Text>
                            <Text style={{ fontSize: FONT_SIZE.sm, color: COLORS.textSecondary }}>
                                Añade tu forma de pago
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

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.sectionTitle}>Selecciona método</Text>

                    <View style={styles.methodList}>
                        {/* Credit/Debit Card - Active */}
                        <TouchableOpacity style={[styles.methodItem, styles.methodItemActive]}>
                            <View style={styles.methodIconContainer}>
                                <Ionicons name="card" size={24} color={COLORS.text} />
                            </View>
                            <View style={styles.methodInfo}>
                                <Text style={styles.methodTitle}>Tarjeta de crédito/débito</Text>
                                <Text style={styles.methodSubtitle}>Visa, Mastercard, AMEX</Text>
                            </View>
                            <View style={styles.checkContainer}>
                                <Ionicons name="checkmark" size={16} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.sectionTitle}>Datos de la tarjeta</Text>

                    <View style={styles.form}>
                        <View style={styles.field}>
                            <Text style={styles.label}>Número de tarjeta</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="1234 5678 9012 3456"
                                placeholderTextColor={COLORS.textTertiary}
                                keyboardType="numeric"
                                value={cardData.number}
                                onChangeText={(v) => handleInputChange("number", v)}
                            />
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.label}>Nombre del titular</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="JUAN PÉREZ"
                                placeholderTextColor={COLORS.textTertiary}
                                autoCapitalize="characters"
                                value={cardData.name}
                                onChangeText={(v) => handleInputChange("name", v)}
                            />
                        </View>

                        <View style={styles.row}>
                            <View style={styles.field}>
                                <Text style={styles.label}>Vencimiento</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="MM/YY"
                                    placeholderTextColor={COLORS.textTertiary}
                                    keyboardType="numeric"
                                    value={cardData.expiry}
                                    onChangeText={(v) => handleInputChange("expiry", v)}
                                />
                            </View>
                            <View style={styles.field}>
                                <Text style={styles.label}>CVV</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="123"
                                    placeholderTextColor={COLORS.textTertiary}
                                    keyboardType="numeric"
                                    secureTextEntry
                                    maxLength={4}
                                    value={cardData.cvv}
                                    onChangeText={(v) => handleInputChange("cvv", v)}
                                />
                            </View>
                        </View>

                        <TouchableOpacity style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Guardar y continuar</Text>
                        </TouchableOpacity>

                        <View style={styles.disclaimerCard}>
                            <Text style={styles.disclaimerText}>
                                Todos los pagos son procesados de forma segura con encriptación de nivel bancario. Nunca almacenamos tu información completa de tarjeta.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
