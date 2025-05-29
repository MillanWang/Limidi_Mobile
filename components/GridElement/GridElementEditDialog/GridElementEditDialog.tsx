import { Dialog, Text } from "@rneui/themed";
import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { theme } from "../../../constants/theme";
import { useGridElementAtIndex } from "../../../hooks/useCurrentGridPreset";
import { useAppDispatch } from "../../../redux/hooks";
import { setGridElementIsLocked } from "../../../redux/slices/GridPresetsSlice";
import { GridPreview } from "../../GridPreview";
import { GridThemedButton } from "../../GridThemedComponents/GridThemedButton";
import { GridThemedIcon } from "../../GridThemedComponents/GridThemedIcon";
import {
  GridElementEditMidiProps,
  GridElementEditMidiSettingsTab,
} from "./GridElementEditDialogTabs/GridElementEditMidiSettingsTab";
import {
  GridElementEditStyleProps,
  GridElementEditStyleSettingsTab,
} from "./GridElementEditDialogTabs/GridElementEditStyleSettingsTab";

interface GridElementEditDialogProps
  extends GridElementEditMidiProps,
    GridElementEditStyleProps {
  dialogVisible: boolean;
  setDialogVisible(dialogVisible: boolean): void;
}

export const GridElementEditDialog = ({
  index,
  dialogVisible,
  setDialogVisible,
}: GridElementEditDialogProps) => {
  const [tabIndex, setTabIndex] = useState(0);
  const dispatch = useAppDispatch();

  const { isLocked, isMidiNote } = useGridElementAtIndex(index);

  const toggleElementMidiLock = () =>
    dispatch(setGridElementIsLocked({ index, isLocked: !isLocked }));

  return (
    <Dialog isVisible={dialogVisible} overlayStyle={styles.dialogOverlay}>
      <TouchableWithoutFeedback onPressIn={Keyboard.dismiss}>
        <View style={styles.dialogTabSelectorContainer}>
          <View style={{ flexDirection: "row", marginLeft: "auto" }}>
            <GridThemedButton onPress={toggleElementMidiLock} index={index}>
              <LockIcon index={index} isLocked={isLocked} />
            </GridThemedButton>
            <GridThemedButton
              onPress={() => setDialogVisible(false)}
              index={index}
            >
              <SaveIcon index={index} /> SAVE
            </GridThemedButton>
          </View>
          <Divider />
          <View style={{ flexDirection: "row" }}>
            <GridThemedButton
              index={index}
              unfocused={tabIndex !== 0}
              onPress={() => setTabIndex(0)}
              flex
            >
              <MidiTypeIcon index={index} isMidiNote={isMidiNote} />
              {" MIDI"}
            </GridThemedButton>
            <GridThemedButton
              index={index}
              unfocused={tabIndex !== 1}
              onPress={() => setTabIndex(1)}
              flex
            >
              <ColorIcon index={index} />
              {" Color"}
            </GridThemedButton>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPressIn={Keyboard.dismiss}>
        <View style={{ alignItems: "center", marginTop: 8 }}>
          <Text style={{ color: theme.color.white }}>Element #{index}</Text>
          <GridPreview index={index} />
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPressIn={Keyboard.dismiss}>
        <View style={styles.dialogContentContainer}>
          {tabIndex === 0 && <GridElementEditMidiSettingsTab index={index} />}
          {tabIndex === 1 && <GridElementEditStyleSettingsTab index={index} />}
        </View>
      </TouchableWithoutFeedback>
    </Dialog>
  );
};

const MidiTypeIcon = (props: { index: number; isMidiNote: boolean }) => {
  return (
    <GridThemedIcon
      index={props.index}
      style={{ marginRight: 4 }}
      type={props.isMidiNote ? "material-community" : "feather"}
      name={props.isMidiNote ? "piano" : "sliders"}
    />
  );
};

const ColorIcon = (props: { index: number }) => {
  return (
    <GridThemedIcon
      index={props.index}
      style={{ marginRight: 4 }}
      type="ionicon"
      name={"color-palette"}
    />
  );
};

const LockIcon = (props: { index: number; isLocked: boolean }) => {
  return (
    <GridThemedIcon
      index={props.index}
      type="ionicon"
      name={props.isLocked ? "lock-closed" : "lock-open"}
    />
  );
};

const SaveIcon = (props: { index?: number }) => {
  return (
    <GridThemedIcon
      index={props.index}
      style={{ marginRight: 4 }}
      type="ionicon"
      name={"save-outline"}
    />
  );
};

const Divider = () => (
  <View
    style={{
      height: 1,
      marginTop: 8,
      backgroundColor: theme.color.darkText,
    }}
  />
);

const styles = StyleSheet.create({
  dialogOverlay: {
    width: "90%",
    maxWidth: 400,
    padding: 12,
    height: "90%",
    backgroundColor: theme.color.modalBackground,
    borderRadius: 16,
    shadowColor: theme.color.black,
    shadowOpacity: 0.75,
    shadowRadius: 8,
    elevation: 4,
  },
  dialogTabSelectorContainer: { flexDirection: "column", gap: 8 },
  dialogContentContainer: { flex: 1 },
});
