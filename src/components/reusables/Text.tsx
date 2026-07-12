import { Text } from "react-native";
import { twMerge } from "tailwind-merge";
import { textProps } from "./types";

const TextVariants = {
  heading: "font-bold text-[32px] tracking-tight leading-tight",
  body: "text-base leading-relaxed",
} as const;

export const ReusableText = ({
  children,
  variants,
  className,
  style,
  ...props
}: textProps) => {
  return (
    <Text
      className={twMerge(TextVariants[variants], className)}
      style={style}
      {...props}
    >
      {children}
    </Text>
  );
};
