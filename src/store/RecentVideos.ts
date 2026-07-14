import { create } from "zustand";
import { getRecentVideos, VideoPlaybackEntry } from "./mmkv/storage";

interface RecentVideos {
  recentlyPlayed: VideoPlaybackEntry[];
  loadRecentVideos: () => void;
}

export const useRecentVideos = create<RecentVideos>((set) => ({
  recentlyPlayed: [],

  loadRecentVideos: () => {
    try {
      const recentVideos = getRecentVideos();

      set({
        recentlyPlayed: recentVideos,
      });
    } catch (error) {
      console.error(error);
    }
  },
}));
