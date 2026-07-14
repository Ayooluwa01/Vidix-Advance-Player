import VideoControl from "@/features/videoplayer/components/video-controls";
import { saveContinueWatching, saveRecentVideo } from "@/store/mmkv/storage";
import { usePlayerStore } from "@/store/playerstore";
import { useSettingsStore } from "@/store/zustand/useSettings";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import Video, {
  OnBufferData,
  OnLoadData,
  OnProgressData,
  VideoRef,
} from "react-native-video";
import { useShallow } from "zustand/react/shallow";

const bufferConfig = {
  minBufferMs: 5000,
  maxBufferMs: 30000,
  bufferForPlaybackMs: 1500,
  bufferForPlaybackAfterRebufferMs: 3000,
};

// interval string -> seconds
const INTERVAL_SECONDS: Record<string, number> = {
  "5s": 5,
  "10s": 10,
  "30s": 30,
  "60s": 60,
};

const SAVE_THROTTLE_MS = 5000;

const VideoPlayer = () => {
  const [isPipActive, setIsPipActive] = useState(false);
  const { playback } = useSettingsStore();
  const videoRef = useRef<VideoRef>(null);

  const positionMillisRef = useRef(0);
  const durationMillisRef = useRef(0);
  const lastSavedAtRef = useRef(0);
  const hasSavedRecentRef = useRef(false);

  const {
    currentVideo,
    isPlaying,
    playbackRate,
    setCurrentTime,
    setDuration,
    toggleControls,
    setBuffered,
    pause,
    play,
    mute,
    seek,
    next,
    setPlayerRef,
  } = usePlayerStore(
    useShallow((s) => ({
      currentVideo: s.currentVideo,
      isPlaying: s.isPlaying,
      playbackRate: s.playbackRate,
      setCurrentTime: s.setCurrentTime,
      setDuration: s.setDuration,
      toggleControls: s.toggleControls,
      setBuffered: s.setBuffered,
      pause: s.pause,
      mute: s.mute,
      play: s.play,
      next: s.next,
      seek: s.seek,
      setPlayerRef: s.setPlayerRef,
    })),
  );

  useEffect(() => {
    setPlayerRef(videoRef);
  }, [setPlayerRef]);

  const source = useMemo(
    () => (currentVideo ? { uri: currentVideo.node.image.uri } : undefined),
    [currentVideo],
  );

  useEffect(() => {
    if (!currentVideo) return;

    positionMillisRef.current = 0;
    durationMillisRef.current = 0;
    lastSavedAtRef.current = 0;
    hasSavedRecentRef.current = false;

    saveRecentVideo(currentVideo);
    hasSavedRecentRef.current = true;
  }, [currentVideo]);

  useEffect(() => {
    return () => {
      if (!currentVideo) return;
      saveContinueWatching(currentVideo, positionMillisRef.current);
    };
  }, [currentVideo]);

  // const handleLoad = useCallback(
  //   (data: OnLoadData) => {
  //     setDuration(data.duration);
  //     durationMillisRef.current = data.duration * 1000;
  //   },
  //   [setDuration],
  // );

  const handleLoad = useCallback(
    (data: OnLoadData) => {
      setDuration(data.duration);
      durationMillisRef.current = data.duration * 1000;

      const { resumePositionMillis, setResumePosition } =
        usePlayerStore.getState();

      if (resumePositionMillis && resumePositionMillis > 0) {
        const resumeSeconds = resumePositionMillis / 1000;
        videoRef.current?.seek(resumeSeconds);
        setCurrentTime(resumeSeconds);
        positionMillisRef.current = resumePositionMillis;

        setResumePosition(null);
      }
    },
    [setDuration, setCurrentTime],
  );
  const handleProgress = useCallback(
    (data: OnProgressData) => {
      const { isSeeking } = usePlayerStore.getState();

      if (!isSeeking) {
        setCurrentTime(data.currentTime);
      }

      setBuffered(data.playableDuration);

      positionMillisRef.current = data.currentTime * 1000;

      const now = Date.now();
      if (currentVideo && now - lastSavedAtRef.current >= SAVE_THROTTLE_MS) {
        lastSavedAtRef.current = now;
        saveContinueWatching(currentVideo, positionMillisRef.current);
      }
    },
    [setCurrentTime, setBuffered, currentVideo],
  );

  const handleBuffer = useCallback((data: OnBufferData) => {
    // if (__DEV__) console.log("Buffering:", data.isBuffering);
  }, []);

  const handleEnd = useCallback(() => {
    if (currentVideo) {
      saveContinueWatching(currentVideo, durationMillisRef.current);
    }
    next();
  }, [next, currentVideo]);

  const onFoward = useCallback(() => {
    const seconds = INTERVAL_SECONDS[playback.skipForwardInterval];
    if (!seconds) return;

    const { currentTime, duration, seekTo } = usePlayerStore.getState();
    const newTime = Math.min(currentTime + seconds, duration);
    seekTo(newTime);
  }, [playback.skipForwardInterval]);

  const onBackward = useCallback(() => {
    const seconds = INTERVAL_SECONDS[playback.skipBackwardInterval];
    if (!seconds) return;

    const { currentTime, seekTo } = usePlayerStore.getState();
    const newTime = Math.max(currentTime - seconds, 0);
    seekTo(newTime);
  }, [playback.skipBackwardInterval]);

  const tapGesture = useMemo(
    () => Gesture.Tap().onEnd(() => runOnJS(toggleControls)()),
    [toggleControls],
  );

  if (!currentVideo || !source) return null;

  return (
    <View style={{ flex: 1 }}>
      <GestureDetector gesture={tapGesture}>
        <View style={{ flex: 1 }}>
          <Video
            ref={videoRef}
            source={source}
            style={styles.video}
            controls={false}
            resizeMode="contain"
            paused={!isPlaying}
            muted={mute}
            repeat={false}
            rate={playbackRate}
            bufferConfig={bufferConfig}
            automaticallyWaitsToMinimizeStalling={false}
            allowsExternalPlayback
            enterPictureInPictureOnLeave
            playInBackground={false}
            playWhenInactive
            ignoreSilentSwitch="ignore"
            progressUpdateInterval={250}
            onLoad={handleLoad}
            onProgress={handleProgress}
            onBuffer={handleBuffer}
            onEnd={handleEnd}
            onPictureInPictureStatusChanged={(event) =>
              setIsPipActive(event.isActive)
            }
            onRestoreUserInterfaceForPictureInPictureStop={() =>
              setIsPipActive(false)
            }
          />
        </View>
      </GestureDetector>
      <VideoControl foward={onFoward} backward={onBackward} />
    </View>
  );
};

export default memo(VideoPlayer);

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: "100%",
  },
});
