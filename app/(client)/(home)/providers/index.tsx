import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import { useState, useMemo } from "react";
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

    const [sortBy, setSortBy] = useState<"price_asc" | "price_desc" | null>(null);
    const [filterHighRated, setFilterHighRated] = useState(false);

    const providers = [
        {
            id: "1",
            name: "María López",
            serviceType: "Limpieza",
            serviceLevel: "EXPRESS",
            rating: 4.9,
            reviews: 127,
            distance: "2.3 km",
            price: 240,
            image: "https://i.pravatar.cc/150?u=maria",
            isOnline: true,
        },
        {
            id: "2",
            name: "Juan Pérez",
            serviceType: "Limpieza",
            serviceLevel: "EXPRESS",
            rating: 4.7,
            reviews: 95,
            distance: "3.1 km",
            price: 220,
            image: "https://i.pravatar.cc/150?u=juan",
            isOnline: true,
        },
        {
            id: "3",
            name: "Ana García",
            serviceType: "Limpieza",
            serviceLevel: "EXPRESS",
            rating: 4.4,
            reviews: 82,
            distance: "1.5 km",
            price: 260,
            image: "https://i.pravatar.cc/150?u=ana",
            isOnline: false,
        }
    ];

    const filteredAndSortedProviders = useMemo(() => {
        let result = [...providers];

        if (filterHighRated) {
            result = result.filter(p => p.rating >= 4.5);
        }

        if (sortBy === "price_asc") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price_desc") {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [filterHighRated, sortBy]);

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

            <View style={styles.filtersWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContainer}>
                    <TouchableOpacity
                        style={[styles.filterChip, filterHighRated && styles.filterChipActive]}
                        onPress={() => setFilterHighRated(!filterHighRated)}
                    >
                        <Ionicons name="star" size={14} color={filterHighRated ? "#FFF" : "#FFC107"} />
                        <Text style={[styles.filterText, filterHighRated && styles.filterTextActive]}>4.5+</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.filterChip, sortBy === "price_asc" && styles.filterChipActive]}
                        onPress={() => setSortBy(sortBy === "price_asc" ? null : "price_asc")}
                    >
                        <Ionicons name="trending-down" size={14} color={sortBy === "price_asc" ? "#FFF" : "#666"} />
                        <Text style={[styles.filterText, sortBy === "price_asc" && styles.filterTextActive]}>Precio más bajo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.filterChip, sortBy === "price_desc" && styles.filterChipActive]}
                        onPress={() => setSortBy(sortBy === "price_desc" ? null : "price_desc")}
                    >
                        <Ionicons name="trending-up" size={14} color={sortBy === "price_desc" ? "#FFF" : "#666"} />
                        <Text style={[styles.filterText, sortBy === "price_desc" && styles.filterTextActive]}>Precio más alto</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <FlatList
                data={filteredAndSortedProviders}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        activeOpacity={0.9}
                        onPress={() => {
                            router.push({
                                pathname: "/(client)/(home)/provider/[id]",
                                params: {
                                    id: item.id,
                                    serviceName,
                                    providerName: item.name,
                                    providerImage: item.image,
                                    providerRating: String(item.rating),
                                    providerReviews: String(item.reviews),
                                    providerDistance: item.distance,
                                    providerPrice: String(item.price),
                                    providerServiceType: item.serviceType,
                                },
                            });
                        }}
                    >
                        <View style={styles.cardTop}>
                            <Image source={{ uri: item.image }} style={styles.avatar} />
                            <View style={styles.cardContent}>
                                <View style={styles.nameRow}>
                                    <Text style={styles.providerName}>{item.name}</Text>
                                    {item.isOnline && <View style={styles.statusDot} />}
                                </View>

                                <View style={styles.serviceRow}>
                                    <Text style={styles.serviceType}>{item.serviceType}</Text>
                                    <Text style={styles.serviceLevel}>{item.serviceLevel}</Text>
                                </View>

                                <View style={styles.ratingRow}>
                                    <View style={styles.starsContainer}>
                                        {[1, 2, 3, 4, 5].map((s) => {
                                            let iconName: any = "star";
                                            if (item.rating < s - 0.5) {
                                                iconName = "star-outline";
                                            } else if (item.rating < s) {
                                                iconName = "star-half";
                                            }
                                            return (
                                                <Ionicons
                                                    key={s}
                                                    name={iconName}
                                                    size={16}
                                                    color="#FFC107"
                                                    style={{ marginRight: 2 }}
                                                />
                                            );
                                        })}
                                    </View>
                                    <Text style={styles.ratingNumber}>{item.rating}</Text>
                                    <Text style={styles.reviewsText}>({item.reviews} reseñas)</Text>
                                </View>

                                <View style={styles.infoRow}>
                                    <View style={styles.distanceContainer}>
                                        <Ionicons name="location" size={14} color="#E57373" />
                                        <Text style={styles.distanceText}>{item.distance}</Text>
                                    </View>
                                    <Text style={styles.priceText}>${item.price}</Text>
                                </View>
                            </View>
                        </View>

                        <View
                            style={styles.selectButton}
                        >
                            <Text style={styles.selectButtonText}>Ver perfil</Text>
                        </View>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color={COLORS.textTertiary}
                            style={styles.chevron}
                        />
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
