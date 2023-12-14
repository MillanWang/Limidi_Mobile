import React from "react";
import { StyleSheet, View } from "react-native";
import { GridElementRow } from "../components/GridElementRow";
import { useAppSelector } from "../redux/hooks";

export interface GridElementGridProps {
  isPlayMode: boolean;
}

export function GridElementGrid({ isPlayMode }: GridElementGridProps) {
  const currentGridElementMidiState = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset
  );

  // Creating the rows
  let gridElementRows: JSX.Element[] = [];
  for (let i = 0; i < currentGridElementMidiState.rowCount; i++) {
    gridElementRows.push(
      <GridElementRow
        isPlayMode={isPlayMode}
        rowStartingIndex={i * currentGridElementMidiState.columnCount}
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
