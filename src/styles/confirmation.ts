import { StyleSheet } from "react-native";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from "@/lib/constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        padding: SPACING.lg,
        paddingBottom: SPACING.xxl,
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    sectionTitle: {
        fontSize: FONT_SIZE.md,
        fontWeight: "700",
        color: COLORS.text,
        marginBottom: SPACING.lg,
    },
    summaryHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: SPACING.md,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.primaryLight,
        alignItems: "center",
        justifyContent: "center",
        marginRight: SPACING.md,
    },
    avatarText: {
        color: "white",
        fontSize: FONT_SIZE.lg,
        fontWeight: "700",
    },
    providerInfo: {
        flex: 1,
    },
    providerNameText: {
        fontSize: FONT_SIZE.md,
        fontWeight: "600",
        color: COLORS.text,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
    },
    ratingText: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.textSecondary,
        marginLeft: 4,
    },
    detailItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: SPACING.md,
    },
    detailContent: {
        marginLeft: SPACING.sm,
        flex: 1,
    },
    detailLabel: {
        fontSize: 10,
        color: COLORS.textTertiary,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    detailValue: {
        fontSize: FONT_SIZE.sm,
        fontWeight: "600",
        color: COLORS.text,
        marginTop: 2,
    },
    subDetailContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: SPACING.md,
        gap: SPACING.md,
    },
    subDetailItem: {
        width: "45%",
    },
    subDetailLabel: {
        fontSize: 10,
        color: COLORS.textTertiary,
    },
    subDetailValue: {
        fontSize: FONT_SIZE.sm,
        fontWeight: "600",
        color: COLORS.text,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: SPACING.md,
    },
    sectionTitleSmall: {
        fontSize: FONT_SIZE.md,
        fontWeight: "700",
        color: COLORS.text,
    },
    changeLink: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.primary,
        fontWeight: "600",
    },
    addressContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    addressIcon: {
        width: 40,
        height: 40,
        borderRadius: BORDER_RADIUS.md,
        backgroundColor: "#FFF5F5", // Very light red for location as in some designs
        alignItems: "center",
        justifyContent: "center",
        marginRight: SPACING.md,
    },
    addressText: {
        flex: 1,
        fontSize: FONT_SIZE.sm,
        color: COLORS.text,
        lineHeight: 20,
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    totalLabel: {
        fontSize: FONT_SIZE.md,
        color: COLORS.textSecondary,
    },
    totalValue: {
        fontSize: FONT_SIZE.xxl,
        fontWeight: "700",
        color: COLORS.primary,
    },
    paymentContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    cardIcon: {
        width: 40,
        height: 28,
        borderRadius: 4,
        backgroundColor: COLORS.background,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: "center",
        justifyContent: "center",
        marginRight: SPACING.md,
    },
    paymentInfo: {
        flex: 1,
    },
    cardName: {
        fontSize: FONT_SIZE.sm,
        fontWeight: "600",
        color: COLORS.text,
    },
    cardExpiry: {
        fontSize: 10,
        color: COLORS.textSecondary,
    },
    stripeBadge: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: SPACING.md,
        justifyContent: "center",
    },
    stripeText: {
        fontSize: 10,
        color: COLORS.primary,
        marginLeft: 4,
    },
    securityCard: {
        flexDirection: "row",
        backgroundColor: "#E6FAF4", // Lighter Design Green
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.success,
        alignItems: "center",
    },
    securityContent: {
        flex: 1,
        marginLeft: SPACING.md,
    },
    securityTitle: {
        fontSize: FONT_SIZE.sm,
        fontWeight: "700",
        color: "#087455", // Darker Design Green
    },
    securityText: {
        fontSize: 10,
        color: "#087455",
        lineHeight: 14,
        marginTop: 2,
    },
    footer: {
        padding: SPACING.lg,
        backgroundColor: COLORS.surface,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    confirmButton: {
        backgroundColor: COLORS.success,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.lg,
        alignItems: "center",
    },
    confirmButtonText: {
        color: "white",
        fontSize: FONT_SIZE.lg,
        fontWeight: "700",
    },
});
