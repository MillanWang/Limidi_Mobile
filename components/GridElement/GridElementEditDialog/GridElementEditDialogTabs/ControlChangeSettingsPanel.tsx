import { Button, Dialog, Icon, Input, Text } from "@rneui/themed";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  iconNames,
  ioniconIconNameAliases,
  ioniconValidIconNames,
} from "../../../../constants/IconNames";
import { theme } from "../../../../constants/theme";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setGridElementControlChangeIconString } from "../../../../redux/slices/GridPresetsSlice";
import {
  ControlChangeDirection,
  getControlChangeDirection,
  useControlChangeIndexController,
} from "./useControlChangeIndexController";

export interface ControlChangeSettingsPanelProps {
  index: number;
}

export function ControlChangeSettingsPanel({
  index,
}: ControlChangeSettingsPanelProps) {
  const currentGridElementState = useAppSelector(
    (state) => state.gridPresetsReducer.currentGridPreset.gridElements[index]
  );

  const colorState = currentGridElementState.colorState;

  const { mode, icon } = useControlChangeIndexController({ index });
  const [iconDialogOpen, setIconDialogOpen] = React.useState(false);

  const modeButtonList = [
    {
      text: "Horizontal",
      enum: ControlChangeDirection.horizontal,
      iconName: "swap-horizontal",
      onPress: mode.setHorizontal,
    },
    {
      text: "Vertical",
      enum: ControlChangeDirection.vertical,
      iconName: "swap-vertical",
      onPress: mode.setVertical,
    },
    {
      text: "XY Bidirectional",
      enum: ControlChangeDirection.xy,
      iconName: "move",
      onPress: mode.setXY,
    },
  ];

  const isXY = mode.current === ControlChangeDirection.xy;
  const showVerticalControlChangeIndexSelector =
    mode.current === ControlChangeDirection.vertical || isXY;
  const showHorizontalControlChangeIndexSelector =
    mode.current === ControlChangeDirection.horizontal || isXY;

  return (
    <View>
      <View style={{ marginBottom: 12 }}>
        <Text style={{ color: theme.color.white }}>Icon</Text>
        <View style={{ flexDirection: "row" }}>
          <IconWithTitle
            name={icon.name}
            backgroundColor={colorState.pressedColor}
            iconColor={colorState.unpressedColor}
          />
          <Button title="Set Icon" onPress={() => setIconDialogOpen(true)} />
          <IconSelectDialog
            dialogVisible={iconDialogOpen}
            setDialogVisible={setIconDialogOpen}
            index={index}
          />
        </View>
      </View>

      <View style={{ marginBottom: 12 }}>
        <Text style={{ color: theme.color.white }}>Orientation</Text>
        <View style={{ flexDirection: "row", gap: 12 }}>
          {modeButtonList.map((element, i) => (
            <Button
              buttonStyle={{
                backgroundColor:
                  mode.current === element.enum ? "black" : "blue",
              }}
              onPress={element.onPress}
              title={element.text}
              key={`button_${element.text}_${i}`}
            >
              <Icon name={element.iconName} type="ionicon" />
            </Button>
          ))}
        </View>
      </View>

      {showHorizontalControlChangeIndexSelector && (
        <View>
          <Text style={{ color: theme.color.white }}>
            {isXY ? "Horizontal" : ""} Control Change (CC) Index
          </Text>
          <ControlChangeIndexSelector index={index} isVertical={false} />
        </View>
      )}
      {showVerticalControlChangeIndexSelector && (
        <View>
          <Text style={{ color: theme.color.white }}>
            {isXY ? "Vertical" : ""} Control Change (CC) Index
          </Text>
          <ControlChangeIndexSelector index={index} isVertical />
        </View>
      )}
    </View>
  );
} // end GridElementEditMidiOptionsTab

const ControlChangeIndexSelector = (props: {
  index: number;
  isVertical: boolean;
}) => {
  const { index, isVertical } = props;
  const { horizontalIndex, verticalIndex } = useControlChangeIndexController({
    index,
  });

  const indexController = isVertical ? verticalIndex : horizontalIndex;

  return (
    <View style={{ flexDirection: "row" }}>
      <Input
        leftIcon={<Button title="-" onPress={indexController.decrement} />}
        keyboardType="numeric"
        value={`${indexController.value}`}
        style={{ color: theme.color.lightText }}
        onChange={(e) => {
          const value = e.nativeEvent.text;
          if (isIntegerBetween0And127(value)) {
            indexController.set(Number(value));
          } else if (value === "") {
            indexController.set(1);
          }
        }}
        rightIcon={<Button title="+" onPress={indexController.increment} />}
      />
    </View>
  );
};

function isIntegerBetween0And127(input: string): boolean {
  // Check if the input string is a valid integer and not a decimal
  const num = Number(input);
  const isInteger = /^\d+$/.test(input);

  // Ensure the conversion to number is valid, within the specified range, and not a decimal
  return isInteger && Number.isInteger(num) && num >= 0 && num <= 127;
}

interface IconSelectDialogProps {
  index: number;
  dialogVisible: boolean;
  setDialogVisible(dialogVisible: boolean): void;
}

function IconSelectDialog({
  index,
  dialogVisible,
  setDialogVisible,
}: IconSelectDialogProps) {
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
        <Text>Grid Element: {index}</Text>
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
}

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

interface IconWithTitleProps {
  name: string;
  backgroundColor: string;
  iconColor: string;
  showTitle?: boolean;
}
function IconWithTitle({
  name,
  backgroundColor,
  iconColor,
}: IconWithTitleProps) {
  let formattedName =
    ioniconIconNameAliases[name] ??
    name.replaceAll("logo-", "").replaceAll("ios-", "").replaceAll("-", " ");
  formattedName =
    formattedName.charAt(0).toUpperCase() + formattedName.slice(1);

  return (
    <View
      style={{
        alignItems: "center",
        width: 60,
      }}
    >
      <View
        style={{
          backgroundColor,
          height: 50,
          width: 50,
          justifyContent: "center",
          borderRadius: 100, //Big enough to be a circle
        }}
      >
        <Icon name={name} type="ionicon" color={iconColor} />
      </View>
      <Text>{formattedName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  lockSwitchView: {
    flexDirection: "row",
    alignItems: "center",
  },
});
