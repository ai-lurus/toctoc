import { StyleSheet } from "react-native";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from "@/lib/constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        padding: SPACING.lg,
    },
    sectionTitle: {
        fontSize: FONT_SIZE.lg,
        fontWeight: "700",
        color: COLORS.text,
        marginBottom: SPACING.lg,
    },
    methodList: {
        marginBottom: SPACING.xl,
        gap: SPACING.md,
    },
    methodItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.surface,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    methodItemActive: {
        borderColor: "#4ADE80",
        backgroundColor: "#F0FDF4",
    },
    methodIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.background,
        alignItems: "center",
        justifyContent: "center",
        marginRight: SPACING.md,
    },
    methodInfo: {
        flex: 1,
    },
    methodTitle: {
        fontSize: FONT_SIZE.md,
        fontWeight: "600",
        color: COLORS.text,
    },
    methodSubtitle: {
        fontSize: FONT_SIZE.xs,
        color: "#4ADE80",
        marginTop: 2,
    },
    methodSubtitleInactive: {
        color: COLORS.textSecondary,
    },
    checkContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#22C55E",
        alignItems: "center",
        justifyContent: "center",
    },
    form: {
        gap: SPACING.lg,
    },
    row: {
        flexDirection: "row",
        gap: SPACING.md,
    },
    field: {
        flex: 1,
    },
    label: {
        fontSize: FONT_SIZE.md,
        color: COLORS.text,
        marginBottom: SPACING.sm,
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
    submitButton: {
        backgroundColor: COLORS.primary,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.lg,
        alignItems: "center",
        marginTop: SPACING.xl,
        marginBottom: SPACING.xl,
    },
    submitButtonText: {
        fontSize: FONT_SIZE.lg,
        fontWeight: "600",
        color: "white",
    },
    disclaimerCard: {
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: SPACING.md,
        marginBottom: SPACING.xxl,
    },
    disclaimerText: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.textSecondary,
        textAlign: "center",
        lineHeight: 18,
    },
});
