import React, { type ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { GridElementRow } from "../components/GridElementRow";
import {
  useCurrentGridPreset,
  useCurrentGridPresetColors,
} from "../hooks/useCurrentGridPreset";
import { Page, usePageContext } from "../hooks/usePageContext";

export function GridElementGrid() {
  const currentGridPreset = useCurrentGridPreset();
  const gridTheme = useCurrentGridPresetColors();
  const { page } = usePageContext();
  const isEditMode = page !== Page.Play;

  // Creating the rows
  const gridElementRows: ReactNode[] = [];
  for (let i = 0; i < currentGridPreset.rowCount; i++) {
    gridElementRows.push(
      <GridElementRow
        rowStartingIndex={i * currentGridPreset.columnCount}
        key={`GridElementRow_${i}`}
      />,
    );
  }

  // Outer 0.5px wrapper in edit mode pairs with each element's 0.5px border
  // so the perimeter matches the 1px split-colour join between neighbours.
  return (
    <View style={styles.gridArea}>
      <View
        style={[
          styles.gridInner,
          isEditMode && {
            borderWidth: 0.5,
            borderColor: gridTheme.highlightColor,
          },
        ]}
      >
        {gridElementRows.reverse()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gridArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 12,
  },
  gridInner: {
    flex: 1,
    alignSelf: "stretch",
  },
});
