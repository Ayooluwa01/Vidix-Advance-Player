import { ReusableText } from "@/components/reusables/Text";
import ContinueWatchingCard from "@/components/video-player/continue-watching-card";
import { getColor } from "@/constants/colors";
import { useContinueWatching } from "@/store/continueWatching";
import { VideoPlaybackEntry } from "@/store/mmkv/storage";
import { usePlayerStore } from "@/store/playerstore";
import { useThemeStore } from "@/store/useThemeStore";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo } from "react";
import { View } from "react-native";

const ContinueWatching = () => {
  const theme = useThemeStore((state) => state.theme);
  const continueWatching = useContinueWatching(
    (state) => state.continueWatching,
  );
  const loadContinueWatching = useContinueWatching(
    (state) => state.loadContinueWatching,
  );
  const primaryColor = useMemo(() => getColor(theme, "primary"), [theme]);
  const playFromEntry = usePlayerStore((state) => state.playFromEntry);

  useFocusEffect(
    useCallback(() => {
      loadContinueWatching();
    }, [loadContinueWatching]),
  );

  const handlePress = useCallback(
    (entry: VideoPlaybackEntry) => {
      playFromEntry(entry.video, entry.positionMillis);
      router.push("/(videoplayer)");
    },
    [playFromEntry],
  );

  if (!continueWatching) {
    return null;
  }

  return (
    <View style={{ marginBottom: 22, marginTop: 8 }}>
      <View className="flex flex-row items-center px-4 mb-2">
        <ReusableText
          variants="heading"
          style={{
            color: primaryColor,
            fontSize: 16,
          }}
          className="font-semibold"
        >
          Continue Watching
        </ReusableText>
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        <ContinueWatchingCard entry={continueWatching} onPress={handlePress} />
      </View>
    </View>
  );
};

export default ContinueWatching;
