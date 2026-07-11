import { Stack } from "expo-router";

export default function Favouriteslayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "transparent" },
      }}
      initialRouteName="index"
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(subscreens)" />
    </Stack>
  );
}
