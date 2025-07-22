import React from "react";
import { StyleSheet, View } from "react-native";
import { useCurrentGridPreset } from "../hooks/useCurrentGridPreset";
import GridElement from "./GridElement/GridElement";

export interface GridElementRowProps {
  rowStartingIndex: number;
  isPlayMode: boolean;
}

export function GridElementRow({
  rowStartingIndex,
  isPlayMode,
}: GridElementRowProps) {
  const currentGridPreset = useCurrentGridPreset();

  // Populating the row
  const gridElements: React.ReactNode[] = [];
  for (let i = 0; i < currentGridPreset.columnCount; i++) {
    const currentIndex = i + rowStartingIndex;
    gridElements.push(
      <GridElement
        index={currentIndex}
        isPlayMode={isPlayMode}
        key={`gridElement_${currentIndex}`}
      />
    );
  }

  return <View style={styles.gridElementRow}>{gridElements}</View>;
}

const styles = StyleSheet.create({
  gridElementRow: {
    flex: 1,
    flexDirection: "row",
  },
});
