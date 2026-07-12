// import { usePlayerStore } from "@/store/playerstore";
// import { MaterialIcons } from "@expo/vector-icons";
// import Slider from "@react-native-community/slider";
// import { memo, useCallback, useRef } from "react";
// import { StyleSheet, Text, View } from "react-native";
// import { useShallow } from "zustand/react/shallow";

// function formatTime(seconds: number) {
//   if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
//   const m = Math.floor(seconds / 60);
//   const s = Math.floor(seconds % 60);
//   return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
// }

// function SeekBar() {
//   const { currentTime, duration,play,pause,seek, } = usePlayerStore(
//     useShallow((s) => ({
//       currentTime: s.currentTime,
//       duration: s.duration,
//     })),
//   );

//   const slidingStarted = useRef(false);
//   const slidingCompleted = useRef(false);
//   const handleSlidingComplete = useCallback((value: number) => {
//     const getValue = usePlayerStore.getState().seek(value);
//     console.log("getValue", getValue);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Slider
//         style={styles.slider}
//         minimumValue={0}
//         maximumValue={duration || 1}
//         value={currentTime}
//         minimumTrackTintColor="#FFFFFF"
//         maximumTrackTintColor="rgba(255,255,255,0.35)"
//         thumbTintColor="#FFF"
//         onSlidingComplete={handleSlidingComplete}
//         onSlidingStart={(value) => console.log(value)}
//         onValueChange={(value) => console.log("sliding", value)}
//       />

//       <View style={styles.timeRow}>
//         <View style={styles.timeGroup}>
//           <MaterialIcons
//             name="access-time"
//             size={14}
//             color="rgba(255,255,255,0.8)"
//           />
//           <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
//         </View>
//         <Text style={styles.timeText}>{formatTime(duration)}</Text>
//       </View>
//     </View>
//   );
// }

// export default memo(SeekBar);

// const styles = StyleSheet.create({
//   container: {
//     gap: 4,
//   },
//   slider: {
//     width: "100%",
//     height: 24,
//   },
//   timeRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: -4,
//   },
//   timeGroup: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//   },
//   timeText: {
//     color: "rgba(255,255,255,0.85)",
//     fontSize: 12,
//     fontVariant: ["tabular-nums"],
//   },
// });
import { usePlayerStore } from "@/store/playerstore";
import { MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { memo, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useShallow } from "zustand/react/shallow";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";

  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);

  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function SeekBar() {
  const {
    currentTime,
    sliderValue,
    duration,
    isSeeking,
    startSeeking,
    stopSeeking,
    setSliderValue,
    seek,
    seekTo,
  } = usePlayerStore(
    useShallow((state) => ({
      currentTime: state.currentTime,
      sliderValue: state.sliderValue,
      duration: state.duration,
      isSeeking: state.isSeeking,
      startSeeking: state.startSeeking,
      stopSeeking: state.stopSeeking,
      setSliderValue: state.setSliderValue,
      seek: state.seek,
      seekTo: state.seekTo,
    })),
  );

  const handleSlidingStart = useCallback(() => {
    startSeeking();
  }, [startSeeking]);

  const handleValueChange = useCallback(
    (value: number) => {
      setSliderValue(value);
    },
    [setSliderValue],
  );

  const handleSlidingComplete = useCallback(
    (value: number) => {
      seekTo(value);
      stopSeeking();
    },
    [seek, stopSeeking],
  );

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration || 1}
        value={isSeeking ? sliderValue : currentTime}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="rgba(255,255,255,0.35)"
        thumbTintColor="#FFF"
        onSlidingStart={handleSlidingStart}
        onValueChange={handleValueChange}
        onSlidingComplete={handleSlidingComplete}
      />

      <View style={styles.timeRow}>
        <View style={styles.timeGroup}>
          <MaterialIcons
            name="access-time"
            size={14}
            color="rgba(255,255,255,0.8)"
          />
          <Text style={styles.timeText}>
            {formatTime(isSeeking ? sliderValue : currentTime)}
          </Text>
        </View>

        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}

export default memo(SeekBar);

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  slider: {
    width: "100%",
    height: 24,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -4,
  },
  timeGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timeText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 12,
    fontVariant: ["tabular-nums"],
  },
});
