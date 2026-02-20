import { StyleSheet } from "react-native";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from "@/lib/constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        backgroundColor: COLORS.surface,
        padding: SPACING.lg,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    ratingValue: {
        fontSize: 48,
        fontWeight: "700",
        color: COLORS.text,
    },
    starsRow: {
        flexDirection: "row",
        marginVertical: SPACING.xs,
    },
    totalReviewsText: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.textSecondary,
    },
    distributionContainer: {
        backgroundColor: COLORS.surface,
        padding: SPACING.lg,
        marginTop: SPACING.sm,
    },
    distributionRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    starLabel: {
        fontSize: 12,
        color: COLORS.text,
        width: 20,
    },
    barBackground: {
        flex: 1,
        height: 8,
        backgroundColor: "#F0F0F0",
        borderRadius: 4,
        marginHorizontal: 12,
    },
    barFilled: {
        height: "100%",
        backgroundColor: COLORS.warning,
        borderRadius: 4,
    },
    countLabel: {
        fontSize: 12,
        color: COLORS.textSecondary,
        width: 30,
        textAlign: "right",
    },
    filtersWrapper: {
        backgroundColor: COLORS.surface,
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    filtersContainer: {
        paddingHorizontal: SPACING.md,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: COLORS.surface,
        marginRight: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    filterChipActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    filterText: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: "600",
    },
    filterTextActive: {
        color: "white",
    },
    list: {
        padding: SPACING.md,
    },
    reviewCard: {
        backgroundColor: COLORS.surface,
        padding: SPACING.lg,
        borderRadius: BORDER_RADIUS.lg,
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    reviewUserRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: SPACING.sm,
    },
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.background,
        marginRight: SPACING.md,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: FONT_SIZE.md,
        fontWeight: "600",
        color: COLORS.text,
    },
    reviewRatingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
    },
    reviewDate: {
        fontSize: 12,
        color: COLORS.textTertiary,
        marginLeft: 8,
    },
    serviceBadge: {
        fontSize: 12,
        color: COLORS.textTertiary,
        marginLeft: 8,
    },
    reviewText: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.textSecondary,
        lineHeight: 20,
    },
});
