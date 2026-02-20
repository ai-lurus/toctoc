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
        backgroundColor: "#F2F2F2",
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
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
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#E5E5E5",
    },
    cardContent: {
        flex: 1,
        marginLeft: 16,
    },
    providerName: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1A1A1A",
    },
    statusDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#66CC77",
    },
    serviceRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
    serviceType: {
        fontSize: 16,
        color: "#888888",
    },
    serviceLevel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#66BC99",
        marginLeft: 4,
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
    selectButton: {
        backgroundColor: "#3BB29B",
        borderRadius: 15,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
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
    chevron: {
        marginLeft: SPACING.sm,
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
