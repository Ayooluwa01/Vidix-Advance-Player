import { ReusableText } from "@/components/reusables/Text";
import VideoCard from "@/components/video-player/video-card";
import { getColor } from "@/constants/colors";
import { useThemeStore } from "@/store/useThemeStore";
import { useVideoStore } from "@/store/video-scanner";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Pressable, View } from "react-native";

const MyVidoes = () => {
  const { videos, loadMoreVideos } = useVideoStore();
  const { theme } = useThemeStore();
  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  return (
    <View>
      <View className="flex flex-row items-center justify-between px-4 mb-2">
        <ReusableText
          variants="heading"
          style={{
            color: getColor(theme, "primary"),
            fontSize: 18,
          }}
          className="font-semibold"
        >
          My Videos
        </ReusableText>

        {/* newest + dropdown icon */}
        <Pressable
          onPress={() => setSortMenuOpen((prev) => !prev)}
          className="flex flex-row items-center"
          hitSlop={8}
        >
          <ReusableText
            variants="heading"
            style={{
              color: getColor(theme, "primary"),
              fontSize: 18,
            }}
            className="font-semibold mr-1"
          >
            Newest
          </ReusableText>
          <Ionicons
            name={sortMenuOpen ? "chevron-up" : "chevron-down"}
            size={18}
            color={getColor(theme, "primary")}
          />
        </Pressable>
      </View>

      <FlatList
        data={videos}
        keyExtractor={(item) => item.node.image.uri}
        renderItem={({ item }) => <VideoCard item={item} />}
        numColumns={2}
        columnWrapperStyle={{}}
        contentContainerStyle={{ gap: 8, paddingBottom: 16 }}
        onEndReached={loadMoreVideos}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default MyVidoes;
