import * as React from 'react';

import { ColorPresetService, ColorPreset } from "../ColorPresetService";
import {
    DEFAULT_TEXT_COLOR,
    DEFAULT_UNPRESSED_COLOR,
    DEFAULT_PRESSED_COLOR,
} from '../../constants/Colors';

describe('ColorPresetService', () => {

    let cps: ColorPresetService;

    beforeEach(() => {
        // Resets the ColorPresetService
        cps = new ColorPresetService();
    });

    it('instantiates', () => {
        expect(cps).toBeDefined();
    });




    // ************************************************************************************************
    // CREATION / RETRIEVAL
    // ************************************************************************************************

    it('creates and retrieves presets in order', () => {
        const testNames: string[] = ["first", "second", "third"];

        testNames.forEach((name: string) => {
            //True returned when creaeted successfully
            expect(cps.createColorPreset(name)).toBeTruthy();
        })

        const presets = cps.getAllColorPresets();
        expect(presets).toBeDefined();
        expect(presets).toHaveLength(3);

        presets?.forEach((preset: ColorPreset, i: number) => {
            expect(preset.getPresetName()).toBe(testNames[i]);
        });
    });

    it('Cannot retrieve presets that do not exist', () => {
        //Initialized with no presets
        expect(cps.getColorPreset("nice")).toBeNull();
        expect(cps.getAllColorPresets()).toHaveLength(0);
    });

    it('creates presets with default colors if not specified', () => {
        expect(cps.createColorPreset("nice")).toBeTruthy();
        const preset = cps.getColorPreset("nice");
        expect(preset).toBeDefined();

        expect(preset?.getColors().textColor).toEqual(DEFAULT_TEXT_COLOR);
        expect(preset?.getColors().unpressedColor).toEqual(DEFAULT_UNPRESSED_COLOR);
        expect(preset?.getColors().pressedColor).toEqual(DEFAULT_PRESSED_COLOR);
    });

    it('cannot create presets with duplicate names', () => {
        expect(cps.createColorPreset("nice")).toBeTruthy();
        expect(cps.createColorPreset("nice", "#123123", "#123123", "#123123")).toBeFalsy(); //duplicate names illegal even with different colors
        expect(cps.getAllColorPresets()).toHaveLength(1); // did not create

        const preset = cps.getColorPreset("nice");
        expect(preset).toBeDefined();

        // Colors are not overwritten by the new addition attempt
        expect(preset?.getColors().textColor).toEqual(DEFAULT_TEXT_COLOR);
        expect(preset?.getColors().unpressedColor).toEqual(DEFAULT_UNPRESSED_COLOR);
        expect(preset?.getColors().pressedColor).toEqual(DEFAULT_PRESSED_COLOR);
    });






    // ************************************************************************************************
    // UPDATING - RENAMING
    // ************************************************************************************************

    it('can rename presets', () => {
        expect(cps.createColorPreset("nice")).toBeTruthy();
        expect(cps.renameColorPreset("nice", "different name")).toBeTruthy();
        expect(cps.getColorPreset("nice")).toBeNull(); //Old name gone
        expect(cps.getColorPreset("different name")).toBeDefined(); //new name active
    });

    it('cannot rename non existing presets', () => {
        expect(cps.renameColorPreset("nice", "rename")).toBeFalsy();
        expect(cps.getColorPreset("nice")).toBeNull();//Never existed
        expect(cps.getColorPreset("rename")).toBeNull();//Never existed
    });

    it('cannot rename a preset to the same name', () => {
        expect(cps.createColorPreset("nice")).toBeTruthy();
        expect(cps.renameColorPreset("nice", "nice")).toBeFalsy();
        expect(cps.getColorPreset("nice")).toBeDefined();//Still around
    });

    it('cannot rename a preset to an existing name', () => {
        expect(cps.createColorPreset("111")).toBeTruthy();
        expect(cps.createColorPreset("222")).toBeTruthy();
        expect(cps.renameColorPreset("111", "222")).toBeFalsy();
        expect(cps.getAllColorPresets()).toHaveLength(2);
    });

    it('sends presets to the back of the list when their names are edited', () => {
        const testNames: string[] = ["first", "second", "third"];

        testNames.forEach((name: string) => {
            //True returned when creaeted successfully
            expect(cps.createColorPreset(name)).toBeTruthy();
        })

        let presets = cps.getAllColorPresets();
        expect(presets).toBeDefined();
        expect(presets).toHaveLength(3);

        presets?.forEach((preset: ColorPreset, i: number) => {
            expect(preset.getPresetName()).toBe(testNames[i]);
        });

        expect(cps.renameColorPreset("first", "last")).toBeTruthy();
        expect(testNames.shift()).toEqual("first");// removes 'first'
        testNames.push("last"); // now ["second", "third", "last"];

        presets = cps.getAllColorPresets();
        expect(presets).toBeDefined();
        expect(presets).toHaveLength(3);

        presets?.forEach((preset: ColorPreset, i: number) => {
            expect(preset.getPresetName()).toBe(testNames[i]);
        });
    });






    // ************************************************************************************************
    //UPDATING - RE-COLORING
    // ************************************************************************************************

    it('can edit the colors of a specified preset', () => {
        const originalSampleColor = "#eeeeee";
        expect(cps.createColorPreset("nice", originalSampleColor, originalSampleColor, originalSampleColor)).toBeTruthy();
        let preset = cps.getColorPreset("nice");
        expect(preset).toBeDefined();
        expect(preset?.getColors().textColor).toEqual(originalSampleColor);
        expect(preset?.getColors().unpressedColor).toEqual(originalSampleColor);
        expect(preset?.getColors().pressedColor).toEqual(originalSampleColor);

        const newSampleColor = "#123123";
        expect(cps.updateColorPresetColors("nice", newSampleColor, newSampleColor, newSampleColor)).toBeTruthy();
        preset = cps.getColorPreset("nice");
        expect(preset).toBeDefined();
        expect(preset?.getColors().textColor).toEqual(newSampleColor);
        expect(preset?.getColors().unpressedColor).toEqual(newSampleColor);
        expect(preset?.getColors().pressedColor).toEqual(newSampleColor);
    });

    it('sends presets with edited colors of a specified preset to the back of the list', () => {
        const testNames: string[] = ["first", "second", "third"];
        const originalSampleColor = "#eeeeee";
        let preset;
        testNames.forEach((name: string) => {
            expect(cps.createColorPreset(name, originalSampleColor, originalSampleColor, originalSampleColor)).toBeTruthy();
            preset = cps.getColorPreset(name);
            expect(preset).toBeDefined();
            expect(preset?.getColors().textColor).toEqual(originalSampleColor);
            expect(preset?.getColors().unpressedColor).toEqual(originalSampleColor);
            expect(preset?.getColors().pressedColor).toEqual(originalSampleColor);
        });

        const newSampleColor = "#123123";
        expect(cps.updateColorPresetColors("first", newSampleColor, newSampleColor, newSampleColor)).toBeTruthy();
        expect(testNames.shift()).toEqual("first");// removes 'first'
        testNames.push("first"); // now ["second", "third", "first"];

        const presets = cps.getAllColorPresets();
        expect(presets).toBeDefined();
        presets?.forEach((currentPreset: ColorPreset, i: number) => {
            expect(currentPreset.getPresetName()).toEqual(testNames[i]);
        });

    });

    it('cannot edit the colors of a non existant preset', () => {
        expect(cps.updateColorPresetColors("Non existing", "#123123", "#123123", "#123123")).toBeFalsy();
    });



    // ************************************************************************************************
    // DELETION
    // ************************************************************************************************
    it('deletes presets properly', () => {
        expect(cps.createColorPreset("nice")).toBeTruthy();
        expect(cps.getAllColorPresets()).toHaveLength(1);
        expect(cps.deleteColorPreset("nice")).toBeTruthy();
        expect(cps.getAllColorPresets()).toHaveLength(0);
    });

    it('cannot delete non existant presets', () => {
        expect(cps.deleteColorPreset("nice")).toBeFalsy();
    });



});