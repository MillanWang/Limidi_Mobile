import { Icon, Switch, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setGridElementIsMidiNote } from "../../../../redux/slices/GridPresetsSlice";
import { theme } from "../../../../constants/theme";

const enabledColor = theme.color.lightText;
const disabledColor = theme.color.black;
export const MidiNoteControlChangeSelector = ({ index }: { index: number }) => {
  const dispatch = useAppDispatch();
  const { isMidiNote } = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset.gridElements[index]
  );

  const toggleElementMidiNoteMode = () =>
    void dispatch(setGridElementIsMidiNote({ index, isMidiNote: !isMidiNote }));

  return (
    <View style={{ alignItems: "center" }}>
      <View>
        <Text style={{ fontWeight: "bold", color: theme.color.white }}>
          {"Mode: "}
        </Text>
        <View style={styles.switchView}>
          <Icon
            color={isMidiNote ? enabledColor : disabledColor}
            type="material-community"
            name={"piano"}
          />

          <Switch
            value={!isMidiNote}
            onChange={toggleElementMidiNoteMode}
            collapsable
          />

          <Icon
            color={!isMidiNote ? enabledColor : disabledColor}
            type="feather"
            name={"sliders"}
          />
        </View>
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            color: theme.color.white,
          }}
        >
          {isMidiNote ? "MIDI Note" : "Control Change"}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  switchView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
