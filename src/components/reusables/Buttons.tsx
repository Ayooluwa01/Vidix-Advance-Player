import { StyleSheet, TouchableOpacity } from "react-native";
import { twMerge } from "tailwind-merge";
import { buttonProps } from "./types";

const ButtonVariants = {
  big: "rounded-full px-6 py-3 flex-row items-center ",
  small: "text-base leading-relaxed",
} as const;

const ReusableButtons = ({
  children,
  variants,
  className,
  style,
}: buttonProps) => {
  return (
    <TouchableOpacity
      className={twMerge(ButtonVariants[variants], className)}
      style={style}
    >
      {children}
    </TouchableOpacity>
  );
};

export default ReusableButtons;

const styles = StyleSheet.create({});
