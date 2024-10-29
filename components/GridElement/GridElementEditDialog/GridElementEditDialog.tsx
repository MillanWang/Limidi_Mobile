import { Dialog, Text } from "@rneui/themed";
import React, { useCallback } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { theme } from "../../../constants/theme";
import {
  useCurrentGridPresetColors,
  useGridElementAtIndex,
} from "../../../hooks/useCurrentGridPreset";
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

export default function GridElementEditDialog({
  index,
  dialogVisible,
  setDialogVisible,
}: GridElementEditDialogProps) {
  const [tabIndex, setTabIndex] = React.useState(0);
  const dispatch = useAppDispatch();

  const gridTheme = useCurrentGridPresetColors();
  const { isLocked, isMidiNote } = useGridElementAtIndex(index);

  const toggleElementMidiLock = () =>
    dispatch(setGridElementIsLocked({ index, isLocked: !isLocked }));

  const getTabButtonStyle = useCallback(
    (isPressed: boolean) => {
      return {
        borderWidth: 1,
        opacity: isPressed ? 1 : 0.5,
        borderColor: gridTheme.pressedColor,
        borderRadius: 0,
      };
    },
    [gridTheme]
  );

  return (
    <Dialog
      isVisible={dialogVisible}
      style={{}}
      overlayStyle={{
        width: "90%",
        padding: 12,
        height: "90%",
        backgroundColor: theme.color.modalBackground,
        borderRadius: 16,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPressIn={Keyboard.dismiss}>
          <>
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

            <ScrollView>
              <View style={{ alignItems: "center", marginTop: 8 }}>
                <Text style={{ color: theme.color.white }}>
                  Element #{index}
                </Text>
                <GridPreview index={index} />
              </View>
              <View style={styles.dialogContentContainer}>
                {tabIndex === 0 && (
                  <GridElementEditMidiSettingsTab index={index} />
                )}
                {tabIndex === 1 && (
                  <GridElementEditStyleSettingsTab index={index} />
                )}
              </View>
            </ScrollView>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  dialogTabSelectorContainer: { flexDirection: "column", gap: 8 },
  dialogContentContainer: { flex: 1 },
});

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
