import { ReusableText } from "@/components/reusables/Text";
import { getColor } from "@/constants/colors";
import { VideoPlaybackEntry } from "@/store/mmkv/storage";
import { usePlayerStore } from "@/store/playerstore";
import { useThemeStore } from "@/store/useThemeStore";
import { formatDuration } from "@/utils/formatter";
import { Image } from "expo-image";
import { memo, useCallback, useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

const CARD_WIDTH = 150;

interface RecentVideoCardProps {
  item: VideoPlaybackEntry;
  onPress?: (item: VideoPlaybackEntry) => void;
}

function RecentVideoCard({ item, onPress }: RecentVideoCardProps) {
  const theme = useThemeStore((state) => state.theme);
  const setPlaylist = usePlayerStore((state) => state.setPlaylist);

  const video = item.video.node.image;

  const primaryColor = useMemo(() => getColor(theme, "primary"), [theme]);

  const duration = useMemo(
    () => formatDuration(video.playableDuration),
    [video.playableDuration],
  );

  const handlePress = useCallback(() => {
    onPress?.(item);
    // router.push("/(videoplayer)");
  }, [item, onPress]);

  return (
    <Pressable style={styles.wrapper} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: video.filename }}
          contentFit="cover"
          style={styles.image}
          recyclingKey={video.filename}
        />

        <View style={styles.duration}>
          <ReusableText
            variants="body"
            style={{ color: "white", fontSize: 10 }}
          >
            {duration}
          </ReusableText>
        </View>
      </View>

      <ReusableText
        variants="body"
        numberOfLines={1}
        style={{
          color: primaryColor,
          fontWeight: "600",
          marginTop: 6,
          fontSize: 12,
        }}
      >
        {video.filename}
      </ReusableText>
    </Pressable>
  );
}

export default memo(RecentVideoCard);

const styles = StyleSheet.create({
  wrapper: {
    width: CARD_WIDTH,
    marginRight: 10,
    borderRadius: 16,
    overflow: "hidden",
  },

  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  duration: {
    position: "absolute",
    right: 6,
    bottom: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: "rgba(0,0,0,.65)",
  },
});
