import { PhotoIdentifier } from "@react-native-camera-roll/camera-roll";
import { VideoRef } from "react-native-video";
import { create } from "zustand";

interface PlayerStore {
  // ref
  playerRef: React.RefObject<VideoRef | null> | null;
  setPlayerRef: (ref: React.RefObject<VideoRef | null>) => void;

  seekTo: (time: number) => void;
  setMute?: () => void;

  // Playlist
  playlist: PhotoIdentifier[];
  currentVideo: PhotoIdentifier | null;
  currentIndex: number;

  // Playback
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  sliderValue: number;
  buffered: number;
  playbackRate: number;
  isSeeking: boolean;
  mute: boolean;

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
  setSliderValue: (time: number) => void;
  setDuration: (duration: number) => void;
  setBuffered: (buffered: number) => void;

  startSeeking: () => void;
  stopSeeking: () => void;

  seek: (time: number) => void;
  setPlaybackRate: (rate: number) => void;

  toggleControls: () => void;
  toggleFullscreen: () => void;
  toggleLock: () => void;

  resetPlayer: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  // ref
  playerRef: null,
  // Playlist
  playlist: [],
  currentVideo: null,
  currentIndex: 0,
  mute: false,

  // Playback
  isPlaying: true,
  duration: 0,
  currentTime: 0,
  sliderValue: 0,
  buffered: 0,
  playbackRate: 1,
  isSeeking: false,

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
      sliderValue: 0,
    }),

  setCurrentVideo: (video, index) =>
    set({
      currentVideo: video,
      currentIndex: index,
      currentTime: 0,
      sliderValue: 0,
    }),

  setPlayerRef: (ref) =>
    set({
      playerRef: ref,
    }),

  seekTo: (time) => {
    const { playerRef } = get();

    playerRef?.current?.seek(time);
    set({
      currentTime: time,

      sliderValue: time,
    });
  },

  play: () => set({ isPlaying: true }),

  pause: () => set({ isPlaying: false }),

  next: () => {
    const { playlist, currentIndex } = get();

    if (currentIndex >= playlist.length - 1) return;

    set({
      currentIndex: currentIndex + 1,
      currentVideo: playlist[currentIndex + 1],
      currentTime: 0,
      sliderValue: 0,
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
      sliderValue: 0,
      isPlaying: true,
    });
  },

  setCurrentTime: (time) =>
    set((state) => {
      if (state.isSeeking) return state;

      return {
        currentTime: time,
      };
    }),

  setSliderValue: (time) =>
    set({
      sliderValue: time,
    }),

  setDuration: (duration) =>
    set({
      duration,
    }),

  setBuffered: (buffered) =>
    set({
      buffered,
    }),

  startSeeking: () =>
    set((state) => ({
      isSeeking: true,
      sliderValue: state.currentTime,
    })),

  stopSeeking: () =>
    set({
      isSeeking: false,
    }),

  seek: (time) =>
    set({
      currentTime: time,
      sliderValue: time,
    }),

  setPlaybackRate: (rate) =>
    set({
      playbackRate: rate,
    }),

  toggleControls: () =>
    set((state) => ({
      controlsVisible: !state.controlsVisible,
    })),

  setMute: () => {
    const { playerRef, mute } = get();
    // has been muted true numute
    if (mute) {
      set((state) => ({
        // turning to false
        mute: !state.mute,
      }));
      playerRef?.current?.setVolume(0);
    } else {
      set((state) => ({
        // turning to true
        mute: !state.mute,
      }));
      playerRef?.current?.setVolume(1);
    }
  },
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
      sliderValue: 0,
      buffered: 0,
      playbackRate: 1,
      isSeeking: false,
      controlsVisible: true,
      locked: false,
      fullscreen: false,
    }),
}));
