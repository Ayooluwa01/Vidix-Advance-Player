import VideoControl from "@/features/videoplayer/components/video-controls";
import { usePlayerStore } from "@/store/playerstore";
import { useSettingsStore } from "@/store/zustand/useSettings";
import * as ScreenOrientation from "expo-screen-orientation";
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

const VideoPlayer = () => {
  const videoRef = useRef<VideoRef>(null);
  const [isPipActive, setIsPipActive] = useState(false);
  const { playback } = useSettingsStore();

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
    next,
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
      play: s.play,
      next: s.next,
    })),
  );

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      );
    };
  }, []);

  const handleLoad = useCallback(
    (data: OnLoadData) => {
      setDuration(data.duration);
    },
    [setDuration],
  );

  const handleProgress = useCallback(
    (data: OnProgressData) => {
      setCurrentTime(data.currentTime);
      setBuffered(data.playableDuration);
    },
    [setCurrentTime, setBuffered],
  );

  const handleBuffer = useCallback((data: OnBufferData) => {
    if (__DEV__) console.log("Buffering:", data.isBuffering);
  }, []);

  const handleEnd = useCallback(() => {
    next();
  }, [next]);

  const onFoward = useCallback(() => {
    if (playback.skipForwardInterval === "10s") {
      const { currentTime, duration, setCurrentTime } =
        usePlayerStore.getState();
      const newTime = Math.min(currentTime + 10, duration);
      videoRef.current?.seek(newTime);
      setCurrentTime(newTime);
    }
  }, [playback.skipForwardInterval]);

  const onBackward = useCallback(() => {
    if (playback.skipBackwardInterval === "10s") {
      const { currentTime, setCurrentTime } = usePlayerStore.getState();
      const newTime = Math.max(currentTime - 10, 0);
      videoRef.current?.seek(newTime);
      setCurrentTime(newTime);
    }
  }, [playback.skipBackwardInterval]);

  const tapGesture = useMemo(
    () => Gesture.Tap().onEnd(() => runOnJS(toggleControls)()),
    [toggleControls],
  );

  if (!currentVideo) return null;

  const source = useMemo(
    () => ({ uri: currentVideo.node.image.uri }),
    [currentVideo.node.image.uri],
  );

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
            muted={false}
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
          <VideoControl foward={onFoward} backward={onBackward} />
        </View>
      </GestureDetector>
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
