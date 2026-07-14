import { PhotoIdentifier } from "@react-native-camera-roll/camera-roll";
import { createMMKV } from "react-native-mmkv";

export const storage = createMMKV();

/* =========================
   APP KEYS
========================= */
export const KEYS = {
  FIRST_LAUNCH: "device-first",
  RECENT_VIDEOS: "recent-videos",
  CONTINUE_VIDEO: "continue-video",
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
   SHARED TYPES
========================= */
export type VideoPlaybackEntry = {
  video: PhotoIdentifier;
  positionMillis?: number;
  updatedAt: number;
};

const FINISHED_THRESHOLD_MILLIS = 3000;

const getIsFinished = (video: PhotoIdentifier, positionMillis: number) => {
  const durationMillis = (video.node.image.playableDuration ?? 0) * 1000;

  return (
    positionMillis <= 0 ||
    (durationMillis > 0 &&
      durationMillis - positionMillis <= FINISHED_THRESHOLD_MILLIS)
  );
};

/* =========================
   RECENTLY PLAYED VIDEOS
========================= */
export const saveRecentVideo = (
  video: PhotoIdentifier,
  positionMillis: number = 0,
) => {
  const existing = getRecentVideos();

  const filtered = existing.filter((v) => v.video.node.id !== video.node.id);

  const entry: VideoPlaybackEntry = {
    video,
    positionMillis: getIsFinished(video, positionMillis) ? 0 : positionMillis,
    updatedAt: Date.now(),
  };

  const updated = [entry, ...filtered].slice(0, 20);
  storage.set(KEYS.RECENT_VIDEOS, JSON.stringify(updated));
};

export const getRecentVideos = (): VideoPlaybackEntry[] => {
  try {
    const data = storage.getString(KEYS.RECENT_VIDEOS);

    return data ? JSON.parse(data) : [];
  } catch {
    storage.remove(KEYS.RECENT_VIDEOS);
    return [];
  }
};

export const clearRecentVideos = () => {
  storage.remove(KEYS.RECENT_VIDEOS);
};

/* =========================
   CONTINUE WATCHING
========================= */
export const saveContinueWatching = (
  video: PhotoIdentifier,
  positionMillis: number,
) => {
  if (getIsFinished(video, positionMillis)) {
    clearContinueWatching();
    return;
  }

  const entry: VideoPlaybackEntry = {
    video,
    positionMillis,
    updatedAt: Date.now(),
  };

  storage.set(KEYS.CONTINUE_VIDEO, JSON.stringify(entry));
};

export const getContinueWatching = (): VideoPlaybackEntry | null => {
  try {
    const data = storage.getString(KEYS.CONTINUE_VIDEO);
    return data ? JSON.parse(data) : null;
  } catch {
    storage.remove(KEYS.CONTINUE_VIDEO);
    return null;
  }
};

export const clearContinueWatching = () => {
  storage.remove(KEYS.CONTINUE_VIDEO);
};
