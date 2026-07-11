import { create } from "zustand";
import {
  MediaLibrarySettings,
  PlaybackSettings,
  SubtitleSettings,
  getMediaLibrarySettings,
  getPlaybackSettings,
  getSubtitleSettings,
  saveMediaLibrarySettings,
  savePlaybackSettings,
  saveSubtitleSettings,
} from "../mmkv/app-settings-store";
import { storage } from "../mmkv/storage";
import { ThemeType } from "../useThemeStore";

interface SettingsState {
  playback: PlaybackSettings;
  updatePlayback: (settings: Partial<PlaybackSettings>) => void;

  // Display
  // display: DisplaySettings;
  // updateDisplay: (settings: Partial<DisplaySettings>) => void;

  // Subtitles
  subtitles: SubtitleSettings;
  updateSubtitles: (settings: Partial<SubtitleSettings>) => void;

  // Media Library
  mediaLibrary: MediaLibrarySettings;
  updateMediaLibrary: (settings: Partial<MediaLibrarySettings>) => void;

  // Initialization
  initializeSettings: () => void;
}
const savedTheme =
  (storage.getString("theme") as ThemeType | undefined) || "dark";
export const useSettingsStore = create<SettingsState>((set) => ({
  playback: getPlaybackSettings(),
  subtitles: getSubtitleSettings(),
  mediaLibrary: getMediaLibrarySettings(),

  updatePlayback: (settings) => {
    savePlaybackSettings(settings);
    set((state) => ({
      playback: { ...state.playback, ...settings },
    }));

    // Listen for external changes
    notifySettingsChanged("playback");
  },

  updateSubtitles: (settings) => {
    saveSubtitleSettings(settings);
    set((state) => ({
      subtitles: { ...state.subtitles, ...settings },
    }));
    notifySettingsChanged("subtitles");
  },

  updateMediaLibrary: (settings) => {
    saveMediaLibrarySettings(settings);
    set((state) => ({
      mediaLibrary: { ...state.mediaLibrary, ...settings },
    }));
    notifySettingsChanged("mediaLibrary");
  },

  initializeSettings: () => {
    set({
      playback: getPlaybackSettings(),
      // display: getDisplaySettings(),
      subtitles: getSubtitleSettings(),
      mediaLibrary: getMediaLibrarySettings(),
    });
  },
}));

let settingsChangeListener: ((type: string) => void) | null = null;

export const notifySettingsChanged = (type: string) => {
  settingsChangeListener?.(type);
};

export const subscribeToSettingsChanges = (
  callback: (type: string) => void,
) => {
  settingsChangeListener = callback;
  return () => {
    settingsChangeListener = null;
  };
};
