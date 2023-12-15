import React from "react";
import { View } from "react-native";
import { useAppSelector } from "../redux/hooks";

interface GridPreviewProps {
  index?: number;
}

export const GridPreview = ({ index }: GridPreviewProps) => {
  const { columnCount, rowCount } = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset
  );

  const rows: JSX.Element[][] = [];
  for (let i = 0; i < rowCount; i++) {
    let currentRow: JSX.Element[] = [];
    for (let j = 0; j < columnCount; j++) {
      const isCurrentElementHighlighted = index === i * columnCount + j;
      currentRow.push(
        <View
          key={`gridPreviewElementIndex_${index}`}
          style={{
            flex: 1,
            backgroundColor: isCurrentElementHighlighted ? "blue" : "green",
            borderWidth: 1,
            borderColor: "#000000",
          }}
        ></View>
      );
    }
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
            {col.map((element) => (
              <>{element}</>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};
