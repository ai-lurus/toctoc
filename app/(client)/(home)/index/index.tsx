import {
  View,
  Text,
  FlatList,
  RefreshControl,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/authStore";
import { useSupabaseQuery } from "@/hooks/useSupabaseQuery";
import { getCategories } from "@/services/categories";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { styles } from "./styles";

export default function ClientHomeScreen() {
  const { profile } = useAuthStore();
  const { data: categories, isLoading, refetch } = useSupabaseQuery(getCategories);

  if (isLoading && !categories) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Hola, {profile?.full_name?.split(" ")[0] ?? ""}
        </Text>
        <Text style={styles.subtitle}>¿Qué servicio necesitas hoy?</Text>
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={2}
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
