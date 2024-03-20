import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GridEditMenu } from "../components/GridEditDialog/GridEditMenu";
import { GridElementGrid } from "../components/GridElementGrid";
import { GridScreenToolbar } from "../components/GridScreenToolbar";
import { theme } from "../constants/theme";

export default function GridScreen() {
  const [isPlayMode, setIsPlayMode] = useState(true);
  const [isFullGridEditMode, setIsFullGridEditMode] = useState(false);
  const insets = useSafeAreaInsets();
  return (
    <View style={{ ...styles.container, paddingTop: insets.top }}>
      <GridScreenToolbar
        isPlayMode={isPlayMode}
        setIsPlayMode={setIsPlayMode}
        isFullGridEditMode={isFullGridEditMode}
        setIsFullGridEditMode={setIsFullGridEditMode}
      />
      {isFullGridEditMode ? (
        <GridEditMenu />
      ) : (
        <GridElementGrid isPlayMode={isPlayMode} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: theme.color.black,
  },
});
