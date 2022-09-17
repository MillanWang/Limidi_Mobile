import * as React from 'react';
import { DEFAULT_NOTE_NUMBER, Scale, ScaleService } from '../ScaleService';
import { NOTE } from '../../constants/MIDI_Notes';

const NATURAL_NOTE_SEQUENCE = [
    NOTE.C,
    NOTE.D,
    NOTE.E,
    NOTE.F,
    NOTE.G,
    NOTE.A,
    NOTE.B,
];


describe('ScaleService', () => {

    let ss: ScaleService;
    beforeEach(() => {
        ss = new ScaleService();
    });

    it('should instantiate', () => {
        expect(ss).toBeDefined();
    });

    it('should default to the chromatic scale and have the note number resetable', () => {
        for (let i = 0; i < 60; i++) {
            //Should always increase by one when chromatic
            expect(ss.getNextNoteNumber()).toBe(DEFAULT_NOTE_NUMBER + i);
        }

        // Reset the note number to C0 
        ss.setCurrentNoteNumber(0);
        for (let i = 0; i < 60; i++) {
            //Should always increase by one when chromatic
            expect(ss.getNextNoteNumber()).toBe(i);
        }
    });

    it('should return only natural notes for C Major based modal scales', () => {
        // HELPER FUNCTIONS
        function getNoteNumber(noteLetter: string): number {
            return Object.keys(NOTE).indexOf(noteLetter);
        }

        function testModalScale(scale: Scale, modeNumber: number, initialNoteNumberOffset: number): void {
            ss.setScale(scale);

            //Root note at 5th octave
            ss.setCurrentNoteNumber(DEFAULT_NOTE_NUMBER + initialNoteNumberOffset);

            // Make a clone of the natural note sequence. Shift it according to the initialNoteNumberOffset
            const currentNaturalNoteSequence = [...NATURAL_NOTE_SEQUENCE];
            for (let i = 1; i < modeNumber; i++) {
                // Should be impossible to get Ab. Just for TS checking 
                currentNaturalNoteSequence.push(currentNaturalNoteSequence.shift() ?? NOTE.Ab);
            }

            //At 5 octave
            currentNaturalNoteSequence.forEach((note) => {
                expect(Object.values(NOTE)[ss.getNextNoteNumber() % 12]).toBe(note);
            });

            // At higher 6 octave. 1 octave above starting value
            currentNaturalNoteSequence.forEach((note) => {
                expect(Object.values(NOTE)[ss.getNextNoteNumber() % 12]).toBe(note);
            });

            //Reset to 0 Octave
            ss.setCurrentNoteNumber(initialNoteNumberOffset);
            currentNaturalNoteSequence.forEach((note) => {
                expect(Object.values(NOTE)[ss.getNextNoteNumber() % 12]).toBe(note);
            })
        };

        // TEST
        testModalScale(Scale.Ionian, 1, getNoteNumber('C'));
        testModalScale(Scale.Dorian, 2, getNoteNumber('D'));
        testModalScale(Scale.Phrygian, 3, getNoteNumber('E'));
        testModalScale(Scale.Lydian, 4, getNoteNumber('F'));
        testModalScale(Scale.Mixolydian, 5, getNoteNumber('G'));
        testModalScale(Scale.Aeolian, 6, getNoteNumber('A'));
        testModalScale(Scale.Locrian, 7, getNoteNumber('B'));
    });

});