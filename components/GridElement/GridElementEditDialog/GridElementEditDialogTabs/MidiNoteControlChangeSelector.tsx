import { Icon, Text } from "@rneui/themed";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../../../../constants/theme";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setGridElementIsMidiNote } from "../../../../redux/slices/GridPresetsSlice";
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
        flex: 1,
        borderWidth: 1,
        borderColor: pressedColor,
        borderRadius: 0,
        opacity: isEnabled ? 1 : 0.5,
      };
    },
    [pressedColor, unpressedColor]
  );

  return (
    <View>
      <View>
        <Text style={{ color: theme.color.white }}>{"Mode: "}</Text>
        <View style={styles.switchView}>
          <GridThemedButton
            onPress={setElementToMidiNote}
            containerStyle={getButtonStyle(isMidiNote)}
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
            containerStyle={getButtonStyle(!isMidiNote)}
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
