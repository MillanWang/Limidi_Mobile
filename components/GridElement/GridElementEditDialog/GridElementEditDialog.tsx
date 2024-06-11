import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Dialog, Icon, Text, darkColors } from "@rneui/themed";

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
import { theme } from "../../../constants/theme";

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
    <Dialog
      isVisible={dialogVisible}
      style={{}}
      overlayStyle={{
        width: "90%",
        padding: 12,
        height: "90%",
        backgroundColor: theme.color.modalBackground,
        marginTop: "10%",
        borderRadius: 16,
      }}
    >
      <View style={styles.dialogTabSelectorContainer}>
        <View style={{ flexDirection: "row", marginRight: "auto" }}>
          <Button onPress={toggleElementMidiLock}>
            <Icon
              type="ionicon"
              name={isLocked ? "lock-closed" : "lock-open"}
            />
          </Button>

          <Button onPress={() => setTabIndex(0)}>MIDI</Button>
          <Button onPress={() => setTabIndex(1)}>Color</Button>
        </View>
        <Button onPress={() => setDialogVisible(false)}>SAVE</Button>
      </View>

      <View style={{ alignItems: "center", marginTop: 8 }}>
        <Text style={{ color: theme.color.white }}>Element #{index}</Text>
        <GridPreview index={index} />
      </View>

      <ScrollView style={{ overflow: "scroll" }}>
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
