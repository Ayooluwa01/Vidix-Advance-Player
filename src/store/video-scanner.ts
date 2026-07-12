import { HasMediaPermission } from "@/utils/usePermissions";
import {
  CameraRoll,
  PhotoIdentifier,
} from "@react-native-camera-roll/camera-roll";
import { create } from "zustand";

const PAGE_SIZE = 55;

interface VideoStore {
  videos: PhotoIdentifier[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasNextPage: boolean;
  error: string | null;
  cursor?: string;
  loaded: boolean;
  loadVideos: () => Promise<void>;
  loadMoreVideos: () => Promise<void>;
  refreshVideos: () => Promise<void>;
  resetStore: () => void;
}

export const useVideoStore = create<VideoStore>((set, get) => ({
  videos: [],
  isLoading: false,
  isLoadingMore: false,
  loaded: false,
  hasNextPage: true,
  error: null,
  cursor: undefined,

  // Load first page
  loadVideos: async () => {
    if (get().isLoading) return;

    set({
      isLoading: true,
      error: null,
    });

    // permission
    try {
      const granted = await HasMediaPermission();
      if (!granted) {
        set({
          videos: [],
          error: "Media permission denied",
          isLoading: false,
        });
        return;
      }

      //   load videos
      const result = await CameraRoll.getPhotos({
        first: PAGE_SIZE,
        assetType: "Videos",
        include: [
          "filename",
          "fileSize",
          "imageSize",
          "playableDuration",
          "albums",
          "fileExtension",
          "location",
          "sourceType",
        ],
      });

      set({
        videos: result.edges,
        hasNextPage: result.page_info.has_next_page,
        cursor: result.page_info.end_cursor ?? undefined,
        isLoading: false,
        loaded: true,
      });
    } catch (error) {
      console.log("Failed to load videos:", error);

      set({
        error: "Failed to load videos",
        isLoading: false,
      });
    }
  },

  // Load next page
  loadMoreVideos: async () => {
    const { isLoading, isLoadingMore, hasNextPage, cursor, videos } = get();
    if (isLoading || isLoadingMore || !hasNextPage) return;
    set({
      isLoadingMore: true,
    });
    console.log("loading more videos");
    try {
      const result = await CameraRoll.getPhotos({
        first: PAGE_SIZE,
        after: cursor,
        assetType: "Videos",
        include: [
          "filename",
          "fileSize",
          "imageSize",
          "playableDuration",
          "albums",
          "fileExtension",
          "location",
          "sourceType",
        ],
      });

      set({
        videos: [...videos, ...result.edges],
        hasNextPage: result.page_info.has_next_page,
        cursor: result.page_info.end_cursor ?? undefined,
        isLoadingMore: false,
      });
    } catch (error) {
      console.log("Failed to load more videos:", error);
      set({
        isLoadingMore: false,
      });
    }
  },

  // Pull to refresh
  refreshVideos: async () => {
    set({
      cursor: undefined,
      hasNextPage: true,
    });

    await get().loadVideos();
  },

  // Clear store
  resetStore: () =>
    set({
      videos: [],
      cursor: undefined,
      hasNextPage: true,
      error: null,
      isLoading: false,
      isLoadingMore: false,
    }),
}));
