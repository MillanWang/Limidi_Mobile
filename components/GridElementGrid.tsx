import React, { type ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { GridElementRow } from "../components/GridElementRow";
import { useCurrentGridPreset } from "../hooks/useCurrentGridPreset";

export function GridElementGrid() {
  const currentGridPreset = useCurrentGridPreset();
  // Creating the rows
  const gridElementRows: ReactNode[] = [];
  for (let i = 0; i < currentGridPreset.rowCount; i++) {
    gridElementRows.push(
      <GridElementRow
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
