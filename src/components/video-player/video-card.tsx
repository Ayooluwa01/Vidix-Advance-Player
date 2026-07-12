import { ReusableText } from "@/components/reusables/Text";
import { getColor } from "@/constants/colors";
import { usePlayerStore } from "@/store/playerstore";
import { useThemeStore } from "@/store/useThemeStore";
import { useVideoStore } from "@/store/video-scanner";
import { formatDuration, formatRelativeTime } from "@/utils/formatter";
import { Ionicons } from "@expo/vector-icons";
import { PhotoIdentifier } from "@react-native-camera-roll/camera-roll";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

interface VideoCardProps {
  item: PhotoIdentifier;
  onPress?: (item: PhotoIdentifier) => void;
  onMenuPress?: (item: PhotoIdentifier) => void;
}

export default function VideoCard({
  item,
  onPress,
  onMenuPress,
}: VideoCardProps) {
  const { theme } = useThemeStore();
  const { videos } = useVideoStore();

  const setPlaylist = usePlayerStore((state) => state.setPlaylist);
  const video = item.node.image;
  const sizeInMB = (video.fileSize ?? 0) / 1024 / 1024;

  return (
    <Pressable
      onPress={() => {
        if (onPress) {
          onPress(item);
          return;
        }

        const index = videos.findIndex(
          (video) => video.node.image.uri === item.node.image.uri,
        );

        setPlaylist(videos, index);

        router.push("/(videoplayer)");
      }}
      className="flex-1 rounded-2xl overflow-hidden"
      style={{
        backgroundColor: "#171F33",
        borderWidth: 0.2,
        borderColor: "#2A3450",
        margin: 6,
        padding: 10,
      }}
    >
      {/* Thumbnail */}
      <View style={{ position: "relative", width: "100%", aspectRatio: 1 }}>
        <Image
          source={{ uri: video.uri }}
          contentFit="cover"
          className="rounded-xl"
          style={{ height: "100%", width: "100%" }}
        />

        {/* Duration badge - bottom right of thumbnail */}
        <View
          className="absolute rounded-md items-center justify-center"
          style={{
            bottom: 6,
            right: 6,
            backgroundColor: "rgba(0,0,0,0.75)",
            paddingHorizontal: 6,
            paddingVertical: 3,
          }}
        >
          <ReusableText
            variants="body"
            style={{ color: getColor(theme, "secondary"), fontSize: 11 }}
          >
            {formatDuration(video.playableDuration)}
          </ReusableText>
        </View>

        {/* Size badge - top right of thumbnail */}
        {/* <View
          className="absolute rounded-md items-center justify-center"
          style={{
            top: 6,
            right: 6,
            backgroundColor: "rgba(0,0,0,0.75)",
            paddingHorizontal: 6,
            paddingVertical: 3,
          }}
        >
          <ReusableText
            variants="body"
            style={{ color: getColor(theme, "primary"), fontSize: 11 }}
          >
            {sizeInMB.toFixed(1)} MB
          </ReusableText>
        </View> */}
      </View>

      {/* Title */}
      <ReusableText
        variants="body"
        numberOfLines={2}
        className="font-bold mt-3"
        style={{
          color: getColor(theme, "primary"),
          fontSize: 15,
          lineHeight: 20,
        }}
      >
        {video.filename}
      </ReusableText>

      {/* Bottom row */}
      <View className="flex-row items-center justify-between mt-2">
        <View className="flex-row items-center" style={{ gap: 4 }}>
          <Ionicons
            name="time-outline"
            size={13}
            color={getColor(theme, "secondary")}
          />
          <ReusableText
            variants="body"
            className="text-xs"
            style={{ color: getColor(theme, "secondary") }}
          >
            {formatRelativeTime(item.node.timestamp)}
          </ReusableText>
        </View>

        <Pressable
          onPress={() => onMenuPress?.(item)}
          hitSlop={8}
          style={{ padding: 2 }}
        >
          <Ionicons
            name="ellipsis-vertical"
            size={16}
            color={getColor(theme, "secondary")}
          />
        </Pressable>
      </View>
    </Pressable>
  );
}
