import { ReusableText } from "@/components/reusables/Text";
import RecentVideoCard from "@/components/video-player/recent-video-card";
import { getColor } from "@/constants/colors";
import { VideoPlaybackEntry } from "@/store/mmkv/storage";
import { useRecentVideos } from "@/store/RecentVideos";
import { useThemeStore } from "@/store/useThemeStore";
import { useFocusEffect } from "expo-router";
import { useCallback, useMemo } from "react";
import { FlatList, Pressable, View } from "react-native";

const RecentlyPlayed = () => {
  const theme = useThemeStore((state) => state.theme);
  const recentlyPlayed = useRecentVideos((state) => state.recentlyPlayed);
  const loadRecentVideos = useRecentVideos((state) => state.loadRecentVideos);
  const primaryColor = useMemo(() => getColor(theme, "primary"), [theme]);

  useFocusEffect(
    useCallback(() => {
      loadRecentVideos();
    }, [loadRecentVideos]),
  );

  const keyExtractor = useCallback(
    (item: VideoPlaybackEntry) => item.video.node.id,
    [],
  );

  const renderItem = useCallback(
    ({ item }: { item: VideoPlaybackEntry }) => <RecentVideoCard item={item} />,
    [],
  );

  if (!recentlyPlayed?.length) {
    return null;
  }

  return (
    <View style={{ marginBottom: 22, marginTop: 8 }}>
      {/* Top Header */}
      <View className="flex flex-row items-center justify-between px-4 mb-2">
        <ReusableText
          variants="heading"
          style={{
            color: primaryColor,
            fontSize: 16,
          }}
          className="font-semibold"
        >
          Recently Played
        </ReusableText>

        <Pressable className="flex flex-row items-center" hitSlop={8}>
          <ReusableText
            variants="heading"
            style={{
              color: primaryColor,
              fontSize: 12,
            }}
            className="font-semibold mr-1"
          >
            View All
          </ReusableText>
        </Pressable>
      </View>

      {/* Horizontal recent videos rail */}
      <FlatList
        data={recentlyPlayed}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        removeClippedSubviews
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={3}
      />
    </View>
  );
};

export default RecentlyPlayed;
