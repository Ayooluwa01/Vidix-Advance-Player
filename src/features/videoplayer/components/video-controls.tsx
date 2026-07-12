import { usePlayerStore } from "@/store/playerstore";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { AnimatePresence, MotiView } from "moti";
import { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useShallow } from "zustand/react/shallow";
import SeekBar from "./seek-bar";

interface VideoControlProps {
  foward: () => void;
  backward: () => void;
}

function VideoControl({ foward, backward }: VideoControlProps) {
  const insets = useSafeAreaInsets();
  const { controlsVisible, isPlaying, play, pause, previous, next } =
    usePlayerStore(
      useShallow((s) => ({
        controlsVisible: s.controlsVisible,
        isPlaying: s.isPlaying,
        play: s.play,
        pause: s.pause,
        previous: s.previous,
        next: s.next,
      })),
    );

  return (
    <AnimatePresence>
      {controlsVisible && (
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "timing", duration: 220 }}
          style={styles.overlay}
        >
          {/* ---------- BOTTOM ---------- */}
          <MotiView
            from={{ opacity: 0, translateY: 35 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 35 }}
            style={[
              styles.bottomContainer,
              { paddingBottom: insets.bottom + 12 },
            ]}
          >
            <SeekBar />

            {/* Bottom Buttons */}
            <View style={styles.bottomButtons}>
              <MotiView
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={styles.centerControls}
              >
                <TouchableOpacity onPress={backward} hitSlop={10}>
                  <Ionicons name="play-skip-back" color="white" size={22} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.playButton}
                  onPress={isPlaying ? pause : play}
                  hitSlop={10}
                >
                  <FontAwesome
                    name={isPlaying ? "pause" : "play"}
                    size={22}
                    color="white"
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={foward} hitSlop={10}>
                  <Ionicons name="play-skip-forward" color="white" size={22} />
                </TouchableOpacity>
              </MotiView>
            </View>
          </MotiView>
        </MotiView>
      )}
    </AnimatePresence>
  );
}

export default memo(VideoControl);

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,.28)",
    justifyContent: "space-between",
  },

  centerControls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 28,
  },

  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  bottomContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },

  bottomButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
});
