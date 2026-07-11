import { View } from "react-native";
import Emptyscreen from "./screens/emptyscreen";

export default function HomeScreen() {
  return (
    <View className="flex-1 relative">
      <Emptyscreen />

      {/* <ThemeToogle /> */}
    </View>
  );
}
