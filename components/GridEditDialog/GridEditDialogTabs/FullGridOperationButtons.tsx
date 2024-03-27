import { Button, Icon } from "@rneui/themed";
import React from "react";
import { theme } from "../../../constants/theme";
import { useAppDispatch } from "../../../redux/hooks";
import {
  restoreCurrentPresetToDefault,
  unlockAllGridElements,
} from "../../../redux/slices/GridPresetsSlice";

export const FullGridOperationButtons = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <Button onPress={() => dispatch(unlockAllGridElements(null))}>
        <Icon
          name={"lock-open"}
          type="ionicon"
          color={theme.color.white}
          style={{ marginRight: 4 }}
        />
        Unlock All
      </Button>
      <Button
        // TODO - This needs a confirmation modal
        onPress={() => dispatch(restoreCurrentPresetToDefault(null))}
      >
        <Icon
          name={"sync"}
          type="ionicon"
          color={theme.color.white}
          style={{ marginRight: 4 }}
        />
        Reset All
      </Button>
    </>
  );
};
