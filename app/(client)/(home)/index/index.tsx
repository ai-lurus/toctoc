import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@/store/authStore";
import { useSupabaseQuery } from "@/hooks/useSupabaseQuery";
import { getCategories } from "@/services/categories";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { COLORS } from "@/lib/constants";
import { styles } from "./styles";

export default function ClientHomeScreen() {
  const { profile } = useAuthStore();
  const { data: categories, isLoading, refetch } = useSupabaseQuery(getCategories);

  if (isLoading && !categories) {
    return <LoadingScreen />;
  }

  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.greeting}>
            Buenas noches, {profile?.full_name?.split(" ")[0] ?? "María"}
          </Text>
          <Text style={styles.subtitle}>¿Qué servicio necesitas hoy?</Text>
        </View>
        <TouchableOpacity
          style={styles.notificationContainer}
          onPress={() => router.push("/(client)/(home)/notifications")}
          activeOpacity={0.7}
        >
          <Ionicons name="notifications" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <View style={styles.statusDot} />
          <Text style={styles.statusLabel}>Servicio en proceso</Text>
        </View>
        <Text style={styles.statusTitle}>Limpieza general</Text>
        <Text style={styles.statusSubtitle}>El proveedor está en camino • 15 min</Text>
        <TouchableOpacity
          style={styles.statusButton}
          onPress={() => router.push("/(client)/(history)/service-progress" as any)}
        >
          <Text style={styles.statusButtonText}>Ver detalles del servicio</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.expressBanner}>
        <View style={styles.expressContent}>
          <Ionicons name="flash" size={24} color="white" />
          <View style={styles.expressTextContainer}>
            <Text style={styles.expressTitle}>Servicio express</Text>
            <Text style={styles.expressSubtitle}>Proveedor disponible ahora</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="white" />
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Categorías de servicio</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            onPress={() =>
              router.push({
                pathname: "/(client)/(home)/providers",
                params: { categoryId: item.id, categoryName: item.name },
              })
            }
          />
        )}
        contentContainerStyle={styles.grid}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No hay categorías disponibles
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
