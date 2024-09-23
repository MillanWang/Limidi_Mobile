import { Button, Icon } from "@rneui/themed";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { DEFAULT, PRESET_COLOR_LIST } from "../../../constants/ColorPresets";
import { useAppDispatch } from "../../../redux/hooks";
import { setGridColorPresetGlobally } from "../../../redux/slices/GridPresetsSlice";
import { GridPreviewSizeSelector } from "../../GridPreview";
import { FullGridOperationButtons } from "./FullGridOperationButtons";

export function GridEditStyleSettingsTab(): JSX.Element {
  return (
    <View style={styles.container}>
      <GridPreviewSizeSelector />
      <ColorThemeSelector />
    </View>
  );
}

const ColorThemeSelector = () => {
  const dispatch = useAppDispatch();

  const [currentPreset, setCurrentPreset] = useState(DEFAULT);

  const applySelectedPresetGlobally = () =>
    dispatch(setGridColorPresetGlobally(currentPreset));

  return (
    <View style={styles.colorPresetContainer}>
      <ScrollView style={styles.colorPresetSelector}>
        {PRESET_COLOR_LIST.map((preset) => {
          return (
            <Button
              buttonStyle={{
                backgroundColor: preset.unpressedColor,
                borderColor:
                  currentPreset === preset
                    ? preset.pressedColor
                    : preset.unpressedColor,
                ...styles.colorPresetButton,
              }}
              key={`ColorPreset_${preset.name}`}
              onPress={() => setCurrentPreset(preset)}
            >
              <Text
                style={{
                  color: preset.pressedColor,
                  ...styles.colorPresetText,
                }}
              >
                {preset.name}
              </Text>
              {currentPreset === preset && (
                <View style={styles.selectedCheckmarkIcon}>
                  <Icon name="done" color={preset.pressedColor} />
                </View>
              )}
            </Button>
          );
        })}
      </ScrollView>
      <View style={styles.colorPresetOptions}>
        <Button
          onPress={applySelectedPresetGlobally}
          titleStyle={{ color: currentPreset.pressedColor }}
          buttonStyle={{
            backgroundColor: currentPreset.unpressedColor,
            borderColor: currentPreset.pressedColor,
            borderWidth: 2,
          }}
        >
          Apply Color Globally
        </Button>

        <FullGridOperationButtons />
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
    width: "40 %",
    gap: 4,
  },
});
