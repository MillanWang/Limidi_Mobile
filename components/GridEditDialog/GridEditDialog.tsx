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



interface GridEditDialogProps extends GridEditNetworkSettingsTabProps {
    isVisible: boolean, setIsVisible(isVisible: boolean): void
};

export default function GridEditDialog({ isVisible, setIsVisible, midiService }: GridEditDialogProps) {
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
                        #rows, #columns,
                        {/* Eventually do a layout preset management thing */}
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
                    <GridEditNetworkSettingsTab midiService={midiService} />
                }
            </View>

        </Dialog>
    );
}