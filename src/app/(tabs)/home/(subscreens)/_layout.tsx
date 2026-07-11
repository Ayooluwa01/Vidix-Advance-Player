import { Stack } from "expo-router";

export default function HomeSubScreen() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="view-all" />
    </Stack>
  );
}
