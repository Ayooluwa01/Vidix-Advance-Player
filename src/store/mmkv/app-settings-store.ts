import { createMMKV } from "react-native-mmkv";

export const settingsStorage = createMMKV({ id: "vidix-settings" });

/* =========================
   SETTINGS KEYS
========================= */
export const SETTINGS_KEYS = {
  // Playback Keys
  HORIZONTAL_SWIPE: "playback-horizontal-swipe",
  VERTICAL_SWIPE: "playback-vertical-swipe",
  DOUBLE_TAP: "playback-double-tap",
  SKIP_FORWARD_INTERVAL: "playback-skip-forward",
  SKIP_BACKWARD_INTERVAL: "playback-skip-backward",
  SMART_BUFFERING: "playback-smart-buffering",
  RESUME_BEHAVIOR: "playback-resume-behavior",

  // Display
  DARK_MODE: "display-dark-mode",
  UI_SCALE: "display-ui-scale",

  // Subtitles
  SUBTITLE_SIZE: "subtitles-font-size",
  SUBTITLE_COLOR: "subtitles-color",
  SUBTITLE_BG_OPACITY: "subtitles-bg-opacity",

  // Media Library
  MANAGED_FOLDERS: "library-managed-folders",
};

/* =========================
   TYPES
========================= */
export type SkipInterval = "5s" | "10s" | "30s" | "60s";
export type UIScale = "compact" | "standard" | "large";
export type SubtitleColor = "white" | "yellow" | "cyan";

export type PlaybackSettings = {
  horizontalSwipe: boolean;
  verticalSwipe: boolean;
  doubleTap: boolean;
  skipForwardInterval: SkipInterval;
  skipBackwardInterval: SkipInterval;
  smartBuffering: boolean;
  resumeBehavior: boolean;
};

export type DisplaySettings = {
  darkMode: boolean;

  uiScale: UIScale;
};

export type SubtitleSettings = {
  fontSize: number;
  color: SubtitleColor;
  backgroundOpacity: number;
};

export type MediaLibrarySettings = {
  managedFolders: string[];
};

export type AllSettings = PlaybackSettings &
  DisplaySettings &
  SubtitleSettings &
  MediaLibrarySettings;

/* =========================
   PLAYBACK SETTINGS
========================= */
export const getPlaybackSettings = (): PlaybackSettings => {
  return {
    horizontalSwipe:
      settingsStorage.getBoolean(SETTINGS_KEYS.HORIZONTAL_SWIPE) ?? true,
    verticalSwipe:
      settingsStorage.getBoolean(SETTINGS_KEYS.VERTICAL_SWIPE) ?? true,
    doubleTap: settingsStorage.getBoolean(SETTINGS_KEYS.DOUBLE_TAP) ?? true,
    skipForwardInterval:
      (settingsStorage.getString(
        SETTINGS_KEYS.SKIP_FORWARD_INTERVAL,
      ) as SkipInterval) ?? "10s",
    skipBackwardInterval:
      (settingsStorage.getString(
        SETTINGS_KEYS.SKIP_BACKWARD_INTERVAL,
      ) as SkipInterval) ?? "10s",
    smartBuffering:
      settingsStorage.getBoolean(SETTINGS_KEYS.SMART_BUFFERING) ?? true,
    resumeBehavior:
      settingsStorage.getBoolean(SETTINGS_KEYS.RESUME_BEHAVIOR) ?? true,
  };
};

export const savePlaybackSettings = (settings: Partial<PlaybackSettings>) => {
  if (settings.horizontalSwipe !== undefined)
    settingsStorage.set(
      SETTINGS_KEYS.HORIZONTAL_SWIPE,
      settings.horizontalSwipe,
    );
  if (settings.verticalSwipe !== undefined)
    settingsStorage.set(SETTINGS_KEYS.VERTICAL_SWIPE, settings.verticalSwipe);
  if (settings.doubleTap !== undefined)
    settingsStorage.set(SETTINGS_KEYS.DOUBLE_TAP, settings.doubleTap);
  if (settings.skipForwardInterval !== undefined)
    settingsStorage.set(
      SETTINGS_KEYS.SKIP_FORWARD_INTERVAL,
      settings.skipForwardInterval,
    );
  if (settings.skipBackwardInterval !== undefined)
    settingsStorage.set(
      SETTINGS_KEYS.SKIP_BACKWARD_INTERVAL,
      settings.skipBackwardInterval,
    );
  if (settings.smartBuffering !== undefined)
    settingsStorage.set(SETTINGS_KEYS.SMART_BUFFERING, settings.smartBuffering);
  if (settings.resumeBehavior !== undefined)
    settingsStorage.set(SETTINGS_KEYS.RESUME_BEHAVIOR, settings.resumeBehavior);
};

/* =========================
   DISPLAY SETTINGS
========================= */
export const getDisplaySettings = (): DisplaySettings => {
  return {
    darkMode: settingsStorage.getBoolean(SETTINGS_KEYS.DARK_MODE) ?? true,
    uiScale:
      (settingsStorage.getString(SETTINGS_KEYS.UI_SCALE) as UIScale) ??
      "standard",
  };
};

export const saveDisplaySettings = (settings: Partial<DisplaySettings>) => {
  if (settings.darkMode !== undefined)
    settingsStorage.set(SETTINGS_KEYS.DARK_MODE, settings.darkMode);
  if (settings.uiScale !== undefined)
    settingsStorage.set(SETTINGS_KEYS.UI_SCALE, settings.uiScale);
};

/* =========================
   SUBTITLE SETTINGS
========================= */
export const getSubtitleSettings = (): SubtitleSettings => {
  return {
    fontSize: settingsStorage.getNumber(SETTINGS_KEYS.SUBTITLE_SIZE) ?? 20,
    color:
      (settingsStorage.getString(
        SETTINGS_KEYS.SUBTITLE_COLOR,
      ) as SubtitleColor) ?? "white",
    backgroundOpacity:
      settingsStorage.getNumber(SETTINGS_KEYS.SUBTITLE_BG_OPACITY) ?? 50,
  };
};

export const saveSubtitleSettings = (settings: Partial<SubtitleSettings>) => {
  if (settings.fontSize !== undefined)
    settingsStorage.set(SETTINGS_KEYS.SUBTITLE_SIZE, settings.fontSize);
  if (settings.color !== undefined)
    settingsStorage.set(SETTINGS_KEYS.SUBTITLE_COLOR, settings.color);
  if (settings.backgroundOpacity !== undefined)
    settingsStorage.set(
      SETTINGS_KEYS.SUBTITLE_BG_OPACITY,
      settings.backgroundOpacity,
    );
};

/* =========================
   MEDIA LIBRARY SETTINGS
========================= */
export const getMediaLibrarySettings = (): MediaLibrarySettings => {
  const folders = settingsStorage.getString(SETTINGS_KEYS.MANAGED_FOLDERS);
  return {
    managedFolders: folders ? JSON.parse(folders) : [],
  };
};

export const saveMediaLibrarySettings = (
  settings: Partial<MediaLibrarySettings>,
) => {
  if (settings.managedFolders !== undefined)
    settingsStorage.set(
      SETTINGS_KEYS.MANAGED_FOLDERS,
      JSON.stringify(settings.managedFolders),
    );
};

export const getAllSettings = (): AllSettings => {
  return {
    ...getPlaybackSettings(),
    ...getDisplaySettings(),
    ...getSubtitleSettings(),
    ...getMediaLibrarySettings(),
  };
};
