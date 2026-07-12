export const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const formatSize = (bytes: number) => {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};

export function formatRelativeTime(timestamp?: number) {
  if (!timestamp) return "";
  const diffMs = Date.now() - timestamp * 1000;
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;

  return new Date(timestamp * 1000).toLocaleDateString();
}
