import { StyleSheet } from "react-native";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from "@/lib/constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    form: {
        flex: 1,
    },
    formContent: {
        padding: SPACING.lg,
    },
    fieldContainer: {
        marginBottom: SPACING.lg,
    },
    label: {
        fontSize: FONT_SIZE.lg,
        fontWeight: "600",
        color: COLORS.text,
        marginBottom: SPACING.md,
    },
    input: {
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        fontSize: FONT_SIZE.md,
        color: COLORS.text,
    },
    textArea: {
        height: 120,
    },
    selectorContainer: {
        flexDirection: "row",
        gap: SPACING.sm,
    },
    selectorItem: {
        flex: 1,
        height: 50,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.surface,
    },
    selectorItemActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    selectorText: {
        fontSize: FONT_SIZE.md,
        color: COLORS.text,
    },
    selectorTextActive: {
        color: "white",
        fontWeight: "600",
    },
    dateList: {
        gap: SPACING.sm,
    },
    dateCard: {
        width: 65,
        paddingVertical: SPACING.sm,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: "center",
        backgroundColor: COLORS.surface,
    },
    dateCardActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
        // shadow for premium look
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    dateDayName: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.textSecondary,
    },
    dateDayNumber: {
        fontSize: FONT_SIZE.lg,
        fontWeight: "700",
        color: COLORS.text,
        marginVertical: 2,
    },
    dateMonth: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.textSecondary,
    },
    dateTextActive: {
        color: "white",
    },
    timeGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: SPACING.sm,
    },
    timeItem: {
        width: "31%", // roughly 3 columns
        height: 50,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.surface,
    },
    timeItemActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    timeText: {
        fontSize: FONT_SIZE.md,
        color: COLORS.text,
    },
    timeTextActive: {
        color: "white",
        fontWeight: "600",
    },
    footer: {
        padding: SPACING.lg,
        backgroundColor: COLORS.background,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    submitButton: {
        backgroundColor: COLORS.primary,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.lg,
        alignItems: "center",
    },
    submitButtonText: {
        fontSize: FONT_SIZE.lg,
        fontWeight: "600",
        color: "white",
    },
});
