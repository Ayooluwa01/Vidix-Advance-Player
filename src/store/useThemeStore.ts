import { create } from "zustand";
import {
  DisplaySettings,
  getDisplaySettings,
  saveDisplaySettings,
} from "./mmkv/app-settings-store";
import { storage } from "./mmkv/storage";

export type ThemeType = "light" | "dark" | "system";
let preferredtheme;
type ThemeStore = {
  theme: ThemeType;
  toggleTheme?: () => void;
  setTheme: (theme: ThemeType) => void;
  display: DisplaySettings;
  updateDisplay: (settings: Partial<DisplaySettings>) => void;
};

const savedTheme =
  (storage.getString("theme") as ThemeType | undefined) || "dark";
if (!savedTheme) {
  storage.set("theme", "system");
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: savedTheme,
  display: getDisplaySettings(),

  // toggleTheme: () =>
  //   set((state) => {
  //     const newTheme = state.theme === "light" ? "dark" : "light";

  //     storage.set("theme", newTheme);

  //     return { theme: newTheme };
  //   }),
  updateDisplay: (settings) => {
    set((state) => {
      if (settings.darkMode === true) {
        const newTheme = "dark";
        storage.set("theme", newTheme);
        return { theme: newTheme };
      } else if (settings.darkMode === false) {
        const newTheme = "light";
        storage.set("theme", newTheme);
        return { theme: newTheme };
      }
    });
    saveDisplaySettings(settings);

    set((state) => ({
      display: { ...state.display, ...settings },
    }));
  },
  setTheme: (theme) => {
    storage.set("theme", theme);
    set({ theme });
  },
}));
