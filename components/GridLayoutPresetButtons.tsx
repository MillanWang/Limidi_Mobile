import React, { } from 'react';
import { View, } from 'react-native';

import { Icon, } from '@rneui/themed';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setPresetIndex } from '../redux/slices/GridPresetsSlice';

// List of the preset icons. They only exist up to 6, which feels like a reasonable amount of presets
const PRESET_ICON_NAMES = ['one', 'two', '3', '4', '5', '6',];

export function GridLayoutButtons() {
    const dispatch = useAppDispatch();
    const currentPresetIndex = useAppSelector(state => state.gridPresetsReducer.currentPresetIndex);

    const setPresetIndexFunction = (presetIndex: number) => {
        return () => { dispatch(setPresetIndex({ index: presetIndex })); }
    }

    return (
        <View style={
            {
                flexDirection: 'row',
                justifyContent: 'flex-end',
                flexGrow: 1,
            }
        }>

            {PRESET_ICON_NAMES.map((iconNameString, presetIndex) => {
                return (
                    <Icon
                        key={`PresetButtonIcon_${presetIndex}`}
                        name={`looks-${iconNameString}`} // Defines which icon is used
                        color={currentPresetIndex === presetIndex ? '#ffffff' : '#888888'}
                        onPress={setPresetIndexFunction(presetIndex)}
                    />
                );
            })}
        </View>

    );
}