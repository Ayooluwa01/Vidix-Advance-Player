import { Header } from "@/components/reusables/Header";

import { getColor } from "@/constants/colors";
import { SPACING } from "@/constants/spacing";
import { useThemeStore } from "@/store/useThemeStore";
import { useSettingsStore } from "@/store/zustand/useSettings";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";
import {
  IntervalSelector,
  SectionHeader,
  ToggleItem,
} from "../components/section-components";

const PlaybackSettings = () => {
  const { theme } = useThemeStore();
  const { updatePlayback, playback } = useSettingsStore();

  const colors = useMemo(
    () => ({
      bgColor: getColor(theme, "background"),
      surfaceColor: getColor(theme, "surfaceSecondary"),
      textPrimary: getColor(theme, "primary"),
      textSecondary: getColor(theme, "secondary"),
      accentColor: getColor(theme, "accent"),
      accentSoftColor: getColor(theme, "accentSoft"),
    }),
    [theme],
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.bgColor }}>
      <Header name="Playback" />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: SPACING.screenPadding,
          paddingBottom: SPACING.xxxl,
        }}
      >
        {/* ==================== GESTURE CONTROLS ==================== */}
        <SectionHeader
          title="Gesture Controls"
          accentSoftColor={colors.accentSoftColor}
        />

        {/* Horizontal Swipe */}
        <ToggleItem
          title="Horizontal Swipe to Seek"
          subtitle="Swipe left or right to seek through video"
          value={playback.horizontalSwipe}
          onToggle={() =>
            updatePlayback({ horizontalSwipe: !playback.horizontalSwipe })
          }
          surfaceColor={colors.surfaceColor}
          textPrimary={colors.textPrimary}
          textSecondary={colors.textSecondary}
          accentColor={colors.accentColor}
        />

        {/* Vertical Swipe */}
        <ToggleItem
          title="Vertical Swipe for Volume & Brightness"
          subtitle="Control levels by swiping up or down"
          value={playback.verticalSwipe}
          onToggle={() =>
            updatePlayback({ verticalSwipe: !playback.verticalSwipe })
          }
          surfaceColor={colors.surfaceColor}
          textPrimary={colors.textPrimary}
          textSecondary={colors.textSecondary}
          accentColor={colors.accentColor}
        />

        {/* Double Tap */}
        <ToggleItem
          title="Double Tap to Skip"
          subtitle="Tap edges to skip forward or back"
          value={playback.doubleTap}
          onToggle={() => updatePlayback({ doubleTap: !playback.doubleTap })}
          surfaceColor={colors.surfaceColor}
          textPrimary={colors.textPrimary}
          textSecondary={colors.textSecondary}
          accentColor={colors.accentColor}
        />

        {/* ==================== NAVIGATION CONTROLS ==================== */}
        <SectionHeader
          title="Navigation Controls"
          accentSoftColor={colors.accentSoftColor}
        />

        {/* Skip Forward Interval */}
        <IntervalSelector
          title="Skip Forward Interval"
          icon="play-forward"
          currentValue={playback.skipForwardInterval}
          onChange={(interval) =>
            updatePlayback({ skipForwardInterval: interval })
          }
          surfaceColor={colors.surfaceColor}
          textPrimary={colors.textPrimary}
          textSecondary={colors.textSecondary}
          accentColor={colors.accentColor}
        />

        {/* Skip Backward Interval */}
        <IntervalSelector
          title="Skip Backward Interval"
          icon="play-back"
          currentValue={playback.skipBackwardInterval}
          onChange={(interval) =>
            updatePlayback({ skipBackwardInterval: interval })
          }
          surfaceColor={colors.surfaceColor}
          textPrimary={colors.textPrimary}
          textSecondary={colors.textSecondary}
          accentColor={colors.accentColor}
        />

        {/* ==================== ADVANCED ==================== */}
        <SectionHeader
          title="Advanced"
          accentSoftColor={colors.accentSoftColor}
        />

        {/* Smart Buffering */}
        <ToggleItem
          title="Smart Buffering"
          subtitle="Optimizes pre-loading for weak networks"
          value={playback.smartBuffering}
          onToggle={() =>
            updatePlayback({ smartBuffering: !playback.smartBuffering })
          }
          surfaceColor={colors.surfaceColor}
          textPrimary={colors.textPrimary}
          textSecondary={colors.textSecondary}
          accentColor={colors.accentColor}
        />
      </ScrollView>
    </View>
  );
};

export default PlaybackSettings;
