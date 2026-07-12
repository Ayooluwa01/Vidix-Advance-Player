import { EmptyScreenComponent, Home } from "@/features/home";
import { useVideoStore } from "@/store/video-scanner";
import { ActivityIndicator, View } from "react-native";

export default function Home_Screen() {
  const { videos, isLoading } = useVideoStore();

  if (isLoading) {
    return <ActivityIndicator size="large" color="red" />;
  }

  return (
    <View className="flex-1 relative">
      {videos.length === 0 ? <EmptyScreenComponent /> : <Home />}
    </View>
  );
}
