import { StyleSheet } from "react-native";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from "@/lib/constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        padding: SPACING.lg,
        backgroundColor: COLORS.surface,
    },
    title: {
        fontSize: FONT_SIZE.md,
        color: COLORS.textSecondary,
    },
    serviceName: {
        fontSize: FONT_SIZE.xl,
        fontWeight: "700",
        color: COLORS.text,
        marginTop: 4,
    },
    list: {
        padding: SPACING.md,
    },
    card: {
        flexDirection: "row",
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: COLORS.border,
    },
    cardContent: {
        flex: 1,
        marginLeft: SPACING.md,
    },
    nameRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    providerName: {
        fontSize: FONT_SIZE.md,
        fontWeight: "600",
        color: COLORS.text,
    },
    ratingBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.background,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 12,
    },
    ratingText: {
        fontSize: FONT_SIZE.xs,
        fontWeight: "600",
        color: COLORS.text,
        marginLeft: 2,
    },
    description: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: SPACING.sm,
    },
    reviewsText: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.textTertiary,
    },
    priceText: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.textSecondary,
    },
    priceAmount: {
        fontSize: FONT_SIZE.sm,
        fontWeight: "700",
        color: COLORS.primary,
    },
    empty: {
        alignItems: "center",
        paddingVertical: SPACING.xxl,
    },
    emptyText: {
        fontSize: FONT_SIZE.md,
        color: COLORS.textTertiary,
    },
});
