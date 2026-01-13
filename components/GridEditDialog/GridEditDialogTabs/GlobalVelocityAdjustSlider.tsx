import React from "react";
import { StyleSheet, View } from "react-native";
import { useCurrentGridPreset } from "../../../hooks/useCurrentGridPreset";
import { useAppDispatch } from "../../../redux/hooks";
import { setVelocityGlobally } from "../../../redux/slices/GridPresetsSlice";
import { VelocityRangeSlider } from "../../GridElement/GridElementEditDialog/GridElementEditDialogTabs/velocitySettings/VelocityRangeSlider";
import { Caption, Label } from "../../Typography";

export const GlobalVelocityAdjustSlider = () => {
  const { gridTheme, globalVelocity } = useCurrentGridPreset();
  const { primaryColor, highlightColor } = gridTheme;

  const dispatch = useAppDispatch();

  const handleValuesChange = (floor: number, ceiling: number) => {
    dispatch(setVelocityGlobally({ floor, ceiling }));
  };

  return (
    <View style={styles.container}>
      <Label style={{ marginBottom: 8 }}>Global Velocity Range</Label>
      <VelocityRangeSlider
        floor={globalVelocity.floor}
        ceiling={globalVelocity.ceiling}
        primaryColor={primaryColor}
        highlightColor={highlightColor}
        onValuesChange={handleValuesChange}
      />
      <Caption>Applies to all unlocked elements</Caption>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
  },
});
