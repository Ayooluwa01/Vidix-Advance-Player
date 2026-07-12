import { ReusableText } from "@/components/reusables/Text";
import VideoCard from "@/components/video-player/video-card";
import { getColor } from "@/constants/colors";
import { useThemeStore } from "@/store/useThemeStore";
import { useVideoStore } from "@/store/video-scanner";
import { Ionicons } from "@expo/vector-icons";
import { PhotoIdentifier } from "@react-native-camera-roll/camera-roll";
import { memo, useCallback, useMemo, useState } from "react";
import { FlatList, Pressable, View } from "react-native";

const MyVideos = () => {
  const videos = useVideoStore((state) => state.videos);
  const loadMoreVideos = useVideoStore((state) => state.loadMoreVideos);

  const theme = useThemeStore((state) => state.theme);

  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  const primaryColor = useMemo(() => getColor(theme, "primary"), [theme]);

  const toggleSort = useCallback(() => {
    setSortMenuOpen((prev) => !prev);
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: PhotoIdentifier; index: number }) => (
      <VideoCard item={item} index={index} />
    ),
    [],
  );

  const keyExtractor = useCallback(
    (item: PhotoIdentifier) => item.node.image.uri,
    [],
  );

  const handleLoadMore = useCallback(() => {
    loadMoreVideos();
  }, [loadMoreVideos]);

  return (
    <View style={{ flex: 1 }}>
      <View className="flex flex-row items-center justify-between px-4 mb-2">
        <ReusableText
          variants="heading"
          style={{
            color: primaryColor,
            fontSize: 18,
          }}
          className="font-semibold"
        >
          My Videos
        </ReusableText>

        <Pressable
          onPress={toggleSort}
          className="flex flex-row items-center"
          hitSlop={8}
        >
          <ReusableText
            variants="heading"
            style={{
              color: primaryColor,
              fontSize: 18,
            }}
            className="font-semibold mr-1"
          >
            Newest
          </ReusableText>

          <Ionicons
            name={sortMenuOpen ? "chevron-up" : "chevron-down"}
            size={18}
            color={primaryColor}
          />
        </Pressable>
      </View>

      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        contentContainerStyle={{
          gap: 8,
          paddingBottom: 16,
        }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        removeClippedSubviews
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        updateCellsBatchingPeriod={50}
        windowSize={5}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default memo(MyVideos);
