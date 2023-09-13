import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Dialog, Text } from "@rneui/themed";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import NetworkErrorDialog from "./NetworkErrorDialog";
import { Icon } from "@rneui/themed";

const MIN_TIME_BETWEEN_FIX = 5000;

export const NetworkErrorFixer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { mostRecentNetworkFailTime, mostRecentNetworkFixTime } = useAppSelector((state) => state.httpCommunicationsReducer);
    const isButtonVisible = !false && mostRecentNetworkFailTime - mostRecentNetworkFixTime > MIN_TIME_BETWEEN_FIX;

    return (
        <>
            {isButtonVisible && (
                <View
                    style={{
                        width: "33%",
                        backgroundColor: "green",
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end",
                    }}
                >
                    <Button
                        buttonStyle={{
                            backgroundColor: "#bbbbbb",

                            borderRadius: 100,
                        }}
                        onPress={() => setIsModalOpen(true)}
                    >
                        <Icon name={isButtonVisible ? "wifi-off" : "wifi"} color={isButtonVisible ? "red" : "#ffffff"} />
                    </Button>
                    <NetworkErrorDialog isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                </View>
            )}
        </>
    );
};
