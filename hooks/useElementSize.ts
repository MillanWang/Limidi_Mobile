import { useCallback, useState } from "react";
import { LayoutChangeEvent } from "react-native";

export const useElementSize = () => {
  const [elementWidth, setElementWidth] = useState(1);
  const [elementHeight, setElementHeight] = useState(1);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const layoutWidth = event.nativeEvent.layout.width;
      const layoutHeight = event.nativeEvent.layout.height;
      setElementWidth(layoutWidth);
      setElementHeight(layoutHeight);
    },
    [
      setElementWidth,
      setElementHeight, 
    ]
  );

  return {
    elementWidth,
    elementHeight,
    onLayout,
  };
};
