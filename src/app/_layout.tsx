import { getColor } from "@/constants/colors";
import { storage } from "@/store/mmkv/storage";
import { useThemeStore } from "@/store/useThemeStore";
import { useVideoStore } from "@/store/video-scanner";
import { Stack } from "expo-router";
import { useEffect } from "react";
import {
  InteractionManager,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../../global.css";

function AppNavigator() {
  const { width, height } = useWindowDimensions();
  const { theme } = useThemeStore();
  const bgColor = getColor(theme, "background");
  const loadVideos = useVideoStore((state) => state.loadVideos);
  const loaded = useVideoStore((state) => state.loaded);
  useEffect(() => {
    storage.set("device-height", height);
    storage.set("device-width", width);
  }, [width, height]);

  // run silently in the background
  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(async () => {
      // if no video has been loaded
      if (!loaded) {
        loadVideos();
      }
    });
    return () => task.cancel();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "default"}
        backgroundColor={bgColor}
        translucent
      />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(splash)" />
        <Stack.Screen name="(videoplayer)" />
      </Stack>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return <AppNavigator />;
}
