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
import { useGridElementAtIndex } from "../../../hooks/useCurrentGridPreset";
import { useCurrentGridPresetColors } from "../../../hooks/useCurrentGridPresetColors";
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
        borderColor: isPressed
          ? gridTheme.pressedColor
          : gridTheme.unpressedColor,
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
              <View
                style={{ flexDirection: "row", marginRight: "auto", gap: 8 }}
              >
                <GridThemedButton
                  onPress={() => setTabIndex(0)}
                  buttonStyle={getTabButtonStyle(tabIndex === 0)}
                >
                  <MidiTypeIcon isMidiNote={isMidiNote} /> MIDI
                </GridThemedButton>
                <GridThemedButton
                  onPress={() => setTabIndex(1)}
                  buttonStyle={getTabButtonStyle(tabIndex === 1)}
                >
                  <ColorIcon /> Color
                </GridThemedButton>
              </View>
              <GridThemedButton onPress={toggleElementMidiLock}>
                <LockIcon isLocked={isLocked} />
              </GridThemedButton>
              <GridThemedButton onPress={() => setDialogVisible(false)}>
                <SaveIcon /> SAVE
              </GridThemedButton>
            </View>

            <Divider />
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
  dialogTabSelectorContainer: { flexDirection: "row", gap: 8 },
  dialogContentContainer: { flex: 1 },
});

const MidiTypeIcon = ({ isMidiNote }: { isMidiNote: boolean }) => {
  return (
    <GridThemedIcon
      style={{ marginRight: 4 }}
      type={isMidiNote ? "material-community" : "feather"}
      name={isMidiNote ? "piano" : "sliders"}
    />
  );
};

const ColorIcon = () => {
  return (
    <GridThemedIcon
      style={{ marginRight: 4 }}
      type="ionicon"
      name={"color-palette"}
    />
  );
};

const LockIcon = ({ isLocked }: { isLocked: boolean }) => {
  return (
    <GridThemedIcon
      type="ionicon"
      name={isLocked ? "lock-closed" : "lock-open"}
    />
  );
};

const SaveIcon = () => {
  return (
    <GridThemedIcon
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
