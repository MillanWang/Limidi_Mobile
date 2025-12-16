import { Button, Dialog } from "@rneui/themed";
import React from "react";
import { ScrollView, View } from "react-native";
import {
  iconNames,
  ioniconValidIconNames,
} from "../../../../constants/IconNames";
import { theme } from "../../../../constants/theme";
import {
  useCurrentGridElementPresetColors,
  useGridElementAtIndex,
} from "../../../../hooks/useCurrentGridPreset";
import { useAppDispatch } from "../../../../redux/hooks";
import { setGridElementControlChangeIconString } from "../../../../redux/slices/GridPresetsSlice";
import { GridThemedButton } from "../../../GridThemedComponents/GridThemedButton";
import { GridThemedIcon } from "../../../GridThemedComponents/GridThemedIcon";
import { BodyText, Label } from "../../../Typography";
import { ControlChangeSettingsPanelProps } from "./ccSettings/ControlChangeSettingsPanel";
import {
  IconWithTitle,
  useGetFormattedIconName,
} from "./ccSettings/IconWithTitle";
import {
  getControlChangeDirection,
  useControlChangeIndexController,
} from "./useControlChangeIndexController";

export const ControlChangeIconSettings = ({
  index,
}: ControlChangeSettingsPanelProps) => {
  const { icon } = useControlChangeIndexController({ index });
  const [iconDialogOpen, setIconDialogOpen] = React.useState(false);

  return (
    <View
      style={{
        marginBottom: 12,
        gap: 2,
      }}
    >
      <Label>Icon:</Label>
      <View style={{ flexDirection: "row" }}>
        <GridThemedButton
          onPress={() => setIconDialogOpen(true)}
          index={index}
          style={{ minWidth: 90 }}
        >
          <IconWithTitle name={icon.name} index={index} />
        </GridThemedButton>
        <IconSelectDialog
          dialogVisible={iconDialogOpen}
          setDialogVisible={setIconDialogOpen}
          index={index}
        />
      </View>
    </View>
  );
};

const iconsPerRow = 3;

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
  const currentGridElementState = useGridElementAtIndex(index);

  const iconNameState = currentGridElementState.controlChangeState.iconName;
  const xAxisControlIndexState =
    currentGridElementState.controlChangeState.xAxisControlIndex;
  const yAxisControlIndexState =
    currentGridElementState.controlChangeState.yAxisControlIndex;

  const allDirectionalIcons: string[] =
    iconNames[
      getControlChangeDirection(xAxisControlIndexState, yAxisControlIndexState)
    ];
  const directionalIconRows = getIconNameRows(iconsPerRow, allDirectionalIcons);
  const generalIconRows = getGeneralIconNameRows(iconsPerRow);

  return (
    <Dialog
      isVisible={dialogVisible}
      overlayStyle={{
        width: "80%",
        padding: 12,
        height: "80%",
        backgroundColor: theme.color.modalBackground,
        borderRadius: 16,
      }}
    >
      <DialogHeaderRow
        saveOnPress={() => setDialogVisible(false)}
        selectedIconName={iconNameState}
        index={index}
      />

      <ScrollView
        style={{ height: 300, paddingRight: 8, paddingTop: 8, marginTop: 4 }}
      >
        <Label>Directional Icons</Label>
        <View style={{ flexDirection: "column" }}>
          {directionalIconRows.map((row, i) => (
            <View
              style={{ flexDirection: "row", flex: 1 }}
              key={`icon_row-${i}`}
            >
              {row.map((iconName, j) => (
                <SelectableIconButton
                  index={index}
                  iconName={iconName}
                  isSelected={iconName === iconNameState}
                  key={`directionalicon_row-${i}_elem-${j}_name-${iconName}`}
                />
              ))}
            </View>
          ))}
        </View>

        <Label>General Icons</Label>
        <View style={{ flexDirection: "column" }}>
          {generalIconRows.map((row, i) => (
            <View
              style={{ flexDirection: "row", flex: 1 }}
              key={`icon_row-${i}`}
            >
              {row.map((iconName, j) => (
                <SelectableIconButton
                  index={index}
                  iconName={iconName}
                  isSelected={iconName === iconNameState}
                  key={`icon_row-${i}_elem-${j}_name-${iconName}`}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </Dialog>
  );
};

const DialogHeaderRow = ({
  saveOnPress,
  selectedIconName,
  index,
}: {
  saveOnPress: () => void;
  selectedIconName: string;
  index: number;
}) => {
  const mainColor = useCurrentGridElementPresetColors(index).highlightColor;
  const getFormattedIconName = useGetFormattedIconName();
  return (
    <View
      style={{
        flexDirection: "row",
        paddingBottom: 8,
        borderColor: mainColor,
        borderBottomWidth: 1,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <View style={{ flexDirection: "column" }}>
          <Label>{`Selected:  `}</Label>
          <BodyText style={{ color: mainColor }}>
            {getFormattedIconName(selectedIconName)}
          </BodyText>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View
            style={{
              backgroundColor: mainColor,
              borderRadius: 100,
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GridThemedIcon
              name={selectedIconName}
              type="ionicon"
              invert={true}
              index={index}
            />
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <GridThemedButton onPress={saveOnPress} index={index}>
          <GridThemedIcon
            index={index}
            style={{ marginRight: 4 }}
            type="ionicon"
            name={"save-outline"}
          />
          {" SAVE"}
        </GridThemedButton>
      </View>
    </View>
  );
};

const SelectableIconButton = ({
  index,
  iconName,
  isSelected,
}: {
  index: number;
  iconName: string;
  isSelected: boolean;
}) => {
  const dispatch = useAppDispatch();
  const borderColor = useCurrentGridElementPresetColors(index).highlightColor;
  const iconTouchHandler = (name: string) => () => {
    dispatch(
      setGridElementControlChangeIconString({ index, iconString: name })
    );
  };

  if (!iconName) {
    return <Button color={"transparent"} containerStyle={{ flex: 1 }} />;
  }

  return (
    <Button
      onPress={iconTouchHandler(iconName)}
      color={"transparent"}
      containerStyle={{ flex: 1, borderRadius: 0 }}
      buttonStyle={{
        borderWidth: 2,
        borderColor: isSelected ? borderColor : "transparent",
      }}
    >
      <IconWithTitle name={iconName} index={index} />
    </Button>
  );
};

const getGeneralIconNameRows = (iconsPerRow: number) => {
  return getIconNameRows(iconsPerRow, ioniconValidIconNames);
};

const getIconNameRows = (iconsPerRow: number, iconNames: string[]) => {
  const listOfRows: string[][] = [];
  for (let i = 0; i < iconNames.length; i += iconsPerRow) {
    const currentRow = iconNames.slice(i, i + iconsPerRow);
    while (currentRow.length < iconsPerRow) currentRow.push("");
    listOfRows.push(currentRow);
  }
  return listOfRows;
};
