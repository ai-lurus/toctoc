import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
} from "react-native";
import { router, useLocalSearchParams, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from "@/lib/constants";

export default function ProvidersScreen() {
    const { serviceId, serviceName } = useLocalSearchParams<{
        serviceId: string;
        serviceName: string;
    }>();

    const placeholderProvider = {
        id: "1",
        name: "Juan Pérez",
        description: "Especialista en " + serviceName,
        rating: 4.8,
        reviews: 124,
        price: 450,
        image: "https://i.pravatar.cc/150?u=juan",
    };

    const providers = [placeholderProvider];

    return (
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: "Proveedores",
                    headerTintColor: COLORS.text,
                }}
            />

            <View style={styles.header}>
                <Text style={styles.title}>Selecciona un proveedor para</Text>
                <Text style={styles.serviceName}>{serviceName}</Text>
            </View>

            <FlatList
                data={providers}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        activeOpacity={0.7}
                        onPress={() => {
                            router.push({
                                pathname: "/(client)/(home)/service-config",
                                params: {
                                    serviceId,
                                    serviceName,
                                    providerId: item.id,
                                    providerName: item.name
                                },
                            })
                        }}
                    >
                        <Image source={{ uri: item.image }} style={styles.avatar} />
                        <View style={styles.cardContent}>
                            <View style={styles.nameRow}>
                                <Text style={styles.providerName}>{item.name}</Text>
                                <View style={styles.ratingBadge}>
                                    <Ionicons name="star" size={14} color="#FFD700" />
                                    <Text style={styles.ratingText}>{item.rating}</Text>
                                </View>
                            </View>
                            <Text style={styles.description} numberOfLines={1}>
                                {item.description}
                            </Text>
                            <View style={styles.footer}>
                                <Text style={styles.reviewsText}>{item.reviews} reseñas</Text>
                                <Text style={styles.priceText}>
                                    Desde <Text style={styles.priceAmount}>${item.price}</Text>
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>
                            No hay proveedores disponibles para este servicio
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        padding: SPACING.lg,
        backgroundColor: COLORS.surface,
    },
    title: {
        fontSize: FONT_SIZE.md,
        color: COLORS.textSecondary,
    },
    serviceName: {
        fontSize: FONT_SIZE.xl,
        fontWeight: "700",
        color: COLORS.text,
        marginTop: 4,
    },
    list: {
        padding: SPACING.md,
    },
    card: {
        flexDirection: "row",
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: COLORS.border,
    },
    cardContent: {
        flex: 1,
        marginLeft: SPACING.md,
    },
    nameRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    providerName: {
        fontSize: FONT_SIZE.md,
        fontWeight: "600",
        color: COLORS.text,
    },
    ratingBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.background,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 12,
    },
    ratingText: {
        fontSize: FONT_SIZE.xs,
        fontWeight: "600",
        color: COLORS.text,
        marginLeft: 2,
    },
    description: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: SPACING.sm,
    },
    reviewsText: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.textTertiary,
    },
    priceText: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.textSecondary,
    },
    priceAmount: {
        fontSize: FONT_SIZE.sm,
        fontWeight: "700",
        color: COLORS.primary,
    },
    empty: {
        alignItems: "center",
        paddingVertical: SPACING.xxl,
    },
    emptyText: {
        fontSize: FONT_SIZE.md,
        color: COLORS.textTertiary,
    },
});
