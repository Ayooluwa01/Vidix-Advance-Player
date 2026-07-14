// app.config.js
const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) return "com.vidix.player.dev";
  if (IS_PREVIEW) return "com.vidix.player.preview";
  return "com.vidix.player";
};

const getAppName = () => {
  if (IS_DEV) return "VidiX (Dev)";
  if (IS_PREVIEW) return "VidiX (Preview)";
  return "vidix-player";
};

// separate deep-link scheme per variant so dev/preview/prod builds
// don't fight over the same URI scheme when installed side by side
const getScheme = () => {
  if (IS_DEV) return "vidixplayer-dev";
  if (IS_PREVIEW) return "vidixplayer-preview";
  return "vidixplayer";
};

export default {
  expo: {
    name: getAppName(),
    slug: "vidix-player",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    scheme: getScheme(),
    userInterfaceStyle: "automatic",
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSFaceIDUsageDescription:
          "We use Face ID to quickly secure and unlock your video library or application settings.",
        NSPhotoLibraryUsageDescription:
          "We need access to your photo library to read and play local video files.",
        NSPhotoLibraryAddUsageDescription:
          "We need permission to save or export processed video files to your photo library.",
        ITSAppUsesNonExemptEncryption: false,
      },
      icon: "./assets/icon.png",
      bundleIdentifier: getUniqueIdentifier(),
    },
    android: {
      permissions: [
        "android.permission.USE_BIOMETRIC",
        "android.permission.READ_MEDIA_VIDEO",
        "android.permission.WRITE_SETTINGS",
      ],
      package: getUniqueIdentifier(),
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#0F172A",
      },
      predictiveBackGestureEnabled: false,
    },
    web: {
      output: "static",
      favicon: "./assets/favicon.png",
    },
    plugins: [
      [
        "react-native-video",
        {
          enableBackgroundAudio: true,
          enablePictureInPicture: true,
        },
      ],
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/icon.png",
          imageWidth: 150,
          backgroundColor: "#0F172A",
        },
      ],
      [
        "expo-build-properties",
        {
          android: {
            packagingOptions: {
              pickFirst: ["**/libcrypto.so"],
            },
          },
          ios: {
            buildReactNativeFromSource: true,
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: "9542bae3-5537-4dcb-8128-0d6278991628",
      },
    },
    owner: "olusegunstephen01",
    runtimeVersion: {
      policy: "appVersion",
    },
    updates: {
      url: "https://u.expo.dev/9542bae3-5537-4dcb-8128-0d6278991628",
    },
  },
};
