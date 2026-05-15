import React from "react";
import { Linking, StyleSheet, View } from "react-native";
import { theme } from "../constants/theme";
import { GET_FULL_VERSION_A11Y } from "../hooks/accessibilityHooks";
import { GridThemedButton } from "./GridThemedComponents/GridThemedButton";
import { BodyText, Heading } from "./Typography";

// Set this once the Pro app is live on the App Store, e.g.
// "https://apps.apple.com/app/id1234567890". The button is hidden when null
// so we never ship a broken link to App Review.
const APP_STORE_URL: string | null = null;

export const PresetPaywall = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Heading style={styles.title}>Unlock all presets</Heading>

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

      {APP_STORE_URL && (
        <GridThemedButton
          onPress={() => Linking.openURL(APP_STORE_URL)}
          {...GET_FULL_VERSION_A11Y}
        >
          <BodyText>Get full version</BodyText>
        </GridThemedButton>
      )}
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
