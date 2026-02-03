import { ColorPreset } from "../../constants/ColorPresets";
import { placeholderElementName } from "../../constants/MIDI_Notes";
import { GridElementState } from "../interfaces/GridElement/GridElementState";

export function createGridElements(colorPreset: ColorPreset): GridElementState[] {
  const allGridElements: GridElementState[] = [];

  //Make a state for all possible GridElements. 102rows*10Columns is the biggest possible grid
  for (let i = 0; i < 10 * 10; i++) {
    allGridElements.push({
      // Name and note will be properly set during rescaling
      name: placeholderElementName,
      midiNoteState: {
        noteNumber: 1,
        velocity: { floor: 64, ceiling: 127, isVertical: true },
      },
      colorState: {
        highlightColor: colorPreset.highlightColor,
        primaryColor: colorPreset.primaryColor,
      },
      controlChangeState: {
        iconName: "move",
        xAxisControlIndex: (i * 2) % 128, // 127 is max index
        yAxisControlIndex: (i * 2 + 1) % 128, // 127 is max index
      },
      isMidiNote: true,
      isLocked: false,
    });
  }
  return allGridElements;
}
