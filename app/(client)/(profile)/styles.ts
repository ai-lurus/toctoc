import { StyleSheet } from "react-native";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from "@/lib/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 0,
  },

  /* ═══ Header ═══ */
  header: {
    backgroundColor: COLORS.primary,
    width: "100%",
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
  },
  headerTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: "700",
    color: "#fff",
  },

  /* ═══ Profile Card ═══ */
  profileCard: {
    alignItems: "center",
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.sm,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: SPACING.xs,
  },
  profileEmail: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  editButton: {
    marginTop: SPACING.md,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.full,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  },
  editButtonText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: "600",
    color: COLORS.primary,
  },

  /* ═══ Section Cards ═══ */
  sectionCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACING.md,
  },

  /* ═══ Rows ═══ */
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.sm + 2,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    flex: 1,
  },
  rowIcon: {
    width: 28,
    alignItems: "center",
  },
  rowLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  rowValue: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text,
    fontWeight: "500",
    flexShrink: 1,
    textAlign: "right",
  },
  rowAction: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.primary,
    fontWeight: "500",
    marginLeft: SPACING.sm,
  },

  /* ═══ Payment ═══ */
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACING.sm + 2,
  },
  paymentInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    flex: 1,
  },
  paymentDetails: {
    flex: 1,
  },
  paymentCard: {
    fontSize: FONT_SIZE.sm,
    fontWeight: "500",
    color: COLORS.text,
  },
  paymentExpiry: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  addCardButton: {
    paddingTop: SPACING.sm,
  },
  addCardText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
    fontWeight: "500",
  },

  /* ═══ Security ═══ */
  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  verifiedText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.success,
    fontWeight: "500",
  },

  /* ═══ Preferences ═══ */
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.sm + 2,
  },

  /* ═══ Support Links ═══ */
  linkRow: {
    paddingVertical: SPACING.sm + 4,
  },
  linkRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  linkText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
    fontWeight: "500",
  },

  /* ═══ Sign Out ═══ */
  signOutButton: {
    alignItems: "center",
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.sm,
    marginBottom: 0,
    paddingVertical: SPACING.xs,
  },
  signOutText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.error,
    fontWeight: "600",
  },
});
