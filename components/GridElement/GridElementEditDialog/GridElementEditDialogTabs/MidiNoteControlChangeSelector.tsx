import { Icon, Text } from "@rneui/themed";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../../../../constants/theme";
import { useGridElementAtIndex } from "../../../../hooks/useCurrentGridPreset";
import { useCurrentGridPresetColors } from "../../../../hooks/useCurrentGridPreset";
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
      <View>
        <Text style={{ color: theme.color.white }}>{"Mode: "}</Text>
        <View style={styles.switchView}>
          <GridThemedButton
            index={index}
            onPress={setElementToMidiNote}
            flex
            unfocused={!isMidiNote}
          >
            <GridThemedIcon
              index={index}
              type="material-community"
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
