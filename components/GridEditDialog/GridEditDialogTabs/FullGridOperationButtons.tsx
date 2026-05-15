import React from "react";
import { Alert, View } from "react-native";
import {
  RESET_PRESET_TO_DEFAULTS_A11Y,
  UNLOCK_ALL_PADS_A11Y,
} from "../../../hooks/accessibilityHooks";
import { useAppDispatch } from "../../../redux/hooks";
import {
  restoreCurrentPresetToDefault,
  unlockAllGridElements,
} from "../../../redux/slices/GridPresetsSlice";
import { GridThemedButton } from "../../GridThemedComponents/GridThemedButton";
import { GridThemedIcon } from "../../GridThemedComponents/GridThemedIcon";

export const FullGridOperationButtons = (props: {
  resetCallback: () => void;
}) => {
  const dispatch = useAppDispatch();

  const confirmResetAll = () => {
    Alert.alert(
      "Reset preset?",
      "This will restore the current preset to its defaults. All customizations to the pads in this preset will be lost.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            dispatch(restoreCurrentPresetToDefault(null));
            props.resetCallback();
          },
        },
      ],
    );
  };

  return (
    <View style={{ gap: 4 }}>
      <GridThemedButton
        onPress={() => dispatch(unlockAllGridElements(null))}
        {...UNLOCK_ALL_PADS_A11Y}
      >
        <GridThemedIcon
          name={"lock-open"}
          type="ionicon"
          style={{ marginRight: 4 }}
        />
        Unlock All
      </GridThemedButton>
      <GridThemedButton
        onPress={confirmResetAll}
        {...RESET_PRESET_TO_DEFAULTS_A11Y}
      >
        <GridThemedIcon
          name={"sync"}
          type={"ionicon"}
          style={{ marginRight: 4 }}
        />
        Reset All
      </GridThemedButton>
    </View>
  );
};
