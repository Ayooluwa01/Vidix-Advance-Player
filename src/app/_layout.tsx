import { getColor } from "@/constants/colors";
import { storage } from "@/store/mmkv/storage";
import { useThemeStore } from "@/store/useThemeStore";
import { HasMediaPermission } from "@/utils/usePermissions";
import { Stack } from "expo-router";
import { useEffect } from "react";
import {
  InteractionManager,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";

function AppNavigator() {
  const { width, height } = useWindowDimensions();
  const { theme } = useThemeStore();
  const bgColor = getColor(theme, "background");

  useEffect(() => {
    storage.set("device-height", height);
    storage.set("device-width", width);
  }, [width, height]);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(async () => {
      const hasPermission = await HasMediaPermission();

      if (!hasPermission) {
        console.log("Media permission denied");
      }
    });

    return () => task.cancel();
  }, []);

  return (
    <>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "default"}
        backgroundColor={bgColor}
        translucent
      />

      <SafeAreaView edges={["top", "bottom"]} className="flex-1">
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
        </Stack>
      </SafeAreaView>
    </>
  );
}

export default function RootLayout() {
  return <AppNavigator />;
}
