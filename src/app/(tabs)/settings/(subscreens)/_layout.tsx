import { Stack } from "expo-router";

export default function SettingsSubScreen() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="playback-gesture" />
    </Stack>
  );
}
