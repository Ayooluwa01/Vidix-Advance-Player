import { Themeproviders } from "@/providers/theme-provider/theme-providers";
import { useThemeStore } from "@/store/useThemeStore";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Animated, Pressable, Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TabNav = [
  {
    name: "home",
    title: "Home",
    icon: Ionicons,
    iconName: "home",
  },
  {
    name: "library",
    title: "Library",
    icon: MaterialIcons,
    iconName: "video-library",
  },
  {
    name: "search",
    title: "search",
    icon: Ionicons,
    iconName: "heart-outline",
  },
  {
    name: "settings",
    title: "Settings",
    icon: Ionicons,
    iconName: "settings-outline",
  },
] as const;

interface TabBarButtonProps {
  icon: React.ComponentType<any>;
  iconName: string;
  label: string;
  isFocused?: boolean;
  onPress: () => void;
  onLongPress: () => void;
  color: string;
  inactiveColor: string;
}

function TabBarButton({
  icon,
  iconName,
  label,
  isFocused = false,
  onPress,
  onLongPress,
  color,
  inactiveColor,
}: TabBarButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const widthAnim = useRef(new Animated.Value(80)).current;

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1.2,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  useEffect(() => {
    Animated.spring(widthAnim, {
      toValue: isFocused ? 98 : 88,
      useNativeDriver: false,
      friction: 8,
      tension: 60,
    }).start();
  }, [isFocused, widthAnim]);

  const animatedIconStyle = useMemo(
    () => ({
      transform: [{ scale: scaleAnim }],
    }),
    [scaleAnim],
  );

  const animatedPillStyle = useMemo(
    () => ({
      width: widthAnim,
    }),
    [widthAnim],
  );

  const currentColor = isFocused ? color : inactiveColor;

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      accessibilityState={{ selected: isFocused }}
      className="flex-1 items-center justify-center"
    >
      <Animated.View
        style={[
          animatedPillStyle,
          {
            backgroundColor: isFocused ? "#4F46E5" : "transparent",
          },
        ]}
        className="items-center justify-center rounded-full py-2 px-4"
      >
        <Animated.View style={animatedIconStyle} className="items-center  ">
          {React.createElement(icon, {
            name: iconName,
            size: 19,
            color: currentColor,
          })}

          <Text
            style={{
              color: currentColor,
              marginTop: 4,
              fontWeight: isFocused ? "600" : "400",
            }}
          >
            {label}
          </Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

function CustomTabBar({
  state,
  descriptors,
  navigation,
  accentColor,
  inactiveColor,
  surfaceColor,
  borderColor,
}: {
  state: any;
  descriptors: any;
  navigation: any;
  accentColor: string;
  inactiveColor: string;
  surfaceColor: string;
  borderColor: string;
}) {
  return (
    <View
      style={{
        borderTopWidth: 1,
        height: 75,
        paddingBottom: 8,
        paddingTop: 3,
        paddingHorizontal: 16,
        backgroundColor: surfaceColor,
        borderTopColor: borderColor,
        flexDirection: "row",
      }}
    >
      {state.routes.map((route: any, index: number) => {
        const tabConfig = TabNav.find((tab) => tab.name === route.name);
        const descriptor = descriptors[route.key];
        const isFocused = state.index === index;

        if (!tabConfig) return null;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.key}
            icon={tabConfig.icon}
            iconName={tabConfig.iconName}
            label={descriptor.options.title ?? tabConfig.title}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
            color={accentColor}
            inactiveColor={inactiveColor}
          />
        );
      })}
    </View>
  );
}

export default function TabsLayout() {
  const systemTheme = useColorScheme();
  const { theme } = useThemeStore();

  const activeTheme = theme === "system" ? systemTheme : theme;

  const accentColor = "#818CF8";
  const inactiveColor = activeTheme === "dark" ? "#D1D5DB" : "#6B7280";

  const surfaceColor = activeTheme === "dark" ? "#0F172A" : "#FFFFFF";

  const borderColor = activeTheme === "dark" ? "#1E293B" : "#E5E7EB";
  const sceneBackgroundColor = activeTheme === "dark" ? "#0F172A" : "#FFFFFF";

  return (
    <Themeproviders>
      <SafeAreaView edges={["top", "bottom"]} className="flex-1">
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            paddingHorizontal: 1,
          }}
        >
          <Tabs
            screenOptions={{
              headerShown: false,
              sceneStyle: {
                backgroundColor: "transparent",
              },

              tabBarStyle: {
                position: "absolute",
                borderTopWidth: 0,

                elevation: 0,
              },
            }}
            tabBar={(props) => (
              <CustomTabBar
                {...props}
                accentColor={accentColor}
                inactiveColor={inactiveColor}
                surfaceColor={surfaceColor}
                borderColor={borderColor}
              />
            )}
          >
            {TabNav.map((tab) => (
              <View style={{ padding: 12 }}>
                <Tabs.Screen
                  key={tab.name}
                  name={tab.name}
                  options={{
                    title: tab.title,
                  }}
                />
              </View>
            ))}
          </Tabs>
        </View>
      </SafeAreaView>
    </Themeproviders>
  );
}
