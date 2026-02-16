import { StyleSheet } from "react-native";
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
        paddingBottom: SPACING.sm,
        flexDirection: "row",
        alignItems: "center",
    },
    filterChip: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F0F0F0",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        borderWidth: 1,
        borderColor: "transparent",
    },
    filterChipActive: {
        backgroundColor: "#3BB29B",
        borderColor: "#3BB29B",
    },
    filterText: {
        fontSize: 14,
        color: "#666",
        marginLeft: 4,
        fontWeight: "500",
    },
    filterTextActive: {
        color: "#FFF",
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
        backgroundColor: "#F2F2F2",
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
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
        marginLeft: 15,
    },
    nameRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
        marginTop: 8,
    },
    starsContainer: {
        flexDirection: "row",
        marginRight: 8,
    },
    ratingNumber: {
        fontSize: 14,
        fontWeight: "700",
        color: "#444444",
        marginRight: 4,
    },
    reviewsText: {
        fontSize: 14,
        color: "#888888",
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 12,
    },
    distanceContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    distanceText: {
        fontSize: 14,
        color: "#666666",
        marginLeft: 4,
    },
    priceText: {
        fontSize: 22,
        fontWeight: "700",
        color: "#333333",
    },
    selectButton: {
        backgroundColor: "#3BB29B",
        borderRadius: 15,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    selectButtonText: {
        color: COLORS.surface,
        fontSize: 18,
        fontWeight: "600",
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
