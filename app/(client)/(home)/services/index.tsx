import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSupabaseQuery } from "@/hooks/useSupabaseQuery";
import { getServicesByCategory } from "@/services/categories";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { formatCurrency } from "@/utils/format";
import { COLORS, SPACING } from "@/lib/constants";
import { styles } from "./styles";

export default function ServicesScreen() {
  const { categoryId, categoryName, providerId, providerName } = useLocalSearchParams<{
    categoryId: string;
    categoryName: string;
    providerId: string;
    providerName: string;
  }>();

  const { data: services, isLoading } = useSupabaseQuery(
    () => getServicesByCategory(categoryId),
    [categoryId],
  );

  if (isLoading) return <LoadingScreen />;

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.screenHeader}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.screenHeaderTitle}>
          {categoryName ?? "Servicios"}
        </Text>
        <View style={styles.backButton} />
      </View>

      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() =>
              router.push({
                pathname: "/(client)/(home)/service-config",
                params: {
                  categoryId,
                  categoryName,
                  providerId,
                  providerName,
                  serviceId: item.id,
                  serviceName: item.name
                },
              })
            }
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name={item.icon as keyof typeof Ionicons.glyphMap}
                size={24}
                color={COLORS.primary}
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.serviceName}>{item.name}</Text>
              {item.description && (
                <Text style={styles.serviceDescription} numberOfLines={2}>
                  {item.description}
                </Text>
              )}
              <Text style={styles.price}>
                Desde {formatCurrency(item.base_price)}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textTertiary} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No hay servicios disponibles en esta categoría
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
