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
        {header}

        <View
          style={{
            marginLeft: "auto",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IncrementorButton
            index={index}
            onPress={decreaseOctave}
            disabled={currentOctave === 0}
          />
          <Label style={{ width: 64, marginLeft: 8 }}>
            Octave: {currentOctave}
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
