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
import { getStandardHeaderOptions } from "@/lib/navigation";

export default function ProvidersScreen() {
<<<<<<< HEAD
    const { categoryId, categoryName } = useLocalSearchParams<{
        categoryId: string;
=======
    const { categoryName } = useLocalSearchParams<{
>>>>>>> master
        categoryName: string;
    }>();

    const [filter, setFilter] = useState<"rating" | "proximity" | null>("rating");

    const providers = [
        {
            id: "1",
            name: "María López",
            serviceType: "Limpieza general",
            rating: 4.9,
            reviews: 127,
            distance: "2.3 km",
            price: 240,
            image: "https://i.pravatar.cc/150?u=maria",
        },
        {
            id: "2",
            name: "Juan Pérez",
            serviceType: "Limpieza profunda",
            rating: 4.7,
            reviews: 95,
            distance: "3.1 km",
            price: 220,
            image: "https://i.pravatar.cc/150?u=juan",
        },
        {
            id: "3",
            name: "Ana García",
            serviceType: "Limpieza express",
            rating: 4.8,
            reviews: 156,
            distance: "4.5 km",
            price: 260,
            image: "https://i.pravatar.cc/150?u=ana",
        }
    ];

    const filteredProviders = useMemo(() => {
        let result = [...providers];
        if (filter === "rating") {
            result.sort((a, b) => b.rating - a.rating);
        } else if (filter === "proximity") {
            result.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        }
        return result;
    }, [filter]);

    return (
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
            <Stack.Screen
                options={getStandardHeaderOptions({
                    title: categoryName || "Limpieza de hogar",
                    subtitle: `${providers.length} proveedores disponibles`,
                })}
            />

<<<<<<< HEAD
            <View style={styles.header}>
                <Text style={styles.title}>Selecciona un proveedor para</Text>
                <Text style={styles.serviceName}>{categoryName}</Text>
            </View>

=======
>>>>>>> master
            <View style={styles.filtersWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContainer}>
                    <TouchableOpacity
                        style={[styles.filterChip, filter === "rating" && styles.filterChipActive]}
                        onPress={() => setFilter("rating")}
                    >
                        <Text style={[styles.filterText, filter === "rating" && styles.filterTextActive]}>Mejor calificación</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.filterChip, filter === "proximity" && styles.filterChipActive]}
                        onPress={() => setFilter("proximity")}
                    >
                        <Text style={[styles.filterText, filter === "proximity" && styles.filterTextActive]}>Más cercano</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <FlatList
                data={filteredProviders}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        activeOpacity={0.9}
                        onPress={() => {
                            router.push({
<<<<<<< HEAD
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
=======
                                pathname: "/(client)/(home)/services",
                                params: {
                                    categoryId,
                                    categoryName,
                                    providerId: item.id,
                                    providerName: item.name
>>>>>>> 68b1c5308a835b2d9869950260f1d48ebd162195
                                },
                            });
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                router.push({
                                    pathname: "/(client)/(home)/provider-profile",
                                    params: {
                                        providerId: item.id,
                                        providerName: item.name,
                                        serviceName: item.serviceType
                                    },
                                })
                            }}
                        >
                            <Image source={{ uri: item.image }} style={styles.avatar} />
                        </TouchableOpacity>

                        <View style={styles.cardContent}>
                            <Text style={styles.providerName}>{item.name}</Text>
                            <Text style={styles.serviceType}>{item.serviceType}</Text>

                            <View style={styles.ratingRow}>
                                <Ionicons name="star" size={14} color="#FFC107" />
                                <Text style={styles.ratingNumber}>{item.rating}</Text>
                                <Text style={styles.reviewsText}>({item.reviews} reseñas)</Text>
                            </View>

                            <View style={styles.distanceRow}>
                                <Ionicons name="location" size={14} color={COLORS.error} />
                                <Text style={styles.distanceText}>{item.distance}</Text>
                            </View>
                        </View>

                        <View style={styles.priceContainer}>
                            <Text style={styles.priceText}>
                                ${item.price}<Text style={styles.priceUnit}>/hr</Text>
                            </Text>
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
                            No hay proveedores disponibles
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
