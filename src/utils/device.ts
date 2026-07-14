import { useSafeAreaInsets } from "react-native-safe-area-context";

export const DeviceInsets = () => {
  const insets = useSafeAreaInsets();
  return insets;
};
