import {
  ColorPreset,
  DEFAULT,
  FROST,
  SAPPHIRE,
  HULK,
  AMETHYST,
  SLIME,
} from "../../constants/ColorPresets";
import { placeholderElementName } from "../../constants/MIDI_Notes";
import { Scale } from "../../constants/Scales";
import { GridElementState } from "../interfaces/GridElement/GridElementState";
import { GridState } from "../interfaces/GridState";
import { rescaleGridElements } from "./rescaleGridElements";

function createGridElements(colorPreset: ColorPreset): GridElementState[] {
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

const defaultGlobalVelocity = { floor: 64, ceiling: 127 };

export const defaultPreset1: GridState = rescaleGridElements({
  columnCount: 4,
  rowCount: 4,
  startingNoteNumber: 60, //C5
  scale: Scale.Chromatic,
  gridElements: createGridElements(DEFAULT),
  gridTheme: DEFAULT,
  globalVelocity: defaultGlobalVelocity,
});

export const defaultPreset2: GridState = rescaleGridElements({
  columnCount: 4,
  rowCount: 5,
  startingNoteNumber: 48, //C4
  scale: Scale.Ionian,
  gridElements: createGridElements(FROST),
  gridTheme: FROST,
  globalVelocity: defaultGlobalVelocity,
});

export const defaultPreset3: GridState = rescaleGridElements({
  columnCount: 5,
  rowCount: 5,
  startingNoteNumber: 36, //C3
  scale: Scale.Dorian,
  gridElements: createGridElements(SAPPHIRE),
  gridTheme: SAPPHIRE,
  globalVelocity: defaultGlobalVelocity,
});

export const defaultPreset4: GridState = rescaleGridElements({
  columnCount: 6,
  rowCount: 6,
  startingNoteNumber: 24, //C2
  scale: Scale.Phrygian,
  gridElements: createGridElements(SLIME),
  gridTheme: SLIME,
  globalVelocity: defaultGlobalVelocity,
});

export const defaultPreset5: GridState = rescaleGridElements({
  columnCount: 2,
  rowCount: 2,
  startingNoteNumber: 36, //C3
  scale: Scale.Mixolydian,
  gridElements: createGridElements(AMETHYST),
  gridTheme: AMETHYST,
  globalVelocity: defaultGlobalVelocity,
});

export const defaultPreset6: GridState = rescaleGridElements({
  columnCount: 3,
  rowCount: 3,
  startingNoteNumber: 60, //C5
  scale: Scale.Aeolian,
  gridElements: createGridElements(HULK),
  gridTheme: HULK,
  globalVelocity: defaultGlobalVelocity,
});
