import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from "@/lib/constants";
import type { Database } from "@/types/database.types";

type Category = Database["public"]["Tables"]["categories"]["Row"];

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
}

export function CategoryCard({ category, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: category.color + "20" }]}>
        <Ionicons
          name={category.icon as keyof typeof Ionicons.glyphMap}
          size={28}
          color={category.color}
        />
      </View>
      <Text style={styles.name} numberOfLines={2}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    margin: SPACING.xs,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.sm,
  },
  name: {
    fontSize: FONT_SIZE.sm,
    fontWeight: "500",
    color: COLORS.text,
    textAlign: "center",
  },
});
