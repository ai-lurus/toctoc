export const COLORS = {
  primary: "#4A89F3",    // Design Blue
  primaryLight: "#EBF2FF",
  primaryDark: "#3367D6",
  secondary: "#FFB400",  // Star Yellow
  secondaryLight: "#FFF4CC",
  background: "#F9FAFB",
  surface: "#FFFFFF",
  text: "#111827",
  textSecondary: "#6B7280",
  textTertiary: "#9CA3AF",
  border: "#E5E7EB",
  error: "#FF5252",      // Cancel Red
  success: "#10CE8A",    // Design Green (Buttons)
  warning: "#FFC107",
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
} as const;

export const BORDER_RADIUS = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const PLATFORM_FEE_PERCENT = 20;
export const DEFAULT_CURRENCY = "MXN";
export const REQUEST_TIMEOUT_MINUTES = 15;
