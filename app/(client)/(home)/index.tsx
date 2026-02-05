import {
  View,
  Text,
  StyleSheet,
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
import { COLORS, SPACING, FONT_SIZE } from "@/lib/constants";

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
                pathname: "/(client)/(home)/services",
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
  },
  greeting: {
    fontSize: FONT_SIZE.xl,
    fontWeight: "700",
    color: COLORS.text,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  grid: {
    padding: SPACING.sm,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.xxl,
  },
  emptyText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textTertiary,
  },
});
