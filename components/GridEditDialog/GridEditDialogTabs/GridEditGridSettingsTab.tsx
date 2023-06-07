import { Slider, } from "@rneui/themed";
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    Button,

} from '@rneui/themed';
import {
    useAppSelector,
    useAppDispatch
} from '../../../redux/hooks';
import {
    setColumnCount,
    setRowCount,
    unlockAllGridElements,
    restoreCurrentPresetToDefault,
} from '../../../redux/slices/GridPresetsSlice';


export function GridEditGridSettingsTab(): JSX.Element {
    const dispatch = useAppDispatch();
    const gridState = useAppSelector(state => state.gridPresetsReducer.currentGridPreset);
    const columnState = gridState.columnCount;
    const rowState = gridState.rowCount;

    return (
        <View style={styles.container}>
            <Text>Number of Columns: {columnState}</Text>
            <Slider
                maximumValue={12} minimumValue={1} step={1}
                value={columnState}
                onValueChange={(value) => { dispatch(setColumnCount(value)) }}
            />
            <Text>Number of Rows: {rowState}</Text>
            <Slider
                maximumValue={12} minimumValue={1} step={1}
                value={rowState}
                onValueChange={(value) => { dispatch(setRowCount(value)) }}
            />
            <Button
                title="Unlock All Grid Elements"
                onPress={() => { dispatch(unlockAllGridElements(null)) }}
            />
            <Button
                title="Reset All Grid Elements"
                onPress={() => { dispatch(restoreCurrentPresetToDefault(null)) }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
    },
});