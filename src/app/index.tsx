import { getFirstLaunch } from "@/store/mmkv/storage";
import { Redirect } from "expo-router";

export default function Index() {
  const showOnboarding = getFirstLaunch() !== false;
  return <Redirect href={showOnboarding ? "/(onboarding)" : "/(splash)"} />;
}
