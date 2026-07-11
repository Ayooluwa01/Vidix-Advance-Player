import { ReusableText } from "@/components/reusables/Text";
import { BORDER_RADIUS, FONT_SIZES, SPACING } from "@/constants/spacing";
import { useThemeStore } from "@/store/useThemeStore";
import { Ionicons } from "@expo/vector-icons";
import { memo } from "react";
import { Switch, TouchableOpacity, View } from "react-native";

/* =====================
   TOGGLE ITEM
===================== */
export const ToggleItem = memo(
  ({
    title,
    subtitle,
    value,
    onToggle,
    surfaceColor,
    textPrimary,
    textSecondary,
    accentColor,
  }: {
    title: string;
    subtitle: string;
    value: boolean;
    onToggle: () => void;
    surfaceColor: string;
    textPrimary: string;
    textSecondary: string;
    accentColor: string;
    false?: string;
  }) => (
    <View
      style={{
        backgroundColor: surfaceColor,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: 6,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1 }}>
        <ReusableText
          variants="body"
          style={{
            color: textPrimary,
            fontWeight: "600",
            marginBottom: SPACING.sm,
          }}
        >
          {title}
        </ReusableText>
        <ReusableText
          variants="body"
          style={{ color: textSecondary, fontSize: FONT_SIZES.sm }}
        >
          {subtitle}
        </ReusableText>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{
          false: surfaceColor,
          true: accentColor,
        }}
      />
    </View>
  ),
);

ToggleItem.displayName = "ToggleItem";

/* =====================
   NAVIGATION ITEM
===================== */
export const NavItem = memo(
  ({
    title,
    subtitle,
    value,
    onPress,
    surfaceColor,
    textPrimary,
    textSecondary,
    icon = "chevron-forward",
  }: {
    title: string;
    subtitle: string;
    value?: string;
    onPress?: () => void;
    surfaceColor: string;
    textPrimary: string;
    textSecondary: string;
    icon?: string;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: surfaceColor,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: 6,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1 }}>
        <ReusableText
          variants="body"
          style={{
            color: textPrimary,
            fontWeight: "600",
            marginBottom: SPACING.sm,
          }}
        >
          {title}
        </ReusableText>
        <ReusableText
          variants="body"
          style={{ color: textSecondary, fontSize: FONT_SIZES.sm }}
        >
          {subtitle}
        </ReusableText>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", gap: SPACING.md }}
      >
        {value && (
          <ReusableText
            variants="body"
            style={{ color: textSecondary, fontWeight: "600" }}
          >
            {value}
          </ReusableText>
        )}
        <Ionicons name={icon as any} size={20} color={textSecondary} />
      </View>
    </TouchableOpacity>
  ),
);

NavItem.displayName = "NavItem";

/* =====================
   SECTION HEADER
===================== */
export const SectionHeader = memo(
  ({ title, accentSoftColor }: { title: string; accentSoftColor: string }) => (
    <ReusableText
      variants="heading"
      style={{
        color: accentSoftColor,
        fontSize: FONT_SIZES.xl,
        fontWeight: "600",
        marginTop: SPACING.sectionMarginTop,
        marginBottom: SPACING.sectionMarginBottom,
        letterSpacing: 1,

        lineHeight: 21,
      }}
    >
      {title}
    </ReusableText>
  ),
);

SectionHeader.displayName = "SectionHeader";

export const CustomActionItem = memo(
  ({
    title,
    subtitle,
    icon,
    onPress,
    surfaceColor,
    textPrimary,
    textSecondary,
    accentColor,
  }: {
    title: string;
    subtitle: string;
    icon: string;
    onPress?: () => void;
    surfaceColor: string;
    textPrimary: string;
    textSecondary: string;
    accentColor: string;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: surfaceColor,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.itemMarginBottom,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1 }}>
        <ReusableText
          variants="body"
          style={{
            color: textPrimary,
            fontWeight: "600",
            marginBottom: SPACING.sm,
          }}
        >
          {title}
        </ReusableText>
        <ReusableText
          variants="body"
          style={{ color: textSecondary, fontSize: FONT_SIZES.sm }}
        >
          {subtitle}
        </ReusableText>
      </View>
      <Ionicons
        name={icon as any}
        size={24}
        color={accentColor}
        style={{ opacity: 0.6 }}
      />
    </TouchableOpacity>
  ),
);

CustomActionItem.displayName = "CustomActionItem";

export type SkipInterval = "5s" | "10s" | "30s" | "60s";

export const IntervalSelector = memo(
  ({
    title,
    icon,
    currentValue,
    onChange,
    surfaceColor,
    textPrimary,
    textSecondary,
    accentColor,
  }: {
    title: string;
    icon: string;
    currentValue: SkipInterval;
    onChange: (value: SkipInterval) => void;
    surfaceColor: string;
    textPrimary: string;
    textSecondary: string;
    accentColor: string;
  }) => {
    const intervals: SkipInterval[] = ["5s", "10s", "30s", "60s"];
    const { theme } = useThemeStore();
    return (
      <View
        style={{
          backgroundColor: surfaceColor,
          borderRadius: BORDER_RADIUS.lg,
          padding: SPACING.lg,
          marginBottom: SPACING.itemMarginBottom,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: SPACING.md,
            marginBottom: SPACING.lg,
          }}
        >
          <Ionicons name={icon as any} size={24} color={accentColor} />
          <ReusableText
            variants="body"
            style={{
              color: textPrimary,
              fontWeight: "600",
            }}
          >
            {title}
          </ReusableText>
        </View>

        {/* Interval Buttons */}
        <View
          style={{
            flexDirection: "row",
            gap: SPACING.sm,
          }}
        >
          {intervals.map((interval) => (
            <TouchableOpacity
              key={interval}
              onPress={() => onChange(interval)}
              style={{
                flex: 1,
                paddingVertical: SPACING.md,
                borderRadius: BORDER_RADIUS.md,
                backgroundColor:
                  currentValue === interval ? accentColor : textSecondary,
                justifyContent: "center",
                alignItems: "center",
                opacity: currentValue === interval ? 1 : 0.4,
              }}
            >
              <ReusableText
                variants="body"
                style={{
                  color: currentValue === interval ? "white" : "black",
                  fontWeight: "600",
                  fontSize: FONT_SIZES.sm,
                }}
              >
                {interval}
              </ReusableText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  },
);

IntervalSelector.displayName = "IntervalSelector";
