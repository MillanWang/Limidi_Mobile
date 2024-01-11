import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { GridElementGrid } from "../components/GridElementGrid";
import { GridScreenToolbar } from "../components/GridScreenToolbar";
import { GridEditMenu } from "../components/GridEditDialog/GridEditMenu";

export default function GridScreen() {
  const [isPlayMode, setIsPlayMode] = useState(true);
  const [isFullGridEditMode, setIsFullGridEditMode] = useState(false);

  return (
    <View style={styles.container}>
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
    backgroundColor: "#000000",
  },
});
