import React from "react";
import { View } from "react-native";
import { useAppSelector } from "../redux/hooks";

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
