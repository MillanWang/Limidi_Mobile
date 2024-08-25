import { Button, Dialog, Text } from "@rneui/themed";
import React from "react";
import { ScrollView, View } from "react-native";
import {
  iconNames,
  ioniconValidIconNames,
} from "../../../../constants/IconNames";
import { theme } from "../../../../constants/theme";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setGridElementControlChangeIconString } from "../../../../redux/slices/GridPresetsSlice";
import { IconWithTitle } from "./ccSettings/IconWithTitle";
import { ControlChangeSettingsPanelProps } from "./ccSettings/ControlChangeSettingsPanel";
import {
  getControlChangeDirection,
  useControlChangeIndexController,
} from "./useControlChangeIndexController";

export const ControlChangeIconSettings = ({
  index,
}: ControlChangeSettingsPanelProps) => {
  const currentGridElementState = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset.gridElements[index]
  );

  const colorState = currentGridElementState.colorState;

  const { icon } = useControlChangeIndexController({ index });
  const [iconDialogOpen, setIconDialogOpen] = React.useState(false);

  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ color: theme.color.white }}>Icon</Text>
      <View style={{ flexDirection: "row" }}>
        <Button
          onPress={() => setIconDialogOpen(true)}
          buttonStyle={{ borderWidth: 1, backgroundColor: "transparent" }}
        >
          <IconWithTitle
            name={icon.name}
            backgroundColor={colorState.pressedColor}
            iconColor={colorState.unpressedColor}
          />
        </Button>
        <IconSelectDialog
          dialogVisible={iconDialogOpen}
          setDialogVisible={setIconDialogOpen}
          index={index}
        />
      </View>
    </View>
  );
};

interface IconSelectDialogProps {
  index: number;
  dialogVisible: boolean;
  setDialogVisible(dialogVisible: boolean): void;
}

const IconSelectDialog = ({
  index,
  dialogVisible,
  setDialogVisible,
}: IconSelectDialogProps) => {
  const dispatch = useAppDispatch();
  const currentGridElementState = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset.gridElements[index]
  );
  const isMidiNoteModeState = currentGridElementState.isMidiNote;

  const nameState = currentGridElementState.name;
  const colorState = currentGridElementState.colorState;

  const iconNameState = currentGridElementState.controlChangeState.iconName;
  const xAxisControlIndexState =
    currentGridElementState.controlChangeState.xAxisControlIndex;
  const yAxisControlIndexState =
    currentGridElementState.controlChangeState.yAxisControlIndex;

  const directionalIcons: string[] =
    iconNames[
      getControlChangeDirection(xAxisControlIndexState, yAxisControlIndexState)
    ];

  const iconTouchHandler = (name: string) => () => {
    dispatch(
      setGridElementControlChangeIconString({ index, iconString: name })
    );
  };

  const iconsPerRow = 3;
  const generalIconRows = getGeneralIconNameRows(iconsPerRow);

  return (
    <Dialog isVisible={dialogVisible}>
      <ScrollView style={{ height: 300 }}>
        <Text>Directional Icons</Text>
        <View style={{ flexDirection: "row" }}>
          {directionalIcons.map((iconName, i) => {
            return (
              <Button
                onPress={iconTouchHandler(iconName)}
                color={theme.color.white}
                buttonStyle={{
                  borderWidth: 3,
                  borderColor:
                    iconName === iconNameState
                      ? theme.color.black
                      : theme.color.white,
                }}
                key={`directional_icon-${i}`}
              >
                <IconWithTitle
                  name={iconName}
                  backgroundColor={colorState.pressedColor}
                  iconColor={colorState.unpressedColor}
                />
              </Button>
            );
          })}
        </View>

        <Text>General Icons</Text>
        <View style={{ flexDirection: "column" }}>
          {generalIconRows.map((row, i) => {
            return (
              <View style={{ flexDirection: "row" }} key={`icon_row-${i}`}>
                {row.map((iconName, j) => (
                  <Button
                    onPress={iconTouchHandler(iconName)}
                    color={theme.color.white}
                    buttonStyle={{
                      borderWidth: 3,
                      borderColor:
                        iconName === iconNameState
                          ? theme.color.black
                          : theme.color.white,
                    }}
                    key={`icon_row-${i}_elem-${j}_name-${iconName}`}
                  >
                    <IconWithTitle
                      name={iconName}
                      backgroundColor={colorState.pressedColor}
                      iconColor={colorState.unpressedColor}
                    />
                  </Button>
                ))}
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Button title={"Save"} onPress={() => setDialogVisible(false)} />
    </Dialog>
  );
};

function getGeneralIconNameRows(iconsPerRow: number) {
  const listOfRows = [];
  for (let i = 0; i < ioniconValidIconNames.length; i++) {
    if (i % iconsPerRow === 0) {
      listOfRows.push([ioniconValidIconNames[i]]);
    } else {
      listOfRows[Math.floor(i / iconsPerRow)].push(ioniconValidIconNames[i]);
    }
  }
  return listOfRows;
}
