import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GridEditMenu } from "../components/GridEditDialog/GridEditMenu";
import { GridElementGrid } from "../components/GridElementGrid";
import { GridScreenToolbar } from "../components/GridScreenToolbar";
import { theme } from "../constants/theme";
import { usePageContext } from "../hooks/usePageContext";

export default function GridScreen() {
  const { isInSettings } = usePageContext();

  const insets = useSafeAreaInsets();
  return (
    <View style={{ ...styles.container, paddingTop: insets.top }}>
      <GridScreenToolbar />
      {isInSettings ? <GridEditMenu /> : <GridElementGrid />}
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
