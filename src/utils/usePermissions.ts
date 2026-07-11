import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import * as MediaLibrary from "expo-media-library";

export const HasMediaPermission = async () => {
  // Check existing permission
  const { status } = await MediaLibrary.getPermissionsAsync();

  if (status === "granted") {
    return true;
  }

  // Request if not granted
  const { status: newStatus } = await MediaLibrary.requestPermissionsAsync();

  return newStatus === "granted";
};

async function savePicture({
  tag,
  type = "photo",
  album,
}: {
  tag: string;
  type?: "photo" | "video";
  album?: string;
}) {
  const hasPermission = await HasMediaPermission();

  if (!hasPermission) {
    console.log("Media permission denied");
    return;
  }

  try {
    const savedUri = await CameraRoll.save(tag, {
      type,
      album,
    });

    console.log("Saved successfully:", savedUri);

    return savedUri;
  } catch (error) {
    console.log("Save failed:", error);
  }
}
