import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { GridElementGrid } from "../components/GridElementGrid";
import { GridScreenToolbar } from "../components/GridScreenToolbar";

export default function GridScreen() {
    const [isPlayMode, setIsPlayMode] = useState(true);

    return (
        <View style={styles.container}>
            <GridScreenToolbar isPlayMode={isPlayMode} setIsPlayMode={setIsPlayMode} />
            <GridElementGrid isPlayMode={isPlayMode} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: "#000000",
    },
});
