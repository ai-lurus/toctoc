import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  type ViewStyle,
  type TextStyle,
} from "react-native";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from "@/lib/constants";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        isDisabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" || variant === "ghost" ? COLORS.primary : "#fff"}
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.text,
            styles[`text_${variant}`],
            styles[`textSize_${size}`],
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BORDER_RADIUS.md,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  size_sm: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  size_md: {
    paddingVertical: SPACING.md - 2,
    paddingHorizontal: SPACING.lg,
  },
  size_lg: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: "600",
  },
  text_primary: {
    color: "#fff",
  },
  text_secondary: {
    color: "#fff",
  },
  text_outline: {
    color: COLORS.primary,
  },
  text_ghost: {
    color: COLORS.primary,
  },
  textSize_sm: {
    fontSize: FONT_SIZE.sm,
  },
  textSize_md: {
    fontSize: FONT_SIZE.md,
  },
  textSize_lg: {
    fontSize: FONT_SIZE.lg,
  },
});
