import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import { Input } from "@rneui/themed";

import { useAppSelector, useAppDispatch } from '../../../redux/hooks';

import {
    setIP,
    setPort,
} from '../../../redux/slices/HttpCommunicationsSlice';


export function GridEditNetworkSettingsTab() {
    const httpCommunicationInfo = useAppSelector(state => state.httpCommunicationsReducer.httpCommunicationInfo);
    const dispatch = useAppDispatch();

    return (
        <View>
            {/* TODO : IP address and port validation. Should be impossible to enter invalid ones. Shouild also figure out how to get this via QR code scan on desktop cause typing is no fun */}
            <Text>IP Address </Text>
            <Input
                keyboardType='number-pad'
                defaultValue={httpCommunicationInfo.ip}
                onChangeText={ip => dispatch(setIP({ ip }))}
            />

            <Text>Port</Text>
            <Input
                keyboardType='number-pad'
                defaultValue={httpCommunicationInfo.port}
                onChangeText={port => dispatch(setPort({ port }))}
            />

            <Text>MIDI Device</Text>
        </View>
    );
}