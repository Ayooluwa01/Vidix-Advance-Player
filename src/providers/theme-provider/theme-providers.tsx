import { useThemeStore } from "@/store/useThemeStore";
import { useEffect } from "react";
import { useColorScheme, View } from "react-native";
import { ThemeProviderProps } from "./types";

export const Themeproviders = ({ children }: ThemeProviderProps) => {
  const systemTheme = useColorScheme();
  const { theme } = useThemeStore();

  const activeTheme = theme === "system" ? systemTheme : theme;
  const backgroundColor = activeTheme === "dark" ? "#0F172A" : "#FFFFFF";

  useEffect(() => {}, [backgroundColor]);

  return (
    <View
      className={activeTheme === "dark" ? "dark" : undefined}
      style={{
        flex: 1,
        backgroundColor,
        paddingHorizontal: 5,
      }}
    >
      {children}
    </View>
  );
};
