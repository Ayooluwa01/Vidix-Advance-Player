import { Stack } from "expo-router";

export default function FavouritesSubScreen() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="folders" />
    </Stack>
  );
}
