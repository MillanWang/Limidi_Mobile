import { Button, Icon, Text } from "@rneui/themed";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { PRESET_COLOR_LIST } from "../../../../constants/ColorPresets";
import { useGridElementAtIndex } from "../../../../hooks/useCurrentGridPreset";
import { useAppDispatch } from "../../../../redux/hooks";
import {
  setGridElementPressedColor,
  setGridElementUnpressedColor,
} from "../../../../redux/slices/GridPresetsSlice";

export interface GridElementEditStyleProps {
  index: number;
}

export function GridElementEditStyleSettingsTab({
  index,
}: GridElementEditStyleProps) {
  const currentGridElementState = useGridElementAtIndex(index);
  const colorState = currentGridElementState.colorState;

  const dispatch = useAppDispatch();
  const [currentPreset, setCurrentPreset] = useState(colorState);

  function setColors(colorPreset: {
    unpressedColor: string;
    pressedColor: string;
  }): void {
    const { unpressedColor, pressedColor } = colorPreset;
    dispatch(setGridElementUnpressedColor({ index, unpressedColor }));
    dispatch(setGridElementPressedColor({ index, pressedColor }));
  }

  return (
    <View style={{ ...styles.styleSettingsContainer }}>
      <View style={styles.colorPresetContainer}>
        <ScrollView>
          {PRESET_COLOR_LIST.map((preset) => {
            const isSet =
              colorState.pressedColor === preset.pressedColor &&
              colorState.unpressedColor === preset.unpressedColor;
            const isSelected =
              currentPreset.pressedColor === preset.pressedColor &&
              currentPreset.unpressedColor === preset.unpressedColor;
            return (
              <Button
                buttonStyle={{
                  backgroundColor: preset.unpressedColor,
                  borderColor: isSelected
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
                {isSet && (
                  <View style={styles.selectedCheckmarkIcon}>
                    <Icon name="done" color={preset.pressedColor} />
                  </View>
                )}
              </Button>
            );
          })}
        </ScrollView>

        <View
          style={{
            marginTop: 12,
          }}
        >
          <Button
            onPress={() => setColors(currentPreset)}
            titleStyle={{ color: currentPreset.pressedColor }}
            buttonStyle={{
              backgroundColor: currentPreset.unpressedColor,
              borderColor: currentPreset.pressedColor,
              borderWidth: 2,
            }}
          >
            Apply Color
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selectedCheckmarkIcon: {
    marginLeft: "auto",
  },
  styleSettingsContainer: {
    marginTop: 20,
    flex: 1,
    flexDirection: "column",
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
  colorPresetContainer: {
    flex: 1,
    flexGrow: 1,
    flexDirection: "column",
  },

  colorPreset: {
    borderWidth: 1,
    height: 30,
    flexDirection: "row",
  },
  colorPresetText: {
    alignSelf: "center",
  },
});
