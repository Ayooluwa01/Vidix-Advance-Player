import { create } from "zustand";
import {
  clearContinueWatching,
  getContinueWatching,
  VideoPlaybackEntry,
} from "./mmkv/storage";

interface ContinueWatchingState {
  continueWatching: VideoPlaybackEntry | null;
  loadContinueWatching: () => void;
  clear: () => void;
}

export const useContinueWatching = create<ContinueWatchingState>((set) => ({
  continueWatching: null,

  loadContinueWatching: () => {
    try {
      const entry = getContinueWatching();

      set({
        continueWatching: entry,
      });
    } catch (error) {
      console.error(error);
    }
  },

  clear: () => {
    clearContinueWatching();
    set({ continueWatching: null });
  },
}));
