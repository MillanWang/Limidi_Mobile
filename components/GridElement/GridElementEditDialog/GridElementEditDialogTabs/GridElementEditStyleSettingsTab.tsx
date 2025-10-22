import { Button, Icon, Text } from "@rneui/themed";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { PRESET_COLOR_LIST } from "../../../../constants/ColorPresets";
import {
  useCurrentGridPresetColors,
  useGridElementAtIndex,
} from "../../../../hooks/useCurrentGridPreset";
import { useAppDispatch } from "../../../../redux/hooks";
import {
  setGridElementhighlightColor,
  setGridElementprimaryColor,
} from "../../../../redux/slices/GridPresetsSlice";
import { GridThemedButton } from "../../../GridThemedComponents/GridThemedButton";
import { GridThemedIcon } from "../../../GridThemedComponents/GridThemedIcon";

export interface GridElementEditStyleProps {
  index: number;
}

export function GridElementEditStyleSettingsTab({
  index,
}: GridElementEditStyleProps) {
  const currentGridElementState = useGridElementAtIndex(index);
  const colorState = currentGridElementState.colorState;
  const gridColor = useCurrentGridPresetColors();
  const dispatch = useAppDispatch();
  const [currentPreset, setCurrentPreset] = useState(colorState);

  function setColors(colorPreset: {
    primaryColor: string;
    highlightColor: string;
  }): void {
    const { primaryColor, highlightColor } = colorPreset;
    dispatch(setGridElementprimaryColor({ index, primaryColor }));
    dispatch(setGridElementhighlightColor({ index, highlightColor }));
  }

  return (
    <View style={{ ...styles.styleSettingsContainer }}>
      <ScrollView style={{ width: "60%" }}>
        {PRESET_COLOR_LIST.map((preset, i) => {
          const isSet =
            colorState.highlightColor === preset.highlightColor &&
            colorState.primaryColor === preset.primaryColor;
          const isSelected =
            currentPreset.highlightColor === preset.highlightColor &&
            currentPreset.primaryColor === preset.primaryColor;
          return (
            <Button
              buttonStyle={{
                backgroundColor: preset.primaryColor,
                borderColor: isSelected
                  ? preset.highlightColor
                  : preset.primaryColor,
                ...styles.colorPresetButton,
              }}
              key={`ColorPreset_${preset.name}_${i}`}
              onPress={() => setCurrentPreset(preset)}
            >
              <Text
                style={{
                  color: preset.highlightColor,
                  ...styles.colorPresetText,
                }}
              >
                {preset.name}
              </Text>
              {isSet && (
                <View style={styles.selectedCheckmarkIcon}>
                  <Icon name="done" color={preset.highlightColor} />
                </View>
              )}
            </Button>
          );
        })}
      </ScrollView>

      <View style={{ width: "40%", marginLeft: 8, gap: 8 }}>
        <Button
          onPress={() => setColors(currentPreset)}
          titleStyle={{ color: currentPreset.highlightColor }}
          buttonStyle={{
            backgroundColor: currentPreset.primaryColor,
            borderColor: currentPreset.highlightColor,
            borderWidth: 1,
          }}
        >
          Apply Color
        </Button>

        <GridThemedButton
          onPress={() => {
            setCurrentPreset(gridColor);
            setColors(gridColor);
          }}
        >
          <GridThemedIcon
            name={"sync"}
            type={"ionicon"}
            style={{ marginRight: 4 }}
          />
          Reset
        </GridThemedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selectedCheckmarkIcon: { marginLeft: "auto" },
  styleSettingsContainer: {
    marginTop: 12,
    flexDirection: "row",
  },
  lockSwitchView: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorSelectorContainers: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  colorPresetButton: {
    borderWidth: 2,
    height: 40,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  colorPresetContainer: { flexDirection: "column" },

  colorPreset: {
    borderWidth: 1,
    height: 30,
    flexDirection: "row",
  },
  colorPresetText: {
    alignSelf: "center",
  },
});
