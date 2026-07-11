import { ReusableText } from "@/components/reusables/Text";
import { getColor } from "@/constants/colors";
import { useThemeStore } from "@/store/useThemeStore";
import { Redirect } from "expo-router";
import { MotiView } from "moti";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";

export const SplashScreen = () => {
  const { theme } = useThemeStore();
  const bgColor = getColor(theme, "background");
  const accentColor = getColor(theme, "accent");
  const [animationsComplete, setAnimationsComplete] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    if (!animationsComplete) return;
    const timer = setTimeout(() => {
      setShouldNavigate(true);
    }, 800);
    return () => clearTimeout(timer);
  }, [animationsComplete]);

  if (shouldNavigate) {
    return <Redirect href={"/(tabs)/home"} />;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
        backgroundColor: bgColor,
      }}
    >
      {/* Icon - fade in and scale */}
      <MotiView
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "timing", duration: 600 }}
        style={{ flexShrink: 1, marginBottom: 18 }}
      >
        <Image
          source={require("@/assets/icon.png")}
          style={{
            width: 180,
            height: 180,
            resizeMode: "contain",
          }}
        />
      </MotiView>

      {/* Heading - fade in up */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 600, delay: 200 }}
      >
        <ReusableText
          variants="heading"
          style={{
            color: getColor(theme, "primary"),
          }}
          className="text-center mb-2 font-bold"
        >
          VidiX
        </ReusableText>
      </MotiView>

      {/* Body - fade in up with delay */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 600, delay: 400 }}
      >
        <ReusableText
          variants="body"
          style={{
            color: getColor(theme, "primary"),
          }}
          className="text-center px-8"
        >
          High-performance media playback {`\n`} for precision creators.
        </ReusableText>
      </MotiView>

      {/* Loading spinner - fade in with delay */}
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing", duration: 600, delay: 600 }}
        style={{ marginTop: 48 }}
        onDidAnimate={() => setAnimationsComplete(true)}
      >
        <ActivityIndicator size="large" color={accentColor} />
      </MotiView>
    </View>
  );
};

const styles = StyleSheet.create({});
