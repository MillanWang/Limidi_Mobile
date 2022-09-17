import * as React from 'react';

import { ColorPreset } from '../../constants/Colors';
import { ColorPresetService } from "../ColorPresetService";
import { DEFAULT } from '../../constants/Colors';

describe('ColorPresetService', () => {

    //Implemented as functions that return new instances because instances would be edited and changed between tests
    const getSampleColorPresetColors = () => {
        return {
            unpressedColor: '#330c29',
            pressedColor: '#0eed45'
        }
    }
    const getSampleColorPreset = () => {
        return {
            name: "nice",
            ...getSampleColorPresetColors()
        }
    };


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
            expect(cps.createColorPreset({ name, ...getSampleColorPresetColors() })).toBeTruthy();
        })

        const presets = cps.getAllColorPresets();
        expect(presets).toBeDefined();
        expect(presets).toHaveLength(3);

        presets?.forEach((preset: ColorPreset, i: number) => {
            expect(preset.name).toBe(testNames[i]);
            expect(cps.getColorPreset(preset.name)).toBeDefined()
        });
    });

    it('Cannot retrieve presets that do not exist', () => {
        //Initialized with no presets
        expect(cps.getColorPreset("nice")).toBeNull();
        expect(cps.getAllColorPresets()).toHaveLength(0);
    });

    it('cannot create presets with duplicate names', () => {
        expect(cps.createColorPreset(getSampleColorPreset())).toBeTruthy();
        expect(cps.createColorPreset(getSampleColorPreset())).toBeFalsy(); //duplicate names illegal even with different colors
        expect(cps.getAllColorPresets()).toHaveLength(1); // did not create

        const preset = cps.getColorPreset("nice");
        expect(preset).toBeDefined();

        // Colors are not overwritten by the new addition attempt
        expect(preset?.unpressedColor).toEqual(getSampleColorPreset().unpressedColor);
        expect(preset?.pressedColor).toEqual(getSampleColorPreset().pressedColor);
    });






    // ************************************************************************************************
    // UPDATING - RENAMING
    // ************************************************************************************************

    it('can rename presets', () => {
        expect(cps.createColorPreset(getSampleColorPreset())).toBeTruthy();
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
        expect(cps.createColorPreset(getSampleColorPreset())).toBeTruthy();
        expect(cps.renameColorPreset("nice", "nice")).toBeFalsy();
        expect(cps.getColorPreset("nice")).toBeDefined();//Still around
    });

    it('cannot rename a preset to an existing name', () => {
        expect(cps.createColorPreset({ name: "111", ...getSampleColorPresetColors() })).toBeTruthy();
        expect(cps.createColorPreset({ name: "222", ...getSampleColorPresetColors() })).toBeTruthy();
        expect(cps.renameColorPreset("111", "222")).toBeFalsy();
        expect(cps.getAllColorPresets()).toHaveLength(2);
    });

    it('sends presets to the back of the list when their names are edited', () => {
        const testNames: string[] = ["first", "second", "third"];

        testNames.forEach((name: string) => {
            //True returned when creaeted successfully
            expect(cps.createColorPreset({ name, ...getSampleColorPresetColors() })).toBeTruthy();
        })

        let presets = cps.getAllColorPresets();
        expect(presets).toBeDefined();
        expect(presets).toHaveLength(3);

        presets?.forEach((preset: ColorPreset, i: number) => {
            expect(preset.name).toBe(testNames[i]);
        });

        expect(cps.renameColorPreset("first", "last")).toBeTruthy();
        expect(testNames.shift()).toEqual("first");// removes 'first'
        testNames.push("last"); // now ["second", "third", "last"];

        presets = cps.getAllColorPresets();
        expect(presets).toBeDefined();
        expect(presets).toHaveLength(3);

        presets?.forEach((preset: ColorPreset, i: number) => {
            expect(preset.name).toBe(testNames[i]);
        });
    });






    // ************************************************************************************************
    //UPDATING - RE-COLORING
    // ************************************************************************************************

    it('can edit the colors of a specified preset', () => {
        expect(cps.createColorPreset(getSampleColorPreset())).toBeTruthy();
        let preset = cps.getColorPreset("nice");
        expect(preset).toBeDefined();
        expect(preset?.unpressedColor).toEqual(getSampleColorPreset().unpressedColor);
        expect(preset?.pressedColor).toEqual(getSampleColorPreset().pressedColor);

        const newSampleColor = "#123123";
        expect(cps.updateColorPresetColors({
            name: "nice",
            unpressedColor: newSampleColor,
            pressedColor: newSampleColor
        })).toBeTruthy();
        preset = cps.getColorPreset("nice");
        expect(preset).toBeDefined();
        expect(preset?.unpressedColor).toEqual(newSampleColor);
        expect(preset?.pressedColor).toEqual(newSampleColor);
    });

    it('sends presets with edited colors of a specified preset to the back of the list', () => {
        const testNames: string[] = ["first", "second", "third"];
        const originalSampleColor = "#eeeeee";
        let preset;
        testNames.forEach((name: string) => {
            expect(cps.createColorPreset({
                name,
                unpressedColor: originalSampleColor,
                pressedColor: originalSampleColor
            })).toBeTruthy();
            preset = cps.getColorPreset(name);
            expect(preset).toBeDefined();
            expect(preset?.unpressedColor).toEqual(originalSampleColor);
            expect(preset?.pressedColor).toEqual(originalSampleColor);
        });

        const newSampleColor = "#123123";
        expect(cps.updateColorPresetColors({
            name: testNames[0], // "first"
            unpressedColor: newSampleColor,
            pressedColor: newSampleColor
        })).toBeTruthy();
        expect(testNames.shift()).toEqual("first");// removes 'first'
        testNames.push("first"); // now ["second", "third", "first"];

        const presets = cps.getAllColorPresets();
        expect(presets).toBeDefined();
        presets?.forEach((currentPreset: ColorPreset, i: number) => {
            expect(currentPreset.name).toEqual(testNames[i]);
        });

    });

    it('cannot edit the colors of a non existant preset', () => {
        //Currently no presets active
        expect(cps.updateColorPresetColors(getSampleColorPreset())).toBeFalsy();
    });



    // ************************************************************************************************
    // DELETION
    // ************************************************************************************************
    it('deletes presets properly', () => {
        expect(cps.createColorPreset(getSampleColorPreset())).toBeTruthy();
        expect(cps.getAllColorPresets()).toHaveLength(1);
        expect(cps.deleteColorPreset(getSampleColorPreset().name)).toBeTruthy();
        expect(cps.getAllColorPresets()).toHaveLength(0);
    });

    it('cannot delete non existant presets', () => {
        expect(cps.deleteColorPreset("nice")).toBeFalsy();
    });



});