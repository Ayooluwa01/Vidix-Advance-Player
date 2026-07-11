import { useColorScheme } from "react-native";

export const COLORS = {
  light: {
    background: "#F8FAFC",
    surfacePrimary: "#FFFFFF",
    surfaceSecondary: "#E2E8F0",

    accent: "#4F46E5",
    accentLight: "#6366F1",
    accentSoft: "#C0C1FF",

    primary: "#0F172A",
    secondary: "#475569",
    muted: "#94A3B8",

    success: "#10B981",
    error: "#EF4444",
    warning: "#F59E0B",
  },

  dark: {
    background: "#0F172A",
    surfacePrimary: "#1E293B",
    surfaceSecondary: "#334155",

    accent: "#6366F1",
    accentLight: "#818CF8",
    accentSoft: "#C0C1FF",

    primary: "#F1F5F9",
    secondary: "#CBD5E1",
    muted: "#94A3B8",

    success: "#10B981",
    error: "#EF4444",
    warning: "#F59E0B",
  },
} as const;

type ColorKey = keyof typeof COLORS.light;
type ThemeType = "light" | "dark" | "system";

const resolveTheme = (theme: ThemeType): "light" | "dark" => {
  if (theme === "system") {
    const deviceTheme = useColorScheme();
    return deviceTheme === "dark" ? "dark" : "light";
  }
  return theme;
};

export const getColor = (theme: ThemeType, colorKey: ColorKey): string => {
  const resolvedTheme = resolveTheme(theme);
  return COLORS[resolvedTheme][colorKey];
};

// export const createColorGetter = (theme: ThemeType) => {
//   const resolvedTheme = resolveTheme(theme);
//   return (colorKey: ColorKey): string => COLORS[resolvedTheme][colorKey];
// };
