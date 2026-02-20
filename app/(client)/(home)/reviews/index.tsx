import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/lib/constants";
import { getStandardHeaderOptions } from "@/lib/navigation";
import { styles } from "./styles";

export default function ReviewsScreen() {
    const { providerName } = useLocalSearchParams<{
        providerName: string;
    }>();

    const [activeFilter, setActiveFilter] = useState("Todas");

    const distribution = [
        { stars: 5, count: 115, percentage: 90 },
        { stars: 4, count: 10, percentage: 8 },
        { stars: 3, count: 1, percentage: 1 },
        { stars: 2, count: 1, percentage: 1 },
        { stars: 1, count: 0, percentage: 0 },
    ];

    const reviews = [
        {
            id: "1",
            user: "Carlos Martínez",
            avatar: "https://i.pravatar.cc/100?u=carlos",
            rating: 5,
            date: "Hace 1 semana",
            service: "Limpieza profunda",
            text: "Excelente servicio y puntual. Dejó mi casa impecable y prestó atención a cada detalle. Lo recomiendo ampliamente.",
        },
        {
            id: "2",
            user: "Laura Sánchez",
            avatar: "https://i.pravatar.cc/100?u=laura",
            rating: 5,
            date: "Hace 2 semanas",
            service: "Limpieza básica",
            text: "Muy recomendable, dejó todo impecable. Es muy amable y profesional.",
        },
        {
            id: "3",
            user: "Roberto García",
            avatar: "https://i.pravatar.cc/100?u=roberto",
            rating: 5,
            date: "Hace 3 semanas",
            service: "Limpieza express",
            text: "Muy rápido y eficiente. Justo lo que necesitaba.",
        }
    ];

    return (
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
            <Stack.Screen
                options={getStandardHeaderOptions({
                    title: "Reseñas",
                    subtitle: providerName || "María López",
                })}
            />

            <View style={styles.header}>
                <Text style={styles.ratingValue}>4.9</Text>
                <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map((s) => (
                        <Ionicons key={s} name="star" size={24} color="#FFC107" style={{ marginHorizontal: 1 }} />
                    ))}
                </View>
                <Text style={styles.totalReviewsText}>Basado en 127 reseñas</Text>
            </View>

            <View style={styles.distributionContainer}>
                {distribution.map((item) => (
                    <View key={item.stars} style={styles.distributionRow}>
                        <Text style={styles.starLabel}>{item.stars}</Text>
                        <Ionicons name="star" size={12} color="#FFC107" />
                        <View style={styles.barBackground}>
                            <View style={[styles.barFilled, { width: `${item.percentage}%` }]} />
                        </View>
                        <Text style={styles.countLabel}>{item.count}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.filtersWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContainer}>
                    {["Todas", "Más recientes", "Mejor valoradas"].map((filter) => (
                        <TouchableOpacity
                            key={filter}
                            style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
                            onPress={() => setActiveFilter(filter)}
                        >
                            <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>{filter}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={reviews}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.reviewCard}>
                        <View style={styles.reviewUserRow}>
                            <Image source={{ uri: item.avatar }} style={styles.userAvatar} />
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>{item.user}</Text>
                                <View style={styles.reviewRatingRow}>
                                    <View style={{ flexDirection: 'row' }}>
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Ionicons key={s} name="star" size={12} color="#FFC107" />
                                        ))}
                                    </View>
                                    <Text style={styles.reviewDate}>• {item.date}</Text>
                                    <Text style={styles.serviceBadge}>• {item.service}</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={styles.reviewText}>{item.text}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}
