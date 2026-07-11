export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,

  screenPadding: 8,
  sectionMarginTop: 24,
  sectionMarginBottom: 12,
  itemGap: 12,
  itemMarginBottom: 12,
} as const;

export const BORDER_RADIUS = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

export const FONT_SIZES = {
  xs: 11,
  sm: 12,
  base: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
  huge: 32,
} as const;

export const LINE_HEIGHTS = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
  loose: 1.8,
} as const;

export const COMPONENT_SIZES = {
  // Button heights
  buttonSmall: 36,
  buttonMedium: 44,
  buttonLarge: 52,

  // Icon sizes
  iconSmall: 16,
  iconMedium: 20,
  iconLarge: 24,
  iconXL: 32,

  // Avatar sizes
  avatarSmall: 32,
  avatarMedium: 40,
  avatarLarge: 56,

  // Header heights
  headerHeight: 56,
  tabBarHeight: 64,
} as const;

export const COMMON_STYLES = {
  // Screen padding
  screenPadding: {
    paddingHorizontal: SPACING.screenPadding,
  },

  // Section spacing
  sectionSpacing: {
    marginTop: SPACING.sectionMarginTop,
    marginBottom: SPACING.sectionMarginBottom,
  },

  // Flex center
  flexCenter: {
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },

  // Row container
  row: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
  },

  // Column container
  column: {
    flexDirection: "column" as const,
  },

  // Flex 1
  flex: {
    flex: 1,
  },
} as const;

/**
 * Quick helper for common container styles
 */
export const getContainerStyle = (options?: {
  gap?: number;
  padding?: number;
  marginBottom?: number;
  borderRadius?: number;
  backgroundColor?: string;
}) => {
  return {
    gap: options?.gap ?? SPACING.itemGap,
    padding: options?.padding ?? SPACING.lg,
    marginBottom: options?.marginBottom ?? SPACING.itemMarginBottom,
    borderRadius: options?.borderRadius ?? BORDER_RADIUS.lg,
    backgroundColor: options?.backgroundColor,
  };
};

export const getTextContainerStyle = (options?: {
  marginBottom?: number;
  gap?: number;
}) => {
  return {
    marginBottom: options?.marginBottom ?? SPACING.md,
    gap: options?.gap ?? SPACING.sm,
  };
};

export const ANIMATION_TIMING = {
  fast: 100,
  normal: 300,
  slow: 500,
  slower: 800,
} as const;

/**
 * Shadow styles
 */
export const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 12,
  },
} as const;
