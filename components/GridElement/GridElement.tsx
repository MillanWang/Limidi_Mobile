import { Icon } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { getNoteKeyFromNoteNumber, isNoteLabelStandard } from "../../constants/MIDI_Notes";
import { useCurrentGridPreset, useGridElementAtIndex } from "../../hooks/useCurrentGridPreset";
import { ElementSizeProvider } from "../../hooks/useElementSize";
import { useIsGridElementDirty } from "../../hooks/useIsGridElementDirty";
import { Page, usePageContext } from "../../hooks/usePageContext";
import { ControlChangeIcon, GridThemedIcon } from "../GridThemedComponents/GridThemedIcon";
import { BodyText, Caption } from "../Typography";
import { GridElementEditDialog } from "./GridElementEditDialog/GridElementEditDialog";
import { ControlChange, useCcPersistedProperties } from "./GridElementTypes/ControlChange";
import DrumPad from "./GridElementTypes/DrumPad";

export default function GridElement({ index }: { index: number }) {
  const { isMidiNote } = useCurrentGridPreset().gridElements[index];
  const { page } = usePageContext();
  const isPlayMode = page === Page.Play;

  return (
    <ElementSizeProvider>
      {!isPlayMode ? (
        <GridElementEditButton index={index} />
      ) : isMidiNote ? (
        <DrumPad index={index} />
      ) : (
        <ControlChange index={index} />
      )}
    </ElementSizeProvider>
  );
}

const GridElementEditButtonIconRow = (props: {
  index: number;
  isMidiNote: boolean;
  color: string;
}) => {
  const { index, isMidiNote, color } = props;
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
        marginBottom: 2,
      }}
    >
      {isMidiNote ? (
        <Icon color={color} type="material-community" name={"piano"} />
      ) : (
        <Icon color={color} type="feather" name={"sliders"} />
      )}
      {!isMidiNote && <ControlChangeIcon index={index} />}
    </View>
  );
};

const GridElementEditButton = (props: { index: number }) => {
  const { index } = props;
  const [dialogVisible, setDialogVisible] = useState(false);
  const {
    name,
    colorState,
    isLocked,
    isMidiNote,
    midiNoteState: { noteNumber },
  } = useGridElementAtIndex(index);

  const { xAxisControlIndex, yAxisControlIndex } = useCcPersistedProperties({
    index,
  });

  const isDirty = useIsGridElementDirty(index);

  return (
    <>
      <TouchableOpacity
        style={[
          styles.gridElementUnpressedView,
          styles.gridElementEditView,

          {
            padding: 2,
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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <BodyText style={{ color: colorState.highlightColor, marginRight: "auto" }}>
              #{index}
              {isDirty && "*"}
            </BodyText>
            {isLocked && <GridThemedIcon type="ionicon" name="lock-closed" size={12} />}
          </View>
          <View
            style={{
              flexDirection: "column",
              flex: 1,
              alignItems: "center",
            }}
          >
            <GridElementEditButtonIconRow
              index={index}
              color={colorState.highlightColor}
              isMidiNote={isMidiNote}
            />
            {isMidiNote ? (
              <>
                <Caption style={{ color: colorState.highlightColor }}>
                  {getNoteKeyFromNoteNumber(noteNumber)}
                </Caption>
                {!isNoteLabelStandard(noteNumber, name) && (
                  <BodyText
                    numberOfLines={2}
                    style={{
                      color: colorState.highlightColor,
                      textAlign: "center",
                      fontSize: 12,
                    }}
                  >
                    {name.trim() === "" ? "<Blank>" : name.trim()}
                  </BodyText>
                )}
              </>
            ) : (
              <>
                {xAxisControlIndex >= 0 && (
                  <Caption style={{ color: colorState.highlightColor }}>
                    CC{yAxisControlIndex >= 0 ? " (X)" : ""}: {xAxisControlIndex}
                  </Caption>
                )}
                {yAxisControlIndex >= 0 && (
                  <Caption style={{ color: colorState.highlightColor }}>
                    CC{xAxisControlIndex >= 0 ? " (Y)" : ""}: {yAxisControlIndex}
                  </Caption>
                )}
              </>
            )}
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
