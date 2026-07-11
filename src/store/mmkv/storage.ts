// reusable MMKV storage util
import { createMMKV } from "react-native-mmkv";

export const storage = createMMKV();

/* =========================
   APP KEYS
========================= */
export const KEYS = {
  FIRST_LAUNCH: "device-first",
  RECENT_VIDEOS: "recent-videos",
};

/* =========================
   FIRST LAUNCH
========================= */
export const setFirstLaunch = (value: boolean = false) => {
  storage.set(KEYS.FIRST_LAUNCH, value);
};

export const getFirstLaunch = () => {
  return storage.getBoolean(KEYS.FIRST_LAUNCH);
};

/* =========================
   RECENTLY PLAYED VIDEOS
========================= */
export type RecentVideo = {
  id: string;
  title: string;
  uri: string;
  thumbnail?: string;
  duration: number;
  currentTime: number;
  lastPlayed: string;
};

export const saveRecentVideo = (video: RecentVideo) => {
  const existing = getRecentVideos();

  const filtered = existing.filter((v) => v.id !== video.id);

  const updated = [video, ...filtered];

  storage.set(KEYS.RECENT_VIDEOS, JSON.stringify(updated));
};

export const getRecentVideos = (): RecentVideo[] => {
  const data = storage.getString(KEYS.RECENT_VIDEOS);
  return data ? JSON.parse(data) : [];
};

export const clearRecentVideos = () => {
  storage.remove(KEYS.RECENT_VIDEOS);
};

//

// const videos = getRecentVideos();

// storage.set("recent-videos", JSON.stringify([...videos, newVideo]));
