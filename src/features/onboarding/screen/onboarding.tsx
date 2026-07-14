import { ReusableText } from "@/components/reusables/Text";
import { COLORS, getColor } from "@/constants/colors";
import { setFirstLaunch, storage } from "@/store/mmkv/storage";
import { useThemeStore } from "@/store/useThemeStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  type DimensionValue,
  Image,
  type ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Data: {
  imagepoisiton: DimensionValue;
  id: string;
  img: ImageSourcePropType;
  heading: string;
  body: string;
}[] = [
  {
    imagepoisiton: "15%",
    id: "1",
    img: require("../assets/onboard1.png"),
    heading: "Welcome to VidiX",
    body: "High-performance media playback for \nprecision creators",
  },
  {
    imagepoisiton: "15%",

    id: "2",
    img: require("../assets/onboard2.png"),
    heading: "Intuitive Gestures",
    body: "Swipe to seek, double tap to play/pause. \nTotal control at your fingertips.",
  },
  {
    imagepoisiton: "6%",

    id: "3",
    img: require("../assets/onboard3.png"),
    heading: "Your Media,\n Perfected",
    body: "Organize your entire library with \n advanced sorting and metadata scanning.",
  },
];

const OnboardCard = ({ theme, width }: { theme: string; width: number }) => {
  const [step, setStep] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const handleNext = useCallback(() => {
    const nextStep = Math.min(step + 1, Data.length - 1);
    scrollViewRef.current?.scrollTo({ x: nextStep * width, animated: true });
    setStep(nextStep);
  }, [step, width]);

  const handleBack = useCallback(() => {
    const previousStep = Math.max(step - 1, 0);
    scrollViewRef.current?.scrollTo({
      x: previousStep * width,
      animated: true,
    });
    setStep(previousStep);
  }, []);

  const handleGetStarted = async () => {
    setFirstLaunch(false);
    router.replace("/(tabs)/home");
  };

  const handleMomentumScrollEnd = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    setStep(Math.round(nativeEvent.contentOffset.x / width));
  };

  const accentColor =
    theme === "dark" ? COLORS.dark.accentSoft : COLORS.light.accent;
  const isFirstSlide = step === 0;
  const isLastSlide = step === Data.length - 1;

  return (
    <View className="flex-1" style={{ width: width, position: "relative" }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        className="flex-1"
      >
        {/* <ThemeToogle /> */}
        {Data.map((data) => (
          <View
            key={data.id}
            className="flex-1 justify-center items-center px-4"
            style={{ width, position: "relative" }}
          >
            {/* Image */}
            <Image
              source={data.img}
              style={{
                width: width,
                height: 450,
                resizeMode: "contain",
                position: "absolute",
                top: data.imagepoisiton,
                left: "1%",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,

                  height: 8,
                },
                shadowOpacity: 0.25,
                shadowRadius: 10,
              }}
            />

            <View style={{ bottom: "-35%" }}>
              {/* Heading */}
              <ReusableText
                variants="heading"
                style={{
                  color: getColor(theme as any, "accentLight"),
                  marginTop: 32,
                }}
                className="mb-2 text-center"
              >
                {data.heading}
              </ReusableText>

              {/* Body text */}
              <ReusableText
                variants="body"
                style={{
                  color: getColor(theme as any, "accentSoft"),
                }}
                className="mt-3 text-center px-2"
              >
                {data.body}
              </ReusableText>
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="flex-row justify-center gap-2 py-3">
        {Data.map((data, index) => (
          <View
            key={data.id}
            className="h-2 rounded-full"
            style={{
              width: index === step ? 30 : 8,
              backgroundColor:
                index === step ? accentColor : `${accentColor}55`,
            }}
          />
        ))}
      </View>

      {/* Button Row -  */}
      <View
        className="flex-row justify-between items-center w-full px-4 py-6"
        style={{ bottom: insets.bottom }}
      >
        {/* Back Button */}
        {!isFirstSlide && (
          <TouchableOpacity
            onPress={handleBack}
            className="flex-row items-center gap-2"
          >
            <Ionicons name="arrow-back" size={16} color={accentColor} />
            <ReusableText variants="body" style={{ color: accentColor }}>
              Back
            </ReusableText>
          </TouchableOpacity>
        )}
        {isFirstSlide && <View style={{ width: 50 }} />}

        {/* Next/Get Started Button */}
        {!isLastSlide ? (
          <TouchableOpacity
            onPress={handleNext}
            style={{ backgroundColor: COLORS.light.accentSoft }}
            className="rounded-full px-6 py-3 flex-row items-center gap-2"
          >
            <ReusableText
              variants="body"
              style={{
                color:
                  theme === "dark"
                    ? COLORS.dark.surfacePrimary
                    : COLORS.light.surfacePrimary,
              }}
            >
              Next
            </ReusableText>
            <Ionicons
              name="arrow-forward"
              size={16}
              color={
                theme === "dark"
                  ? COLORS.dark.surfacePrimary
                  : COLORS.light.surfacePrimary
              }
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleGetStarted}
            style={{ backgroundColor: COLORS.light.accentSoft }}
            className="rounded-full px-6 py-3"
          >
            <ReusableText
              variants="body"
              style={{
                color:
                  theme === "dark"
                    ? COLORS.dark.surfacePrimary
                    : COLORS.light.surfacePrimary,
              }}
            >
              Get Started
            </ReusableText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default function OnboardingScreen() {
  const { theme } = useThemeStore();
  const dimensions = useWindowDimensions();
  const width = storage.getNumber("device-width") ?? dimensions.width;

  return (
    <View className="flex-1">
      <OnboardCard theme={theme} width={width} />
    </View>
  );
}
