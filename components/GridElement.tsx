import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';

import {
    Button,
    Dialog,
} from "@rneui/themed";


interface GridElementProps {
    defaultName: string
    isPlayMode: boolean
};

export default function GridElement({ defaultName, isPlayMode }: GridElementProps) {

    const [dialogVisible, setDialogVisible] = useState(false);
    const [elementName, setElementName] = useState(defaultName);

    function toggleDialogVisible() {
        setDialogVisible(!dialogVisible);
    };

    function playModeTouchStartHandler() {
        if (isPlayMode) {
            console.log("PRESS START IN PLAY MODE");
        }
    }
    function playModeTouchEndHandler() {
        if (isPlayMode) {
            console.log("PRESS END IN PLAY MODE");
        }
    }
    return (
        <View style={styles.gridElementContainer} onTouchStart={playModeTouchStartHandler} onTouchEnd={playModeTouchEndHandler}>

            {/* Play Mode */}
            {isPlayMode &&
                <View style={styles.playModeView} >
                    <Text>play</Text>
                </View>
            }

            {/* Edit mode */}
            {!isPlayMode &&
                <View>
                    <Button onPress={toggleDialogVisible}>
                        EDIT ELEMENT {elementName}
                    </Button>

                </View>
            }

            <Dialog isVisible={dialogVisible} >
                <Text>Editing {elementName}</Text>

                {/* TODOs 
                    -Name editing
                    -Note selection
                    -Octave selection
                    -Velocity selection
                */}

                <Button onPress={toggleDialogVisible}>Save</Button>
                <Button onPress={toggleDialogVisible}>Close</Button>
            </Dialog>
        </View>
    );
};


const styles = StyleSheet.create({
    gridElementContainer: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey',
        height: 200,
        width: 200,
    },
    playModeView: {
        // height: 200,
        // width: 200,
        backgroundColor: "green"
    }

});
