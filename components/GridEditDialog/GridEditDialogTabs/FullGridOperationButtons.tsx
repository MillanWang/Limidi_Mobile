import { Button, Icon } from "@rneui/themed";
import React from "react";
import { theme } from "../../../constants/theme";
import { useAppDispatch } from "../../../redux/hooks";
import {
  restoreCurrentPresetToDefault,
  unlockAllGridElements,
} from "../../../redux/slices/GridPresetsSlice";
import { GridThemedButton } from "../../GridThemedComponents/GridThemedButton";
import { GridThemedIcon } from "../../GridThemedComponents/GridThemedIcon";
import { View } from "react-native";

export const FullGridOperationButtons = () => {
  const dispatch = useAppDispatch();
  return (
    <View style={{ gap: 4 }}>
      <GridThemedButton onPress={() => dispatch(unlockAllGridElements(null))}>
        <GridThemedIcon
          name={"lock-open"}
          type="ionicon"
          style={{ marginRight: 4 }}
        />
        Unlock All
      </GridThemedButton>
      <GridThemedButton
        // TODO - This needs a confirmation modal
        onPress={() => dispatch(restoreCurrentPresetToDefault(null))}
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
