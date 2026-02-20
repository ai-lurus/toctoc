import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { COLORS, FONT_SIZE } from "./constants";

interface HeaderOptionsProps {
    title: string;
    subtitle?: string;
    showBackButton?: boolean;
    onBack?: () => void;
}

export const getStandardHeaderOptions = ({
    title,
    subtitle,
    showBackButton = true,
    onBack,
}: HeaderOptionsProps) => {
    const isIOS = Platform.OS === "ios";

    return {
        headerShown: true,
        headerStyle: {
            backgroundColor: COLORS.primary,
        },
        headerShadowVisible: false,
        headerTintColor: "white",
        // On iOS, we let the native back button handle it if showBackButton is true
        // On other platforms, we show our custom circular button if showBackButton is true
        headerLeft: isIOS || !showBackButton
            ? undefined
            : () => (
                <TouchableOpacity
                    onPress={onBack || (() => router.back())}
                    style={{
                        backgroundColor: "white",
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Ionicons name="chevron-back" size={20} color={COLORS.text} />
                </TouchableOpacity>
            ),
        headerBackVisible: isIOS && showBackButton,
        headerTitle: () => (
            <View style={{ marginLeft: !isIOS && showBackButton ? 8 : 0 }}>
                <Text style={{ fontSize: FONT_SIZE.lg, fontWeight: "700", color: "white" }}>
                    {title}
                </Text>
                {subtitle && (
                    <Text style={{ fontSize: 12, color: "rgba(255, 255, 255, 0.7)" }}>
                        {subtitle}
                    </Text>
                )}
            </View>
        ),
        headerLeftContainerStyle: {
            paddingLeft: !isIOS && showBackButton ? 16 : 0,
        },
        headerTitleContainerStyle: {
            marginLeft: 0,
        },
        headerBackTitle: "", // Ensure no text is shown next to back button
        headerBackTitleVisible: false, // Hide "Back" text on iOS
    };
};
