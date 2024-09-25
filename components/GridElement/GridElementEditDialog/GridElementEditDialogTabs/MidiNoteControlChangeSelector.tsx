import { Icon, Switch, Text } from "@rneui/themed";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setGridElementIsMidiNote } from "../../../../redux/slices/GridPresetsSlice";
import { theme } from "../../../../constants/theme";
import { GridThemedButton } from "../../../GridThemedComponents/GridThemedButton";

export const MidiNoteControlChangeSelector = ({ index }: { index: number }) => {
  const dispatch = useAppDispatch();
  const { isMidiNote } = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset.gridElements[index]
  );
  const gridTheme = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset.gridTheme
  );

  const { pressedColor, unpressedColor } = gridTheme;

  const setElementToMidiNote = () =>
    void dispatch(setGridElementIsMidiNote({ index, isMidiNote: true }));
  const setElementToControlChange = () =>
    void dispatch(setGridElementIsMidiNote({ index, isMidiNote: false }));

  const getButtonStyle = useCallback(
    (isEnabled: boolean) => {
      return {
        borderWidth: 1,
        borderColor: isEnabled ? pressedColor : unpressedColor,
        opacity: isEnabled ? 1 : 0.5,
      };
    },
    [pressedColor, unpressedColor]
  );

  return (
    <View style={{ alignItems: "center" }}>
      <View>
        <Text style={{ color: theme.color.white }}>{"Mode: "}</Text>
        <View style={styles.switchView}>
          <View style={{ flexDirection: "row" }}>
            <GridThemedButton
              onPress={setElementToMidiNote}
              style={getButtonStyle(isMidiNote)}
            >
              <Icon
                color={pressedColor}
                type="material-community"
                name={"piano"}
                style={{ marginRight: 4 }}
              />
              MIDI Note
            </GridThemedButton>
            <GridThemedButton
              onPress={setElementToControlChange}
              style={getButtonStyle(!isMidiNote)}
            >
              <Icon
                color={pressedColor}
                type="feather"
                name={"sliders"}
                style={{ marginRight: 4 }}
              />
              Control Change
            </GridThemedButton>
          </View>
        </View>
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
