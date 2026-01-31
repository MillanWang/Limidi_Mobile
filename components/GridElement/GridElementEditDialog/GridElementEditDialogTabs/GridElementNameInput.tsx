import { Input } from "@rneui/themed";
import { Label } from "../../../Typography";
import React from "react";
import { getNoteKeyFromNoteNumber, isNoteLabelStandard } from "../../../../constants/MIDI_Notes";
import { theme } from "../../../../constants/theme";
import { useGridElementAtIndex } from "../../../../hooks/useCurrentGridPreset";
import { useAppDispatch } from "../../../../redux/hooks";
import { setGridElementName } from "../../../../redux/slices/GridPresetsSlice";
import { GridThemedIcon } from "../../../GridThemedComponents/GridThemedIcon";

export const GridElementNameInput = ({ index }: { index: number }) => {
  const dispatch = useAppDispatch();
  const {
    name,
    midiNoteState: { noteNumber },
  } = useGridElementAtIndex(index);

  const resetElementName = () =>
    dispatch(setGridElementName({ index, name: getNoteKeyFromNoteNumber(noteNumber) }));

  const rightIcon = isNoteLabelStandard(noteNumber, name) ? (
    false
  ) : (
    <GridThemedIcon
      onPress={resetElementName}
      name="refresh-outline"
      type="ionicon"
      index={index}
    />
  );
  return (
    <>
      <Input
        containerStyle={{ paddingLeft: -10, paddingRight: -10 }}
        inputStyle={{ color: theme.color.white }}
        rightIconContainerStyle={{ height: 24 }}
        label={<Label>Name:</Label>}
        maxLength={8}
        rightIcon={rightIcon}
        value={name}
        onChangeText={(value) => dispatch(setGridElementName({ index, name: value }))}
      />
    </>
  );
};
