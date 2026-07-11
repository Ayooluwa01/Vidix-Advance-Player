import React from "react";
import { StyleProp, TextStyle } from "react-native";

export interface textProps {
  variants: "heading" | "body";
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<TextStyle>;
}

export interface buttonProps {
  variants: "big" | "small";
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<any>;
}
