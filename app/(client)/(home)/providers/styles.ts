import { StyleSheet, Platform } from "react-native";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from "@/lib/constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        padding: SPACING.md,
        backgroundColor: COLORS.surface,
    },
    filtersWrapper: {
        backgroundColor: COLORS.surface,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },
    filtersContainer: {
        paddingHorizontal: SPACING.md,
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    filterChip: {
        backgroundColor: COLORS.surface,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: BORDER_RADIUS.lg,
        marginRight: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        minWidth: 120,
        alignItems: "center",
    },
    filterChipActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    filterText: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.primary,
        fontWeight: "600",
    },
    filterTextActive: {
        color: "white",
    },
    title: {
        fontSize: FONT_SIZE.md,
        color: COLORS.textSecondary,
    },
    serviceName: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    providersCount: {
        fontSize: FONT_SIZE.lg,
        fontWeight: "700",
        color: COLORS.text,
        marginTop: 4,
    },
    list: {
        padding: SPACING.md,
        backgroundColor: COLORS.background,
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.lg,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        flexDirection: "row",
        alignItems: "center",
    },
    cardTop: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
    },
    cardContent: {
        flex: 1,
        marginLeft: 16,
    },
    providerName: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.text,
    },
    serviceType: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },
    ratingNumber: {
        fontSize: FONT_SIZE.sm,
        fontWeight: "700",
        color: COLORS.text,
        marginLeft: 4,
    },
    reviewsText: {
        fontSize: 12,
        color: COLORS.textTertiary,
        marginLeft: 4,
    },
    distanceRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },
    distanceText: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginLeft: 4,
    },
    priceContainer: {
        alignItems: "flex-end",
        justifyContent: "center",
        marginLeft: 8,
    },
    priceText: {
        fontSize: 20,
        fontWeight: "700",
        color: COLORS.primary,
        marginBottom: 4,
    },
    priceUnit: {
        fontSize: 12,
        fontWeight: "400",
        color: COLORS.primary,
    },
    chevronContainer: {
        marginLeft: 12,
    },
    footer: {
        padding: SPACING.md,
        backgroundColor: COLORS.surface,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
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
