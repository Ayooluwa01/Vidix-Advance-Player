import { ReusableText } from "@/components/reusables/Text";
import { getColor } from "@/constants/colors";
import { VideoPlaybackEntry } from "@/store/mmkv/storage";
import { useThemeStore } from "@/store/useThemeStore";
import { formatDuration } from "@/utils/formatter";
import { Image } from "expo-image";
import { memo, useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface ContinueWatchingCardProps {
  entry: VideoPlaybackEntry;
  onPress?: (entry: VideoPlaybackEntry) => void;
}

function ContinueWatchingCard({ entry, onPress }: ContinueWatchingCardProps) {
  const theme = useThemeStore((state) => state.theme);
  const video = entry.video.node.image;
  const primaryColor = useMemo(() => getColor(theme, "primary"), [theme]);
  const secondaryColor = useMemo(() => getColor(theme, "secondary"), [theme]);

  const durationMillis = (video.playableDuration ?? 0) * 1000;

  const progress = useMemo(() => {
    if (!durationMillis) return 0;
    return Math.min(entry.positionMillis / durationMillis, 1);
  }, [entry.positionMillis, durationMillis]);

  const remaining = useMemo(
    () =>
      formatDuration(
        Math.max((durationMillis - entry.positionMillis) / 1000, 0),
      ),
    [durationMillis, entry.positionMillis],
  );

  return (
    <TouchableOpacity style={styles.wrapper} onPress={() => onPress?.(entry)}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: video.uri }}
          contentFit="cover"
          style={styles.image}
          recyclingKey={video.uri}
        />

        <View style={styles.progressTrack}>
          <View
            style={[styles.progressFill, { width: `${progress * 100}%` }]}
          />
        </View>
      </View>

      <ReusableText
        variants="body"
        numberOfLines={1}
        style={{
          color: primaryColor,
          fontWeight: "600",
          marginTop: 8,
          fontSize: 13,
        }}
      >
        {video.filename}
      </ReusableText>

      <ReusableText
        variants="body"
        style={{
          color: secondaryColor,
          fontSize: 11,
          marginTop: 2,
        }}
      >
        {remaining} left
      </ReusableText>
    </TouchableOpacity>
  );
}

export default memo(ContinueWatchingCard);

const CARD_WIDTH = 220;

const styles = StyleSheet.create({
  wrapper: {
    width: CARD_WIDTH,
    marginRight: 12,
  },

  imageContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 14,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  progressTrack: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.3)",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#E53935",
  },
});
