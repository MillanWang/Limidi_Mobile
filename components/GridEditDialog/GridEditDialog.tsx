import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    Button,
    Dialog,
} from '@rneui/themed';

import { GridEditNetworkSettingsTab, GridEditNetworkSettingsTabProps } from './GridEditDialogTabs/GridEditNetworkSettingsTab';

import { GridEditGridSettingsTab, GridEditGridSettingsTabProps } from './GridEditDialogTabs/GridEditGridSettingsTab';

export interface GridEditDialogProps extends GridEditNetworkSettingsTabProps, GridEditGridSettingsTabProps {
    isVisible: boolean, setIsVisible(isVisible: boolean): void,
};

export default function GridEditDialog({
    isVisible, setIsVisible,
    initialNoteNumber, setInitialNoteNumber,
    columnCount, setColumnCount,
    rowCount, setRowCount,
    midiHttpService
}: GridEditDialogProps) {
    const [tabIndex, setTabIndex] = React.useState(0);
    return (
        <Dialog isVisible={isVisible}>
            <View style={{ flexDirection: 'row' }}>
                <Button onPress={() => { setTabIndex(0) }}>Grid Settings</Button>
                <Button onPress={() => { setTabIndex(1) }}>Color Preset Settings</Button>
                <Button onPress={() => { setTabIndex(2) }}>Network Settings</Button>
                <Button onPress={() => { setIsVisible(false) }}>SAVE</Button>
            </View>

            <View style={{ height: 500 }}>
                {/* Grid settings */}
                {tabIndex === 0 &&
                    <Text>
                        <GridEditGridSettingsTab
                            initialNoteNumber={initialNoteNumber} setInitialNoteNumber={setInitialNoteNumber}
                            columnCount={columnCount} setColumnCount={setColumnCount}
                            rowCount={rowCount} setRowCount={setRowCount}
                        />
                    </Text>
                }

                {/* Color Preset Settings */}
                {tabIndex === 1 &&
                    <Text>
                        CRUD all color presets. Default is reserved
                    </Text>
                }

                {/* Network Settings */}
                {tabIndex === 2 &&
                    <GridEditNetworkSettingsTab midiHttpService={midiHttpService} />
                }
            </View>

        </Dialog>
    );
}