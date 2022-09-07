import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { Input, Slider, } from "@rneui/themed";
import { MIDI_HTTP_Service } from '../../../services/MIDI_HTTP_Service';

export interface GridEditNetworkSettingsTabProps {
    midiService: MIDI_HTTP_Service
}
export function GridEditNetworkSettingsTab({ midiService }: GridEditNetworkSettingsTabProps) {
    return (
        <View>
            {/* TODO : IP address and port validation. Should be impossible to enter invalid ones. Shouild also figure out how to get this via QR code scan on desktop cause typing is no fun */}
            <Text>IP Address </Text>
            <Input keyboardType='number-pad' defaultValue={midiService.getIP()} onChangeText={value => midiService.setIP(value)}></Input>

            <Text>Port</Text>
            <Input keyboardType='number-pad' defaultValue={midiService.getPort()} onChangeText={value => midiService.setPort(value)}></Input>

            <Text>MIDI Device</Text>
        </View>
    );
}