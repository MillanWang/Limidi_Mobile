import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import {
    Button,
    Dialog,
} from '@rneui/themed';

import { GridEditGridSettingsTab } from './GridEditDialogTabs/GridEditGridSettingsTab';
import { GridEditStyleSettingsTab } from './GridEditDialogTabs/GridEditColorSettingsTab';
import { GridEditNetworkSettingsTab } from './GridEditDialogTabs/GridEditNetworkSettingsTab';
import { GridEditScaleSettingsTab } from './GridEditDialogTabs/GridEditScaleSettingsTab';

export interface GridEditDialogProps {
    isVisible: boolean, setIsVisible(isVisible: boolean): void,
};

export default function GridEditDialog({
    isVisible, setIsVisible,
}: GridEditDialogProps) {
    const [tabIndex, setTabIndex] = React.useState(0);
    return (
        <Dialog isVisible={isVisible}>
            <View style={styles.dialogTabSelectorContainer}>
                {/* TODO : Refactor these into a list map */}
                <Button onPress={() => { setTabIndex(0) }}>Grid Settings</Button>
                <Button onPress={() => { setTabIndex(1) }}>Scale Settings</Button>
                <Button onPress={() => { setTabIndex(2) }}>Color Settings</Button>
                <Button onPress={() => { setTabIndex(3) }}>Network Settings</Button>

            </View>

            <View style={styles.dialogContentContainer}>

                {tabIndex === 0 && <GridEditGridSettingsTab />}
                {tabIndex === 1 && <GridEditScaleSettingsTab />}
                {tabIndex === 2 && <GridEditStyleSettingsTab />}
                {tabIndex === 3 && <GridEditNetworkSettingsTab />}
            </View>

            <View style={styles.saveButtonContainer}>
                <Button onPress={() => { setIsVisible(false) }}>SAVE</Button>
            </View>

        </Dialog>
    );
}

const styles = StyleSheet.create({
    dialogTabSelectorContainer: {
        flexDirection: 'row',
    },
    dialogContentContainer: {
        height: 500,
    },
    saveButtonContainer: {
        flexDirection: 'row',
    },
});