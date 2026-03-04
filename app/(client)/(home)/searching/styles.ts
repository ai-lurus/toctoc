import { StyleSheet } from "react-native";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from "@/lib/constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        padding: SPACING.lg,
        paddingBottom: SPACING.xxl,
    },
    /* ─── Success header ─── */
    successHeader: {
        alignItems: "center",
        paddingVertical: SPACING.xl,
    },
    checkCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: "#E6FAF4",
        borderWidth: 2,
        borderColor: COLORS.success,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: SPACING.md,
    },
    successTitle: {
        fontSize: FONT_SIZE.xl,
        fontWeight: "700",
        color: COLORS.text,
        marginBottom: SPACING.xs,
    },
    successSubtitle: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.textSecondary,
        textAlign: "center",
        lineHeight: 20,
    },
    /* ─── Warning banner ─── */
    warningBanner: {
        backgroundColor: "#FFFBEA",
        borderWidth: 1,
        borderColor: "#F59E0B",
        borderRadius: BORDER_RADIUS.md,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        marginBottom: SPACING.lg,
    },
    warningText: {
        fontSize: FONT_SIZE.sm,
        color: "#B45309",
        textAlign: "center",
        fontStyle: "italic",
    },
    /* ─── Transaction card ─── */
    requestCard: {
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
        marginBottom: SPACING.lg,
    },
    requestTitle: {
        fontSize: FONT_SIZE.md,
        fontWeight: "700",
        color: COLORS.text,
        marginBottom: SPACING.md,
    },
    requestItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: SPACING.sm,
    },
    itemBorder: {
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    iconBubble: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.primaryLight,
        alignItems: "center",
        justifyContent: "center",
    },
    iconBubbleText: {
        color: "white",
        fontSize: 13,
        fontWeight: "700",
    },
    itemContent: {
        marginLeft: SPACING.md,
        flex: 1,
    },
    itemLabel: {
        fontSize: 10,
        color: COLORS.textTertiary,
        textTransform: "uppercase",
        letterSpacing: 0.4,
    },
    itemValue: {
        fontSize: FONT_SIZE.sm,
        fontWeight: "600",
        color: COLORS.text,
        marginTop: 1,
    },
    amountValue: {
        fontSize: FONT_SIZE.lg,
        fontWeight: "700",
        color: COLORS.primary,
        marginTop: 1,
    },
    /* ─── Footer ─── */
    footer: {
        padding: SPACING.lg,
        backgroundColor: COLORS.surface,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    primaryButton: {
        backgroundColor: COLORS.primary,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.lg,
        alignItems: "center",
    },
    primaryButtonText: {
        color: "white",
        fontSize: FONT_SIZE.md,
        fontWeight: "700",
    },
    /* Legacy - kept for safety */
    content: { flex: 1 },
    searchIconContainer: { display: "none" },
    avatar: { display: "none" },
    searchingTitle: { display: "none" },
    searchingSubtitle: { display: "none" },
    timerBadge: { display: "none" },
    timerLabel: { display: "none" },
    timerValue: { display: "none" },
    disclaimerBar: { display: "none" },
    requestText: { display: "none" },
    secondaryButton: { display: "none" },
    secondaryButtonText: { display: "none" },
    bottomMessage: { display: "none" },
});
