import { Label } from "../../../Typography";
import React from "react";
import { StyleSheet, View } from "react-native";
import { getMidiModeButtonA11y } from "../../../../hooks/accessibilityHooks";
import { useGridElementAtIndex } from "../../../../hooks/useCurrentGridPreset";
import { useAppDispatch } from "../../../../redux/hooks";
import { setGridElementIsMidiNote } from "../../../../redux/slices/GridPresetsSlice";
import { GridThemedButton } from "../../../GridThemedComponents/GridThemedButton";
import { GridThemedIcon } from "../../../GridThemedComponents/GridThemedIcon";

export const MidiNoteControlChangeSelector = ({ index }: { index: number }) => {
  const dispatch = useAppDispatch();
  const { isMidiNote } = useGridElementAtIndex(index);
  const setElementToMidiNote = () =>
    void dispatch(setGridElementIsMidiNote({ index, isMidiNote: true }));
  const setElementToControlChange = () =>
    void dispatch(setGridElementIsMidiNote({ index, isMidiNote: false }));

  return (
    <View>
      <Label>Mode:</Label>
      <View style={styles.switchView}>
        <GridThemedButton
          index={index}
          onPress={setElementToMidiNote}
          flex
          unfocused={!isMidiNote}
          {...getMidiModeButtonA11y(true, isMidiNote)}
        >
          <GridThemedIcon
            index={index}
            type="material-design"
            name={"piano"}
            style={{ marginRight: 4 }}
          />
          MIDI Note
        </GridThemedButton>
        <GridThemedButton
          index={index}
          onPress={setElementToControlChange}
          flex
          unfocused={isMidiNote}
          {...getMidiModeButtonA11y(false, !isMidiNote)}
        >
          <GridThemedIcon
            index={index}
            name="sliders"
            type="feather"
            style={{ marginRight: 4 }}
          />
          Control Change
        </GridThemedButton>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  switchView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    flex: 1,
  },
});
