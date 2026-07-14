import { ReusableText } from "@/components/reusables/Text";
import VideoCard from "@/components/video-player/video-card";
import { getColor } from "@/constants/colors";
import { useThemeStore } from "@/store/useThemeStore";
import { useVideoStore } from "@/store/video-scanner";
import { Ionicons } from "@expo/vector-icons";
import { PhotoIdentifier } from "@react-native-camera-roll/camera-roll";
import { AnimatePresence, MotiView } from "moti";
import { memo, useCallback, useMemo, useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import ContinueWatching from "./continue-watching";
import RecentlyPlayed from "./recently-played";

const STAGGER_LIMIT = 12;

const MyVideos = () => {
  const videos = useVideoStore((state) => state.videos);
  const loadMoreVideos = useVideoStore((state) => state.loadMoreVideos);
  const theme = useThemeStore((state) => state.theme);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const primaryColor = useMemo(() => getColor(theme, "primary"), [theme]);

  const toggleSort = useCallback(() => {
    setSortMenuOpen((prev) => !prev);
  }, []);

  const ListHeader = useCallback(
    () => (
      <View>
        <MotiView
          from={{ opacity: 0, translateY: -12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 350 }}
        >
          <ContinueWatching />
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: -12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 350, delay: 80 }}
        >
          <RecentlyPlayed />
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: -8 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 300, delay: 140 }}
          className="flex flex-row items-center justify-between px-4 mb-2"
        >
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
                fontSize: 12,
              }}
              className="font-semibold mr-1"
            >
              Newest
            </ReusableText>

            <MotiView
              animate={{ rotate: sortMenuOpen ? "180deg" : "0deg" }}
              transition={{ type: "timing", duration: 200 }}
            >
              <Ionicons name="chevron-down" size={18} color={primaryColor} />
            </MotiView>
          </Pressable>
        </MotiView>

        <AnimatePresence>
          {sortMenuOpen && (
            <MotiView
              from={{ opacity: 0, scale: 0.95, translateY: -6 }}
              animate={{ opacity: 1, scale: 1, translateY: 0 }}
              exit={{ opacity: 0, scale: 0.95, translateY: -6 }}
              transition={{ type: "timing", duration: 200 }}
              className="mx-4 mb-3 rounded-2xl overflow-hidden"
              style={{ backgroundColor: `${primaryColor}12` }}
            >
              {["Newest", "Oldest", "Longest", "Shortest"].map((label, i) => (
                <Pressable
                  key={label}
                  className="px-4 py-3"
                  onPress={() => setSortMenuOpen(false)}
                >
                  <ReusableText
                    variants="body"
                    style={{ color: primaryColor, fontSize: 14 }}
                  >
                    {label}
                  </ReusableText>
                </Pressable>
              ))}
            </MotiView>
          )}
        </AnimatePresence>
      </View>
    ),
    [primaryColor, sortMenuOpen, toggleSort],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: PhotoIdentifier; index: number }) => (
      <MotiView
        from={{
          opacity: 0,
          translateY: 16,
        }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: "timing",
          duration: 300,
          delay: index < STAGGER_LIMIT ? index * 40 : 0,
        }}
        style={{ flex: 1 }}
      >
        <VideoCard item={item} index={index} />
      </MotiView>
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
      <FlatList
        ListHeaderComponent={ListHeader}
        data={videos}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        contentContainerStyle={{
          gap: 6,
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
