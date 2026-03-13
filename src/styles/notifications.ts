import { StyleSheet } from "react-native";
import { BORDER_RADIUS, COLORS, FONT_SIZE, SPACING } from "@/lib/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    width: "100%",
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  backButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: FONT_SIZE.xl,
    fontWeight: "700",
  },

  content: {
    paddingBottom: SPACING.md,
  },
  filtersWrap: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
  },
  tabsContainer: {
    backgroundColor: "#ECECEC",
    borderRadius: BORDER_RADIUS.md,
    padding: 3,
    flexDirection: "row",
  },
  tabButton: {
    flex: 1,
    paddingVertical: SPACING.sm - 1,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: "center",
  },
  tabButtonActive: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  markAllText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.primary,
    marginTop: SPACING.sm,
  },

  listWrap: {
    marginTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  item: {
    flexDirection: "row",
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  unreadItem: {
    backgroundColor: "#F6F9FF",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginTop: 8,
  },
  itemMain: {
    flex: 1,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACING.sm,
  },
  titleWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    flex: 1,
  },
  emoji: {
    fontSize: 14,
  },
  title: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text,
    fontWeight: "500",
    flex: 1,
  },
  body: {
    marginTop: 2,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
  bottomRow: {
    marginTop: SPACING.xs,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  time: {
    fontSize: 11,
    color: COLORS.textTertiary,
  },
  markReadText: {
    fontSize: 11,
    color: COLORS.primary,
  },
  empty: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    alignItems: "center",
  },
  emptyText: {
    color: COLORS.textTertiary,
    fontSize: FONT_SIZE.sm,
    textAlign: "center",
  },
});
