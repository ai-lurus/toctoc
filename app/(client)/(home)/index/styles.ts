import { StyleSheet } from "react-native";
import { COLORS, SPACING, FONT_SIZE } from "@/lib/constants";

export const styles = StyleSheet.create({
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
