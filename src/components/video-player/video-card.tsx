import { ReusableText } from "@/components/reusables/Text";
import { getColor } from "@/constants/colors";
import { usePlayerStore } from "@/store/playerstore";
import { useThemeStore } from "@/store/useThemeStore";
import { useVideoStore } from "@/store/video-scanner";
import { formatDuration, formatRelativeTime } from "@/utils/formatter";
import { Ionicons } from "@expo/vector-icons";
import { PhotoIdentifier } from "@react-native-camera-roll/camera-roll";
import { BlurView } from "@sbaiahmed1/react-native-blur";
import { Image } from "expo-image";
import { router } from "expo-router";
import { memo, useCallback, useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface VideoCardProps {
  item: PhotoIdentifier;
  index: number;
  onPress?: (item: PhotoIdentifier) => void;
  onMenuPress?: (item: PhotoIdentifier) => void;
}

function VideoCard({ item, index, onPress, onMenuPress }: VideoCardProps) {
  const theme = useThemeStore((state) => state.theme);
  const setPlaylist = usePlayerStore((state) => state.setPlaylist);

  const video = item.node.image;

  const primaryColor = useMemo(() => getColor(theme, "primary"), [theme]);

  const secondaryColor = useMemo(() => getColor(theme, "secondary"), [theme]);

  const blurType = useMemo(
    () => (theme === "dark" ? "dark" : "light"),
    [theme],
  );

  const duration = useMemo(
    () => formatDuration(video.playableDuration),
    [video.playableDuration],
  );

  const relativeTime = useMemo(
    () => formatRelativeTime(item.node.timestamp),
    [item.node.timestamp],
  );

  const handlePress = useCallback(() => {
    if (onPress) {
      onPress(item);
      return;
    }
    console.log(video);
    const videos = useVideoStore.getState().videos;

    setPlaylist(videos, index);

    router.push("/(videoplayer)");
  }, [item, index, onPress, setPlaylist]);
  const handleMenuPress = useCallback(() => {
    onMenuPress?.(item);
  }, [item, onMenuPress]);

  return (
    <Pressable style={styles.wrapper} onPress={handlePress}>
      <BlurView blurType={blurType} blurAmount={20} style={styles.blur}>
        {/* Thumbnail */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: video.uri }}
            contentFit="cover"
            style={styles.image}
            recyclingKey={video.uri}
          />

          <View style={styles.duration}>
            <ReusableText
              variants="body"
              style={{
                color: "white",
                fontSize: 11,
              }}
            >
              {duration}
            </ReusableText>
          </View>
        </View>

        {/* Title */}
        <ReusableText
          variants="body"
          numberOfLines={2}
          style={{
            color: primaryColor,
            fontWeight: "700",
            marginTop: 10,
            fontSize: 15,
          }}
        >
          {video.filename}
        </ReusableText>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.left}>
            <Ionicons name="time-outline" size={13} color={secondaryColor} />

            <ReusableText
              variants="body"
              style={{
                color: secondaryColor,
                fontSize: 12,
              }}
            >
              {relativeTime}
            </ReusableText>
          </View>

          <Pressable hitSlop={10} onPress={handleMenuPress}>
            <Ionicons
              name="ellipsis-vertical"
              size={18}
              color={secondaryColor}
            />
          </Pressable>
        </View>
      </BlurView>
    </Pressable>
  );
}

export default memo(VideoCard);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 8,
    borderRadius: 20,
    overflow: "hidden",
  },

  blur: {
    borderRadius: 20,
    backgroundColor: "transparent",
  },

  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 14,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  duration: {
    position: "absolute",
    right: 8,
    bottom: 8,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,.65)",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 2,
    marginVertical: 7,
    marginTop: 2,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
