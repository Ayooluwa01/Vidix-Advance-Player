import Empty from "@/assets/svgs/onboard2.svg";
import ReusableButtons from "@/components/reusables/Buttons";
import { ReusableText } from "@/components/reusables/Text";
import { getColor } from "@/constants/colors";
import { useThemeStore } from "@/store/useThemeStore";
import { useVideoStore } from "@/store/video-scanner";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { ScrollView, StyleSheet, View } from "react-native";

const EmptyScreen = () => {
  const { theme } = useThemeStore();
  const textColor = getColor(theme, "primary");
  const accentColor = getColor(theme, "accent");
  const accentSoftColor = getColor(theme, "accentSoft");
  const bgColor = getColor(theme, "background");
  const { loadMoreVideos } = useVideoStore();
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled={false}
      style={{ backgroundColor: bgColor }}
    >
      <View style={styles.container}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <Empty height={280} width={280} />
        </View>

        {/* Content */}
        <View
          style={styles.contentContainer}
          className="items-center justify-center"
        >
          {/* Heading */}
          <ReusableText
            variants="heading"
            className="text-center font-bold"
            style={{
              color: textColor,
              marginBottom: 12,
            }}
          >
            Your Library is Quiet
          </ReusableText>

          {/* Description */}
          <ReusableText
            variants="body"
            className="text-center"
            style={{
              color: getColor(theme, "secondary"),
              marginBottom: 32,
              lineHeight: 22,
              textAlign: "center",
            }}
          >
            Discover your cinematic journey. Start by adding your local media
            files or scanning your device for existing videos.
          </ReusableText>

          {/* Buttons Container */}
          <View style={styles.buttonsContainer}>
            {/* Scan Device Button */}
            <ReusableButtons
              variants="big"
              style={{
                backgroundColor: accentSoftColor,
                gap: 8,
                marginBottom: 12,
              }}
              className="justify-center"
            >
              <Feather name="rotate-cw" size={24} color={accentColor} />

              <ReusableText
                variants="body"
                style={{
                  color: accentColor,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Scan Device for Videos
              </ReusableText>
            </ReusableButtons>

            {/* Browse Files Button */}
            <ReusableButtons
              variants="big"
              style={{
                backgroundColor: "transparent",
                gap: 8,
                borderWidth: 2,
                borderColor: accentSoftColor,
              }}
              className="justify-center"
            >
              <FontAwesome
                name="folder-open-o"
                size={20}
                color={getColor(theme, "accentSoft")}
              />
              <ReusableText
                variants="body"
                style={{
                  color: getColor(theme, "accentSoft"),
                  fontWeight: "600",
                }}
              >
                Browse Files Manually
              </ReusableText>
            </ReusableButtons>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EmptyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  illustrationContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  contentContainer: {
    width: "100%",
    maxWidth: 360,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    width: "100%",
    gap: 0,
  },
});
