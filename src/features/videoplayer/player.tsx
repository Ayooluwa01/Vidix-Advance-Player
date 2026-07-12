import VideoPlayer from "@/components/reusables/video-player";
import { StyleSheet, View } from "react-native";

const Player = () => {
  return (
    <View style={{ flex: 1 }}>
      <VideoPlayer />
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({});
