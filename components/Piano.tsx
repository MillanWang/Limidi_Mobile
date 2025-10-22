import { Label } from "./Typography";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { DEFAULT, HULK } from "../constants/ColorPresets";
import { NOTE } from "../constants/MIDI_Notes";
import {
  useCurrentGridElementPresetColors,
  useCurrentGridPresetColors,
} from "../hooks/useCurrentGridPreset";

const naturalNoteColor = "#888888";
const accidentalNoteColor = "#333333";

const naturalNoteNumbers = [0, 2, 4, 5, 7, 9, 11];

export interface PianoProps {
  noteNumber: number;
  setNoteNumber(noteNumber: number): void;
  index?: number;
}

const accidentalNoteNumbers = [1, 3, 6, 8, 10];

const colorsWithAlternateKeyColors = [DEFAULT.highlightColor];
const defaultSelectedKeyColor = HULK.highlightColor;

const usePianoKeyColors = (index?: number) => {
  const gridTheme =
    index !== undefined
      ? useCurrentGridElementPresetColors(index)
      : useCurrentGridPresetColors();

  return {
    highLightedKeyColor: colorsWithAlternateKeyColors.includes(
      gridTheme.highlightColor
    )
      ? defaultSelectedKeyColor
      : gridTheme.highlightColor,
    noteLabelColor: gridTheme.primaryColor,
  };
};

export function Piano({ noteNumber, setNoteNumber, index }: PianoProps) {
  const { highLightedKeyColor, noteLabelColor } = usePianoKeyColors(index);

  const topRowStyles = [
    { ...styles.c_NoteSpacer, ...styles.noteSpacer },
    { ...styles.accidentalKey },
    { ...styles.d_g_NoteSpacer, ...styles.noteSpacer },
    { ...styles.accidentalKey },
    { ...styles.e_f_NoteSpacer, ...styles.noteSpacer },
    { ...styles.e_f_NoteSpacer, ...styles.noteSpacer },
    { ...styles.accidentalKey },
    { ...styles.d_g_NoteSpacer, ...styles.noteSpacer },
    { ...styles.accidentalKey },
    { ...styles.a_NoteSpacer, ...styles.noteSpacer },
    { ...styles.accidentalKey },
    { ...styles.b_NoteSpacer, ...styles.noteSpacer },
  ];

  return (
    <View style={styles.keyContainer}>
      <View style={styles.keyRow}>
        {topRowStyles.map((rowStyle, currentNoteNumber) => (
          <Pressable
            key={`PianoTopRowNoteNumber_${currentNoteNumber}`}
            style={{
              ...rowStyle,
              ...(noteNumber === currentNoteNumber && {
                backgroundColor: highLightedKeyColor,
              }),
            }}
            onPress={() => setNoteNumber(currentNoteNumber)}
          >
            {accidentalNoteNumbers.includes(noteNumber) &&
              noteNumber === currentNoteNumber && (
                <KeyLabel noteNumber={noteNumber} color={noteLabelColor} />
              )}
          </Pressable>
        ))}
      </View>

      <View style={styles.keyRow}>
        {naturalNoteNumbers.map((currentNoteNumber) => {
          return (
            <Pressable
              key={`PianoBottomRowNoteNumber_${currentNoteNumber}`}
              style={{
                ...styles.naturalKey,
                ...(noteNumber === currentNoteNumber && {
                  backgroundColor: highLightedKeyColor,
                }),
              }}
              onPress={() => setNoteNumber(currentNoteNumber)}
            >
              {noteNumber === currentNoteNumber && (
                <KeyLabel noteNumber={noteNumber} color={noteLabelColor} />
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const KeyLabel = (props: { noteNumber: number; color: string }) => {
  const { noteNumber, color } = props;
  return (
    <Label
      style={{
        marginTop: "auto",
        marginBottom: 2,
        color,
        textAlign: "center",
        fontSize: 16,
      }}
    >
      {Object.values(NOTE)[noteNumber % 12]}
    </Label>
  );
};

const styles = StyleSheet.create({
  keyContainer: {
    flexDirection: "column",
    width: "100%",
    borderWidth: 2,
    backgroundColor: accidentalNoteColor,
  },
  keyRow: {
    flexDirection: "row",
    height: 50,
  },
  naturalKey: {
    backgroundColor: naturalNoteColor,
    width: `${(100 * 1) / 7}%`,
    borderRightWidth: 2,
    borderTopWidth: 0,
  },
  accidentalKey: {
    backgroundColor: accidentalNoteColor,
    width: `${(100 * 1) / 14}%`,
    borderRightWidth: 2,
    borderBottomWidth: 2,
  },
  noteSpacer: {
    backgroundColor: naturalNoteColor,
    borderRightWidth: 2,
  },
  c_NoteSpacer: {
    width: "10.5%",
  },
  d_g_NoteSpacer: {
    width: "7.3%",
  },
  e_f_NoteSpacer: {
    width: "10.755%",
  },
  a_NoteSpacer: {
    width: "7%",
  },
  b_NoteSpacer: {
    flex: 1,
  },
});

/**
 * AKAI MPK MINI 2 Based Measurements
 * Whole Octave : 140mm
 * Natural width : 20mm
 * Accidental width : 10mm individually. 5 in total for 1.25"
 * Accidental gaps : 0.5" individually, 8 in total for 4"
 * 140 = 5*AccidentalWidth + 8*AccidentalGap
 */
