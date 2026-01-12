import React from "react";
import { Linking, StyleSheet, View } from "react-native";
import { theme } from "../constants/theme";

import { GridThemedButton } from "./GridThemedComponents/GridThemedButton";
import { BodyText, Heading } from "./Typography";

const APP_STORE_URL =
  "https://apps.apple.com/app/limidi/TODO_GET_FULL_VERSION_APP_URL";

export const PresetPaywall = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Heading style={styles.title}>Unlock All Presets</Heading>

        <BodyText style={styles.description}>
          Get access to multiple presets to customize your MIDI controller
          exactly how you want it.
        </BodyText>

        <View style={styles.featureList}>
          <BodyText style={styles.feature}>
            {"\u2022"} Save multiple preset configurations
          </BodyText>
          <BodyText style={styles.feature}>
            {"\u2022"} Switch between presets instantly
          </BodyText>
          <BodyText style={styles.feature}>
            {"\u2022"} One-time purchase, no subscription
          </BodyText>
        </View>
      </View>

      <GridThemedButton onPress={() => Linking.openURL(APP_STORE_URL)}>
        <BodyText>Get full version</BodyText>
      </GridThemedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  content: {
    maxWidth: 400,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.color.white,
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: theme.color.lightText,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  featureList: {
    alignSelf: "stretch",
    marginBottom: 32,
  },
  feature: {
    fontSize: 16,
    color: theme.color.lightText,
    marginBottom: 8,
  },
});
