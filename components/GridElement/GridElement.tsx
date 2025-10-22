import { Icon } from "@rneui/themed";
import { BodyText } from "../Typography";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  useCurrentGridPreset,
  useGridElementAtIndex,
} from "../../hooks/useCurrentGridPreset";
import { Page, usePageContext } from "../../hooks/usePageContext";
import { GridElementEditDialog } from "./GridElementEditDialog/GridElementEditDialog";
import { ControlChange } from "./GridElementTypes/ControlChange";
import DrumPad from "./GridElementTypes/DrumPad";

export default function GridElement({ index }: { index: number }) {
  const { isMidiNote } = useCurrentGridPreset().gridElements[index];
  const { page } = usePageContext();
  const isPlayMode = page === Page.Play;
  if (!isPlayMode) {
    return <GridElementEditButton index={index} />;
  }

  return isMidiNote ? (
    <DrumPad index={index} />
  ) : (
    <ControlChange index={index} />
  );
}

const GridElementEditButtonIconRow = (props: {
  isLocked: boolean;
  isMidiNote: boolean;
  color: string;
}) => {
  const { isLocked, isMidiNote, color } = props;
  return (
    <View style={{ flexDirection: "row" }}>
      {isLocked && <Icon color={color} type="ionicon" name={"lock-closed"} />}
      {isMidiNote ? (
        <Icon color={color} type="material-community" name={"piano"} />
      ) : (
        <Icon color={color} type="feather" name={"sliders"} />
      )}
    </View>
  );
};

const GridElementEditButton = (props: { index: number }) => {
  const { index } = props;
  const [dialogVisible, setDialogVisible] = useState(false);
  const { name, colorState, isLocked, isMidiNote } =
    useGridElementAtIndex(index);

  return (
    <>
      <TouchableOpacity
        style={[
          styles.gridElementUnpressedView,
          styles.gridElementEditView,
          {
            backgroundColor: colorState.primaryColor,
            borderColor: colorState.highlightColor,
          },
        ]}
        onPress={() => setDialogVisible(true)}
      >
        <View
          style={{
            flexDirection: "column",
            alignSelf: "flex-start",
            flex: 1,
          }}
        >
          <BodyText style={{ color: colorState.highlightColor }}>
            #{index}
          </BodyText>
          <View
            style={{
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <GridElementEditButtonIconRow
              color={colorState.highlightColor}
              isLocked={isLocked}
              isMidiNote={isMidiNote}
            />
            <BodyText style={{ color: colorState.highlightColor }}>
              {name}
            </BodyText>
          </View>
        </View>
      </TouchableOpacity>

      <GridElementEditDialog
        index={index}
        dialogVisible={dialogVisible}
        setDialogVisible={setDialogVisible}
      />
    </>
  );
};

const styles = StyleSheet.create({
  gridElementBasePressedView: {
    flex: 1,
  },
  gridElementUnpressedView: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  gridElementEditView: {
    flexDirection: "row",
  },
});
