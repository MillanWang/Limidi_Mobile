import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { theme } from "../constants/theme";
import { GridThemedButton } from "./GridThemedComponents/GridThemedButton";
import { BodyText, Heading } from "./Typography";

const HAS_SEEN_FIRST_LAUNCH_KEY = "@limidi_hasSeenFirstLaunchInstructions";

export const FirstLaunchModal = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const value = await AsyncStorage.getItem(HAS_SEEN_FIRST_LAUNCH_KEY);
        if (!cancelled && value !== "true") {
          setVisible(true);
        }
      } catch {
        // If we can't read storage, don't show the modal to avoid blocking the app
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleDismiss = async () => {
    try {
      await AsyncStorage.setItem(HAS_SEEN_FIRST_LAUNCH_KEY, "true");
    } catch {
      // Still close the modal
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Heading style={styles.title}>Welcome to LiMIDI</Heading>

          <BodyText style={styles.paragraph}>
            LiMIDI turns your device into a customizable MIDI controller
          </BodyText>

          <ButtetPoint>Connect to LiMIDI Desktop to send MIDI signals to your DAW</ButtetPoint>
          <ButtetPoint>Use the grid cells to send MIDI notes and control changes</ButtetPoint>
          <ButtetPoint>
            Open the settings to customize notes, control changes, scales, colors, and layout
          </ButtetPoint>

          <GridThemedButton onPress={handleDismiss} style={{ marginTop: 24 }}>
            <BodyText>Get Started</BodyText>
          </GridThemedButton>
        </View>
      </View>
    </Modal>
  );
};

const ButtetPoint = (props: { children: React.ReactNode }) => {
  return (
    <View style={styles.bulletPointRow}>
      <BodyText>{"\u2022"}</BodyText>
      <BodyText>{props.children}</BodyText>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  content: {
    backgroundColor: theme.color.modalBackground,
    borderRadius: 12,
    padding: 24,
    maxWidth: 400,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.color.white,
    textAlign: "center",
    marginBottom: 16,
  },
  paragraph: {
    marginBottom: 12,
    textAlign: "center",
  },
  bulletPointRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
    marginBottom: 8,
  },
  bullet: {
    marginBottom: 8,
    marginLeft: 8,
  },
});
