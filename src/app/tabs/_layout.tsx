import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const TabNav = [
  {
    name: "home",
    title: "Home",
  },
  {
    name: "library",
    title: "Library",
  },
  {
    name: "favourites",
    title: "Favourites",
  },
  {
    name: "settings",
    title: "Settings",
  },
];

export default function TabsLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <Tabs screenOptions={{ headerShown: false }}>
        {TabNav.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
            }}
          />
        ))}
      </Tabs>
    </SafeAreaView>
  );
}
