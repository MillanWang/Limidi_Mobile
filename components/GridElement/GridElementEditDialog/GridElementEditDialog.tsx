import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Dialog, Text } from "@rneui/themed";

import {
  GridElementEditMidiProps,
  GridElementEditMidiSettingsTab,
} from "./GridElementEditDialogTabs/GridElementEditMidiSettingsTab";
import {
  GridElementEditStyleProps,
  GridElementEditStyleSettingsTab,
} from "./GridElementEditDialogTabs/GridElementEditStyleSettingsTab";
import { GridPreview } from "../../GridPreview";

interface GridElementEditDialogProps
  extends GridElementEditMidiProps,
    GridElementEditStyleProps {
  dialogVisible: boolean;
  setDialogVisible(dialogVisible: boolean): void;
}

export default function GridElementEditDialog({
  index,
  dialogVisible,
  setDialogVisible,
}: GridElementEditDialogProps) {
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <Dialog isVisible={dialogVisible} style={{}}>
      <View style={styles.dialogTabSelectorContainer}>
        <Button onPress={() => setTabIndex(0)}>MIDI Settings</Button>
        <Button onPress={() => setTabIndex(1)}>Style Settings</Button>
        <Button onPress={() => setDialogVisible(false)}>SAVE</Button>
      </View>
      <Text>Grid Element: {index}</Text>
      <GridPreview index={index} />

      <ScrollView
        style={{
          overflow: "scroll",
          height: "60%", // Value needs tuning on diff screensizes
        }}
      >
        <View style={styles.dialogContentContainer}>
          {tabIndex === 0 && <GridElementEditMidiSettingsTab index={index} />}
          {tabIndex === 1 && <GridElementEditStyleSettingsTab index={index} />}
        </View>
      </ScrollView>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  dialogTabSelectorContainer: {
    flexDirection: "row",
  },
  dialogContentContainer: {
    // height: "80%",
    // height: 500,
  },
});
