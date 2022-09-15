import React from 'react';
import {
    StyleSheet,
    Switch,
    Text,
    View,
} from 'react-native';

import { Icon } from '@rneui/themed';
import GridEditDialog, { GridEditDialogProps } from '../components/GridEditDialog/GridEditDialog';


export interface GridScreenToolbarProps extends GridEditDialogProps {
    isPlayMode: boolean, setIsPlayMode(isPlayMode: boolean): void,
};
export function GridScreenToolbar({
    isPlayMode, setIsPlayMode,
    isVisible, setIsVisible,
    initialNoteNumber, setInitialNoteNumber,
    columnCount, setColumnCount,
    rowCount, setRowCount,
    midiHttpService,
    scaleService
}: GridScreenToolbarProps) {
    return (
        <View style={styles.headerOptions}>
            <Switch onChange={() => { setIsPlayMode(!isPlayMode) }} value={!isPlayMode}></Switch>
            <Text style={styles.playOrEditText}>{isPlayMode ? "PLAY" : "EDIT"}</Text>

            {!!!isPlayMode &&
                <View style={{}}>
                    <Icon name='settings' color='#ffffff' onPress={() => { setIsVisible(true) }} />
                </View>
            }

            <GridEditDialog
                isVisible={isVisible} setIsVisible={setIsVisible}
                initialNoteNumber={initialNoteNumber} setInitialNoteNumber={setInitialNoteNumber}
                columnCount={columnCount} setColumnCount={setColumnCount}
                rowCount={rowCount} setRowCount={setRowCount}
                midiHttpService={midiHttpService}
                scaleService={scaleService}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    headerOptions: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    playOrEditText: {
        marginLeft: 5,
        color: '#ffffff'
    },
});