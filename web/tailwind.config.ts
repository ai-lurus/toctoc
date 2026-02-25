import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4A89F3",
          light: "#EBF2FF",
          dark: "#3367D6",
        },
        secondary: {
          DEFAULT: "#FFB400",
          light: "#FFF4CC",
        },
        background: "#F9FAFB",
        surface: "#FFFFFF",
        "text-primary": "#111827",
        "text-secondary": "#6B7280",
        "text-tertiary": "#9CA3AF",
        border: "#E5E7EB",
        error: "#FF5252",
        success: "#10CE8A",
        warning: "#FFC107",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        xxl: "48px",
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "24px",
        full: "9999px",
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "18px",
        xl: "24px",
        xxl: "32px",
      },
    },
  },
  plugins: [],
};

export default config;
