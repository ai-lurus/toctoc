import { StyleSheet } from "react-native";
import { BORDER_RADIUS, COLORS, FONT_SIZE, SPACING } from "@/lib/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: SPACING.md,
  },
  header: {
    width: "100%",
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
  },
  headerTitle: {
    color: "#fff",
    fontSize: FONT_SIZE.xl,
    fontWeight: "700",
  },
  filtersWrap: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    gap: SPACING.sm,
  },
  tabsContainer: {
    backgroundColor: "#ECECEC",
    borderRadius: BORDER_RADIUS.md,
    padding: 3,
    flexDirection: "row",
  },
  tabButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: "center",
  },
  tabButtonActive: {
    backgroundColor: COLORS.surface,
  },
  tabButtonText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
  tabButtonTextActive: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  monthButton: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  monthTextWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  monthTitle: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text,
    fontWeight: "500",
  },
  monthSubtitle: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textTertiary,
    marginTop: 1,
  },
  sectionTitle: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    fontWeight: "500",
  },
  listWrap: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING.sm,
  },
  providerWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    flex: 1,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primaryLight,
  },
  providerName: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    fontWeight: "600",
  },
  ratingWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  ratingText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
  statusBadge: {
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: 4,
  },
  statusUpcoming: {
    backgroundColor: "#FFF2CC",
  },
  statusPast: {
    backgroundColor: COLORS.primaryLight,
  },
  statusTextUpcoming: {
    color: "#D97706",
  },
  statusTextPast: {
    color: COLORS.primary,
  },
  statusText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: "600",
  },
  serviceLine: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  infoText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
  price: {
    marginTop: SPACING.xs,
    marginBottom: SPACING.sm,
    color: COLORS.primary,
    fontSize: FONT_SIZE.md,
    fontWeight: "700",
  },
  cardButtonPrimary: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.sm + 2,
  },
  cardButtonPrimaryText: {
    color: "#fff",
    fontSize: FONT_SIZE.sm,
    fontWeight: "600",
  },
  cardButtonSecondary: {
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.sm + 2,
  },
  cardButtonSecondaryText: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.sm,
    fontWeight: "600",
  },
  empty: {
    marginTop: SPACING.xl,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.lg,
  },
  emptyText: {
    color: COLORS.textTertiary,
    fontSize: FONT_SIZE.md,
    textAlign: "center",
  },
});
