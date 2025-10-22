import { Button, Icon } from "@rneui/themed";
import React, { ReactNode, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  arePresetsEqual,
  PRESET_COLOR_LIST,
} from "../../../constants/ColorPresets";
import { useCurrentGridPresetColors } from "../../../hooks/useCurrentGridPreset";
import { usePresetDefault } from "../../../hooks/usePresetDefault";
import { useAppDispatch } from "../../../redux/hooks";
import { setGridColorPresetGlobally } from "../../../redux/slices/GridPresetsSlice";
import { GridPreviewSizeSelector } from "../../GridPreview";
import { FullGridOperationButtons } from "./FullGridOperationButtons";

export function GridEditStyleSettingsTab(): ReactNode {
  return (
    <View style={styles.container}>
      <GridPreviewSizeSelector />
      <ColorThemeSelector />
    </View>
  );
}

const ColorThemeSelector = () => {
  const dispatch = useAppDispatch();
  const { gridTheme: defaultPreset } = usePresetDefault();
  const currentPresetColors = useCurrentGridPresetColors();
  const [currentPreset, setCurrentPreset] = useState(currentPresetColors);

  const applySelectedPresetGlobally = () =>
    dispatch(setGridColorPresetGlobally(currentPreset));

  return (
    <View style={styles.colorPresetContainer}>
      <ScrollView style={styles.colorPresetSelector}>
        {PRESET_COLOR_LIST.map((preset) => {
          return (
            <Button
              buttonStyle={{
                backgroundColor: preset.primaryColor,
                borderColor: arePresetsEqual(currentPreset, preset)
                  ? preset.highlightColor
                  : preset.primaryColor,
                ...styles.colorPresetButton,
              }}
              key={`ColorPreset_${preset.name}`}
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
              {arePresetsEqual(currentPresetColors, preset) && (
                <View style={styles.selectedCheckmarkIcon}>
                  <Icon name="done" color={preset.highlightColor} />
                </View>
              )}
            </Button>
          );
        })}
      </ScrollView>
      <View style={styles.colorPresetOptions}>
        <Button
          onPress={applySelectedPresetGlobally}
          titleStyle={{ color: currentPreset.highlightColor }}
          buttonStyle={{
            backgroundColor: currentPreset.primaryColor,
            borderColor: currentPreset.highlightColor,
            borderWidth: 2,
          }}
        >
          Apply Color Globally
        </Button>

        <FullGridOperationButtons
          resetCallback={() => setCurrentPreset(defaultPreset)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  colorPresetContainer: {
    flexDirection: "row",
    paddingTop: 10,
  },
  colorPresetSelector: {
    width: "60%",
    marginRight: 4,
  },
  colorPresetButton: {
    borderWidth: 2,
    height: 40,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  selectedCheckmarkIcon: {
    marginLeft: "auto",
  },
  colorPresetText: {
    alignSelf: "center",
  },
  colorPresetOptions: {
    width: "40%",
    gap: 4,
  },
});
