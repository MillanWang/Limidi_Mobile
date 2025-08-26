import { Icon } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../constants/theme";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  MaxGridDimension,
  setColumnCount,
  setRowCount,
} from "../redux/slices/GridPresetsSlice";
import { IncrementorButton } from "./IncrementorButton";
import { useCurrentGridPreset } from "../hooks/useCurrentGridPreset";

interface GridPreviewProps {
  index?: number;
}

export const GridPreview = ({ index }: GridPreviewProps) => {
  const currentGridPreset = useCurrentGridPreset();
  const { columnCount, rowCount, gridElements } = currentGridPreset;

  const highlightAllElements = !index && index !== 0;

  const rows = []; // array array to match the dimensions
  for (let i = 0; i < rowCount; i++) {
    const currentRow = [];
    for (let j = 0; j < columnCount; j++) currentRow.push(null);
    rows.unshift(currentRow);
  }

  return (
    <View style={{ height: 150, width: 150 }}>
      <View style={{ flex: 1, backgroundColor: theme.color.black }}>
        {rows.map((col, i) => (
          <View
            style={{ flexDirection: "row", flexGrow: 1 }}
            key={`gridPreviewRow_${i}`}
          >
            {col.map((_, j) => {
              const currentElementIndex = (rowCount - 1 - i) * columnCount + j;
              const isCurrentElementHighlighted =
                highlightAllElements || index === currentElementIndex;

              const {
                isLocked,
                colorState: { pressedColor, unpressedColor },
              } = gridElements[currentElementIndex];

              return (
                <View
                  key={`gridPreviewElementIndex_${index}_${i}_${j}`}
                  style={{
                    flex: 1,
                    backgroundColor: isCurrentElementHighlighted
                      ? pressedColor
                      : unpressedColor,
                    borderWidth: 1,
                    borderColor: theme.color.black,
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 2,
                      flex: 1,
                      backgroundColor: unpressedColor,
                    }}
                  >
                    {isLocked && (
                      <Icon
                        size={10}
                        type="ionicon"
                        name={"lock-closed"}
                        color={pressedColor}
                      />
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

export const GridPreviewSizeSelector = () => {
  const dispatch = useAppDispatch();
  const { columnCount, rowCount } = useCurrentGridPreset();

  const rowCountSelector = (
    <View style={{ ...styles.xyCentered, marginLeft: 4 }}>
      <IncrementorButton
        disabled={rowCount === MaxGridDimension}
        onPress={() => dispatch(setRowCount(rowCount + 1))}
        isPlus
      />
      <Text style={[styles.rowsLabelText, styles.labelText]}>
        Rows: {rowCount}
      </Text>
      <IncrementorButton
        disabled={rowCount === 1}
        onPress={() => dispatch(setRowCount(rowCount - 1))}
      />
    </View>
  );

  const columnCountSelector = (
    <View style={{ flexDirection: "row", marginTop: 4, ...styles.xyCentered }}>
      <IncrementorButton
        disabled={columnCount === 1}
        onPress={() => dispatch(setColumnCount(columnCount - 1))}
      />
      <Text style={[styles.columnsLabelText, styles.labelText]}>
        Columns: {columnCount}
      </Text>
      <IncrementorButton
        disabled={columnCount === MaxGridDimension}
        onPress={() => dispatch(setColumnCount(columnCount + 1))}
        isPlus
      />
    </View>
  );
  return (
    <View style={{ ...styles.xyCentered, flexDirection: "row" }}>
      <View style={{ flexDirection: "column" }}>
        <GridPreview />
        {columnCountSelector}
      </View>
      {rowCountSelector}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: { paddingTop: 30 },
  xyCentered: { alignItems: "center", justifyContent: "center" },
  scaleManagementView: { flexDirection: "row", paddingTop: 20 },
  scaleSelector: { height: 180, flexDirection: "column", width: "60%" },
  scaleSelectorScrollView: { width: "100%" },
  scaleItem: {
    borderWidth: 1,
    height: 30,
    flexDirection: "row",
    backgroundColor: "#bbbbbb",
  },
  scaleItemText: { alignSelf: "center" },
  applyScaleView: { width: "40%" },
  labelText: { color: theme.color.lightText },
  rowsLabelText: { margin: 4, width: 50 },
  columnsLabelText: { marginLeft: 8, marginRight: 4, width: 72 },
});
