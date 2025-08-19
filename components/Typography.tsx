import { Text } from "@rneui/base";
import { theme } from "../constants/theme";
import React from "react";
import { StyleSheet, TextStyle } from "react-native";

// Base text styles
const baseTextStyle: TextStyle = {
  color: theme.color.lightText,
};

// Heading Components
export const H1: React.FC<{ children: React.ReactNode; style?: TextStyle }> = ({
  children,
  style,
}) => <Text style={[baseTextStyle, styles.h1, style]}>{children}</Text>;

export const H2: React.FC<{ children: React.ReactNode; style?: TextStyle }> = ({
  children,
  style,
}) => <Text style={[baseTextStyle, styles.h2, style]}>{children}</Text>;

export const H3: React.FC<{ children: React.ReactNode; style?: TextStyle }> = ({
  children,
  style,
}) => <Text style={[baseTextStyle, styles.h3, style]}>{children}</Text>;

export const H4: React.FC<{ children: React.ReactNode; style?: TextStyle }> = ({
  children,
  style,
}) => <Text style={[baseTextStyle, styles.h4, style]}>{children}</Text>;

// Body Text Components
export const BodyText: React.FC<{
  children: React.ReactNode;
  style?: TextStyle;
}> = ({ children, style }) => (
  <Text style={[baseTextStyle, styles.bodyText, style]}>{children}</Text>
);

export const BodyTextLarge: React.FC<{
  children: React.ReactNode;
  style?: TextStyle;
}> = ({ children, style }) => (
  <Text style={[baseTextStyle, styles.bodyTextLarge, style]}>{children}</Text>
);

export const BodyTextSmall: React.FC<{
  children: React.ReactNode;
  style?: TextStyle;
}> = ({ children, style }) => (
  <Text style={[baseTextStyle, styles.bodyTextSmall, style]}>{children}</Text>
);

// Caption and Label Components
export const Caption: React.FC<{
  children: React.ReactNode;
  style?: TextStyle;
}> = ({ children, style }) => (
  <Text style={[baseTextStyle, styles.caption, style]}>{children}</Text>
);

export const Label: React.FC<{
  children: React.ReactNode;
  style?: TextStyle;
}> = ({ children, style }) => (
  <Text style={[baseTextStyle, styles.label, style]}>{children}</Text>
);

// Special Text Components
export const WarningText: React.FC<{
  children: React.ReactNode;
  style?: TextStyle;
}> = ({ children, style }) => (
  <Text style={[baseTextStyle, styles.warningText, style]}>{children}</Text>
);

export const SuccessText: React.FC<{
  children: React.ReactNode;
  style?: TextStyle;
}> = ({ children, style }) => (
  <Text style={[baseTextStyle, styles.successText, style]}>{children}</Text>
);

export const ErrorText: React.FC<{
  children: React.ReactNode;
  style?: TextStyle;
}> = ({ children, style }) => {
  return (
    <Text style={[baseTextStyle, styles.errorText, style]}>{children}</Text>
  );
};

export const MutedText: React.FC<{
  children: React.ReactNode;
  style?: TextStyle;
}> = ({ children, style }) => (
  <Text style={[baseTextStyle, styles.mutedText, style]}>{children}</Text>
);

// Button Text Component
export const ButtonText: React.FC<{
  children: React.ReactNode;
  style?: TextStyle;
}> = ({ children, style }) => (
  <Text style={[baseTextStyle, styles.buttonText, style]}>{children}</Text>
);

// Code/Monospace Text Component
export const CodeText: React.FC<{
  children: React.ReactNode;
  style?: TextStyle;
}> = ({ children, style }) => (
  <Text style={[baseTextStyle, styles.codeText, style]}>{children}</Text>
);

// Link Text Component
export const LinkText: React.FC<{
  children: React.ReactNode;
  style?: TextStyle;
}> = ({ children, style }) => (
  <Text style={[baseTextStyle, styles.linkText, style]}>{children}</Text>
);

const styles = StyleSheet.create({
  // Heading styles
  h1: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 40,
    marginBottom: 16,
  },
  h2: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 36,
    marginBottom: 14,
  },
  h3: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 32,
    marginBottom: 12,
  },
  h4: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
    marginBottom: 10,
  },

  // Body text styles
  bodyText: {
    fontSize: 16,
    fontWeight: "normal",
    lineHeight: 24,
    marginBottom: 8,
  },
  bodyTextLarge: {
    fontSize: 18,
    fontWeight: "normal",
    lineHeight: 26,
    marginBottom: 10,
  },
  bodyTextSmall: {
    fontSize: 14,
    fontWeight: "normal",
    lineHeight: 20,
    marginBottom: 6,
  },

  // Caption and label styles
  caption: {
    fontSize: 12,
    fontWeight: "normal",
    lineHeight: 16,
    color: theme.color.lightText,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    marginBottom: 4,
  },

  // Special text styles
  warningText: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.color.warningText,
  },
  successText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4CAF50", // Green color for success
  },
  errorText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#F44336", // Red color for errors
  },
  mutedText: {
    fontSize: 16,
    fontWeight: "normal",
    color: theme.color.darkText,
    opacity: 0.7,
  },

  // Button text style
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // Code text style
  codeText: {
    fontSize: 14,
    fontFamily: "SpaceMono-Regular",
    backgroundColor: theme.color.modalBackground,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    color: "#E0E0E0",
  },

  // Link text style
  linkText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2196F3", // Blue color for links
    textDecorationLine: "underline",
  },
});
