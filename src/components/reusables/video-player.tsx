import * as ScreenOrientation from "expo-screen-orientation";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import Video, { VideoRef } from "react-native-video";

interface VideoPlayerProps {
  videoSource: any;
}

const bufferConfig = {
  minBufferMs: 5000,
  maxBufferMs: 30000,
  bufferForPlaybackMs: 1500,
  bufferForPlaybackAfterRebufferMs: 3000,
};

const VideoPlayer = ({ videoSource }: VideoPlayerProps) => {
  const videoRef = useRef<VideoRef>(null);
  const [isPipActive, setIsPipActive] = useState(false);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    return () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      );
    };
  }, []);

  return (
    <Video
      ref={videoRef}
      source={videoSource}
      style={styles.video}
      resizeMode="contain"
      paused={false}
      muted={false}
      repeat={false}
      bufferConfig={bufferConfig}
      automaticallyWaitsToMinimizeStalling={false}
      allowsExternalPlayback
      enterPictureInPictureOnLeave
      playInBackground={false}
      playWhenInactive={true}
      ignoreSilentSwitch="ignore"
      onPictureInPictureStatusChanged={(event) => {
        setIsPipActive(event.isActive);
      }}
      onRestoreUserInterfaceForPictureInPictureStop={() => {
        setIsPipActive(false);
      }}
    />
  );
};

export default React.memo(VideoPlayer);

const styles = StyleSheet.create({
  video: {
    ...StyleSheet.absoluteFill,
  },
});

// Manual, via imperative ref methods — videoRef.current?.enterPictureInPicture() / videoRef.current?.exitPictureInPicture()
