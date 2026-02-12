import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
} from "react-native";
import { router, useLocalSearchParams, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/lib/constants";
import { styles } from "./styles";

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
