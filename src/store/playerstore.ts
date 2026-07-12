import { PhotoIdentifier } from "@react-native-camera-roll/camera-roll";
import { create } from "zustand";

interface PlayerStore {
  // Playlist
  playlist: PhotoIdentifier[];
  currentVideo: PhotoIdentifier | null;
  currentIndex: number;

  // Playback
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  buffered: number;
  playbackRate: number;

  // UI
  controlsVisible: boolean;
  locked: boolean;
  fullscreen: boolean;

  // Actions
  setPlaylist: (videos: PhotoIdentifier[], startIndex?: number) => void;
  setCurrentVideo: (video: PhotoIdentifier, index: number) => void;

  play: () => void;
  pause: () => void;

  next: () => void;
  previous: () => void;

  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setBuffered: (buffered: number) => void;

  seek: (time: number) => void;
  setPlaybackRate: (rate: number) => void;
  toggleControls: () => void;
  toggleFullscreen: () => void;
  toggleLock: () => void;

  resetPlayer: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  // Playlist
  playlist: [],
  currentVideo: null,
  currentIndex: 0,

  // Playback
  isPlaying: true,
  duration: 0,
  currentTime: 0,
  buffered: 0,
  playbackRate: 1,

  // UI
  controlsVisible: false,
  locked: false,
  fullscreen: false,

  setPlaylist: (videos, startIndex = 0) =>
    set({
      playlist: videos,
      currentIndex: startIndex,
      currentVideo: videos[startIndex] ?? null,
      currentTime: 0,
    }),

  setCurrentVideo: (video, index) =>
    set({
      currentVideo: video,
      currentIndex: index,
      currentTime: 0,
    }),

  play: () =>
    set({
      isPlaying: true,
    }),

  pause: () =>
    set({
      isPlaying: false,
    }),

  next: () => {
    const { playlist, currentIndex } = get();
    if (currentIndex >= playlist.length - 1) return;
    set({
      currentIndex: currentIndex + 1,
      currentVideo: playlist[currentIndex + 1],
      currentTime: 0,
      isPlaying: true,
    });
  },

  previous: () => {
    const { playlist, currentIndex } = get();
    if (currentIndex <= 0) return;
    set({
      currentIndex: currentIndex - 1,
      currentVideo: playlist[currentIndex - 1],
      currentTime: 0,
      isPlaying: true,
    });
  },

  setCurrentTime: (time) =>
    set({
      currentTime: time,
    }),

  setDuration: (duration) =>
    set({
      duration,
    }),

  setBuffered: (buffered) =>
    set({
      buffered,
    }),

  seek: (time) =>
    set({
      currentTime: time,
    }),

  setPlaybackRate: (rate) =>
    set({
      playbackRate: rate,
    }),

  toggleControls: () =>
    set((state) => ({
      controlsVisible: !state.controlsVisible,
    })),

  toggleFullscreen: () =>
    set((state) => ({
      fullscreen: !state.fullscreen,
    })),

  toggleLock: () =>
    set((state) => ({
      locked: !state.locked,
    })),

  resetPlayer: () =>
    set({
      playlist: [],
      currentVideo: null,
      currentIndex: 0,
      isPlaying: false,
      duration: 0,
      currentTime: 0,
      buffered: 0,
      playbackRate: 1,
      controlsVisible: true,
      locked: false,
      fullscreen: false,
    }),
}));
