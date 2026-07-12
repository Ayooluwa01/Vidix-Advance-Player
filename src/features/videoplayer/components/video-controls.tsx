import { ReusableText } from "@/components/reusables/Text";
import { COLORS } from "@/constants/colors";
import { usePlayerStore } from "@/store/playerstore";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { AnimatePresence, MotiView } from "moti";
import { memo, useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useShallow } from "zustand/react/shallow";
import SeekBar from "./seek-bar";

interface VideoControlProps {
  foward: () => void;
  backward: () => void;
  onBack?: () => void;
}

function VideoControl({ foward, backward }: VideoControlProps) {
  const insets = useSafeAreaInsets();
  const {
    controlsVisible,
    isPlaying,
    play,
    pause,
    previous,
    next,
    muted,
    setMute,
    currentVideo,
  } = usePlayerStore(
    useShallow((s) => ({
      controlsVisible: s.controlsVisible,
      isPlaying: s.isPlaying,
      play: s.play,
      pause: s.pause,
      previous: s.previous,
      next: s.next,
      currentVideo: s.currentVideo,
      muted: s.mute,
      setMute: s.setMute,
    })),
  );

  const [optionsVisible, setOptionsVisible] = useState(false);

  // TODO: move looping/pip into playerStore if they need to persist
  const [looping, setLooping] = useState(false);
  const [pipActive, setPipActive] = useState(false);

  const onBack = useCallback(() => {
    router.replace("/home");
  }, []);

  return (
    <AnimatePresence>
      {controlsVisible && (
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "timing", duration: 220 }}
          style={StyleSheet.absoluteFill}
          pointerEvents="box-none"
        >
          {/* ---------- TOP ---------- */}
          <MotiView
            from={{ opacity: 0, translateY: -12 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -12 }}
            style={[styles.topBar, { paddingTop: insets.top + 8 }]}
            pointerEvents="box-none"
          >
            <View style={styles.topRow}>
              <TouchableOpacity
                onPress={onBack}
                hitSlop={12}
                style={styles.backButton}
              >
                <Ionicons name="arrow-back" size={22} color="white" />
              </TouchableOpacity>

              <ReusableText
                variants="body"
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.title}
              >
                {currentVideo?.node.image.filename}
              </ReusableText>
            </View>
          </MotiView>

          {/* ---------- BOTTOM ---------- */}
          <MotiView
            from={{ opacity: 0, translateY: 24 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 24 }}
            style={[styles.bottomBar, { paddingBottom: insets.bottom + 10 }]}
          >
            <SeekBar />

            {/* mute / loop / pip - hidden until + is tapped */}
            <AnimatePresence>
              {optionsVisible && (
                <MotiView
                  from={{ opacity: 0, translateY: 8, scale: 0.95 }}
                  animate={{ opacity: 1, translateY: 0, scale: 1 }}
                  exit={{ opacity: 0, translateY: 8, scale: 0.95 }}
                  transition={{ type: "timing", duration: 200 }}
                  style={styles.secondaryRow}
                >
                  <TouchableOpacity
                    onPress={setMute}
                    hitSlop={8}
                    style={styles.secondaryItem}
                  >
                    <Ionicons
                      name={
                        muted ? "volume-mute-outline" : "volume-high-outline"
                      }
                      size={22}
                      color="white"
                    />
                    <ReusableText variants="body" style={{ color: "white" }}>
                      {muted ? "Unmute" : "mute"}
                    </ReusableText>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setLooping(!looping)}
                    hitSlop={8}
                    style={styles.secondaryItem}
                  >
                    <Ionicons
                      name="repeat-outline"
                      size={22}
                      color={looping ? COLORS.dark.primary : "white"}
                    />
                    <ReusableText variants="body" style={{ color: "white" }}>
                      Loop
                    </ReusableText>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setPipActive(!pipActive)}
                    hitSlop={8}
                    style={styles.secondaryItem}
                  >
                    <MaterialIcons
                      name="picture-in-picture-alt"
                      size={22}
                      color={pipActive ? COLORS.dark.primary : "white"}
                    />
                    <ReusableText variants="body" style={{ color: "white" }}>
                      Pip
                    </ReusableText>
                  </TouchableOpacity>
                </MotiView>
              )}
            </AnimatePresence>

            {/* toggle button */}
            <View style={styles.toggleRow}>
              <TouchableOpacity
                onPress={() => setOptionsVisible(!optionsVisible)}
                hitSlop={10}
              >
                <MotiView
                  animate={{ rotate: optionsVisible ? "45deg" : "0deg" }}
                  transition={{ type: "timing", duration: 180 }}
                >
                  <FontAwesome
                    name={optionsVisible ? "times-circle" : "plus-circle"}
                    size={26}
                    color="white"
                  />
                </MotiView>
              </TouchableOpacity>
            </View>

            {/* video controller */}
            <View style={styles.centerControls}>
              <TouchableOpacity onPress={previous} hitSlop={12}>
                <Ionicons name="play-skip-back" color="white" size={22} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.playButton}
                onPress={isPlaying ? pause : play}
                hitSlop={10}
                activeOpacity={0.8}
              >
                <FontAwesome
                  name={isPlaying ? "pause" : "play"}
                  size={22}
                  color="white"
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={foward} hitSlop={12}>
                <Ionicons name="play-skip-forward" color="white" size={22} />
              </TouchableOpacity>
            </View>
          </MotiView>
        </MotiView>
      )}
    </AnimatePresence>
  );
}

export default memo(VideoControl);

const styles = StyleSheet.create({
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingBottom: 16,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: "white",
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 16,
    paddingHorizontal: 14,
    gap: 8,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  secondaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 999,
    paddingVertical: 8,
  },

  secondaryItem: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },

  toggleRow: {
    alignItems: "center",
  },

  centerControls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 28,
    marginBottom: 4,
  },

  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.16)",
    justifyContent: "center",
    alignItems: "center",
  },
});
