import React from "react";
import { StyleSheet, View } from "react-native";
import { GridElementRow } from "../components/GridElementRow";
import { useAppSelector } from "../redux/hooks";
import { useCurrentGridPreset } from "../hooks/useCurrentGridPreset";

export interface GridElementGridProps {
  isPlayMode: boolean;
}

export function GridElementGrid({ isPlayMode }: GridElementGridProps) {
  const currentGridPreset = useCurrentGridPreset();

  // Creating the rows
  let gridElementRows: JSX.Element[] = [];
  for (let i = 0; i < currentGridPreset.rowCount; i++) {
    gridElementRows.push(
      <GridElementRow
        isPlayMode={isPlayMode}
        rowStartingIndex={i * currentGridPreset.columnCount}
        key={`GridElementRow_${i}`}
      />
    );
  }

  return <View style={styles.gridArea}>{gridElementRows.reverse()}</View>;
}

const styles = StyleSheet.create({
  gridArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 12,
  },
});
