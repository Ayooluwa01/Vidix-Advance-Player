import { getColor } from "@/constants/colors";
import { useThemeStore } from "@/store/useThemeStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { ReusableText } from "./Text";

export const Header = ({ name }: any) => {
  const { theme } = useThemeStore();
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      className="flex flex-row items-center "
      style={{ gap: 12, padding: 8 }}
    >
      <Ionicons
        name="arrow-back"
        size={28}
        color={getColor(theme, "primary")}
      ></Ionicons>
      <ReusableText
        variants="heading"
        className="text-[32px]"
        style={{ color: getColor(theme, "primary") }}
      >
        {name}
      </ReusableText>
    </TouchableOpacity>
  );
};
