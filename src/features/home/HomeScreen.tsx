import { View } from "react-native";
import MyVidoes from "./components/my-videos";

export default function HomeScreen() {
  return (
    <View className="flex-1">
      <MyVidoes />
    </View>
  );
}
