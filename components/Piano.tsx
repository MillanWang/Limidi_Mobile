import React from "react";
import { StyleSheet, View } from "react-native";

const naturalNoteColor = "#bbbbbb";
const accidentalNoteColor = "#333333";
const highLightedKeyColor = "red";

const naturalNoteNumbers = [0, 2, 4, 5, 7, 9, 11];

export interface PianoProps {
  noteNumber: number;
  setNoteNumber(noteNumber: number): void;
}

export function Piano({ noteNumber, setNoteNumber }: PianoProps) {
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
        {topRowStyles.map((rowStyle, i) => (
          <View
            key={`PianoTopRowNoteNumber_${i}`}
            style={{
              ...rowStyle,
              ...(noteNumber === i && { backgroundColor: highLightedKeyColor }),
            }}
            onTouchStart={() => setNoteNumber(i)}
          />
        ))}
      </View>

      <View style={styles.keyRow}>
        {naturalNoteNumbers.map((currentNoteNumber) => {
          return (
            <View
              key={`PianoBottomRowNoteNumber_${currentNoteNumber}`}
              style={{
                ...styles.naturalKey,
                ...(noteNumber === currentNoteNumber && {
                  backgroundColor: highLightedKeyColor,
                }),
              }}
              onTouchStart={() => setNoteNumber(currentNoteNumber)}
            />
          );
        })}
      </View>
    </View>
  );
}

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
