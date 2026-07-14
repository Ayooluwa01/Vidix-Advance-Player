// import { PhotoIdentifier } from "@react-native-camera-roll/camera-roll";
// import { VideoRef } from "react-native-video";
// import { create } from "zustand";

// interface PlayerStore {
//   // ref
//   playerRef: React.RefObject<VideoRef | null> | null;
//   setPlayerRef: (ref: React.RefObject<VideoRef | null>) => void;

//   seekTo: (time: number) => void;
//   setMute?: () => void;

//   // Playlist
//   playlist: PhotoIdentifier[];
//   currentVideo: PhotoIdentifier | null;
//   currentIndex: number;

//   // Playback
//   isPlaying: boolean;
//   duration: number;
//   currentTime: number;
//   sliderValue: number;
//   buffered: number;
//   playbackRate: number;
//   isSeeking: boolean;
//   mute: boolean;
//   positionMillis?: number;
//   updatedAt?: number;
//   // UI
//   controlsVisible: boolean;
//   locked: boolean;
//   fullscreen: boolean;

//   // Actions
//   setPlaylist: (videos: PhotoIdentifier[], startIndex?: number) => void;
//   setCurrentVideo: (video: PhotoIdentifier, index: number) => void;

//   play: () => void;
//   pause: () => void;

//   next: () => void;
//   previous: () => void;
//   setCurrentTime: (time: number) => void;
//   setSliderValue: (time: number) => void;
//   setDuration: (duration: number) => void;
//   setBuffered: (buffered: number) => void;
//   startSeeking: () => void;
//   stopSeeking: () => void;

//   seek: (time: number) => void;
//   setPlaybackRate: (rate: number) => void;

//   toggleControls: () => void;
//   toggleFullscreen: () => void;
//   toggleLock: () => void;

//   resetPlayer: () => void;
// }

// export const usePlayerStore = create<PlayerStore>((set, get) => ({
//   // ref
//   playerRef: null,
//   // Playlist
//   playlist: [],
//   currentVideo: null,
//   currentIndex: 0,
//   mute: false,
//   // Playback
//   isPlaying: true,
//   duration: 0,
//   currentTime: 0,
//   sliderValue: 0,
//   buffered: 0,
//   playbackRate: 1,
//   isSeeking: false,
//   positionMillis: 0,
//   updatedAt: 0,
//   // UI
//   controlsVisible: false,
//   locked: false,
//   fullscreen: false,

//   setPlaylist: (videos, startIndex = 0) =>
//     set({
//       playlist: videos,
//       currentIndex: startIndex,
//       currentVideo: videos[startIndex] ?? null,
//       currentTime: 0,
//       sliderValue: 0,
//     }),

//   setCurrentVideo: (video, index) =>
//     set({
//       currentVideo: video,
//       currentIndex: index,
//       currentTime: 0,
//       sliderValue: 0,
//     }),

//   setPlayerRef: (ref) =>
//     set({
//       playerRef: ref,
//     }),

//   seekTo: (time) => {
//     const { playerRef } = get();

//     playerRef?.current?.seek(time);
//     set({
//       currentTime: time,

//       sliderValue: time,
//     });
//   },

//   play: () => set({ isPlaying: true }),

//   pause: () => set({ isPlaying: false }),

//   next: () => {
//     const { playlist, currentIndex } = get();

//     if (currentIndex >= playlist.length - 1) return;

//     set({
//       currentIndex: currentIndex + 1,
//       currentVideo: playlist[currentIndex + 1],
//       currentTime: 0,
//       sliderValue: 0,
//       isPlaying: true,
//     });
//   },

//   previous: () => {
//     const { playlist, currentIndex } = get();

//     if (currentIndex <= 0) return;

//     set({
//       currentIndex: currentIndex - 1,
//       currentVideo: playlist[currentIndex - 1],
//       currentTime: 0,
//       sliderValue: 0,
//       isPlaying: true,
//     });
//   },

//   setCurrentTime: (time) =>
//     set((state) => {
//       if (state.isSeeking) return state;

//       return {
//         currentTime: time,
//       };
//     }),

//   setSliderValue: (time) =>
//     set({
//       sliderValue: time,
//     }),

//   setDuration: (duration) =>
//     set({
//       duration,
//     }),

//   setBuffered: (buffered) =>
//     set({
//       buffered,
//     }),

//   startSeeking: () =>
//     set((state) => ({
//       isSeeking: true,
//       sliderValue: state.currentTime,
//     })),

//   stopSeeking: () =>
//     set({
//       isSeeking: false,
//     }),

//   seek: (time) =>
//     set({
//       currentTime: time,
//       sliderValue: time,
//     }),

//   setPlaybackRate: (rate) =>
//     set({
//       playbackRate: rate,
//     }),

//   toggleControls: () =>
//     set((state) => ({
//       controlsVisible: !state.controlsVisible,
//     })),

//   setMute: () => {
//     console.log("mutting");
//     const { playerRef, mute } = get();
//     console.log("before mute action", mute);
//     // has been muted true numute
//     if (mute) {
//       set((state) => ({
//         // turning to false
//         mute: !state.mute,
//       }));
//       // playerRef?.current?.setVolume(0);
//       console.log("after mute action", mute);
//     } else {
//       set((state) => ({
//         // turning to true
//         mute: !state.mute,
//       }));
//       // playerRef?.current?.setVolume(1);
//     }
//   },
//   toggleFullscreen: () =>
//     set((state) => ({
//       fullscreen: !state.fullscreen,
//     })),

//   toggleLock: () =>
//     set((state) => ({
//       locked: !state.locked,
//     })),

//   resetPlayer: () =>
//     set({
//       playlist: [],
//       currentVideo: null,
//       currentIndex: 0,
//       isPlaying: false,
//       duration: 0,
//       currentTime: 0,
//       sliderValue: 0,
//       buffered: 0,
//       playbackRate: 1,
//       isSeeking: false,
//       controlsVisible: true,
//       locked: false,
//       fullscreen: false,
//     }),
// }));
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
  positionMillis?: number;
  updatedAt?: number;

  // resume-from-position (continue watching)
  resumePositionMillis: number | null;
  setResumePosition: (ms: number | null) => void;
  playFromEntry: (video: PhotoIdentifier, positionMillis?: number) => void;

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
  positionMillis: 0,
  updatedAt: 0,

  resumePositionMillis: null,

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
      resumePositionMillis: null,
    }),

  setCurrentVideo: (video, index) =>
    set({
      currentVideo: video,
      currentIndex: index,
      currentTime: 0,
      sliderValue: 0,
      resumePositionMillis: null,
    }),

  setResumePosition: (ms) => set({ resumePositionMillis: ms }),

  playFromEntry: (video, positionMillis = 0) =>
    set({
      playlist: [video],
      currentIndex: 0,
      currentVideo: video,
      currentTime: positionMillis / 1000,
      sliderValue: positionMillis / 1000,
      resumePositionMillis: positionMillis > 0 ? positionMillis : null,
      isPlaying: true,
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
      resumePositionMillis: null,
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
      resumePositionMillis: null,
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
    const { mute } = get();
    if (mute) {
      set((state) => ({ mute: !state.mute }));
    } else {
      set((state) => ({ mute: !state.mute }));
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
      resumePositionMillis: null,
    }),
}));
