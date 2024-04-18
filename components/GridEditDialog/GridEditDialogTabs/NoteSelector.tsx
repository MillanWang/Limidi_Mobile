import React from "react";
import { Text, View } from "react-native";
import { Piano } from "../../Piano";
import { theme } from "../../../constants/theme";
import { IncrementorButton } from "../../IncrementorButton";

interface NoteSelectorProps {
  noteNumber: number;
  setNoteNumber: (noteNumber: number) => void;
  increaseOctave: () => void;
  decreaseOctave: () => void;

  header: React.JSX.Element;
}

export const NoteSelector = ({
  noteNumber,
  setNoteNumber,
  increaseOctave,
  decreaseOctave,

  header,
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
            onPress={decreaseOctave}
            disabled={currentOctave === 0}
          />
          <Text style={{ color: theme.color.white, width: 64, marginLeft: 8 }}>
            Octave: {currentOctave}
          </Text>
          <IncrementorButton
            onPress={increaseOctave}
            isPlus
            disabled={currentOctave === 10}
          />
        </View>
      </View>

      <Piano noteNumber={noteNumber % 12} setNoteNumber={setNoteNumber} />
    </View>
  );
};
