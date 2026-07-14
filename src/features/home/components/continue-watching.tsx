import { ReusableText } from "@/components/reusables/Text";
import ContinueWatchingCard from "@/components/video-player/continue-watching-card";
import { getColor } from "@/constants/colors";
import { useContinueWatching } from "@/store/continueWatching";
import { useThemeStore } from "@/store/useThemeStore";
import { useEffect, useMemo } from "react";
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

  useEffect(() => {
    loadContinueWatching();
  }, [loadContinueWatching]);

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
        <ContinueWatchingCard entry={continueWatching} />
      </View>
    </View>
  );
};

export default ContinueWatching;
