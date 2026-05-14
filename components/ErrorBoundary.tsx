import React, { Component, ReactNode, ErrorInfo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../constants/theme";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (__DEV__) {
      console.error("ErrorBoundary caught:", error, info.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>
            LiMIDI hit an unexpected error. Please close and reopen the app.
          </Text>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: theme.color.white,
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: theme.color.lightText,
    textAlign: "center",
  },
});
