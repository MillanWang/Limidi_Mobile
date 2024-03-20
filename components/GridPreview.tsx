import { Button } from "@rneui/base";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  MaxGridDimension,
  setColumnCount,
  setRowCount,
} from "../redux/slices/GridPresetsSlice";
import { theme } from "../constants/theme";

interface GridPreviewProps {
  index?: number;
}

export const GridPreview = ({ index }: GridPreviewProps) => {
  const currentGridPreset = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset
  );
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
      <View style={{ flex: 1, backgroundColor: "#000000" }}>
        {rows.map((col, i) => (
          <View
            style={{ flexDirection: "row", flexGrow: 1 }}
            key={`gridPreviewRow_${i}`}
          >
            {col.map((_, j) => {
              const currentElementIndex = (rowCount - 1 - i) * columnCount + j;
              const isCurrentElementHighlighted =
                highlightAllElements || index === currentElementIndex;

              const { unpressedColor, pressedColor } =
                gridElements[currentElementIndex].colorState;

              return (
                <View
                  key={`gridPreviewElementIndex_${index}_${i}_${j}`}
                  style={{
                    flex: 1,
                    backgroundColor: isCurrentElementHighlighted
                      ? pressedColor
                      : unpressedColor,
                    borderWidth: 1,
                    borderColor: "#000000",
                  }}
                >
                  {isCurrentElementHighlighted && (
                    <View
                      style={{
                        margin: 2, // To show the pressedColor of the parent view
                        flex: 1,
                        backgroundColor: unpressedColor,
                      }}
                    ></View>
                  )}
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
  const { columnCount, rowCount } = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset
  );

  const rowCountSelector = (
    <View style={{ ...styles.xyCentered, marginLeft: 4 }}>
      <GridSizeEditButton
        disabled={rowCount === MaxGridDimension}
        onPress={() => dispatch(setRowCount(rowCount + 1))}
        isPlus
      />
      <Text style={[styles.rowsLabelText, styles.labelText]}>
        Rows: {rowCount}
      </Text>
      <GridSizeEditButton
        disabled={rowCount === 1}
        onPress={() => dispatch(setRowCount(rowCount - 1))}
      />
    </View>
  );

  const columnCountSelector = (
    <View style={{ flexDirection: "row", marginTop: 4, ...styles.xyCentered }}>
      <GridSizeEditButton
        disabled={columnCount === 1}
        onPress={() => dispatch(setColumnCount(columnCount - 1))}
      />
      <Text style={[styles.columnsLabelText, styles.labelText]}>
        Columns: {columnCount}
      </Text>
      <GridSizeEditButton
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

const GridSizeEditButton = (props: {
  onPress: () => void;
  isPlus?: boolean;
  disabled?: boolean;
}) => {
  const { onPress, isPlus, disabled } = props;
  return (
    <Button
      disabled={disabled}
      type="clear"
      onPress={onPress}
      buttonStyle={styles.gridSizeEditButtonStyle}
      disabledStyle={styles.gridSizeEditButtonDisabledStyle}
    >
      {isPlus ? "+" : "-"}
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
  gridSizeEditButtonStyle: {
    borderRadius: 1000,
    borderWidth: 1,
    height: 30,
    width: 30,
    padding: 0,
  },
  gridSizeEditButtonDisabledStyle: {
    borderColor: "grey",
  },
  xyCentered: {
    alignItems: "center",
    justifyContent: "center",
  },
  scaleManagementView: {
    flexDirection: "row",
    paddingTop: 20,
  },
  scaleSelector: {
    height: 180,
    flexDirection: "column",
    width: "60%",
  },
  scaleSelectorScrollView: {
    width: "100 %",
  },
  scaleItem: {
    borderWidth: 1,
    height: 30,
    flexDirection: "row",
    backgroundColor: "#bbbbbb",
  },
  scaleItemText: {
    alignSelf: "center",
  },
  applyScaleView: {
    width: "40 %",
  },

  labelText: { color: theme.color.lightText },
  rowsLabelText: { margin: 4 },
  columnsLabelText: { margin: 4, width: 70, textAlign: "center" },
});
