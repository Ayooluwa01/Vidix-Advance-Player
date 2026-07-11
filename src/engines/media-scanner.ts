import { HasMediaPermission } from "@/utils/usePermissions";
import {
  CameraRoll,
  PhotoIdentifier,
} from "@react-native-camera-roll/camera-roll";
import { useCallback, useEffect, useRef, useState } from "react";

const PAGE_SIZE = 40;

export function useCameraRollVideos() {
  const [videos, setVideos] = useState<PhotoIdentifier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cursor = useRef<string | undefined>(undefined);
  const loading = useRef(false);

  const load = useCallback(async (isRefreshing = false) => {
    if (loading.current) return;

    loading.current = true;
    if (!isRefreshing) setIsLoading(true);
    setError(null);

    try {
      const granted = await HasMediaPermission();

      if (!granted) {
        setError("Media permission denied");
        setVideos([]);
        return;
      }

      const result = await CameraRoll.getPhotos({
        first: PAGE_SIZE,
        after: cursor.current,
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

      setVideos(
        isRefreshing ? result.edges : (prev) => [...prev, ...result.edges],
      );
      setHasNextPage(result.page_info.has_next_page);
      cursor.current = result.page_info.end_cursor ?? undefined;
    } catch (err) {
      setError("Failed to load videos");
    } finally {
      loading.current = false;
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    cursor.current = undefined;
    await load(true);
  }, [load]);

  const loadMore = useCallback(async () => {
    if (loading.current || !hasNextPage) return;
    setIsLoadingMore(true);
    await load(false);
  }, [hasNextPage, load]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    videos,
    isLoading,
    isLoadingMore,
    hasNextPage,
    error,
    refresh,
    loadMore,
  };
}
