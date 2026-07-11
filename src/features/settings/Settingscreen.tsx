import { Header } from "@/components/reusables/Header";
import { getColor } from "@/constants/colors";
import { SPACING } from "@/constants/spacing";
import { useThemeStore } from "@/store/useThemeStore";
import { useSettingsStore } from "@/store/zustand/useSettings";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";
import {
  CustomActionItem,
  NavItem,
  SectionHeader,
  ToggleItem,
} from "./components/section-components";

const SettingScreen = () => {
  const { theme } = useThemeStore();
  const router = useRouter();
  const { playback, updatePlayback } = useSettingsStore();
  const { updateDisplay, display } = useThemeStore();
  // Memoize colors
  const colors = useMemo(
    () => ({
      bgColor: getColor(theme, "background"),
      surfaceColor: getColor(theme, "surfaceSecondary"),
      textPrimary: getColor(theme, "primary"),
      textSecondary: getColor(theme, "secondary"),
      accentColor: getColor(theme, "accent"),
      accentSoftColor: getColor(theme, "accentSoft"),
      false: getColor(theme, "secondary"),
    }),
    [theme],
  );

  return (
    <View style={{ flex: 1 }}>
      <Header name="Settings" />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: SPACING.screenPadding,
          paddingBottom: SPACING.lg,
        }}
      >
        {/* PLAYBACK */}
        <SectionHeader
          title="Playback"
          accentSoftColor={getColor(theme, "accentSoft")}
        />

        <NavItem
          title="Gesture Controls"
          subtitle="Customize swipe and tap actions"
          onPress={() => router.push("/settings/playback-gesture")}
          surfaceColor={colors.surfaceColor}
          textPrimary={colors.textPrimary}
          textSecondary={colors.textSecondary}
        />

        <ToggleItem
          title="Resume Behavior"
          subtitle="Start from where you left off"
          value={playback.resumeBehavior}
          onToggle={() =>
            updatePlayback({ resumeBehavior: !playback.resumeBehavior })
          }
          surfaceColor={colors.surfaceColor}
          textPrimary={colors.textPrimary}
          textSecondary={colors.textSecondary}
          accentColor={colors.accentColor}
        />

        {/* DISPLAY */}
        <SectionHeader
          title="Display"
          accentSoftColor={getColor(theme, "accentSoft")}
        />

        <ToggleItem
          title="Dark Mode"
          subtitle="Optimized for night viewing"
          value={display.darkMode}
          onToggle={() => updateDisplay({ darkMode: !display.darkMode })}
          surfaceColor={colors.surfaceColor}
          textPrimary={colors.textPrimary}
          textSecondary={colors.textSecondary}
          accentColor={colors.accentColor}
        />

        <NavItem
          title="Subtitle Size"
          subtitle="Adjust visual accessibility"
          // onPress={() => router.push("/settings/playback-gestures")}
          surfaceColor={colors.surfaceColor}
          textPrimary={colors.textPrimary}
          textSecondary={colors.textSecondary}
        />
        {/* MEDIA LIBRARY */}
        <SectionHeader
          title="Media Library"
          accentSoftColor={getColor(theme, "accentSoft")}
        />

        <CustomActionItem
          title="Scan for New Media"
          subtitle="Update your library content"
          icon="refresh"
          surfaceColor={colors.surfaceColor}
          textPrimary={colors.textPrimary}
          textSecondary={colors.textSecondary}
          accentColor={colors.accentColor}
        />

        {/* ABOUT */}
        <SectionHeader
          title="About"
          accentSoftColor={getColor(theme, "accentSoft")}
        />

        <NavItem
          title="VidiX Player"
          subtitle="Version 4.2.0-stable"
          // onPress={() => router.push("/settings/about")}
          surfaceColor={colors.surfaceColor}
          textPrimary={colors.textPrimary}
          textSecondary={colors.textSecondary}
        />
      </ScrollView>
    </View>
  );
};

export default SettingScreen;
