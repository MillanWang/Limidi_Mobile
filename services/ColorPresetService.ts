import {
    PresetColors,
    DEFAULT_COLOR_PRESET
} from '../constants/Colors'

/**
 * Singleton service to create, retrieve, update, and delete color presets
 * Preset names must be unique
 * 
 */
export class ColorPresetService {

    private colorPresets: Array<ColorPreset>; //Array to easily save the order of used/edited

    constructor() {
        this.colorPresets = new Array<ColorPreset>();
    };

    getAllColorPresets() {
        return this.colorPresets;
    };

    getColorPreset(presetNameToGet: string): ColorPreset | null {
        for (let currentColorPreset of this.colorPresets) {
            if (currentColorPreset.getPresetName() === presetNameToGet) {
                return currentColorPreset;
            }
        }
        return null; //Not found
    };

    createColorPreset(presetName: string, colorPreset?: PresetColors): boolean {
        if (this.doesPresetNameExist(presetName)) return false; // Names must be unique
        this.colorPresets.push(new ColorPreset(presetName, colorPreset?.unpressedColor, colorPreset?.pressedColor))

        return true;
    };

    renameColorPreset(oldPresetName: string, newPresetName: string): boolean {
        if (this.doesPresetNameExist(newPresetName)) return false; // New name must be unique. This will also ensure old name doesn't match new name

        const colorPresetToUpdate = this.getColorPreset(oldPresetName);
        if (!!!colorPresetToUpdate) return false; //Cannot rename non existing ones

        colorPresetToUpdate.setPresetName(newPresetName);
        this.colorPresets.push(this.colorPresets.splice(this.colorPresets.indexOf(colorPresetToUpdate), 1)[0]); //Move to the back of the array so that most recently edited is easily accessed

        return true;
    };

    updateColorPresetColors(presetName: string, unpressedColor: string, pressedColor: string,): boolean {

        const colorPresetToUpdate = this.getColorPreset(presetName);

        if (!!!colorPresetToUpdate) return false; // If ever trying to update a color preset that does not exist

        colorPresetToUpdate?.setColors(unpressedColor, pressedColor);
        this.colorPresets.push(this.colorPresets.splice(this.colorPresets.indexOf(colorPresetToUpdate), 1)[0]); //Move to the back of the array so that most recently edited is easily accessed
        return true;
    };

    deleteColorPreset(presetName: string): boolean {
        // NOTE : Presets shall set the colors of a gridElement. Deleting a preset should not change any grid elements.

        const colorPresetToDelete = this.getColorPreset(presetName);

        if (!!!colorPresetToDelete) return false; // Cannot delete color presets that do not exist
        this.colorPresets.splice(this.colorPresets.indexOf(colorPresetToDelete), 1)[0] //Removal
        return true;
    };

    private doesPresetNameExist(presetName: string): boolean {
        return this.getColorPreset(presetName) !== null; //Only returns null when not found
    }
}

export class ColorPreset {
    private presetName: string;
    private unpressedColor: string;
    private pressedColor: string;


    constructor(presetName: string, unpressedColor?: string, pressedColor?: string,) {
        this.presetName = presetName;
        this.unpressedColor = unpressedColor ?? DEFAULT_COLOR_PRESET.unpressedColor;
        this.pressedColor = pressedColor ?? DEFAULT_COLOR_PRESET.pressedColor;
    }

    getPresetName(): string { return this.presetName; }
    setPresetName(presetName: string): void { this.presetName = presetName; }
    isNameMatching(presetName: string): boolean { return this.presetName === presetName }

    getColors(): PresetColors {
        return {
            unpressedColor: this.unpressedColor,
            pressedColor: this.pressedColor,
        };
    }

    setColors(unpressedColor: string, pressedColor: string,) {
        this.unpressedColor = unpressedColor;
        this.pressedColor = pressedColor;
    }
}

