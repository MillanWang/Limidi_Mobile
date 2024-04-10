import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Dialog, Icon, Text } from "@rneui/themed";

import {
  GridElementEditMidiProps,
  GridElementEditMidiSettingsTab,
} from "./GridElementEditDialogTabs/GridElementEditMidiSettingsTab";
import {
  GridElementEditStyleProps,
  GridElementEditStyleSettingsTab,
} from "./GridElementEditDialogTabs/GridElementEditStyleSettingsTab";
import { GridPreview } from "../../GridPreview";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setGridElementIsLocked } from "../../../redux/slices/GridPresetsSlice";

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
  const dispatch = useAppDispatch();

  const currentGridElementState = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset.gridElements[index]
  );
  const { isLocked } = currentGridElementState;

  const toggleElementMidiLock = () =>
    dispatch(setGridElementIsLocked({ index, isLocked: !isLocked }));

  return (
    <Dialog isVisible={dialogVisible} style={{}}>
      <View style={styles.dialogTabSelectorContainer}>
        <View
        //  style={          styles.lockSwitchView}
        >
          <Button onPress={toggleElementMidiLock}>
            <Icon
              type="ionicon"
              name={isLocked ? "lock-closed" : "lock-open"}
            />
          </Button>
        </View>

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
  dialogContentContainer: {},
});
