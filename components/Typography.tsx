import { Text } from "@rneui/base";
import React from "react";
import { StyleSheet, TextStyle, View } from "react-native";
import { theme } from "../constants/theme";

// Typography kind enum
export enum TypographyKind {
  DEFAULT = "default",
  WARNING = "warning",
  SUCCESS = "success",
  ERROR = "error",
}

// Base text styles
const baseTextStyle: TextStyle = { color: theme.color.lightText };

// Helper function to get color based on kind
const getColorForKind = (kind: TypographyKind): string => {
  switch (kind) {
    case TypographyKind.WARNING:
      return theme.color.warningText;
    case TypographyKind.SUCCESS:
      return theme.color.successText;
    case TypographyKind.ERROR:
      return theme.color.errorText;
    case TypographyKind.DEFAULT:
    default:
      return theme.color.lightText;
  }
};

// Heading Components

export const Heading: React.FC<{
  children: React.ReactNode;
  style?: TextStyle;
  kind?: TypographyKind;
}> = ({ children, style, kind = TypographyKind.DEFAULT }) => (
  <Text
    style={[
      baseTextStyle,
      styles.heading,
      { color: getColorForKind(kind) },
      style,
    ]}
  >
    {children}
  </Text>
);

export const HeadingSmall: React.FC<{
  children: React.ReactNode;
  style?: TextStyle;
  kind?: TypographyKind;
}> = ({ children, style, kind = TypographyKind.DEFAULT }) => (
  <Text
    style={[
      baseTextStyle,
      styles.headingSmall,
      { color: getColorForKind(kind) },
      style,
    ]}
  >
    {children}
  </Text>
);

// Body Text Components
export const BodyText: React.FC<{
  children: React.ReactNode;
  style?: TextStyle;
  kind?: TypographyKind;
}> = ({ children, style, kind = TypographyKind.DEFAULT }) => (
  <Text
    style={[
      baseTextStyle,
      styles.bodyText,
      { color: getColorForKind(kind) },
      style,
    ]}
  >
    {children}
  </Text>
);

// Caption and Label Components
export const Caption: React.FC<{
  children: React.ReactNode;
  style?: TextStyle;
  kind?: TypographyKind;
}> = ({ children, style, kind = TypographyKind.DEFAULT }) => (
  <Text
    style={[
      baseTextStyle,
      styles.caption,
      { color: getColorForKind(kind) },
      style,
    ]}
  >
    {children}
  </Text>
);

export const Label: React.FC<{
  children: React.ReactNode;
  style?: TextStyle;
  kind?: TypographyKind;
}> = ({ children, style, kind = TypographyKind.DEFAULT }) => (
  <Text
    style={[
      baseTextStyle,
      styles.label,
      { color: getColorForKind(kind) },
      style,
    ]}
  >
    {children}
  </Text>
);

const styles = StyleSheet.create({
  // Heading styles

  heading: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 32,
  },
  headingSmall: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
  },
  bodyText: {
    fontSize: 16,
    fontWeight: "normal",
    lineHeight: 24,
  },
  caption: {
    fontSize: 10,
    fontWeight: "normal",
    lineHeight: 12,
    color: theme.color.lightText,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 16,
  },
});
