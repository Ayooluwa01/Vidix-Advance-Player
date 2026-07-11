import { PlaybackSettings } from "@/features/settings";
import { StyleSheet, View } from "react-native";

const Playback = () => {
  return (
    <View className="flex-1">
      <PlaybackSettings />
    </View>
  );
};

export default Playback;

const styles = StyleSheet.create({});
