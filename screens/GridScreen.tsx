import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GridEditMenu } from "../components/GridEditDialog/GridEditMenu";
import { GridElementGrid } from "../components/GridElementGrid";
import { GridScreenToolbar } from "../components/GridScreenToolbar";
import { PresetPaywall } from "../components/PresetPaywall";
import { theme } from "../constants/theme";
import { usePageContext } from "../hooks/usePageContext";
import { useAppSelector } from "../redux/hooks";

const isProVersion = true;

export default function GridScreen() {
  const { isInSettings } = usePageContext();

  const currentPresetIndex = useAppSelector(
    (state) => state.gridPresetsReducer.currentPresetIndex
  );

  const isPresetPaywalled = currentPresetIndex > 0;
  const showPresetPaywall = !isProVersion && isPresetPaywalled;

  const insets = useSafeAreaInsets();
  return (
    <View style={{ ...styles.container, paddingTop: insets.top }}>
      <GridScreenToolbar />
      {showPresetPaywall ? (
        <PresetPaywall />
      ) : isInSettings ? (
        <GridEditMenu />
      ) : (
        <GridElementGrid />
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
