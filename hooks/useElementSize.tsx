import React, { createContext, useCallback, useContext, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";

// Context for sharing element size across child components
export const ElementSizeContext = createContext<{
  elementWidth: number;
  elementHeight: number;
} | null>(null);

// No-prop wrapper that provides element size context and measures its container
export const ElementSizeProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const [elementWidth, setElementWidth] = useState(1);
  const [elementHeight, setElementHeight] = useState(1);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const layoutWidth = event.nativeEvent.layout.width;
    const layoutHeight = event.nativeEvent.layout.height;
    setElementWidth(layoutWidth);
    setElementHeight(layoutHeight);
  }, []);

  return (
    <ElementSizeContext.Provider value={{ elementWidth, elementHeight }}>
      <View style={{ flex: 1 }} onLayout={onLayout}>
        {children}
      </View>
    </ElementSizeContext.Provider>
  );
};

// Hook for consuming element size from context (used by child components)
export const useElementSize = () => {
  const context = useContext(ElementSizeContext);
  if (!context) {
    throw new Error("useElementSize must be used within ElementSizeProvider");
  }
  return context;
};
