import React, { ReactNode } from "react";
import { View } from "react-native";
import { Label } from "../../Typography";
import { IncrementorButton } from "../../IncrementorButton";
import { Piano } from "../../Piano";
interface NoteSelectorProps {
  noteNumber: number;
  setNoteNumber: (noteNumber: number) => void;
  increaseOctave: () => void;
  decreaseOctave: () => void;

  header: ReactNode;
  index?: number;
}

export const NoteSelector = ({
  noteNumber,
  setNoteNumber,
  increaseOctave,
  decreaseOctave,

  header,
  index,
}: NoteSelectorProps) => {
  const currentOctave = Math.floor(noteNumber / 12);
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, justifyContent: "center" }}>{header}</View>

        <View
          style={{
            marginLeft: "auto",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <IncrementorButton
            index={index}
            onPress={decreaseOctave}
            disabled={currentOctave === 0}
          />
          <Label style={{ width: 64, marginLeft: 4 }}>
            Octave: <Label fontWeight="300">{currentOctave}</Label>
          </Label>
          <IncrementorButton
            index={index}
            onPress={increaseOctave}
            isPlus
            disabled={currentOctave === 10}
          />
        </View>
      </View>

      <Piano
        noteNumber={noteNumber % 12}
        setNoteNumber={setNoteNumber}
        index={index}
      />
    </View>
  );
};
