import { COLORS } from "@/constants/colors";
import { Text, TouchableOpacity } from "react-native";
import { useThemeStore } from "../../store/useThemeStore";
import { ReusableText } from "../reusables/Text";

const ThemeToogle = () => {
  const { theme, toggleTheme } = useThemeStore();
  const Toogle = async () => {
    // await setFirstLaunch(true);
    toggleTheme();
  };

  return (
    <TouchableOpacity
      onPress={Toogle}
      testID="theme-toggle"
      className="absolute right-0"
    >
      <ReusableText
        variants="body"
        style={{
          color:
            theme === "dark"
              ? COLORS.dark.accentLight
              : COLORS.light.accentLight,
        }}
      >
        {`the current theme is ${theme}`}
      </ReusableText>

      <Text>themeToogle</Text>
    </TouchableOpacity>
  );
};

export default ThemeToogle;
