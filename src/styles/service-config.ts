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
        paddingBottom: 100, // accommodate pricing card
    },
    fieldContainer: {
        marginBottom: SPACING.lg,
    },
    label: {
        fontSize: FONT_SIZE.md,
        fontWeight: "500",
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
    selectorText: {
        fontSize: FONT_SIZE.md,
        color: COLORS.text,
    },
    selectorTextActive: {
        color: "white",
        fontWeight: "600",
    },
    selectorItemActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    priceCard: {
        backgroundColor: COLORS.primary,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginTop: SPACING.xl,
    },
    priceLabel: {
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: FONT_SIZE.sm,
        marginBottom: 4,
    },
    priceValue: {
        color: "white",
        fontSize: FONT_SIZE.xxl,
        fontWeight: "700",
    },
    priceNoteContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: SPACING.md,
        paddingTop: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: "rgba(255, 255, 255, 0.2)",
    },
    priceNote: {
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: 10,
        marginLeft: SPACING.xs,
        flex: 1,
    },
    footer: {
        padding: SPACING.lg,
        backgroundColor: "#F9FAFB",
    },
    searchButton: {
        backgroundColor: COLORS.success,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.lg,
        alignItems: "center",
    },
    searchButtonText: {
        fontSize: FONT_SIZE.lg,
        fontWeight: "600",
        color: "white",
    },
});
