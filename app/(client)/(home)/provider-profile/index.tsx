import React from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/lib/constants";
import { styles } from "@/styles/provider-profile";

export default function ProviderProfileScreen() {
    const {
        providerId,
        providerName,
        serviceName,
        providerImage,
        providerRating,
        providerReviews,
        providerDistance,
        providerPrice,
        providerServiceType,
    } = useLocalSearchParams<{
        providerId: string;
        providerName: string;
        serviceName: string;
        providerImage: string;
        providerRating: string;
        providerReviews: string;
        providerDistance: string;
        providerPrice: string;
        providerServiceType: string;
    }>();

    const services = [
        {
            id: "1",
            name: "Limpieza básica",
            description: "Limpieza general de espacios comunes y habitaciones",
            price: 180,
        },
        {
            id: "2",
            name: "Limpieza profunda",
            description: "Limpieza detallada incluyendo ventanas y áreas difíciles",
            price: 240,
        }
    ];

    const reviews = [
        {
            id: "1",
            user: "Carlos M.",
            avatar: "https://i.pravatar.cc/100?u=carlos",
            rating: 5,
            date: "Hace 1 semana",
            text: "Excelente servicio, muy profesional y puntual.",
        },
        {
            id: "2",
            user: "Laura S.",
            avatar: "https://i.pravatar.cc/100?u=laura",
            rating: 5,
            date: "Hace 2 semanas",
            text: "Muy recomendable, dejó todo impecable.",
        }
    ];

    return (
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: "",
                    headerTintColor: COLORS.text,
                    headerStyle: { backgroundColor: COLORS.surface },
                    headerShadowVisible: false,
                    headerBackTitle: "",
                    headerBackTitleVisible: false,
                    headerBackButtonDisplayMode: "minimal",
                }}
            />

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                    style={styles.header}
                    activeOpacity={0.8}
                    onPress={() => router.push({
                        pathname: "/(client)/(home)/provider/[id]",
                        params: {
                            id: providerId,
                            serviceName: serviceName || providerServiceType,
                            providerName,
                            providerImage,
                            providerRating,
                            providerReviews,
                            providerDistance,
                            providerPrice,
                            providerServiceType,
                        },
                    })}
                >
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: providerImage || `https://i.pravatar.cc/150?u=${providerId}` }} style={styles.avatar} />
                        <View style={styles.verifiedBadge}>
                            <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
                        </View>
                    </View>
                    <Text style={styles.name}>{providerName || "María López"}</Text>
                    <View style={styles.ratingRow}>
                        <Ionicons name="star" size={16} color="#FFC107" />
                        <Text style={styles.ratingText}>{providerRating || "4.9"}</Text>
                        <Text style={styles.reviewsCount}>({providerReviews || "127"} reseñas)</Text>
                        {providerDistance ? <Text style={styles.distanceText}>• {providerDistance}</Text> : null}
                    </View>
                    <View style={styles.viewProfileRow}>
                        <Text style={styles.viewProfileText}>Ver perfil completo</Text>
                        <Ionicons name="chevron-forward" size={14} color={COLORS.primary} />
                    </View>
                </TouchableOpacity>

                <View style={styles.experienceCard}>
                    <Text style={styles.experienceText}>
                        5 años de experiencia en limpieza residencial
                    </Text>
                </View>

                <Text style={styles.sectionTitle}>Servicios que ofrece</Text>
                {services.map((service) => (
                    <View key={service.id} style={styles.serviceItem}>
                        <View style={styles.serviceInfo}>
                            <Text style={styles.serviceName}>{service.name}</Text>
                            <Text style={styles.serviceDescription}>{service.description}</Text>
                            <Text style={styles.servicePrice}>
                                ${service.price}<Text style={styles.priceUnit}>/hr</Text>
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.bookButton}
                            onPress={() => router.push({
                                pathname: "/(client)/(home)/service-config",
                                params: {
                                    providerId,
                                    providerName,
                                    serviceId: service.id,
                                    serviceName: service.name
                                }
                            })}
                        >
                            <Text style={styles.bookButtonText}>Agendar</Text>
                        </TouchableOpacity>
                    </View>
                ))}

                <View style={styles.reviewsHeader}>
                    <Text style={[styles.sectionTitle, { marginHorizontal: 0, marginTop: 0, marginBottom: 0 }]}>Reseñas</Text>
                    <TouchableOpacity onPress={() => router.push({
                        pathname: "/(client)/(home)/reviews",
                        params: { providerId, providerName }
                    })}>
                        <Text style={styles.viewAllLink}>Ver todas</Text>
                    </TouchableOpacity>
                </View>

                {reviews.map((review) => (
                    <View key={review.id} style={styles.reviewCard}>
                        <View style={styles.reviewHeader}>
                            <Image source={{ uri: review.avatar }} style={styles.reviewerAvatar} />
                            <View style={styles.reviewerInfo}>
                                <Text style={styles.reviewerName}>{review.user}</Text>
                                <Text style={styles.reviewDate}>{review.date}</Text>
                            </View>
                            <View style={styles.reviewStars}>
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Ionicons key={s} name="star" size={12} color="#FFC107" />
                                ))}
                            </View>
                        </View>
                        <Text style={styles.reviewText}>{review.text}</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
