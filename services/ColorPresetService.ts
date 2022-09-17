import { ColorPreset, } from '../constants/Colors'

/**
 * Singleton service to create, retrieve, update, and delete color presets
 * Preset names must be unique
 * 
 */
export class ColorPresetService {

    private colorPresets: ColorPreset[]; //Array to easily save the order of used/edited

    constructor(colorPresets?: ColorPreset[]) { //TODO : Add tests for recreating this with input param
        this.colorPresets = colorPresets ?? [];
    };

    getAllColorPresets() {
        return this.colorPresets;
    };

    getColorPreset(presetNameToGet: string): ColorPreset | null {
        for (let currentColorPreset of this.colorPresets) {
            if (currentColorPreset.name === presetNameToGet) {
                return currentColorPreset;
            }
        }
        return null; //Not found
    };

    createColorPreset(colorPreset: ColorPreset): boolean {
        if (this.doesPresetNameExist(colorPreset.name)) return false; // Names must be unique
        this.colorPresets.push(colorPreset)

        return true;
    };

    renameColorPreset(oldPresetName: string, newPresetName: string): boolean {
        if (this.doesPresetNameExist(newPresetName)) return false; // New name must be unique. This will also ensure old name doesn't match new name

        const colorPresetToUpdate = this.getColorPreset(oldPresetName);
        if (!!!colorPresetToUpdate) return false; //Cannot rename non existing ones

        colorPresetToUpdate.name = newPresetName;
        this.colorPresets.push(this.colorPresets.splice(this.colorPresets.indexOf(colorPresetToUpdate), 1)[0]); //Move to the back of the array so that most recently edited is easily accessed

        return true;
    };

    updateColorPresetColors(colorPreset: ColorPreset): boolean {
        const colorPresetToUpdate = this.getColorPreset(colorPreset.name);

        if (!!!colorPresetToUpdate) return false; // If ever trying to update a color preset that does not exist

        colorPresetToUpdate.unpressedColor = colorPreset.unpressedColor;
        colorPresetToUpdate.pressedColor = colorPreset.pressedColor;
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

