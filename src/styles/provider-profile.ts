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
    header: {
        backgroundColor: COLORS.surface,
        padding: SPACING.xl,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    avatarContainer: {
        position: "relative",
        marginBottom: SPACING.md,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    verifiedBadge: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "white",
        borderRadius: 12,
        padding: 2,
    },
    name: {
        fontSize: FONT_SIZE.xl,
        fontWeight: "700",
        color: COLORS.text,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: SPACING.xs,
    },
    ratingText: {
        fontSize: FONT_SIZE.md,
        fontWeight: "700",
        color: COLORS.text,
        marginLeft: 4,
    },
    reviewsCount: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.textSecondary,
        marginLeft: 4,
    },
    distanceText: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.textSecondary,
        marginLeft: 8,
    },
    experienceCard: {
        backgroundColor: COLORS.surface,
        margin: SPACING.md,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    experienceText: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.textSecondary,
        textAlign: "center",
        lineHeight: 20,
    },
    sectionTitle: {
        fontSize: FONT_SIZE.md,
        fontWeight: "700",
        color: COLORS.text,
        marginHorizontal: SPACING.md,
        marginTop: SPACING.lg,
        marginBottom: SPACING.md,
    },
    serviceItem: {
        backgroundColor: COLORS.surface,
        marginHorizontal: SPACING.md,
        marginBottom: SPACING.sm,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    serviceInfo: {
        flex: 1,
    },
    serviceName: {
        fontSize: FONT_SIZE.md,
        fontWeight: "600",
        color: COLORS.text,
    },
    serviceDescription: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    servicePrice: {
        fontSize: FONT_SIZE.lg,
        fontWeight: "700",
        color: COLORS.primary,
        marginTop: 4,
    },
    priceUnit: {
        fontSize: FONT_SIZE.xs,
        fontWeight: "400",
        color: COLORS.textSecondary,
    },
    bookButton: {
        backgroundColor: COLORS.success,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: BORDER_RADIUS.md,
    },
    bookButtonText: {
        color: "white",
        fontWeight: "600",
        fontSize: FONT_SIZE.sm,
    },
    reviewsHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: SPACING.md,
        marginTop: SPACING.lg,
        marginBottom: SPACING.md,
    },
    viewAllLink: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.primary,
        fontWeight: "600",
    },
    reviewCard: {
        backgroundColor: COLORS.surface,
        marginHorizontal: SPACING.md,
        marginBottom: SPACING.sm,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    reviewHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: SPACING.xs,
    },
    reviewerAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: SPACING.sm,
    },
    reviewerInfo: {
        flex: 1,
    },
    reviewerName: {
        fontSize: FONT_SIZE.sm,
        fontWeight: "600",
        color: COLORS.text,
    },
    reviewDate: {
        fontSize: 10,
        color: COLORS.textTertiary,
    },
    reviewStars: {
        flexDirection: "row",
    },
    reviewText: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.textSecondary,
        lineHeight: 20,
        marginTop: SPACING.xs,
    },
});
